'use strict'

var gHints = 3

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

function restartHints() {
  const hints = document.querySelectorAll('.hint')
  console.log(hints)
  hints.forEach(hint => {
    hint.classList.remove('unseen')
  })
  gClickedHint = false
  gHints = 3
}

function getQuerySelector(location) {
    return document.querySelector(`.cell-${location.i}-${location.j}`)
}
