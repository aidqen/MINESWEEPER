'use strict'

const MINE = 'MINE'
const MINE_IMG = '&#128163'
const FLAG_IMG = '&#128681'

var gBoard
var gLevel = {
  SIZE: 4,
  MINES: 2,
}
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
}
var gArrLocations

function onInit() {
  gBoard = buildBoard(gLevel.SIZE)
  renderBoard()
  gArrLocations = createArrOfLocations()
}

function onCellClicked(elCell) {
  const location = currDomLocation(elCell)

  if (!gGame.isOn) {
    //IF GAME ISN'T ON
    //TURN IT ON
    gGame.isOn = true
    inputRandomBombs()
    updateNegCount()
  }
    //IF GAME IS ON ALREADY
    if (
      !gBoard[location.i][location.j].minesAroundCount &&
      !gBoard[location.i][location.j].isMine
    ) {
      console.log(location);
      expandShown(location)
    }
  
  gBoard[location.i][location.j].isShown = true
  var cell = cellValue(location)
  renderCell(location, cell)
}

function onRightClick(elCell) {
  const i = elCell.classList.item(1).charAt(5)
  const j = elCell.classList.item(1).charAt(7)

  if (!gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = true
    elCell.innerHTML = FLAG_IMG
  } else {
    if (gBoard[i][j].isShown) {
      var cell = cellValue({ i, j })
      renderCell({ i, j }, cell)
    } else {
      elCell.innerHTML = ''
    }
  }
}

function inputRandomBombs() {
  for (var i = 0; i < gLevel.MINES; i++) {
    var randLocation = drawNum(location)
    gBoard[randLocation.i][randLocation.j].isMine = true
  }
}

function expandBoard(size, mines) {
  gGame.isOn = false
  gLevel.SIZE = size
  gLevel.MINES = mines
  gArrLocations = createArrOfLocations()
  gBoard = buildBoard(gLevel.SIZE)
  renderBoard()
}
