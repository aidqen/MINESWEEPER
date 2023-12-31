'use strict'

function buildBoard(size) {
  var board = []
  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  return board
}

function renderBoard() {
  const table = document.querySelector('.table-container')

  var innerHTML = '<table><tbody>'
  for (var i = 0; i < gBoard.length; i++) {
    innerHTML += '<tr>'
    for (var j = 0; j < gBoard[0].length; j++) {
      
      var className = `cell cell-${i}-${j} hidden`

        innerHTML += `<td class="${className}"
            onclick="onCellClicked(this)" onContextMenu="onRightClick(this)"></td>`
    }
    innerHTML += '</tr>'
  }
  console.log(gBoard)
  innerHTML += '</tbody></table>'
  table.innerHTML = innerHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    elCell.classList.remove('hidden')
}

function expandBoard(params) {
    
}

function drawNum(location) {
  var randIdx = getRandomInt(0, gArrLocations.length - 1)

  while (
    gArrLocations[randIdx].i === +location.i &&
    gArrLocations[randIdx].j === +location.j
  ) {
    console.log('hi')
    randIdx = getRandomInt(0, gArrLocations.length - 1)
  }
  var num = gArrLocations[randIdx]
  gArrLocations.splice(randIdx, 1)
  return num
}

function createArrOfLocations() {
  var size = gLevel.SIZE
  var arr = []
  var idx = 0
  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      arr[idx] = { i, j }
      idx++
    }
  }
  return arr
}

function cellValue(location) {
    if (gBoard[location.i][location.j].isMine) cell = MINE_IMG
    else var cell = gBoard[location.i][location.j].minesAroundCount
    return cell
}
  
function currDomLocation(elCell) {
    const i = elCell.classList.item(1).charAt(5)
    const j = elCell.classList.item(1).charAt(7)
    return {i,j}
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
