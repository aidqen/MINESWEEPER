'use strict'

const MINE_IMG = '&#128163'
const FLAG_IMG = '&#128681'
const WIN_EMOJI = '&#128526'
const PLAYING_EMOJI = '&#128522'
const LOSE_EMOJI = '&#128557'

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
var gFlagCount
var gInterval

function onInit() {
  gBoard = buildBoard(gLevel.SIZE)
  renderBoard()
}

function onCellClicked(elCell) {
  const location = currDomLocation(elCell)
  console.log(Date.now());

  if (!gGame.isOn) {
    //IF GAME ISN'T ON
    //TURN IT ON
    gGame.isOn = true
    renderTimer()
    inputRandomBombs(location)
    updateNegCount()
  }
  //IF GAME IS ON ALREADY
  if (
    !gBoard[location.i][location.j].minesAroundCount &&
    !gBoard[location.i][location.j].isMine
  ) {
    expandShown(location)
  }

  if (gBoard[location.i][location.j].isMarked) {
    gFlagCount++
    updateFlagCount()
  }
  
  gBoard[location.i][location.j].isShown = true
  isGameOver(location)
  renderCell(location, cellValue(location))
}

function onRightClick(elCell) {
  const location = currDomLocation(elCell)
  const i = location.i
  const j = location.j

  if (!gBoard[i][j].isMarked) {
    gBoard[i][j].isMarked = true
    gFlagCount--
    elCell.innerHTML = FLAG_IMG
  } else {
    if (gBoard[i][j].isShown) {
      var cell = cellValue({ i, j })
      renderCell({ i, j }, cell)
    } else {
      elCell.innerHTML = ''
    }
    gBoard[i][j].isMarked = false
    gFlagCount++
  }
  updateFlagCount()
}

function updateFlagCount() {
  const elFlagCount = document.querySelector('.flag-count')

  if (gFlagCount <= 0) elFlagCount.innerText = 'Flag Count : 0'
  else elFlagCount.innerText = `Flag Count : ${gFlagCount}`
}

function isGameOver(location) {
  if (gBoard[location.i][location.j].isMine) {
    console.log('hi')
    gameOver('lose')
    return
  }
  for (var i = 0 ; i < gBoard.length ; i++) {
   for (var j = 0 ; j < gBoard[i].length ; j++) {
    if (!gBoard[i][j].isShown && !gBoard[i][j].isMine) {
      return
    }
   }
  }
  gameOver('win')
}

function gameOver(status) {
  const gameOver = document.querySelector('.game-over')
  const smiley = document.querySelector('.smiley')
  clearInterval(gInterval)
  gameOver.classList.remove('unseen')
  if (status === 'win') {
    gameOver.innerText = 'You Win!'
    smiley.innerHTML = WIN_EMOJI
  } else {
    gameOver.innerText = 'You Lose!'
    smiley.innerHTML = LOSE_EMOJI
  }
}

function renderTimer() {
  const elTimer = document.querySelector('.timer')
  const startTime = Date.now()
  gInterval = 0
  gInterval = setInterval(() => {
    var currTime = (Date.now() - startTime) / 1000
    elTimer.innerText = `Timer : ${currTime.toFixed(1)}`
  }, 100);
}

function inputRandomBombs(location) {
  for (var i = 0; i < gLevel.MINES; i++) {
    var randLocation = drawNum(location)
    gBoard[randLocation.i][randLocation.j].isMine = true
  }
}



function restartGame() {
  const gameOver = document.querySelector('.game-over')

  resetTimer()
  gGame.isOn = false
  gameOver.classList.add('unseen')
  gBoard = buildBoard(gLevel.SIZE)
  renderBoard()
}

function expandBoard(size, mines) {
  gLevel.SIZE = size
  gLevel.MINES = mines
  restartGame()
}
