console.log("Loading Piece")
class Piece {
  // currentOrientation: index of current orientation object
  // centerPiece: indexes of centerPiece in Tetris Matrix
  // orientations: objects with indexes of the other squares relative to center piece

  constructor() {
    this.currentOrientation = 0
    this.centerPieceIndexes = {
      x: 0,
      y: 5,
    }
    this.orientations = [[]] // to be built in extended classes
  }

  // returns current orientation of piece
  getOrientation() {
    return this.orientations[this.currentOrientation]
  }
  // returns indexes of centerpiece
  getCenterPieceLoc() {
    return this.centerPieceIndexes
  }
  // turn right by adding one to the orientation index,
  // moding by the amount of orientations available to avoid out of bounds errors in orientations array
  turn() {
    return this.currentOrientation++ % this.orientations.length
  }

  moveDown() {
    this.centerPieceIndexes.x++
    return this.centerPieceIndexes
  }

  moveRight() {
    this.centerPieceIndexes.y++
    return this.centerPieceIndexes
  }

  moveLeft() {
    this.centerPieceIndexes.y--
    return this.centerPieceIndexes
  }
}

class ForwardL extends Piece {
  constructor() {
    super()
    this.currentOrientation = 1
    this.orientations = [
      [
        { y: 0, x: -1 },
        { y: 0, x: 1 },
        { y: 1, x: 1 },
      ],
      [
        { y: 1, x: 0 },
        { y: -1, x: 0 },
        { y: -1, x: 1 },
      ],
      [
        { y: 0, x: 1 },
        { y: 0, x: -1 },
        { y: -1, x: -1 },
      ],
      [
        { y: -1, x: 0 },
        { y: 1, x: 0 },
        { y: 1, x: -1 },
      ],
    ]
  }
}

class BackwardL extends Piece {
  constructor() {
    super()
    this.currentOrientation = 3
    this.orientations = [
      [
        { y: 0, x: -1 },
        { y: 0, x: 1 },
        { y: -1, x: 1 },
      ],
      [
        { y: 1, x: 0 },
        { y: -1, x: 0 },
        { y: -1, x: -1 },
      ],
      [
        { y: 0, x: 1 },
        { y: 0, x: -1 },
        { y: 1, x: -1 },
      ],
      [
        { y: -1, x: 0 },
        { y: 1, x: 0 },
        { y: 1, x: 1 },
      ],
    ]
  }
}

class Cube extends Piece {
  constructor() {
    super()
    this.orientations = [
      [
        { y: 1, x: 0 },
        { y: 0, x: 1 },
        { y: 1, x: 1 },
      ],
    ]
  }
}

class ForwardS extends Piece {
  constructor() {
    super()
    this.orientations = [
      [
        { y: 1, x: 0 },
        { y: -1, x: 1 },
        { y: 0, x: 1 },
      ],
      [
        { y: 0, x: 1 },
        { y: -1, x: -1 },
        { y: -1, x: 0 },
      ],
    ]
  }
}

class BackwardS extends Piece {
  constructor() {
    super()
    this.orientations = [
      [
        { y: -1, x: 0 },
        { y: 1, x: 1 },
        { y: 0, x: 1 },
      ],
      [
        { y: 0, x: -1 },
        { y: -1, x: 1 },
        { y: -1, x: 0 },
      ],
    ]
  }
}

class Cross extends Piece {
  constructor() {
    super()
    this.currentOrientation = 2
    this.orientations = [
      [
        { y: 0, x: -1 },
        { y: 1, x: 0 },
        { y: -1, x: 0 },
      ],
      [
        { y: 1, x: 0 },
        { y: 0, x: 1 },
        { y: 0, x: -1 },
      ],
      [
        { y: 0, x: 1 },
        { y: -1, x: 0 },
        { y: 1, x: 0 },
      ],
      [
        { y: -1, x: 0 },
        { y: 0, x: -1 },
        { y: 0, x: 1 },
      ],
    ]
  }
}

class Line extends Piece {
  constructor() {
    super()
    this.currentOrientation = 2
    this.orientations = [
      [
        { y: -1, x: 0 },
        { y: 1, x: 0 },
        { y: 2, x: 0 },
      ],
      [
        { y: 0, x: -1 },
        { y: 0, x: 1 },
        { y: 0, x: 2 },
      ],
      [
        { y: 1, x: 0 },
        { y: -1, x: 0 },
        { y: -2, x: 0 },
      ],
      [
        { y: 0, x: 1 },
        { y: 0, x: -1 },
        { y: 0, x: -2 },
      ],
    ]
  }
}
