class Tetris {
  constructor() {
    this.timer = 0
    this.lines = 0
    this.score = 0
    this.m = [[]]
  }
}

class Piece {
  constructor(type) {
    this.centerPiece = {
      x: 0,
      y: 3,
    }

    /* 
        a: Forward L
        b: Backward L
        c: T
        d: Forward S
        e: Backward S
        f: Cube
        g: Long L
    */

    switch (type) {
      case "a":
        this.second = {
          x: 0,
          y: 2,
        }
        this.third = {
          x: 1,
          y: 2,
        }
        this.fourth = {
          x: 0,
          y: 4,
        }
      case "b":
        this.second = {
          x: 0,
          y: 1,
        }
        this.third = {
          x: 0,
          y: 4,
        }
        this.fourth = {
          x: 1,
          y: 4,
        }
      case "c":
        this.second = {
          x: 0,
          y: 2,
        }
        this.third = {
          x: 0,
          y: 4,
        }
        this.fourth = {
          x: 1,
          y: 3,
        }

      case "d":
      case "e":
      case "f":
      case "g":
    }
  }
}
