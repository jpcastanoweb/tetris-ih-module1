console.log("Loading Tetris")
class Tetris {
  constructor() {
    this.timer = 0
    this.lines = 0
    this.score = 0
    this.m = this.buildEmptyArray()
  }

  placePiece(piece) {
    let newOrientation = piece.getOrientation()
    let centerX = piece.centerPieceIndexes.x
    let centerY = piece.centerPieceIndexes.y
    this.m[centerX][centerY] = true

    for (const sq of newOrientation) {
      this.m[centerX + sq.x][centerY + sq.y] = true
    }
  }

  buildEmptyArray() {
    let newMatrix = []

    for (let i = 0; i < 18; i++) {
      let newArr = []
      for (let j = 0; j < 10; j++) {
        newArr.push(false)
      }
      newMatrix.push(newArr)
    }

    return newMatrix
  }

  printMatrix() {
    console.table(this.m)
  }
}
