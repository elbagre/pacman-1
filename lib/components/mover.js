class Pacman {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 225;
    this.y = 312.5;
    this.direction = "none";
    this.mouth = 1;
    this.mouthValue = 40;
    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  arc() {
    this.ctx.arc(this.x, this.y, 10,
      (Math.PI/180) * this.mouthValue,
      (Math.PI/180) * (360 - this.mouthValue));
  }

  draw() {
    this.changeSides();
    this.move();
    this.ctx.beginPath();
    this.ctx.lineWidth = 0;
    this.ctx.strokeStyle = "#FF0";
    this.arc();
    this.ctx.lineTo(this.x, this.y);
    this.ctx.fillStyle = '#FF0';
    this.ctx.fill();
    this.ctx.stroke();
  }

  animateMouth() {
    if (this.mouthValue <= 0) this.mouth = 1;
    else if (this.mouthValue >= 40) this.mouth = -1;
    this.mouthValue += (5 * this.mouth);
  }

  changeSides() {
    if (this.x <= 0) {
      this.x = 475 - this.x;
    } else if (this.x >= 475) {
      this.x = this.x - 475;
    }
  }

  checkCollision() {
    let mapX = Math.floor(this.x/25);
    let mapY = Math.floor(this.y/25);

    if (this.direction === "up") {
      nextY -= 16;
    } else if (this.direction === "down") {
      nextY += 11;
    } else if (this.direction === "left") {
      nextX -= 16;
    } else if (this.direction === "right") {
      nextX += 11;
    }

  if (this.map[mapY][mapX] === 0) {
      return true;
    } else {
      return false;
    }
  }

  move() {
    if (this.checkCollision()) {
      return;
    } else if (this.direction === "up") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 10,
          (Math.PI/180) * (this.mouthValue + 270),
          (Math.PI/180) * (260 - this.mouthValue));
        };
      this.y -= 0.5;
    } else if (this.direction === "down") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 10,
          (Math.PI/180) * (this.mouthValue + 90),
          (Math.PI/180) * (80 - this.mouthValue));
        };
      this.y += 0.5;
    } else if (this.direction === "right") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 10,
          (Math.PI/180) * this.mouthValue,
          (Math.PI/180) * (360 - this.mouthValue));
        };
      this.x += 0.5;
    } else if (this.direction === "left") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 10,
          (Math.PI/180) * (this.mouthValue + 180),
          (Math.PI/180) * (170 - this.mouthValue));
        };
      this.x -= 0.5;
    }
  }
}

module.exports = Pacman;









// let nextX = this.x - 20;
// let nextY = this.y - 20;
// if (this.direction === "up") {
//   nextY = this.y - 21;
// } else if (this.direction === "down") {
//   nextY = this.y + 21;
// } else if (this.direction === "left") {
//   nextX = this.x - 22;
// } else if (this.direction === "right") {
//   nextX = this.x + 21;
// }
// const imgData = this.ctx.getImageData(nextX, nextY, 40, 40);
// const pixels = imgData.data;
// for (var i = 2; i < pixels.length; i += 3) {
//   if (pixels[i] !== 0) {
//     this.direction = "none";
//     return true;
//   } else {
//     return false;
//   }
// }
