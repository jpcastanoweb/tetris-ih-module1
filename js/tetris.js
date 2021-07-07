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
    let centerX = this.currentPiece.getCenterPieceLoc().x
    let centerY = this.currentPiece.getCenterPieceLoc().y
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

    //There are 18 rows, but we add two extra one on top to avoid crashes
    for (let i = 0; i < 20; i++) {
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
    const vals = []

    for (let i = 2; i < 20; i++) {
      let newArr = []
      for (let j = 0; j < 10; j++) {
        newArr.push(this.matrix[i][j].value)
      }
      vals.push(newArr)
    }

    console.table(vals)
  }

  moveCurrentPieceDown() {
    const centerX = this.currentPiece.getCenterPieceLoc().x
    const centerY = this.currentPiece.getCenterPieceLoc().y

    const bottomPieces = this.currentPiece.getBottomPieces()

    //copying object
    const piecesWithIndexes = []
    console.log("Bottom pieces: ", bottomPieces)
    for (let piece of bottomPieces) {
      piecesWithIndexes.push(Object.assign({}, piece))
    }

    //changing relative indexes to actual indexes
    for (let piece of piecesWithIndexes) {
      piece.x += centerX
      piece.y += centerY
    }
    console.log("piecesWithIndexes", piecesWithIndexes)

    for (const piece of piecesWithIndexes) {
      // checking if there's a floor under
      if (piece.x == this.matrix.length - 1) {
        console.log("Triggered here")
        this.triggerCollisionBelow()
        return
      }

      if (this.matrix[piece.x + 1][piece.y].value) {
        console.log("Triggered here")
        this.triggerCollisionBelow()
        return
      }
    }

    this.currentPiece.moveDown()
    this.updatePiece()

    this.printMatrix()
  }

  moveCurrentPieceRight() {
    const rightMostPieceI = this.currentPiece.getRightMost()
    // Checking if we can move right
    if (rightMostPieceI < 9) {
      this.currentPiece.moveRight()
      this.updatePiece()
    }
  }

  moveCurrentPieceLeft() {
    const leftMostPieceI = this.currentPiece.getLeftMost()
    // Checking if we can move left
    if (leftMostPieceI > 0) {
      this.currentPiece.moveLeft()
      this.updatePiece()
    }
  }

  rotateCurrentPiece() {
    this.currentPiece.rotate()
    this.updatePiece()

    let collisions = "checking"

    while (collisions !== "none") {
      collisions = this._helperCheckAnyCollision()
      switch (collisions) {
        case "left":
          this.moveCurrentPieceRight()
          break
        case "right":
          this.moveCurrentPieceLeft()
          break
        case "top":
          this.moveCurrentPieceDown()
          break
      }
    }
  }

  _helperCheckAnyCollision() {
    const leftMostPieceI = this.currentPiece.getLeftMost()
    const rightMostPieceI = this.currentPiece.getRightMost()
    const topMostPieceI = this.currentPiece.getTopMost()

    if (leftMostPieceI < 0) return "left"
    else if (rightMostPieceI > 9) return "right"
    else if (topMostPieceI < 2) return "top"

    return "none"
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

  triggerCollisionBelow() {
    console.log("collision")
    const newPiece = this.generateNewPiece()
    this.currentPiece = newPiece
    this.updatePiece()
  }

  generateNewPiece() {
    console.log(this.matrix)
    let random = Math.floor(Math.random() * 7)
    let newP = null
    switch (random) {
      case 0:
        newP = new ForwardL()
        break
      case 1:
        newP = new BackwardL()
        break
      case 2:
        newP = new Cube()
        break
      case 3:
        newP = new Cross()
        break
      case 4:
        newP = new ForwardS()
        break
      case 5:
        newP = new BackwardS()
        break
      case 6:
        newP = new Line()
        break
    }
    return newP
  }

  wonGame() {}

  lostGame() {}
}
