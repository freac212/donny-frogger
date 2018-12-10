function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var o=0;o<t.length;o++){var s=t[o];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,t,o){return t&&_defineProperties(e.prototype,t),o&&_defineProperties(e,o),e}!function(){var o={},s=[];function t(e){if(o[e])return o[e];var t=new Image;t.onload=function(){o[e]=t,i()&&s.forEach(function(e){e()})},o[e]=!1,t.src=e}function i(){var e=!0;for(var t in o)o.hasOwnProperty(t)&&!o[t]&&(e=!1);return e}window.Resources={load:function(e){e instanceof Array?e.forEach(function(e){t(e)}):t(e)},get:function(e){return o[e]},onReady:function(e){s.push(e)},isReady:i}}();var levelsHTML=document.getElementById("levels"),livesHTML=document.getElementById("lives"),highscoreHTML=document.getElementById("highscore"),gamemodeButton=document.getElementById("gamemode-button"),waterArrayOfPostions=[[0,101,202,303,404],[-18]],arrayOfPositionsX=[0,101,202,303,404],arrayOfPositionsY=[-18,65,148,231,314,397],stoneArrayOfPostions=[65,148,231];window.addEventListener("keydown",function(e){-1<[32,37,38,39,40].indexOf(e.keyCode)&&e.preventDefault()},!1);var Game=function(){function e(){_classCallCheck(this,e),this.numOfEnemies=3,this.debugMode=!1,this.endlessMode=!0,this.levelHighScore=0,this.maxLevelsDefault=14,this.maxLevels=this.maxLevelsDefault,this.level=0,this.livesDefault=3,this.lives=this.livesDefault,this.bugSpeedMaxDefault=175,this.bugSpeedMax=this.bugSpeedMaxDefault,this.bugSpeedMin=140,this.bugSpeedIncreaser=60,this.endlessMode&&(this.maxLevels=1/0,this.updateHTML(),this.debugMode&&console.log("Endless Mode Enabled.")),this.debugMode&&console.log("Level: ".concat(this.level+1)),this.updateHighScore(),this.updateHTML(),console.log("To enable debugMode type: game.debugMode = true")}return _createClass(e,[{key:"gameOver",value:function(e){if("win"===e)alert("You won! Congrats!"),this.debugMode&&console.log("You Won!!!");else if("changing gamemodes"===e){var t;if(this.debugMode)t=this.endlessMode?"Endless...":"Levels...",console.log("Changing gamemodes to: ".concat(t))}else alert("You lose! Boooooooo!"),this.debugMode&&console.log("Womp womp, you lose..");this.level=0,this.lives=this.livesDefault,this.resetPlayerPos(),this.bugSpeedMax=this.bugSpeedMaxDefault,this.resetBugPos(),this.updateHTML()}},{key:"reset",value:function(){this.lives-=1,this.lives<=0?this.gameOver():(this.debugMode&&console.log("Lives remaining: ".concat(this.lives)),this.resetPlayerPos(),this.updateHTML())}},{key:"levelComplete",value:function(){if(this.level++,this.updateHighScore(),this.level===this.maxLevels?this.gameOver("win"):(this.resetPlayerPos(),this.resetBugPos(),this.bugSpeedMax+=this.bugSpeedIncreaser,this.updateHTML()),this.debugMode)for(console.log("Level: ".concat(this.level+1)),i=0;i<allEnemies.length;i++)console.log("Bug ".concat(i,"'s position: ").concat(allEnemies[i].y)),console.log("Bug ".concat(i,"'s speed: ").concat(allEnemies[i].speed))}},{key:"resetPlayerPos",value:function(){player.x=3*player.movementSizeX-101,player.y=5*player.movementSizeY-101}},{key:"resetBugPos",value:function(){var t=this;allEnemies.forEach(function(e){e.x=-101,e.y=stoneArrayOfPostions[randomIndex(3)],e.speed=randomNumMinMax(t.bugSpeedMin,t.bugSpeedMax)})}},{key:"updateHighScore",value:function(){this.levelHighScore>=this.maxLevels?this.levelHighScore=this.maxLevels:this.level>=this.levelHighScore&&(this.levelHighScore=this.level+1)}},{key:"updateHTML",value:function(){levelsHTML.innerText="Level ".concat(this.level+1," of ").concat(this.maxLevels);for(var e,t="",o=0;o<this.lives;o++)t+='<i style="color: red; "class="fas fa-heart"></i>';livesHTML.innerHTML="Lives remaining: ".concat(t),highscoreHTML.innerText="Level Highscore: ".concat(this.levelHighScore),e=this.endlessMode?"Levels...":"Endless...",gamemodeButton.innerText=e}}]),e}(),game=new Game,Enemy=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:-101,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:236,o=2<arguments.length&&void 0!==arguments[2]?arguments[2]:100;this.x=e,this.y=t,this.speed=o,this.imageSizeX=80,this.imageSizeY=80,this.sprite="images/enemy-bug.png"};Enemy.prototype.update=function(e){this.x<=505?this.x+=this.speed*e:this.x=-101},Enemy.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y),game.debugMode&&(ctx.beginPath(),ctx.rect(this.x,this.y,101,171),ctx.stroke(),ctx.beginPath(),ctx.strokeStyle="red",ctx.rect(this.x+10,this.y+60,80,80),ctx.stroke())};var Player=function(){this.sprite="images/char-boy.png",this.movementSizeX=101,this.movementSizeY=83,game.debugMode&&(console.log(this.movementSizeX),console.log(this.movementSizeY)),this.charSizeX=80,this.charSizeY=80,this.x=3*this.movementSizeX-101,this.y=5*this.movementSizeY-101};Player.prototype.update=function(){var t=this;this.y===waterArrayOfPostions[1][0]&&game.levelComplete(),allEnemies.forEach(function(e){t.x+10>=e.x&&t.x+10<=e.x+10+e.imageSizeX&&t.y+60>=e.y+60&&t.y+60<=e.y+60+e.imageSizeY&&(game.debugMode?console.log("dead"):game.reset()),t.x+90>=e.x&&t.x+90<=e.x+10+e.imageSizeX&&t.y+60>=e.y+60&&t.y+60<=e.y+60+e.imageSizeY&&(game.debugMode?console.log("dead"):game.reset()),t.x+90>=e.x&&t.x+90<=e.x+10+e.imageSizeX&&t.y+60+80>=e.y+60&&t.y+60+80<=e.y+60+e.imageSizeY&&(game.debugMode?console.log("dead"):game.reset()),t.x+10>=e.x&&t.x+10<=e.x+10+e.imageSizeX&&t.y+60+80>=e.y+60&&t.y+60+80<=e.y+60+e.imageSizeY&&(game.debugMode?console.log("dead"):game.reset())})},Player.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y),game.debugMode&&(ctx.beginPath(),ctx.rect(this.x,this.y,101,171),ctx.stroke(),ctx.beginPath(),ctx.strokeStyle="red",ctx.rect(this.x+10,this.y+60,80,80),ctx.stroke())},Player.prototype.handleInput=function(e){switch(e){case"up":0<=this.y-this.movementSizeY+18&&(this.update(this.y-=this.movementSizeY),game.debugMode&&console.log(this.y));break;case"down":this.y+this.movementSizeY<=397&&(this.update(this.y+=this.movementSizeY),game.debugMode&&console.log(this.y));break;case"left":0<=this.x-this.movementSizeX&&(this.update(this.x-=this.movementSizeX),game.debugMode&&console.log(this.x));break;case"right":this.x+this.movementSizeX<=404&&(this.update(this.x+=this.movementSizeX),game.debugMode&&console.log(this.x))}};var player=new Player,allEnemies=[];function createEnemies(){for(var e=0;e<game.numOfEnemies;e++){var t=stoneArrayOfPostions[randomIndex(3)],o=randomNumMinMax(game.bugSpeedMin,game.bugSpeedMax);game.debugMode&&(console.log("Bug ".concat(e,"'s position: ").concat(t)),console.log("Bug ".concat(e,"'s speed: ").concat(o))),allEnemies.push(new Enemy(-101,t,o))}}function randomNum(e){return Math.floor(Math.floor(Math.random()*e)+1)}function randomNumMinMax(e,t){return Math.floor(Math.random()*(t-e))+e}function randomIndex(e){return Math.floor(Math.floor(Math.random()*e))}createEnemies(),document.addEventListener("keyup",function(e){player.handleInput({37:"left",38:"up",39:"right",40:"down"}[e.keyCode])}),gamemodeButton.addEventListener("click",function(e){game.endlessMode?(game.endlessMode=!1,game.maxLevels=game.maxLevelsDefault,game.debugMode&&console.log("Level Mode Enabled.")):(game.endlessMode=!0,game.maxLevels=1/0,game.debugMode&&console.log("Endless Mode Enabled.")),game.gameOver("changing gamemodes"),game.updateHTML()});var Engine=function(e){var o,t=e.document,s=e.window,i=t.createElement("canvas"),n=i.getContext("2d");function a(){var t,e=Date.now();t=(e-o)/1e3,allEnemies.forEach(function(e){e.update(t)}),player.update(t),function(){var e,t,o=["images/obsidian-block.png","images/stone-block.png","images/stone-block.png","images/stone-block.png","images/grass-block.png","images/grass-block.png"];for(n.clearRect(0,0,i.width,i.height),e=0;e<6;e++)for(t=0;t<5;t++)n.drawImage(Resources.get(o[e]),101*t,83*e);allEnemies.forEach(function(e){e.render()}),player.render()}(),o=e,s.requestAnimationFrame(a)}i.width=505,i.height=606,t.body.appendChild(i),Resources.load(["images/stone-block.png","images/water-block.png","images/grass-block.png","images/enemy-bug.png","images/char-boy.png","images/enemy-bugV3.png","images/obsidian-block.png","images/Rock.png","images/penguin-frontv1.png"]),Resources.onReady(function(){o=Date.now(),a()}),e.ctx=n}(this);