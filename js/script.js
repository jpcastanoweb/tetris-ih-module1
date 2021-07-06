const game = new Tetris()
const piece1 = new ForwardL()
const piece2 = new BackwardL()
const p3 = new Cube()
const p4 = new ForwardS()
const p5 = new BackwardS()
const p6 = new Cross()
const p7 = new Line()

game.setCurrentPiece(piece1)
game.updatePiece()
game.printMatrix()

/* 
  EVENTS
*/

document.addEventListener("keydown", (e) => {
  switch (e.keyCode) {
    case 37:
      game.moveCurrentPieceLeft()
      break
    case 38:
      game.rotateCurrentPiece()
      break
    case 39:
      game.moveCurrentPieceRight()
    case 40:
      game.moveCurrentPieceDown()
      break
  }
})
