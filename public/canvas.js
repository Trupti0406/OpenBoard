let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidtheEle = document.querySelector(".pencil-width");
let eraserWidtheEle = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidtheEle.value;
let eraserWidth = eraserWidtheEle.value;

let undoRedoTracker = []; //Data
let track = 0; //represents which action from tracker array

let mousedown = false;

// API 2D
let tool = canvas.getContext("2d");
tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

canvas.addEventListener("mousedown", (e) => {
  mousedown = true;
  // beginPath({
  //   x: e.clientX,
  //   y: e.clientY,
  // });
  let data = {
    x: e.clientX,
    y: e.clientY,
  };

  //send data to server
  socket.emit("beginPath", data);
});

canvas.addEventListener("mousemove", (e) => {
  if (mousedown) {
    let data = {
      x: e.clientX,
      y: e.clientY,
      color: eraserFlag ? eraserColor : penColor,
      width: eraserFlag ? eraserWidth : penWidth,
    };
    socket.emit("drawStroke", data);
  }
});

canvas.addEventListener("mouseup", (e) => {
  mousedown = false;

  let url = canvas.toDataURL();
  undoRedoTracker.push(url);
  track = undoRedoTracker.length - 1;
});

undo.addEventListener("click", (e) => {
  if (track > 0) track--;
  // track action
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  socket.emit("redoUndo", data);
  // undoRedoCanvas(trackObj);
});

redo.addEventListener("click", (e) => {
  if (track < undoRedoTracker.length - 1) track++;
  // track action
  let data = {
    trackValue: track,
    undoRedoTracker,
  };
  socket.emit("redoUndo", data);
});

function undoRedoCanvas(trackObj) {
  track = trackObj.trackValue;
  undoRedoTracker = trackObj.undoRedoTracker;

  let url = undoRedoTracker[track];
  let img = new Image(); //New Image reference element
  img.src = url;
  img.onload = (e) => {
    tool.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

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

socket.on("beginPath", (data) => {
  //  data from server
  beginPath(data);
});

socket.on("drawStroke", (data) => {
  drawStroke(data);
});

socket.on("redoUndo", (data) => {
  undoRedoCanvas(data);
});
