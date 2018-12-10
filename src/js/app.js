/*
  #### Donny's Frogger ####
  Version:            v234u4
  Date:           11 23 2018
  Description: 
   This is a frogger style game with two modes:
   Endless - you can play infinite levels, atleast until you run out of lives
   Levels - level based mode, you win by reaching the last level
   Bugs - if a bug eats you, you lose a life point, if you run out of life points you lose and levels get reset!
   Movement - used the arrows keys to move your player (Up, right, down, left)
   Winning - to win each level, reach the purple obsidian portals!

  SideNote: There's a ton of if statements for debugmode, they're just there to display important information if that is true.
*/

// HTML constants
const levelsHTML = document.getElementById("levels");
const livesHTML = document.getElementById("lives");
const highscoreHTML = document.getElementById("highscore");
const gamemodeButton = document.getElementById("gamemode-button");

// Important constant positions
//                                     X                Y
const waterArrayOfPostions = [[0, 101, 202, 303, 404], [-18]];
const arrayOfPositionsX = [0, 101, 202, 303, 404];
const arrayOfPositionsY = [-18, 65, 148, 231, 314, 397];
const stoneArrayOfPostions = [65, 148, 231];

// Disable the arrow keys moving the window scroll bar
window.addEventListener("keydown", function (e) {
  // space and arrow keys
  if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

// Game Constructor: It has effectively everything that runs the levels, start, lives, and game over. Also endless and debug mode.
class Game {
  constructor() {
    this.numOfEnemies = 3;
    this.debugMode = false;
    this.endlessMode = true;
    this.levelHighScore = 0;
    this.maxLevelsDefault = 14;
    this.maxLevels = this.maxLevelsDefault;
    this.level = 0;
    this.livesDefault = 3;
    this.lives = this.livesDefault;
    this.bugSpeedMaxDefault = 175;
    this.bugSpeedMax = this.bugSpeedMaxDefault;
    this.bugSpeedMin = 140;
    this.bugSpeedIncreaser = 60;

    if (this.endlessMode) {
      this.maxLevels = Infinity;
      this.updateHTML();
      
      if (this.debugMode) {
        console.log("Endless Mode Enabled.");
      }
    }

    if (this.debugMode) {
      // Adds one because the levels start at 0, but for the players sake, its 1.
      console.log(`Level: ${this.level + 1}`);
    }

    // update HTML and HighScore just to be careful
    this.updateHighScore();
    this.updateHTML();
    console.log("To enable debugMode type: game.debugMode = true");
  }

  gameOver(gameOverCondition) {
    // Game is over, called by either beating all the levels or losing too many lives.
    if (gameOverCondition === "win") {
      // Winning condition: do your win stuff here
      alert("You won! Congrats!");

      if (this.debugMode) {
        console.log("You Won!!!");
      }

    } else if (gameOverCondition === "changing gamemodes") {
      // Change GameMode: This is just for changing gamemode from levels to endless and vice versa
      if (this.debugMode) {
        let tempGamemode;

        if (this.endlessMode) {
          tempGamemode = "Endless...";
        } else {
          tempGamemode = "Levels...";
        }

        console.log(`Changing gamemodes to: ${tempGamemode}`);
      }

    } else {
      // Losing condition: do your lose stuff here
      alert("You lose! Boooooooo!");

      if (this.debugMode) {
        console.log("Womp womp, you lose..");
      }
    }
    // Reset level
    this.level = 0;

    // Reset lives to default
    this.lives = this.livesDefault;

    // Reset player pos
    this.resetPlayerPos();

    // Reset bug speed
    this.bugSpeedMax = this.bugSpeedMaxDefault;

    // Reset bug pos -> change level to 1 (0)
    this.resetBugPos();

    // Reset HTML
    this.updateHTML();
  }

  reset() {
    // is called when the player dies on a level so they lose a life.
    // checks lives left then initiates gameOver if no lives are left.
    // Add a timeout here, disable input, then once the timeout is done, renenable input.
    this.lives -= 1;
    if (this.lives <= 0) {
      this.gameOver();

    } else {
      if (this.debugMode) {
        console.log(`Lives remaining: ${this.lives}`);
      }

      this.resetPlayerPos();
      this.updateHTML();
    }
  }

  levelComplete() {
    // this is called when a level has been completed, checks for game win based on levels and max level
    this.level++;
    this.updateHighScore();

    if (this.level === this.maxLevels) {
      this.gameOver("win");
    } else {
      this.resetPlayerPos();
      this.resetBugPos();
      // Update Bug Speed
      this.bugSpeedMax += this.bugSpeedIncreaser;
      this.updateHTML();
    }

    if (this.debugMode) {
      // If debug mode is true, display created bugs new position on the Y axis, and display the speed
      console.log(`Level: ${this.level + 1}`);

      for (i = 0; i < allEnemies.length; i++) {
        console.log(`Bug ${i}'s position: ${allEnemies[i].y}`);
        console.log(`Bug ${i}'s speed: ${allEnemies[i].speed}`);
      }
    }
  }

  resetPlayerPos() {
    // Reset player pos
    player.x = ((player.movementSizeX * 3 - 101));
    player.y = ((player.movementSizeY * 5 - 101));
  }

  resetBugPos() {
    // Resets bug positions off screen
    allEnemies.forEach(element => {
      element.x = -101;
      element.y = stoneArrayOfPostions[randomIndex(3)];
      element.speed = randomNumMinMax(this.bugSpeedMin, this.bugSpeedMax);
    });
  }

  updateHighScore() {
    // This updates the highscore
    // First check is if the highscore is higher than the max levels, don't want a highscore of 8 with 7 levels.
    // Second just increments the highscore if the level is higher than the highscore.
    if (this.levelHighScore >= this.maxLevels) {
      this.levelHighScore = this.maxLevels;
    } else {
      if (this.level >= this.levelHighScore) {
        this.levelHighScore = this.level + 1;
      }
    }
  }

  updateHTML() {
    // Updates necessary html blocks
    levelsHTML.innerText = `Level ${this.level + 1} of ${this.maxLevels}`;

    // Loop to update the correct amount of hearts
    let tempHeart = "";
    for (let i = 0; i < this.lives; i++) {
      tempHeart += `<i style="color: red; "class="fas fa-heart"></i>`;
    }
    livesHTML.innerHTML = `Lives remaining: ${tempHeart}`;

    // Update the highscore
    highscoreHTML.innerText = `Level Highscore: ${this.levelHighScore}`;

    // Update the gamemode button
    let tempGamemode;
    if (this.endlessMode) {
      tempGamemode = "Levels...";
    } else {
      tempGamemode = "Endless...";
    }
    gamemodeButton.innerText = tempGamemode;
  }
}


// Instancing a new game
let game = new Game();


// ##### ENEMY CONSTRUCTOR #####
var Enemy = function (x = -101, y = 236, speed = 100) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.imageSizeX = 80;
  this.imageSizeY = 80;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position
Enemy.prototype.update = function (deltaTicks) {
  // Parameter: dt, a time delta between ticks
  // You should multiply any movement by the dt parameter, it locks the speed of the movement to the Frames Per Seconds (FPS)

  // Horizontal movement speed.
  if (this.x <= 505) {
    this.x += this.speed * deltaTicks;
  } else {
    // reset enemy pos
    this.x = -101;
  }
};

// Draw the enemy on the screen
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  if (game.debugMode) {
    // Rect 1, image size
    ctx.beginPath();
    ctx.rect(this.x, this.y, 101, 171);
    ctx.stroke();

    // Rect 2, hitbox
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.rect(this.x + 10, this.y + 60, 80, 80);
    ctx.stroke();
  }
};

// ##### PLAYER CONTRUCTOR #####
const Player = function () {
  // Player sprite
  this.sprite = `images/char-boy.png`;

  // Player Movement Size
  this.movementSizeX = (101);
  this.movementSizeY = (83);

  // Player Debug movement positions
  if (game.debugMode) {
    console.log(this.movementSizeX);
    console.log(this.movementSizeY);
  }

  // Character collision box size
  this.charSizeX = 80;
  this.charSizeY = 80;

  // Starting position
  this.x = ((this.movementSizeX * 3 - 101));
  this.y = ((this.movementSizeY * 5 - 101));
}

// Player update, checks for win and collision
Player.prototype.update = function () {
  // Checking player for win
  if (this.y === waterArrayOfPostions[1][0]) {
    game.levelComplete();
  }

  // Checking collision
  // Enable debugging and these numbers might just start to make sense. You'll see the PNGs size (red larger outer box), and the hitbox's size (smaller inner box)
  // This.x & this.y are the players position, element.x & element.y are the bots position, these if statements check for intersection of any points inside the enemies.
  // The additions (+10 +60 +90 +80) squish the original PNGs size down to a more managable size, and the hitbox is formed.
  allEnemies.forEach(element => {
    if ((this.x + 10 >= element.x) && (this.x + 10 <= element.x + 10 + element.imageSizeX) && (this.y + 60 >= element.y + 60) && (this.y + 60 <= element.y + 60 + element.imageSizeY)) {

      if (game.debugMode) {
        console.log("dead");
      } else {
        game.reset();
      }
    }
    if ((this.x + 90 >= element.x) && (this.x + 90 <= element.x + 10 + element.imageSizeX) && (this.y + 60 >= element.y + 60) && (this.y + 60 <= element.y + 60 + element.imageSizeY)) {

      if (game.debugMode) {
        console.log("dead");
      } else {
        game.reset();
      }
    }
    if ((this.x + 90 >= element.x) && (this.x + 90 <= element.x + 10 + element.imageSizeX) && (this.y + 60 + 80 >= element.y + 60) && (this.y + 60 + 80 <= element.y + 60 + element.imageSizeY)) {

      if (game.debugMode) {
        console.log("dead");
      } else {
        game.reset();
      }
    }
    if ((this.x + 10 >= element.x) && (this.x + 10 <= element.x + 10 + element.imageSizeX) && (this.y + 60 + 80 >= element.y + 60) && (this.y + 60 + 80 <= element.y + 60 + element.imageSizeY)) {

      if (game.debugMode) {
        console.log("dead");
      } else {
        game.reset();
      }
    }
  });
}

// Draws players sprite image, and if debug mode is true, draws debug boxes
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  if (game.debugMode) {
    // Player image rectangle
    ctx.beginPath();
    ctx.rect(this.x, this.y, 101, 171);
    ctx.stroke();

    // Player hitbox rectangle
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.rect(this.x + 10, this.y + 60, 80, 80);
    ctx.stroke();
  }
}

// Handles players movement, it's called inside the arrowkey event listener, moves according to the keypressed.
Player.prototype.handleInput = function (keyPressed) {
  // Gets movement as a string, up, right, down, left,

  switch (keyPressed) {
    case "up":
      if (((this.y - this.movementSizeY) + 18) >= 0) {
        // move like normal
        this.update(this.y -= this.movementSizeY);

        if (game.debugMode) {
          console.log(this.y);
        }
      }
      // Else -> Attempted out of bounds; Do nothing
      break;

    case "down":
      if ((this.y + this.movementSizeY) <= 397) {
        // move like normal
        this.update(this.y += this.movementSizeY);

        if (game.debugMode) {
          console.log(this.y);
        }
      }
      // Else -> Attempted out of bounds; Do nothing
      break;

    case "left":
      if ((this.x - this.movementSizeX) >= 0) {
        // move like normal
        this.update(this.x -= this.movementSizeX);

        if (game.debugMode) {
          console.log(this.x);
        }
      }
      // Else -> Attempted out of bounds; Do nothing
      break;

    case "right":
      if ((this.x + this.movementSizeX) <= 404) {
        // move like normal
        this.update(this.x += this.movementSizeX);

        if (game.debugMode) {
          console.log(this.x);
        }
      }
      // Else -> Attempted out of bounds; Do nothing
      break;
  }
}

// Instantiating Player Object, calling it player.
let player = new Player();

// Creating the array that will contain all the made enemies
let allEnemies = [];

// This creates the enemies, placing the enemy objects into an array with their randomly set properties(position, speed)
// Doesn't need to be an IIFE, I just wanted the code to speak for itself, the function can also be called later if need be.
function createEnemies() {
  for (let i = 0; i < game.numOfEnemies; i++) {
    let position = stoneArrayOfPostions[randomIndex(3)];
    let randomBugSpeed = randomNumMinMax(game.bugSpeedMin, game.bugSpeedMax);

    if (game.debugMode) {
      console.log(`Bug ${i}'s position: ${position}`);
      console.log(`Bug ${i}'s speed: ${randomBugSpeed}`);
    }

    allEnemies.push(new Enemy(-101, position, randomBugSpeed));
  }
};
createEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// Random Number Functions
function randomNum(num) {
  return Math.floor(Math.floor(Math.random() * num) + 1);
}
function randomNumMinMax(numMin, numMax) {
  return Math.floor(Math.random() * (numMax - numMin)) + numMin;
}
function randomIndex(numOfindexs) {
  return Math.floor(Math.floor(Math.random() * numOfindexs));
}

// Gamemode button event listener, changes gamemode on click
gamemodeButton.addEventListener("click", (e) => {
  if (game.endlessMode) {
    // Setting gamemode to levels
    game.endlessMode = false;
    game.maxLevels = game.maxLevelsDefault;

    if (game.debugMode) {
      console.log("Level Mode Enabled.");
    }
  } else {
    // Setting gamemode to endless
    game.endlessMode = true;
    game.maxLevels = Infinity;

    if (game.debugMode) {
      console.log("Endless Mode Enabled.");
    }
  }

  game.gameOver("changing gamemodes");
  game.updateHTML();
})


/* Long winded explaination of this collision detection
  So imagine each if statement is a point on a cube; 
  A -------- B
  |          |
  |  player  |
  |          |
  D -------- C
  First if statement is A, second is B, third is C, fourth is D.
  What each statement is checking is to see if any of these points intersects with an enemies cubes coordinates.
  Like so:
  A -------- B
  |          |
  |   bot    |
  |        A-|------- B
  D -------|-C        |
           |  player  |
           |          |
           D -------- C
  See how the A coordinates (x, y) are inside the bot?
  that would be the first if statement firing because the players A coordinates are "inside" all four && statements, therefore all 
  are true, and it removes a life from the player. Same works for all four points, that's why there's four if statements.

  The + 10 + 90 + 60 + 80 etc shifts the boundary of the player to a smaller cube, so we're not working with the entire size
  of the PNG, but rather a smaller and more managable hitbox.

*/
