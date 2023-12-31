'use strict'

var gPrevLoc

function updateNegCount() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      if (!gBoard[i][j].isMine) {
        var cell = setMinesNegCount({ i, j })
        gBoard[i][j].minesAroundCount = cell
      }
    }
  }
}

function expandShown(location) {

  const currLocation = gBoard[location.i][location.j]
  if (
    gBoard[location.i][location.j].isShown ||
    gBoard[location.i][location.j].isMine
  ) {
    return
  }

  gBoard[location.i][location.j].isShown = true
  renderCell(location, cellValue(location))


  if (currLocation.minesAroundCount === '') {
    for (var i = location.i - 1; i <= location.i + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue
      for (var j = location.j - 1; j <= location.j + 1; j++) {
        if (j < 0 || j >= gBoard[i].length) continue
        // if (i === location.i && j === location.j) continue
        gPrevLoc = { i: location.i, j: location.j };
        expandShown({ i, j });
      }
    }
  }
}

function setMinesNegCount(location) {
  var neighbors = 0
  for (var i = location.i - 1; i <= location.i + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = location.j - 1; j <= location.j + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue
      if (i === location.i && j === location.j) continue

      if (gBoard[i][j].isMine) {
        neighbors++
      }
    }
  }
  if (neighbors === 0) {
    return ''
  }
  return neighbors
}
