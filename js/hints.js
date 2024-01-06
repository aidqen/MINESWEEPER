'use strict'

var gHints = 3
var gHintActive = false
var gMegaHintActive = false
var gMegaHintClicks = 2

function onSafeClick() {
  const elAvail = document.querySelector('.hint-available')
  if (!gGame.isOn) {
    return
  }
  if (gHints <= 0) {
    return
  }
  var safeSpaces = drawSafeSpace()

  const randNum = getRandomInt(0, safeSpaces.length - 1)
  const safeCell = safeSpaces[randNum]

  renderClass(safeCell, 'add', 'temp')
  gHints--
  elAvail.innerText = `${gHints} clicks available`

  setTimeout(() => {
    renderClass(safeCell, 'remove', 'temp')
  }, 2000)
}

function onClickHint(elHint) {
  if (!gGame.isOn) {
    return
  }
  if (!gHintActive) {
    renderEveryCell('add', 'temp')
    gHintActive = true
    elHint.classList.add('unseen')
  }
}

function hintActivate(elHint) {
  renderEveryCell('remove', 'temp')
  const location = currDomLocation(elHint)
  const iIdx = parseInt(location.i, 10)
  const jIdx = parseInt(location.j, 10)

  for (var i = iIdx - 1; i <= iIdx + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = jIdx - 1; j <= jIdx + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue
      renderClass({ i, j }, 'add', 'temp')
      showHint({ i, j })
      removeClassInTimeout({ i, j }, 'temp')
    }
  }
  setTimeout(() => {
    gHintActive = false
  }, 2000)
}

function removeClassInTimeout(location, elClass) {
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  setTimeout(() => {
    elCell.classList.remove(elClass)
  }, 2000)
}

function showHint(location) {
  renderCell(location, cellValue(location))

  if (gBoard[location.i][location.j].isShown) return
  else {
    setTimeout(() => {
      unrenderCell(location)
    }, 2000)
  }
}

function restartHints() {
  const hints = document.querySelector('.hint-available')
  const lightbulb = [...document.querySelectorAll('.lightbulb')]
  gHints = 3
  lightbulb.forEach(element => {
    element.classList.remove('unseen')
  });
  hints.innerText = `${gHints} clicks available`
}
