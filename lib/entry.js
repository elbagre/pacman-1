const Maze = require('./components/maze.js');
const Pacman = require('./components/mover.js');
const Game = require ('./components/game.js');

document.addEventListener("DOMContentLoaded", function() {
  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 475;
  canvasEl.height = 600;

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
      game.pacman.direction = keys[event.keyCode];
    }
  });

  canvasEl.addEventListener("click", function() {
    if (!started) {
      started = true;
      const gameNotWon = setInterval(function() {
        game.maze.render();
        game.drawPellets();
        game.pacman.draw();
        game.ghosts.forEach((ghost) => {
          ghost.chasePacman(game.pacman.x, game.pacman.y);
          ghost.draw();
        });
        game.removeCollisions();

        if (game.gameOver()) {
          alert("GAME OVER!");
          clearInterval(gameNotWon);
        }
      });
    }
  }, 60);


  // const pacman = {
  //   mouth: 1,
  //   mouthValue: 40,
  //   x: 300,
  //   y: 300,
  //   direction: "none",
  //   arc: function () {
  //     ctx.arc(this.x, this.y, 10,
  //       (Math.PI/180) * 40,
  //       (Math.PI/180) * 320);
  //   },
  //   draw: function() {
  //     ctx.beginPath();
  //     ctx.lineWidth = 0;
  //     ctx.strokeStyle = "#FF0";
  //     this.arc();
  //     ctx.lineTo(this.x, this.y);
  //     ctx.fillStyle = '#FF0';
  //     ctx.fill();
  //     ctx.stroke();
  //     ctx.beginPath();
  //     ctx.rect(this.x - 10, this.y - 10, 20, 20);
  //     ctx.stroke();
  //   },
  //   animateMouth: function () {
  //     if (this.mouthValue <= 0) this.mouth = 1;
  //     else if (this.mouthValue >= 40) this.mouth = -1;
  //     this.mouthValue += (5 * this.mouth);
  //   }
  // };
  //
  // let pellets = [];
  // createPellets();
  //
  // function renderCanvas () {
  //   ctx.beginPath();
  //   ctx.clearRect(0, 0, 600, 600);
  //   ctx.rect(0, 0, 600, 600);
  //   ctx.fillStyle = "#000";
  //   ctx.fill();
  //   ctx.stroke();
  //   drawInnerBorder();
  //   drawMaze();
  //   renderPellets();
  //   pacman.draw();
  // }
  //
  // renderCanvas();
  //
  // function checkCollision(x, y) {
  //   const imgData = ctx.getImageData(x, y, 20, 20);
  //   const pixels = imgData.data;
  //   for (var i = 2; i < pixels.length; i += 3) {
  //     if (pixels[i] === 128) return true;
  //     else return false;
  //   }
  // }
  //
  // function renderPellets() {
  //   pellets.forEach( (coord) => {
  //     ctx.lineWidth = 1;
  //     ctx.strokeStyle = "#fff";
  //     ctx.beginPath();
  //     ctx.arc(coord[0], coord[1], 10, 0, 2 * Math.PI);
  //     ctx.fillStyle = "#fff";
  //     ctx.fill();
  //     ctx.stroke();
  //   });
  // }
  //
  // function createPellets() {
  //   for (let x = 50; x <= 550; x += 50) {
  //     for (let y = 50; y <= 550; y += 50) {
  //       pellets.push([x, y]);
  //     }
  //   }
  // }
  //
  // function drawInnerBorder() {
  //   ctx.beginPath();
  //   ctx.moveTo(20, 20);
  //   ctx.lineTo(20, 580);
  //   ctx.lineTo(580, 580);
  //   ctx.lineTo(580, 20);
  //   ctx.lineWidth = 10;
  //   ctx.closePath();
  //   ctx.strokeStyle = "#000080";
  //   ctx.stroke();
  // }
  //
  // function drawMaze() {
  //   ctx.lineWidth = 20;
  //   ctx.strokeStyle = "#000080";
  //   ctx.beginPath();
  //   ctx.moveTo(260, 135);
  //   ctx.lineTo(135, 135);
  //   ctx.lineTo(135, 260);
  //   ctx.stroke();
  //   ctx.moveTo(260, 465);
  //   ctx.lineTo(135, 465);
  //   ctx.lineTo(135, 360);
  //   ctx.stroke();
  // }
  //
  // function removeCollisions() {
  //   pellets = pellets.filter ((pellet) => {
  //     if (pellet[0] <= (pacman.x + 20) && pellet[0] >= (pacman.x - 20) &&
  //       pellet[1] <= (pacman.y + 20) && pellet[1] >= (pacman.y - 20) ) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   });
  // }
  //
  // canvasEl.addEventListener("keydown", function(event) {
  //   const key = keys[event.keyCode];
  //   if (key === "up" && pacman.y > 50) {
  //     if (!checkCollision(pacman.x - 10, pacman.y - 12)) {
  //       pacman.animateMouth();
  //       pacman.arc = function() {
  //         ctx.arc(pacman.x, pacman.y, 10,
  //           (Math.PI/180) * (pacman.mouthValue + 270),
  //           (Math.PI/180) * (260 - pacman.mouthValue));
  //         };
  //       pacman.direction = key;
  //     }
  //   } else if (key === "down" && pacman.y < 550) {
  //     if (!checkCollision(pacman.x + 10, pacman.y + 12)) {
  //       pacman.animateMouth();
  //       pacman.arc = function() {
  //         ctx.arc(pacman.x, pacman.y, 10,
  //           (Math.PI/180) * (pacman.mouthValue + 90),
  //           (Math.PI/180) * (80 - pacman.mouthValue));
  //         };
  //       pacman.direction = key;
  //     }
  //   } else if (key === "right" && pacman.x < 550) {
  //     if (!checkCollision(pacman.x + 12, pacman.y - 10)) {
  //       pacman.animateMouth();
  //       pacman.arc = function() {
  //         ctx.arc(pacman.x, pacman.y, 10,
  //           (Math.PI/180) * pacman.mouthValue,
  //           (Math.PI/180) * (360 - pacman.mouthValue));
  //         };
  //       pacman.direction = key;
  //     }
  //   } else if (key === "left" && pacman.x > 50) {
  //     if (!checkCollision(pacman.x - 12, pacman.y - 10)) {
  //       pacman.animateMouth();
  //       pacman.arc = function() {
  //         ctx.arc(pacman.x, pacman.y, 10,
  //           (Math.PI/180) * (pacman.mouthValue + 180),
  //           (Math.PI/180) * (170 - pacman.mouthValue));
  //         };
  //       pacman.direction = key;
  //     }
  //   }
  // });
  //
  // canvasEl.addEventListener("click", function() {
  //   setInterval(function() {
  //     if (pacman.direction === "up") {
  //         pacman.y -= 2;
  //     } else if (pacman.direction === "left") {
  //           pacman.x -= 2;
  //     } else if (pacman.direction === "right") {
  //           pacman.x += 2;
  //     } else if (pacman.direction === "down") {
  //           pacman.y += 2;
  //     }
  //     removeCollisions();
  //     renderCanvas();
  //   }, 16);
  // });
});
