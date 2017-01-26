# Pacman

![Alt text](/images/wakawaka.png)

## Background

Pacman is a classic arcade game that has remained popular to the present day.

The basic concept of the game is as follows:

1. If Pacman contacts any of the other characters, the round is over.
2. Pacman attempts to devour the pellets that are arrayed around the maze.
3. If Pacman manages to devour all the pellets, Pacman wins.

## How to Play

- To begin a game, click on the maze
- You can move Pacman using the arrow keys or WASD

## Technologies/Techniques Used

- HTML5/CSS3
- HTML5 Canvas
- JavaScript
- Object Oriented Design

## Features and Implementation

### Maze

The maze is generated using an array of arrays, with each value representing a 25px * 25px slice of the canvas. The 'map', as it is called, denotes walls with '0' and open navigable spaces with '1'. The map is used by the canvas to render each of the components onto the canvas.

```js
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
      [0, 0, 0, 0, 1, 0, 1, 0, 0, 3, 0, 0, 1, 0, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 3, 0, 1, 1, 1, 1, 1, 1, 1],
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
```

### Object Oriented Design

The map is shared by each of the game classes and is used primarily for rendering and detecting collisions between game objects. Each class, as a result, has methods pertaining to the map. Each class is connected by an overarching game class which is used to pass map function arguments to relevant classes. Once clicked, the game sets an interval that tells the game when to both pass arguments and render each of the game components:

```js
  canvasEl.addEventListener("click", function() {
    if (!started) {
      started = true;
      const gameNotWon = setInterval(function() {
        if (game.gameOver()) {
          clearInterval(gameNotWon);
          window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
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
  }, 1000);
```

As can be seen in the above function, the interval also takes in win/loss conditions that upon being met will terminate the interval and end the game.

### Maze Navigation

Perhaps the most challenging part of building this game was the generation of accurate movement and collision detection.
```js
  checkCollision(direction) {
    let mapX = Math.floor(this.x/25);
    let mapY = Math.floor(this.y/25);
    let newX = this.x, newY = this.y;

    if (direction === 0) {
      newY -= 13;
      const top = this.collision(mapX, mapY - 1, newX, newY);
      const left =  this.collision(mapX - 1, mapY - 1, newX - 10, newY);
      const right = this.collision(mapX + 1, mapY - 1, newX + 10, newY);
      return top || left || right;
    } else if (direction === 1) {
      newY += 13;
      const down = this.collision(mapX, mapY + 1, newX, newY);
      const left =  this.collision(mapX - 1, mapY + 1, newX - 10, newY);
      const right = this.collision(mapX + 1, mapY + 1, newX + 10, newY);
      return down || left || right;
    } else if (direction === 2) {
      newX -= 13;
      const left =  this.collision(mapX - 1, mapY, newX, newY);
      const top = this.collision(mapX - 1, mapY - 1, newX, newY - 10);
      const down = this.collision(mapX - 1, mapY + 1, newX, newY + 10);
      return left || top || down;
    } else if (direction === 3) {
      newX += 13;
      const right =  this.collision(mapX + 1, mapY, newX, newY);
      const top = this.collision(mapX + 1, mapY - 1, newX, newY - 10);
      const down = this.collision(mapX + 1, mapY + 1, newX, newY + 10);
      return right || top || down;
    }
  }
```
Each moving component has some variation of the above function. The mapX and mapY variables determine the position on the map that the component is currently within. The newX and newY variables are projections for the next position of the moving object. For each direction, the function calculates whether the moving object will be within a "wall" for each block that the moving object is moving into.

##To Be Implemented

- Improved Ghost AI
- Pellets for devouring ghosts
- Improved API
- Sounds
