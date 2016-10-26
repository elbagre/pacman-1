class Pacman {
  constructor(ctx) {
    this.ctx = ctx;
    this.x = 225;
    this.y = 312.5;
    this.direction = "none";
    this.nextDirection = "none";
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
    this.ctx.arc(this.x, this.y, 12.5,
      (Math.PI/180) * this.mouthValue,
      (Math.PI/180) * (360 - this.mouthValue));
  }

  draw() {
    this.changeSides();
    this.turn();
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

  checkCollision(direction) {
    let mapX = Math.floor(this.x/25);
    let mapY = Math.floor(this.y/25);
    let newX = this.x, newY = this.y;

    if (direction === "up") {
      newY -= 13;
      const top = this.collision(mapX, mapY - 1, newX, newY);
      const left =  this.collision(mapX - 1, mapY - 1, newX - 11.5, newY);
      const right = this.collision(mapX + 1, mapY - 1, newX + 11.5, newY);
      return top || left || right;
    } else if (direction === "down") {
      newY += 13;
      const down = this.collision(mapX, mapY + 1, newX, newY);
      const left =  this.collision(mapX - 1, mapY + 1, newX - 11.5, newY);
      const right = this.collision(mapX + 1, mapY + 1, newX + 11.5, newY);
      return down || left || right;
    } else if (direction === "left") {
      newX -= 13;
      const left =  this.collision(mapX - 1, mapY, newX, newY);
      const top = this.collision(mapX - 1, mapY - 1, newX, newY - 11.5);
      const down = this.collision(mapX - 1, mapY + 1, newX, newY + 11.5);
      return left || top || down;
    } else if (direction === "right") {
      newX += 13;
      const right =  this.collision(mapX + 1, mapY, newX, newY);
      const top = this.collision(mapX + 1, mapY - 1, newX, newY - 11.5);
      const down = this.collision(mapX + 1, mapY + 1, newX, newY + 11.5);
      return right || top || down;
    }
  }


  inBlock(dx, dy, x, y) {
    if(x >= dx && x <= dx + 25 && y >= dy && y <= dy + 25) {
      return true;
    } else {
      return false;
    }
  }

  collision(mapX, mapY, newX, newY) {
    if (this.map[mapY][mapX] === 0 && this.inBlock(mapX * 25, mapY * 25, newX, newY)) {
        return true;
    } else {
        return false;
    }
  }

  turn() {
    if (this.nextDirection !== "none" && !this.checkCollision(this.nextDirection)) {
      this.direction = this.nextDirection;
      this.nextDirection = "none";
    }
  }

  move() {
    if (this.checkCollision(this.direction)) {
      return;
    } else if (this.direction === "up") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 12.5,
          (Math.PI/180) * (this.mouthValue + 270),
          (Math.PI/180) * (260 - this.mouthValue));
        };
      this.y -= 0.5;
    } else if (this.direction === "down") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 12.5,
          (Math.PI/180) * (this.mouthValue + 90),
          (Math.PI/180) * (80 - this.mouthValue));
        };
      this.y += 0.5;
    } else if (this.direction === "right") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 12.5,
          (Math.PI/180) * this.mouthValue,
          (Math.PI/180) * (360 - this.mouthValue));
        };
      this.x += 0.5;
    } else if (this.direction === "left") {
      this.animateMouth();
      this.arc = function() {
        this.ctx.arc(this.x, this.y, 12.5,
          (Math.PI/180) * (this.mouthValue + 180),
          (Math.PI/180) * (170 - this.mouthValue));
        };
      this.x -= 0.5;
    }
  }
}

module.exports = Pacman;
