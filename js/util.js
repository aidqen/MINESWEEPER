'use strict'

function buildBoard(size) {
  var board = []
  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = {
        minesAroundCount: '',
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  return board
}

function renderEveryCell(action, elClass) {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[i].length; j++) {
      renderClass({ i, j }, action, elClass)
    }
  }
}

function renderBoard() {
  const elTable = document.querySelector('.table-container')
  const elFlagCount = document.querySelector('.flag-count')
  const smiley = document.querySelector('.smiley')

  gArrLocations = createArrOfLocations()
  smiley.innerHTML = PLAYING_EMOJI
  gFlagCount = gLevel.MINES
  elFlagCount.innerText = `Flag Count : ${gFlagCount}`

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
  innerHTML += '</tbody></table>'
  elTable.innerHTML = innerHTML
}

function renderCell(location, value) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value

  elCell.classList.remove('hidden')
}

function unrenderCell(location) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = ''

  elCell.classList.add('hidden')
}

function renderClass(location, action, elClass) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  if (action === 'remove') {
    elCell.classList.remove(elClass)
  }
  if (action === 'add') {
    elCell.classList.add(elClass)
  }
}

function drawNum(location) {
  var randIdx = getRandomInt(0, gArrLocations.length - 1)

  while (
    gArrLocations[randIdx].i === +location.i &&
    gArrLocations[randIdx].j === +location.j
  ) {
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

function disappear(element) {
  element.classList.add('unseen')
}

function cellValue(location) {
  if (gBoard[location.i][location.j].isMine) cell = MINE_IMG
  else var cell = gBoard[location.i][location.j].minesAroundCount
  if (cell.minesAroundCount === 0) {
    cell = ''
  }
  return cell
}

function currDomLocation(elCell) {
  const item = elCell.classList.item(1)
  const parts = item.split('-')

  const i = parts[1]
  const j = parts[2]

  return { i, j }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
