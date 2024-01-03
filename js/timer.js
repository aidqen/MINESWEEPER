'use strict'

function resetTimer() {
    const elTimer = document.querySelector('.timer')
    clearInterval(gInterval)
    elTimer.innerText = 'Timer : 0'
  }
  
  function renderTimer() {
    const elTimer = document.querySelector('.timer')
    const startTime = Date.now()
    gInterval = 0
    gInterval = setInterval(() => {
      var currTime = (Date.now() - startTime) / 1000
      elTimer.innerText = `Timer : ${currTime.toFixed(1)}`
    }, 100)
  }