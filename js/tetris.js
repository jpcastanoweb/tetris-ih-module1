class Tetris {
  constructor() {
    this.timer = 0
    this.lines = 0
    this.score = 0
    this.currentPiece = null
    this.m = this.buildEmptyArray()
  }

  updatePiece() {
    if (this.currentPiece.previousIndexes) this.cleanPreviousLoc()
    let newOrientation = this.currentPiece.getOrientation()
    let centerX = this.currentPiece.centerPieceIndexes.x
    let centerY = this.currentPiece.centerPieceIndexes.y
    this.m[centerX][centerY] = true

    for (const sq of newOrientation) {
      this.m[centerX + sq.x][centerY + sq.y] = true
    }
  }

  setCurrentPiece(piece) {
    this.currentPiece = piece
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

  moveCurrentPieceDown() {
    this.currentPiece.moveDown()
    this.updatePiece()
  }

  moveCurrentPieceRight() {
    this.currentPiece.moveRight()
    this.updatePiece()
  }

  moveCurrentPieceLeft() {
    this.currentPiece.moveLeft()
    this.updatePiece()
  }

  rotateCurrentPiece() {
    this.currentPiece.rotate()
    this.updatePiece()
  }

  cleanPreviousLoc() {
    let orientation = this.currentPiece.getPreviousOrientation()
    let indexes = this.currentPiece.getPreviousIndexes()

    this.m[indexes.x][indexes.y] = false
    for (const sq of orientation) {
      this.m[indexes.x + sq.x][indexes.y + sq.y] = false
    }
  }
}
