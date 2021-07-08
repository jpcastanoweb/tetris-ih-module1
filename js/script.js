const game = new Tetris()
const tetrisCanvas = new Canvas()
const startBtn = document.getElementById("start-btn")
const pauseBtn = document.getElementById("pause-btn")
pauseBtn.style.display = "none"
const continueBtn = document.getElementById("continue-btn")
continueBtn.style.display = "none"
let painterInterval = null

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

  game.start()

  painterInterval = setInterval(() => {
    if (game.hasWonOrLost) clearInterval(painterInterval)
    tetrisCanvas.paint(game.getMatrix())
  }, 100)

  continueBtn.style.display = "none"
  pauseBtn.style.display = ""
})

pauseBtn.addEventListener("click", () => {
  game.stop()
  clearInterval(painterInterval)

  pauseBtn.style.display = "none"
  continueBtn.style.display = ""
})

continueBtn.addEventListener("click", () => {
  game.continue()
  painterInterval = setInterval(() => {
    if (game.hasWonOrLost) clearInterval(painterInterval)
    tetrisCanvas.paint(game.getMatrix())
  }, 100)

  pauseBtn.style.display = ""
  continueBtn.style.display = "none"
})
