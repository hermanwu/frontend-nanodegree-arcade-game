"use strict";
//Enemies player must avoid
var Enemy = function() {
    //image for enemy characters
    this.sprite = 'images/enemy-bug.png';
    //Relative width and height of the enemy image
    //which can be used to calculate enemy's position
    this.width = 101;
    this.height = 83;
    //Starting position of the enemy
    this.startingX = - this.width;
    this.x = this.startingX;
    //Randomly generate enemy's starting row between 1 to 3
    this.row = 1 + Math.floor(Math.random() * 3);
    this.y = - 23 + this.height * this.row; 
    //randomly generate enemy's speed between 100 to 250
    this.speed = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    //flag to indicate whether enemy is moving or not
    this.moveAbility = true;
};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //When enemy moves out of the screen, reset its position 
    // To the starting position
    if(this.x > this.width * 5){
        this.x = this.startingX;
    }
    //Multiply speed by the dt parameter, then calculate the current 
    //Position
    this.x = this.x + this.speed * dt;
};

//Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player which can be controlled using keyboard
var Player = function(){
    //Player's character image
    this.sprite = 'images/char-boy.png';
    //Relative width and height of the player image
    //which can be used to calculate player's position
    this.width = 101;
    this.height = 83;
    //Starting position on the game board
    this.startingCol = 2;  
    this.startingRow = 5;
    //Current position on the game board
    this.row = this.startingRow;
    this.col = this.startingCol;
    //Indicates how many gems have been 
    //collected by user
    this.collectedGems = 0;
    //This flag indicate whether player can move or not
    this.moveAbility = true;
};

//Method to update player's position
Player.prototype.update = function(){
    this.x = this.width * this.col;
    this.y = -23 + this.height * this.row;
};

//Method to draw player on the game board
Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Method to hand keyboard input with its corresponding
//character movement
Player.prototype.handleInput = function(keyInput){
    if(keyInput === "down" && this.row < 5){
        this.row = this.row + 1;
    }
    if(keyInput === "up" && this.row > 1){
        this.row = this.row - 1;
    }
    if(keyInput === "left" && this.col > 0){
        this.col = this.col - 1;
    }
    if(keyInput === "right" && this.col < 4){
        this.col = this.col + 1;
    }
};

//Gem that player needs to collect
var Gem = function(){
    // Gem's image
    this.sprite = 'images/gem-blue.png';
    //Relative width and height of the gem image
    //which can be used to calculate gem's position
    this.width =101;
    this.height = 83;
    //Randomly generate gem's position on the game board 
    this.row = 1 + Math.floor(Math.random() * 5);
    this.col = Math.floor(Math.random() * 5);
    //flag to indicate whether the gem is collected
    this.availability  = true;
};

//Method to update gem's position
Gem.prototype.update = function(){
    this.x = this.width * this.col;
    this.y = -30 + this.height * this.row;
};

//Method to draw gem on the game board
Gem.prototype.render = function(){
    if(this.availability){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Objects initialization.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
var player = new Player();
// Create array of gem objects for player to collect
var allGems = [new Gem(), new Gem(), new Gem(), new Gem(), new Gem()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Method to reload the page and restart the game
function refreshPage(){
    location.reload();
}


