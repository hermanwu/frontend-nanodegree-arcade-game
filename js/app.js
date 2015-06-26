"use strict";
//Enemies player must avoid
var Enemy = function() {
    //The image/sprite for our enemies, this uses
    //a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // width and height of the image, which are used 
    // to allocate enemy's position
    this.width = 101;
    this.height = 83;
    // starting position of the enemy
    this.startingX = - this.width;
    this.x = this.startingX;
    //randomly generate enemy's starting row
    this.row = 1 + Math.floor(Math.random() * 3);
    this.y = - 23 + this.height * this.row;
    //randomly generate enemy's speed between 100 to 250
    this.speed = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    //flag to indicate whether enemy is moving
    this.moveAbility = true;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // when enemy moves out of the screen, set it to the 
    // starting position
    if(this.x > this.width * 5){
        this.x = this.startingX;
    }
    // multiply speed by the dt parameter, then calculate the current 
    // position
    this.x = this.x + this.speed * dt;
};
// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player class which can be controlled using keyboard
var Player = function(){
    //player character image
    this.sprite = 'images/char-boy.png';
    this.width = 101;
    this.height = 83;
    this.startingCol = 2;  
    this.startingRow = 5;
    this.row = this.startingRow;
    this.col = this.startingCol;
    //this attribute indicates how many gems have been collected
    this.collectedGems = 0;
    //this flag indicate whether player can move or not
    this.moveAbility = true;
};

//class that updates player's position
Player.prototype.update = function(){
    this.x = this.width * this.col;
    this.y = -23 + this.height * this.row;
};


Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


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

var Gem = function(){
    this.sprite = 'images/gem-blue.png';
    this.width =101;
    this.height = 83;
    this.row = 1 + Math.floor(Math.random() * 5);
    this.col = Math.floor(Math.random() * 5);
    //flag to indicate whether the gem is collected
    this.availability  = true;
};

Gem.prototype.update = function(){
    this.x = this.width * this.col;
    this.y = -30 + this.height * this.row;
};

Gem.prototype.render = function(){
    if(this.availability){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
// Place the player object in a variable called player
var player = new Player();
// Create array of gem
var allGems = [new Gem(), new Gem(), new Gem(), new Gem(), new Gem()];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function refreshPage(){
    location.reload();
}


