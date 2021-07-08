const game = new Tetris()
const tetrisCanvas = new Canvas()
const startBtn = document.getElementById("start-btn")
const pauseBtn = document.getElementById("pause-btn")
const continueBtn = document.getElementById("continue-btn")
const nextPieceImg = document.getElementById("next-piece-img")
const time = document.getElementById("time")
const lines = document.getElementById("lines")
const score = document.getElementById("score")
const goalHTML = document.getElementById("goal")

pauseBtn.style.display = "none"
continueBtn.style.display = "none"
goalHTML.innerHTML = game.lineGoal
let painterInterval = null
let timerInterval = null

/* 
  FUNCTIONS
*/

function updateNextPieceLink() {
  nextPieceImg.setAttribute("src", "./images/pieces/" + game.nextPiece + ".png")
}

function updateLines() {
  lines.innerHTML = game.getLines()
}

function updateScore() {
  score.innerHTML = game.getScore()
}

function won() {
  modal.style.display = "block"
}

/* 
  EVENTS
*/

document.addEventListener("keydown", (e) => {
  e.preventDefault()

  switch (e.keyCode) {
    case 32:
      // game.speedUp()
      break
    case 37:
      game.moveCurrentPieceLeft()
      break
    case 38:
      game.rotateCurrentPiece()
      break
    case 39:
      game.moveCurrentPieceRight()
      break
    case 40:
      game.moveCurrentPieceDown()
      break
    default:
      break
  }
})

// document.addEventListener("keyup", (e) => {
//   e.preventDefault()

//   switch (e.keyCode) {
//     case 32:
//       game.slowDown()
//       break
//   }
// })

startBtn.addEventListener("click", () => {
  if (painterInterval) clearInterval(painterInterval)
  if (timerInterval) clearInterval(timerInterval)

  game.start()

  timerInterval = setInterval(() => {
    time.innerHTML = game.getTimeString()
  }, 1000)

  painterInterval = setInterval(() => {
    this.updateLines()
    this.updateScore()
    this.updateNextPieceLink()
    tetrisCanvas.paint(game.getMatrix())

    if (game.hasWonOrLost) {
      clearInterval(painterInterval)
      clearInterval(timerInterval)
      if (game.hasWonOrLost == "won") tetrisCanvas.paintWon()
      if (game.hasWonOrLost == "lost") tetrisCanvas.paintLost()
      pauseBtn.style.display = "none"
    }
  }, 100)

  timerInterval = setInterval(
    () => (time.innerHTML = game.getTimeString()),
    1000
  )

  continueBtn.style.display = "none"
  pauseBtn.style.display = ""
  startBtn.innerHTML = "<h2>RESTART</h2>"
})

pauseBtn.addEventListener("click", () => {
  game.stop()
  clearInterval(painterInterval)
  clearInterval(timerInterval)

  pauseBtn.style.display = "none"
  continueBtn.style.display = ""
})

continueBtn.addEventListener("click", () => {
  game.continue()

  timerInterval = setInterval(() => {
    time.innerHTML = game.getTimeString()
  }, 1000)

  painterInterval = setInterval(() => {
    this.updateLines()
    this.updateScore()
    this.updateNextPieceLink()
    tetrisCanvas.paint(game.getMatrix())

    if (game.hasWonOrLost) {
      clearInterval(painterInterval)
      clearInterval(timerInterval)
      if (game.hasWonOrLost == "won") {
        tetrisCanvas.paintWon()
      }
      if (game.hasWonOrLost == "lost") {
        tetrisCanvas.paintLost()
      }

      pauseBtn.style.display = "none"
    }
  }, 100)

  pauseBtn.style.display = ""
  continueBtn.style.display = "none"
})
