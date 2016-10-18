# Pacman

## Background

Pacman is a classic arcade game that has endured in the public consciousness to the present day. 
The original Pacman is played out on a rectangular grid that is arranged as a maze. There are five characters
that can move around on the grid, the player-controlled titular Pacman and four ghosts that attempt to 
devour it. In general the following rules are observed:

1. If Pacman contacts any of the other characters, Pacman loses a life and a new round begins.
2. Pacman attempts to devour the pellets that are strewn around the grid.
3. If Pacman manages to devour all the pellets, Pacman wins.

There are several additional rules that at present may or may not make their way into the final iteration of the game.

## MVP
With this Pacman simulator, users will be able to:

- [ ] Start, pause, and reset the game board
- [ ] Control the titular Pacman character
- [ ] Devour pellets
- [ ] Be devoured by ghosts

If time allows:

- [ ] Devour special pellets
- [ ] Devour ghosts on condition

## Plan of Attack

The following technologies will be used in this application:
- Vanilla Javascript and jQuery for overall structure and game logic,
- 'Easel.js' with 'HTML5 Canvas' for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

In addition to the entry file, there will be three scripts involved in this project:

'maze.js': this script will handle the logic for creating and updating the necessary 'Easel.js' elements

'ghosts.js': this script will handle the logic behind the ghosts. Perhaps will be split further depending on class of ghost

'pacman.js': this script will handle pacman object and the necessary functions related to behavior and movement

## Implementation Timeline

**Day 1**: Setup all necessary Node modules, get webpack up and running and 'Easel.js' installed. Set up Easel
and figure out rendering. Complete the maze.js module.

**Day 2**: Complete ghosts and pacman modules.

**Day 3**: Attempt to render all elements on canvas. Test playability.
