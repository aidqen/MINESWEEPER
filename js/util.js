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
  console.log(gBoard)
  innerHTML += '</tbody></table>'
  elTable.innerHTML = innerHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
    elCell.classList.remove('hidden')
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
    const item = elCell.classList.item(1)
    const parts = item.split('-')

    const i = parts[1]
    const j = parts[2]
    
    return {i,j}
}

function resetTimer() {
    const elTimer = document.querySelector('.timer')
    clearInterval(gInterval)
    elTimer.innerText = 'Timer : 0'
  }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
