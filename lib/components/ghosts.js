class Ghost {
  constructor(ctx, map, x, y) {
    this.ctx = ctx;
    this.map = map;
    this.x = x;
    this.y = y;
    this.direction = "none";
  }

  arc() {
    this.ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
  }

  draw() {
    this.move();
    const ghostImg = new Image();
    ghostImg.src = './images/blinky.png';
    this.ctx.drawImage(ghostImg, 0, 0, 300, 300, this.x - 12.5, this.y - 12.5, 25, 25);
  }

  randomDirection() {
      const directions = ["up", "left", "right", "down"];
      this.direction = directions[Math.floor(Math.random() * 4)];
      this.move();
  }

  chasePacman(pacX, pacY) {
    if (this.inRange(pacX, pacY, "up")) {
      this.direction = "up";
    } else if (this.inRange(pacX, pacY, "down")) {
      this.direction = "down";
    } else if (this.inRange(pacX, pacY, "right")) {
      this.direction = "right";
    } else if (this.inRange(pacX, pacY, "left")) {
      this.direction = "left";
    }
  }

  inRange(pacX, pacY, direction) {
    if (direction === "up") {
      const xRange = (pacX >= this.x - 12.5 && pacX <= this.x + 12.5);
      const yRange = (pacY >= this.y - 50 && pacY <= this.y);
      return xRange && yRange && !this.checkCollision("up");
    } else if (direction === "down") {
      const xRange = (pacX >= this.x - 12.5 && pacX <= this.x + 12.5);
      const yRange = (pacY <= this.y + 50 && pacY >= this.y);
      return xRange && yRange && !this.checkCollision("down");
    } else if (direction === "right") {
      const xRange = (pacX <= this.x + 50 && pacX >= this.x);
      const yRange = (pacY >= this.y - 12.5 && pacY <= this.y + 12.5);
      return xRange && yRange && !this.checkCollision("right");
    } else if (direction === "left") {
      const xRange = (pacX >= this.x - 50 && pacX <= this.x);
      const yRange = (pacY >= this.y - 12.5 && pacY <= this.y + 12.5);
      return xRange && yRange && !this.checkCollision("left");
    }
  }

  checkCollision(direction) {
    let mapX = Math.floor(this.x/25);
    let mapY = Math.floor(this.y/25);
    let newX = this.x, newY = this.y;

    if (direction === "up") {
      newY -= 13;
      const top = this.collision(mapX, mapY - 1, newX, newY);
      const left =  this.collision(mapX - 1, mapY - 1, newX - 10, newY);
      const right = this.collision(mapX + 1, mapY - 1, newX + 10, newY);
      return top || left || right;
    } else if (direction === "down") {
      newY += 13;
      const down = this.collision(mapX, mapY + 1, newX, newY);
      const left =  this.collision(mapX - 1, mapY + 1, newX - 10, newY);
      const right = this.collision(mapX + 1, mapY + 1, newX + 10, newY);
      return down || left || right;
    } else if (direction === "left") {
      newX -= 13;
      const left =  this.collision(mapX - 1, mapY, newX, newY);
      const top = this.collision(mapX - 1, mapY - 1, newX, newY - 10);
      const down = this.collision(mapX - 1, mapY + 1, newX, newY + 10);
      return left || top || down;
    } else if (direction === "right") {
      newX += 13;
      const right =  this.collision(mapX + 1, mapY, newX, newY);
      const top = this.collision(mapX + 1, mapY - 1, newX, newY - 10);
      const down = this.collision(mapX + 1, mapY + 1, newX, newY + 10);
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
    } else if (this.map[mapY][mapX] === 3 && this.inBlock(mapX * 25, mapY * 25, newX, newY)) {
      return true;
    } else {
        return false;
    }
  }

  move() {
    if (this.direction === "none" || this.checkCollision(this.direction)) {
      this.randomDirection();
    } else if (this.direction === "up") {
      this.y -= 0.5;
    } else if (this.direction === "down") {
      this.y += 0.5;
    } else if (this.direction === "right") {
      this.x += 0.5;
    } else if (this.direction === "left") {
      this.x -= 0.5;
    }
  }
}

module.exports = Ghost;