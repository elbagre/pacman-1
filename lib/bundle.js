/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Maze = __webpack_require__(1);
	const Pacman = __webpack_require__(2);
	const Game = __webpack_require__ (3);
	
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Maze {
	  constructor(ctx) {
	    this.ctx = ctx;
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
	    this.drawMaze = this.drawMaze.bind(this);
	  }
	
	  clear() {
	    this.ctx.beginPath();
	    this.ctx.clearRect(0, 0, 600, 600);
	    this.ctx.stroke();
	  }
	
	  drawBackground() {
	    this.ctx.beginPath();
	    this.ctx.rect(0, 0, 600, 600);
	    this.ctx.fillStyle = "#000";
	    this.ctx.fill();
	    this.ctx.stroke();
	  }
	
	  drawMaze() {
	    this.ctx.strokeStyle = "#000080";
	    this.ctx.fillStyle = "#000080";
	    this.map.forEach( (row, i) => {
	      row.forEach((block, j) => {
	        if (block === 0) {
	          this.ctx.beginPath();
	          this.ctx.rect(j * 25, i * 25, 25, 25);
	          this.ctx.stroke();
	          this.ctx.fill();
	        }
	      });
	    });
	  }
	
	  render() {
	    this.clear();
	    this.ctx.lineJoin = "round";
	    this.drawBackground();
	    this.drawMaze();
	  }
	}
	
	module.exports = Maze;


/***/ },
/* 2 */
/***/ function(module, exports) {

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
	
	  checkCollision(direction) {
	    let mapX = Math.floor(this.x/25);
	    let mapY = Math.floor(this.y/25);
	    let newX = this.x, newY = this.y;
	
	    if (direction === "up") {
	      newY -= 13;
	      const top = this.collision(mapX, mapY - 1, newX, newY);
	      const left =  this.collision(mapX - 1, mapY - 1, newX - 8, newY);
	      const right = this.collision(mapX + 1, mapY - 1, newX + 8, newY);
	      return top || left || right;
	    } else if (direction === "down") {
	      newY += 13;
	      const down = this.collision(mapX, mapY + 1, newX, newY);
	      const left =  this.collision(mapX - 1, mapY + 1, newX - 8, newY);
	      const right = this.collision(mapX + 1, mapY + 1, newX + 8, newY);
	      return down || left || right;
	    } else if (direction === "left") {
	      newX -= 13;
	      const left =  this.collision(mapX - 1, mapY, newX, newY);
	      const top = this.collision(mapX - 1, mapY - 1, newX, newY - 8);
	      const down = this.collision(mapX - 1, mapY + 1, newX, newY + 8);
	      return left || top || down;
	    } else if (direction === "right") {
	      newX += 13;
	      const right =  this.collision(mapX + 1, mapY, newX, newY);
	      const top = this.collision(mapX + 1, mapY - 1, newX, newY - 8);
	      const down = this.collision(mapX + 1, mapY + 1, newX, newY + 8);
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
	
	  move() {
	    if (this.checkCollision(this.direction)) {
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Pacman = __webpack_require__(2);
	const Maze = __webpack_require__(1);
	const Ghost = __webpack_require__(4);
	
	class Game {
	  constructor(ctx) {
	    this.ctx = ctx;
	    this.pellets = [];
	    this.pacman = new Pacman(ctx);
	    this.maze = new Maze(ctx);
	    this.map = [
	      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	      [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	      [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
	      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
	      [0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0],
	      [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
	      [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
	      [3, 3, 3, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 3, 3],
	      [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	      [1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 1, 1, 1, 1],
	      [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
	      [3, 3, 3, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 3, 3, 3],
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
	    this.ghosts = this.spawnGhosts();
	    this.removeCollisions = this.removeCollisions.bind(this);
	  }
	
	  spawnGhosts() {
	    const ghostArray = [];
	    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5));
	    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5));
	    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5));
	    ghostArray.push(new Ghost(this.ctx, this.map, 237.5, 237.5));
	    return ghostArray;
	  }
	
	  gameOver() {
	    this.ghosts.forEach((ghost) => {
	      return this.pacman.x <= ghost.x + 25 &&
	        this.pacman.x >= ghost.x - 25 && this.pacman.y <= ghost.y + 25 &&
	        this.pacman.y >= ghost.y - 25;
	      });
	  }
	
	  spawnPellets() {
	    this.map.forEach((row, i) => {
	      row.forEach((pos, j) => {
	        if (pos === 1) {
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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map