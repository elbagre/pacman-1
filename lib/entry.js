const Maze = require('./components/maze.js');
const Pacman = require('./components/mover.js');
const Game = require ('./components/game.js');

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 475;
  canvasEl.height = 550;

  const ctx = canvasEl.getContext("2d");
  const game = new Game(ctx);
  let started = false;
  game.maze.render();
  game.spawnPellets();
  game.drawPellets();
  game.pacman.draw();
  game.ghosts.forEach((ghost) => {
    ghost.draw();
  });

  const keys = {
    87: "up",
    65: "left",
    68: "right",
    83: "down",
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  canvasEl.addEventListener("keydown", function(event) {
    if (keys[event.keyCode]) {
      game.pacman.nextDirection = keys[event.keyCode];
    }
  });

  canvasEl.addEventListener("click", function() {
    if (!started) {
      started = true;
      const gameNotWon = setInterval(function() {
        if (game.gameOver()) {
          alert("GAME OVER!");
          clearInterval(gameNotWon);
        } else if (game.pellets.length === 0) {
          alert("YOU WIN!");
          clearInterval(gameNotWon);
        } else {
          game.maze.render();
          game.drawPellets();
          game.pacman.draw();
          game.ghosts.forEach((ghost) => {
            ghost.chasePacman(game.pacman.x, game.pacman.y);
            ghost.draw();
          });
          game.removeCollisions();
        }
      });
    }
  }, 120);
});
