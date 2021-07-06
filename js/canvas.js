class Canvas {
  constructor() {
    this.canvas = document.getElementById("game-canvas")
    this.ctx = this.canvas.getContext("2d")
  }

  paint(matrix) {
    this.ctx.clearRect(0, 0, 350, 630)

    console.log(matrix)

    let x = 0
    let y = 0

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[i][j].value) {
          x = j * 35
          y = i * 35

          this.ctx.fillStyle = matrix[i][j].color
          this.ctx.fillRect(x, y, 35, 35)
        }
      }
    }
  }
}
