const Pacman = require('./mover.js');
const Maze = require('./maze.js');
const SuperGhost = require('./super_ghost.js');
const Ghost = require('./ghosts.js');

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.pellets = [];
    this.pacman = new Pacman(ctx);
    this.maze = new Maze(ctx);
    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 6, 1, 1, 11, 1, 1, 1, 7, 0, 6, 1, 1, 1, 11, 1, 1, 7, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 9, 1, 1, 12, 1, 11, 1, 8, 1, 8, 1, 11, 1, 12, 1, 1, 10, 0],
      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
      [0, 4, 1, 1, 10, 0, 4, 1, 7, 0, 6, 1, 5, 0, 9, 1, 1, 5, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
      [3, 3, 3, 0, 1, 0, 6, 1, 8, 2, 8, 1, 7, 0, 1, 0, 3, 3, 3],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 12, 1, 10, 0, 3, 3, 3, 0, 9, 1, 12, 1, 1, 1, 1],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [3, 3, 3, 0, 1, 0, 9, 1, 1, 1, 1, 1, 10, 0, 1, 0, 3, 3, 3],
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [0, 6, 1, 1, 12, 1, 8, 1, 7, 0, 6, 1, 8, 1, 12, 1, 1, 7, 0],
      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 4, 7, 0, 9, 1, 1, 1, 11, 1, 8, 1, 11, 1, 10, 0, 6, 5, 0],
      [0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0],
      [0, 6, 8, 1, 5, 0, 1, 1, 1, 0, 4, 1, 7, 0, 6, 1, 8, 7, 0],
      [0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0],
      [0, 6, 1, 1, 1, 1, 1, 1, 8, 1, 8, 1, 1, 1, 1, 1, 1, 7, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.ghosts = this.spawnGhosts();
    this.removeCollisions = this.removeCollisions.bind(this);
    this.gameOver = this.gameOver.bind(this);
  }

  startGame() {
    this.ctx.fillStyle = "#FFFF00";
    this.ctx.font = "bold 36px Courier New";
    this.ctx.fillText("Click to Start", 100, 150);
  }

  spawnGhosts() {
    const ghostArray = [];
    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5, "pink"));
    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5, "red"));
    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5, "blue"));
    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5, "orange"));
    return ghostArray;
  }

  gameOver() {
    let gameOver = false;
    this.ghosts.forEach((ghost) => {
      if (this.pacman.x <= ghost.x + 25 &&
        this.pacman.x >= ghost.x - 25 && this.pacman.y <= ghost.y + 25 &&
        this.pacman.y >= ghost.y - 25) {
          gameOver = true;
      }
    });
    return gameOver;
  }

  spawnPellets() {
    this.map.forEach((row, i) => {
      row.forEach((pos, j) => {
        if (pos !== 0 && pos !== 3) {
          this.pellets.push([j * 25 + 12.5, i * 25 + 12.5]);
        }
      });
    });
  }

  drawPellets() {
    this.pellets.forEach( (pellet) => {
      this.ctx.beginPath();
      this.ctx.arc(pellet[0], pellet[1], 2, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.fillStyle = "#fff";
      this.ctx.fill();
    });
  }

  removeCollisions() {
    this.pellets = this.pellets.filter ((pellet) => {
      if (pellet[0] <= (this.pacman.x + 10) && pellet[0] >= (this.pacman.x - 10) &&
        pellet[1] <= (this.pacman.y + 10) && pellet[1] >= (this.pacman.y - 10)) {
        return false;
      } else {
        return true;
      }
    });
  }
}

module.exports = Game;
