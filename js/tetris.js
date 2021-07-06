class Tetris {
  constructor() {
    this.timer = 0
    this.lines = 0
    this.score = 0
    this.currentPiece = null
    this.matrix = this.buildEmptyArray()
  }

  getMatrix() {
    return this.matrix
  }

  updatePiece(callback) {
    if (this.currentPiece.previousIndexes) {
      this.cleanPreviousLoc()
    }
    let newOrientation = this.currentPiece.getOrientation()
    let centerX = this.currentPiece.centerPieceIndexes.x
    let centerY = this.currentPiece.centerPieceIndexes.y
    this.matrix[centerX][centerY] = {
      value: true,
      color: this.currentPiece.color,
    }

    for (const sq of newOrientation) {
      this.matrix[centerX + sq.x][centerY + sq.y] = {
        value: true,
        color: this.currentPiece.color,
      }
    }

    if (callback) callback()
  }

  setCurrentPiece(piece) {
    this.currentPiece = piece
  }

  buildEmptyArray() {
    let newMatrix = []

    for (let i = 0; i < 18; i++) {
      let newArr = []
      for (let j = 0; j < 10; j++) {
        newArr.push({
          value: false,
          color: null,
        })
      }
      newMatrix.push(newArr)
    }

    return newMatrix
  }

  printMatrix() {
    console.table(this.matrix)
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

    this.matrix[indexes.x][indexes.y] = {
      value: false,
      color: null,
    }
    for (const sq of orientation) {
      this.matrix[indexes.x + sq.x][indexes.y + sq.y] = {
        value: false,
        color: null,
      }
    }
  }
}
