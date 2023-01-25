const DEFAULT_COLOR = 'black';
const DEFAULT_MODE = 'etching';
const DEFAULT_SIZE = 32;

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

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
etchBtn.onclick = () => setCurrentMode('etching');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);

function populateGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`; //Grid cell width autofit
  
    for (let i = 0; i < size * size; i++) {
      const gridCell = document.createElement('div');
      gridCell.classList.add('gridCell');
      gridCell.style.backgroundColor = 'white';
      gridCell.addEventListener('mouseover', etch);
      gridCell.addEventListener('mousedown', etch);
      grid.appendChild(gridCell);
    }
}

populateGrid(currentSize);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function etch(e) {
  if (mouseDown === false) return;
  if (currentMode === 'etching') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = 'white';
  }
}

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activateButton(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = newSize;
}