let toolsContainer = document.querySelector(".tools-container");
let optionsContainer = document.querySelector(".options-container");
let optionFlag = true;
let pencilToolContainer = document.querySelector(".pencil-tool");
let eraserToolContainer = document.querySelector(".eraser-tool");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");

let sticky = document.querySelector(".sticky");
let uplaod = document.querySelector(".upload");

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

uplaod.addEventListener("click", (e) => {
  // To open file explorar
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();
  //////////////
  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);
    let stickyTemplateHtml = `
    <div class="header-container">
            <div class="minimize">
              <i class="fa-solid fa-window-minimize"></i>
            </div>
            <div class="remove">
              <i class="fa-solid fa-trash"></i>
            </div>
        </div>
        <div class="note-container">
            <img src="${url}"/>
        </div>
    `;
    createSticky(stickyTemplateHtml);
  });
});
// Sticky notes

sticky.addEventListener("click", (e) => {
  let stickyTemplateHtml = `
  <div class="header-container">
            <div class="minimize">
              <i class="fa-solid fa-window-minimize"></i>
            </div>
            <div class="remove">
              <i class="fa-solid fa-trash"></i>
            </div>
        </div>
        <div class="note-container">
            <textarea  ></textarea>
        </div>
        `;
  createSticky(stickyTemplateHtml);
});

function createSticky(stickyTemplateHtml) {
  let stickyContainer = document.createElement("div");
  stickyContainer.setAttribute("class", "sticky-container");
  stickyContainer.innerHTML = stickyTemplateHtml;
  document.body.appendChild(stickyContainer);

  let minimize = stickyContainer.querySelector(".minimize");
  let remove = stickyContainer.querySelector(".remove");
  noteActions(minimize, remove, stickyContainer);

  stickyContainer.onmousedown = function (event) {
    dragAndDrop(stickyContainer, event);
  };

  stickyContainer.ondragstart = function () {
    return false;
  };
}

// For Note minimize and remove functionalities
function noteActions(minimize, remove, stickyContainer) {
  remove.addEventListener("click", (e) => {
    stickyContainer.remove();
  });
  minimize.addEventListener("click", (e) => {
    let noteContainer = stickyContainer.querySelector(".note-container");
    let display = getComputedStyle(noteContainer).getPropertyValue("display");
    if (display === "none") {
      noteContainer.style.display = "block";
    } else {
      noteContainer.style.display = "none";
    }
  });
}

function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the element at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the element on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the element, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}
