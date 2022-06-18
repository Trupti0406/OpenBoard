let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidtheEle = document.querySelector(".pencil-width");
let eraserWidtheEle = document.querySelector(".eraser-width");
let download = document.querySelector(".download");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidtheEle.value;
let eraserWidth = eraserWidtheEle.value;

let undoRedoTracker = [];
let track = 0;

let mousedown = false;

// API 2D
let tool = canvas.getContext("2d");
tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

// tool.beginPath(); //new graphic / new path
// tool.moveTo(10, 10); //start point
// tool.lineTo(100, 150); //end point
// tool.stroke(); // to fill color in the invisible

// tool.beginPath();
// tool.moveTo(100, 200);
// tool.lineTo(200, 200);
// tool.stroke();

// =============== I want to start my path whenever i click
// mousedown => Start new path
// mouse mover => Path fill
// mouse up => End path

canvas.addEventListener("mousedown", (e) => {
  mousedown = true;
  beginPath({
    x: e.clientX,
    y: e.clientY,
  });
});

canvas.addEventListener("mousemove", (e) => {
  if (mousedown) {
    drawStroke({
      x: e.clientX,
      y: e.clientY,
      color: eraserFlag ? eraserColor : penColor,
      width: eraserFlag ? eraserWidth : penWidth,
    });
  }
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;
});

function beginPath(strokeObj) {
  tool.beginPath();
  tool.moveTo(strokeObj.x, strokeObj.y); //returns value of where my mouse is clicking on x and y direction
}

function drawStroke(strokeObj) {
  tool.strokeStyle = strokeObj.color;
  tool.lineWidth = strokeObj.width;
  tool.lineTo(strokeObj.x, strokeObj.y);
  tool.stroke();
}

pencilColor.forEach((colorEle) => {
  colorEle.addEventListener("click", (e) => {
    let color = colorEle.classList[0];
    penColor = color;
    tool.strokeStyle = penColor;
  });
});

eraserWidtheEle.addEventListener("change", (e) => {
  eraserWidth = eraserWidtheEle.value;
  tool.lineWidth = eraserWidth;
});

pencilWidtheEle.addEventListener("change", (e) => {
  penWidth = pencilWidtheEle.value;
  tool.lineWidth = penWidth;
});

eraser.addEventListener("click", (e) => {
  if (eraserFlag) {
    tool.strokeStyle = eraserColor;
    tool.lineWidth = eraserWidth;
  } else {
    tool.strokeStyle = penColor;
    tool.lineWidth = penWidth;
  }
});

// To Download the board
download.addEventListener("click", (e) => {
  let url = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = url;
  a.download = "board.jpg";
  a.click();
});
