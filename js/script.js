const game = new Tetris()
const tetrisCanvas = new Canvas()
const startBtn = document.getElementById("start-btn")
const pauseBtn = document.getElementById("pause-btn")
pauseBtn.style.display = "none"
const continueBtn = document.getElementById("continue-btn")
continueBtn.style.display = "none"
let painterInterval = null
let moveDownInterval = null

/* 
  EVENTS
*/

document.addEventListener("keydown", (e) => {
  e.preventDefault()

  switch (e.keyCode) {
    case 32:
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

startBtn.addEventListener("click", () => {
  if (painterInterval) clearInterval(painterInterval)
  if (moveDownInterval) clearInterval(moveDownInterval)

  game.start()

  painterInterval = setInterval(() => {
    tetrisCanvas.paint(game.getMatrix())
    console.log("Painting")
  }, 100)

  moveDownInterval = setInterval(() => {
    game.moveCurrentPieceDown()
  }, 500)

  continueBtn.style.display = "none"
  pauseBtn.style.display = ""
})

pauseBtn.addEventListener("click", () => {
  game.pause()
  clearInterval(painterInterval)
  clearInterval(moveDownInterval)

  pauseBtn.style.display = "none"
  continueBtn.style.display = ""
})

continueBtn.addEventListener("click", () => {
  game.continue()
  painterInterval = setInterval(() => {
    tetrisCanvas.paint(game.getMatrix())
    console.log("Painting")
  }, 100)

  moveDownInterval = setInterval(() => {
    game.moveCurrentPieceDown()
  }, 500)

  pauseBtn.style.display = ""
  continueBtn.style.display = "none"
})
