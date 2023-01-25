const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'etching';
const DEFAULT_SIZE = 16;

let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;
let currentSize = DEFAULT_SIZE;

const colorPicker = document.getElementById('colorPicker');
const etchBtn = document.getElementById('etchBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

//Polupate the grid
function populateGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; //Grid cell width autofit
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`; //Grid cell height autofit
  
    for (let i = 0; i < size * size; i++) {
      const gridCell = document.createElement('div');
      gridCell.classList.add('gridCell');
      gridCell.style.backgroundColor = 'white';
      gridCell.addEventListener('mouseover', etchOrErase);
      gridCell.addEventListener('mousedown', etchOrErase);
      grid.appendChild(gridCell);
    }
}

populateGrid(currentSize);

//Etching and erasing
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function etchOrErase(e) {
  if (mouseDown === false) return;
  if (currentMode === 'etching') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = 'white';
  }
}

//Color swatch
colorPicker.oninput = (e) => setCurrentColor(e.target.value);

function setCurrentColor(newColor) {
  currentColor = newColor;
}


//Mode buttons
window.onload = () => {
  activateButton(DEFAULT_MODE);
}

etchBtn.onclick = () => setCurrentMode('etching');
eraserBtn.onclick = () => setCurrentMode('eraser');

function activateButton(newMode) {
  if (currentMode === 'etching') {
    etchBtn.classList.remove('active');
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active');
  }

  if (newMode === 'etching') {
    etchBtn.classList.add('active');
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active');
  }
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

// Clear button
clearBtn.onclick = () => reloadGrid();

function reloadGrid() {
  clearGrid();
  populateGrid(currentSize);
}

function clearGrid() {
  grid.innerHTML = '';
}

// Canvas slider
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function changeSize(value) {
  setCurrentSize(value);
  updateSizeValue(value);
  reloadGrid();
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}

function updateSizeValue(value) {
  sizeValue.textContent = `${value} x ${value}`;
}