let toolsContainer = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let optionFlag = true;
let pencilToolContainer = document.querySelector(".pencil-tool");
let eraserToolContainer = document.querySelector(".eraser-tool");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");

let pencilFlag = false;
let eraserFlag = false;

optionsContainer.addEventListener("click", (e) => {
  optionFlag = !optionFlag;
  if (optionFlag) {
    openTools();
  } else {
    closeTools();
  }

  function openTools() {
    let iconEle = optionsContainer.children[0];
    iconEle.classList.remove("fa-times");
    iconEle.classList.add("fa-bars");
    toolsContainer.style.display = "flex";
  }
  function closeTools() {
    let iconEle = optionsContainer.children[0];
    iconEle.classList.remove("fa-bars");
    iconEle.classList.add("fa-times");
    toolsContainer.style.display = "none";

    pencilToolContainer.style.display = "none";
    eraserToolContainer.style.display = "none";
  }
});

pencil.addEventListener("click", (e) => {
  // true = show pencil tools, false = hide pencil tools
  pencilFlag = !pencilFlag;

  if (pencilFlag) {
    pencilToolContainer.style.display = "block";
  } else {
    pencilToolContainer.style.display = "none";
  }
});

eraser.addEventListener("click", (e) => {
  // true = show eraser tools, false = hide eraser tools
  eraserFlag = !eraserFlag;

  if (eraserFlag) {
    eraserToolContainer.style.display = "flex";
  } else {
    eraserToolContainer.style.display = "none";
  }
});
