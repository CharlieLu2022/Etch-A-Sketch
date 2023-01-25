const grid = document.getElementById('grid');

function populateGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  
    for (let i = 0; i < size * size; i++) {
      const gridCell = document.createElement('div')
      gridCell.classList.add('gridCell')
      gridCell.style.backgroundColor = 'white'
      gridCell.style.width = '32px'
      gridCell.style.height = '32px'
      gridCell.style.border = '1px dotted gray'
    //   gridCell.addEventListener('mouseover', changeColor)
    //   gridCell.addEventListener('mousedown', changeColor)
      grid.appendChild(gridCell)
    }
}

populateGrid(16);