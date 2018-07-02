let dx = 101; // distance in x direction
let dy = 83; // distance in y direction
let points = 0;
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
	this.hasCollided();
	if (this.x > 505)
	{
		this.x =-200;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.hasCollided = function()
{
	    if (player.x - 60 < this.x && player.x + 40 > this.x && player.y - 15 < this.y && player.y + 30 > this.y)
	{
		if (points > 0)
		{
			points -= 1;
		}		
		else
		{
			points = 0;
		}
		player.resetPlayer();
	}
}

// Player Class

var Player = function()
{
	//position at middle bottom (around 3rd column, 4th row)
	this.x = 200;
	this.y = 400;
	this.speed = 50;
	this.sprite = "images/char-princess-girl.png";
};

Player.prototype.render = function()
{
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	ctx.font = "30px impact";
	ctx.lineWidth = 2;
	ctx.strokeText("Points: " + points, 50,  30);
};
Player.prototype.resetPlayer = function()
{
	this.x = 200;
	this.y = 400;
};
Player.prototype.update = function(dt)
{
	if (this.y > 430) // when hits bottom boundary
	{
		this.y = 430;
	}
	if (this.x < 0) // when hits left boundary
	{
		this.x = 0;
	}
	if (this.x > 400) //when hits right boundary
	{
		this.x = 400;
	}
	if (this.y < 30) //when reaches the blue field, add 1 point & reset position
	{
		points += 1;
		this.resetPlayer();
	}
};

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
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

function generateEnemies()
{
	for (let i = 0; i < 5; i++)
	{
		let x = 0; //start from left
		let y = Math.random() * (325 - 130) + 60; // randomize cords to occupies stone rows 1-3
		let speed = Math.random() * (325 - 130) + 60;
		allEnemies.push(new Enemy(x, y, speed));
	}
}

generateEnemies();
console.log(allEnemies);

let player = new Player();


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
