const Ghost = require('./ghosts.js');

class SuperGhost extends Ghost {
  constructor(ctx, map, x, y, color) {
    super(ctx, map, x, y);
    this.color = color;
    this.tile = this.currentTile();
    this.prevTile = "none";
    this.direction = "up";
    this.nextDirection = "none";
    this.directions = {
      2: ["left", "right"],
      4: ["up", "right"],
      5: ["up", "left"],
      6: ["down", "right"],
      7: ["down", "left"],
      8: ["up", "right", "left"],
      9: ["up", "down", "right"],
      10: ["up", "down", "left"],
      11: ["down", "right", "left"],
      12: ["up", "down", "right", "left"]
    };

    this.chooseNextDirection = this.chooseNextDirection.bind(this);
  }

  currentTile() {
    const mapX = Math.floor(this.x/25);
    const mapY = Math.floor(this.y/25);
    return this.map[mapX][mapY];
  }

  turn() {
    this.direction = this.nextDirection;
    this.nextDirection = "none";
  }

  draw() {
    this.changeSides();
    this.tile = this.currentTile();
    this.chooseNextDirection();
    this.move();

    const ghostImg = new Image();
    if (this.direction === "up") {
      ghostImg.src = `./images/blue-up.png`;
    } else if (this.direction === "down") {
      ghostImg.src = `./images/blue-down.png`;
    } else if (this.direction === "left") {
      ghostImg.src = `./images/blue-left.png`;
    } else if (this.direction === "right") {
      ghostImg.src = `./images/blue-right.png`;
    }
    this.ctx.drawImage(ghostImg, 0, 0, 300, 300, this.x - 12.5, this.y - 12.5, 25, 25);
  }

  chooseNextDirection() {
    const tile = this.currentTile();

    const dirs = this.directions[tile];

    if (dirs) {
      let newDirs = dirs.filter( (direction) => {
        if (direction !== this.prevDirection) {
          return direction;
        }
      });
      this.nextDirection =  newDirs[Math.floor(Math.random() * newDirs.length)];
    }

    this.turn();
  }

  move() {
    if (this.direction === "none" || this.checkCollision(this.direction)) {
      this.chooseNextDirection();
    } else if (this.direction === "up") {
      this.prevDirection = "down";
      this.y -= 0.35;
    } else if (this.direction === "down") {
      this.prevDirection = "up";
      this.y += 0.35;
    } else if (this.direction === "right") {
      this.prevDirection = "left";
      this.x += 0.35;
    } else if (this.direction === "left") {
      this.prevDirection = "right";
      this.x -= 0.35;
    }
  }
}

module.exports = SuperGhost;
