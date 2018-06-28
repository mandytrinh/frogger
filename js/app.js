let dx = 101; // distance in x direction
let dy = 83; // distance in y direction

var Enemy = function(x, y, speed) {

    this.sprite = "images/enemy-bug.png";
	this.x = x;
	this.y = y;
	this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the delta (dt parameter)
    // which will ensure the game runs at the same speed for
    // all computers.
	this.x += this.speed * dt; //moves the bug horizontally (x-coord wise)
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own PLAYER CLASS
// This class requires an update(), render() and
// a handleInput() method.

var Player = function()
{
	//position at middle bottom (around 3rd column, 4th row)
	this.x = 200;
	this.y = 400;
	this.speed = 30;
	this.sprite = "images/char-boy.png";
};

Player.prototype.render = function()
{
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function(dt)
{
	this.y += this.speed * dt;
	
}

Player.prototype.handleInput = function(input)
{
	switch(input)
	{
		case "left":
			this.x -= dx;
			break;
		case "right":
			this.x += dx;
			break;
		case "up":
			this.y -= dy;
			break;
		case "down":
			this.y += dy;
			break;
	}
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

for (let i = 0; i < 4; i++)
{
	let x = 0; //start from left
	let y = Math.random() * 404 + 80; // occupies stone rows 1-3, y coords 101-404
	let speed = (Math.random() * 400) + 50;
	allEnemies.push(new Enemy(x, y, speed));
}

console.log(allEnemies);

let player = new Player();
console.log("player" + player.x);


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
