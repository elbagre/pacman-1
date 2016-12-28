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
  game.startGame();

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
    event.preventDefault();
    if (keys[event.keyCode]) {
      game.pacman.nextDirection = keys[event.keyCode];
    }
  });

  canvasEl.addEventListener("keydown", function(event) {
    if (event.keyCode === 78) {
    }
  });

  function render() {
    game.maze.render();
    game.drawPellets();
    game.pacman.draw();
    game.ghosts.forEach((ghost) => {
      ghost.draw();
    });
  }

  canvasEl.addEventListener("click", function() {
    if (!started) {
      started = true;
      const gameNotWon = setInterval(function() {
        if (game.gameOver()) {
          clearInterval(gameNotWon);
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        } else if (game.pellets.length === 0) {
          ctx.fillStyle = "#FFFF00";
          ctx.font = "36px Courier New";
          ctx.fillText("WOAH DUDE!", 120, 150);
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
