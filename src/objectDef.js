// create canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 320;
canvas.height = 320;
document.body.appendChild(canvas);

//keyboard stuff
var keysDown = {};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// main objects
var player = null;
var level = level0;	// what level to load
var lvlState = 0; 	// what level to go back to upon loss of hp
var hp = 3;
var plState = 0;
var mvTimer = 20;
var hitTimer = 120;
var gmState = 0;
var direction = 0;
var delta = 0;
var dash = 1;
var arrow = 1;
var weaponUse = 0;
//wall object class
var wallObj = function(posX, posY, sizeW, sizeH){
	this.x = posX;
	this.y = posY;
	this.width = sizeW;
	this.height = sizeH;
	this.image = new Image(8,8);
	this.image.src = "img/wall.png";
}

//game object class
var gameObj = function(posX, posY, sizeW, sizeH, imgSrc, tag, lvl){
	this.type = tag;
	this.x = posX;
	this.y = posY;
	this.width = sizeW;
	this.height = sizeH;
	this.src = imgSrc;
	this.image = new Image(8, 8);
	this.image.src = this.src;
	this.speed = this.width * 2.5;
	this.level = lvl;
	this.dir = getRandomInt(1,8);
	this.dirTimer = getRandomInt(80,160);
	this.arDir = 0;
	this.spHp = 5;
	this.spTimer = getRandomInt(300,750);
}

gameObj.prototype.wallCheck = function(newX, newY, width, height){
	for(var i = 0; i < wallList.length; i++){
		var other = wallList[i];
		if(newX < other.x + other.width && 
			newX + width > other.x &&
			newY < other.y + other.height &&
			newY + height > other.y){
			return false;
		}
	}
	return true;
}

//collision detection for
gameObj.prototype.enemyCheck = function(){
	if(this.type == "player"){
		for(var i = 0; i < objList.length; i++){
			if((objList[i].type == "enemy1" || objList[i].type == "enemy2") && plState != 1 ){
				var other = objList[i];
				if(this.x < other.x + other.width && 
					this.x + this.width > other.x &&
					this.y < other.y + other.height &&
					this.y + this.height > other.y){
					return true;
				}
			}
		}
	}else if(this.type == "enemy1" || this.type == "enemy2"){
		for(var i = 0; i < objList.length; i++){
			if(objList[i].type == "projectile" || objList[i].type == "fallPit"){
				var other = objList[i];
				if(this.x < other.x + other.width && 
					this.x + this.width > other.x &&
					this.y < other.y + other.height &&
					this.y + this.height > other.y){
					console.log("yolio");
					return true;
				}
			}
		}
	}else if(this.type == "projectile"){
		for(var i = 0; i < objList.length; i++){
			if((objList[i].type == "enemy1" || objList[i].type == "enemy2") && plState != 1 ){
				var other = objList[i];
				if(this.x < other.x + other.width && 
					this.x + this.width > other.x &&
					this.y < other.y + other.height &&
					this.y + this.height > other.y){
					emptyItem(other.index);
					return true;
				}
			}
		}
	}else if(this.type == "fallPit" || this.type == "leveler" || this.type == "ender"){
		var other = player;
		if(this.x+16 < other.x + other.width && 
			this.x + this.width - 16 > other.x &&
			this.y + 16 < other.y + other.height &&
			this.y + this.height - 16 > other.y){
			return true;
		}
	}
	return false;

}

// main object think function
gameObj.prototype.think = function(mod, type){
	switch(type){
		case "player":
			this.move(mod);
			if(plState == 1 && hitTimer > 0){
				console.log(hitTimer);
				if(this.image.src != "img/hitState.png"){
					this.image.src = "img/hitState.png";
				}
				hitTimer--;
			}
			if(hitTimer <= 0){
				console.log("yolio");
				plState = 0;
				hitTimer = 120;
				this.image.src = "img/testUser.png";
			}
			if(this.enemyCheck() && plState == 0 && hp > 0){
				plState = 1;
				this.image.src = "img/hitState.png";
				this.x += getRandomInt(-32, 32);
				hp -= 1;
			}
			if(plState == 2 && mvTimer > 0){
				mvTimer--;
			}else if(plState == 2 && mvTimer <= 0){
				plState = 0;
				mvTimer = 20;
			}
			if(hp <= 0){
				reset();
			}
			break;
		case "enemy1":
			if(this.dirTimer >0){
				this.dirTimer--;
			}
			if(this.dirTimer <= 0){
				this.dir = getRandomInt(1,8);
				this.dirTimer = getRandomInt(80,160);
			}
			if(this.enemyCheck()){
				emptyItem(this.index);
			}
			this.enMove(mod);
			break;
		case "enemy2":
			//this.enemyCheck();
			break;
		case "projectile":
			this.arMove(mod);
			if(this.enemyCheck() || this.x > canvas.width + 32 || this.x < -32 || this.y > canvas.height + 32 || this.y < -32 || !(this.wallCheck(this.x,this.y,this.width,this.height))){
				emptyItem(this.index);
			}
			break;
		case "fallPit":
			if(this.enemyCheck()){
				hp = -1;
			}
			break;
		case "enSpawn":
			this.spTimer--;
			if(this.spTimer <= 0){
				this.spTimer = getRandomInt(300,7500);
				createObj(this.x,this.y,this.width,this.height,"img/testEnemy.png", "enemy1",level)
			}
			break;
		case "leveler":
			if(this.enemyCheck()){
				if(this.level == level10 && arrow == 1){
					lvlState = 1;
				}
				if(this.level == level20 && dash == 1){
					lvlState = 2;
				}
				if((this.level == level10 && arrow == 1) || (this.level == level20 && dash == 1) || (this.level != level10 && this.level != level20)){
					level = this.level;
					reset();
				}
			}
			break;
		case "ender":
			if(this.enemyCheck()){
				if(this.level == 1){
					arrow = 0;
					level = level0;
					lvlState = 0;
					reset();
				}
				if(this.level == 2){
					dash = 0;
					level = level0;
					lvlState = 0;
					reset();
				}
			}
	}
}
gameObj.prototype.move = function(mod){
	if(38 in keysDown){
		//player holding up
		if(this.y > this.speed*mod && this.wallCheck(this.x, (this.y - this.speed*mod), this.width, this.height)){
			this.y -= this.speed * mod;
		}
		direction = 1;
	}
	if(40 in keysDown){
		//player holding down
		if(this.y + this.height + (this.speed*mod) < canvas.height && this.wallCheck(this.x, (this.y + this.speed*mod), this.width, this.height)){
			this.y += this.speed * mod;
		}
		direction = 0;
	}
	if(37 in keysDown){
		//player holding left
		if(this.x > this.speed*mod && this.wallCheck((this.x - this.speed*mod), this.y, this.width, this.height)){
			this.x -= this.speed * mod;
		}
		direction = 2;
	}
	if(39 in keysDown){
		//player holding right
		if(this.x + this.width + (this.speed*mod) < canvas.width && this.wallCheck((this.x + this.speed*mod), this.y, this.width, this.height)){
			this.x += this.speed * mod;
		}
		direction = 3;
	}
}
gameObj.prototype.arMove = function(mod){
	switch(this.arDir){
		case 0:
			//down
			this.y += this.width * 15 * mod;
			break;
		case 1:
			//up
			this.y -= this.width * 15 * mod;
			break;
		case 2:
			//left
			this.x -= this.width * 15 * mod;
			break;
		case 3:
			//right
			this.x += this.width * 15 * mod;
			break;
	}
}
gameObj.prototype.enMove = function(mod){
	switch(this.dir){
		case 1:
			//going down
			if(this.y + this.height + (this.width*mod) < canvas.height && this.wallCheck(this.x, (this.y + this.width*mod), this.width, this.height)){
				this.y += this.width * mod;
			}else{
				this.dir = getRandomInt(1,8);
			}
			break;
		case 2:
			//going up
			if(this.y > this.width*mod && this.wallCheck(this.x, (this.y - this.width*mod), this.width, this.height)){
				this.y -= this.width * mod;
			}else{
				this.dir = getRandomInt(1,8);
			}
			break;
		case 3:
			//going left
			if(this.x > this.width*mod && this.wallCheck((this.x - this.width*mod), this.y, this.width, this.height)){
				this.x -= this.width * mod;
			}else{
				this.dir = getRandomInt(1,8);
			}
			break;
		case 4:
			//going right
			if(this.x + this.width + (this.width*mod) < canvas.width && this.wallCheck((this.x + this.width*mod), this.y, this.width, this.height)){
				this.x += this.width * mod;
			}else{
				this.dir = getRandomInt(1,8);
			}
			break;
		default:
			break;
	}
}
var objList = [];
var objLength = 256;
for(var i = 0; i < objLength; i++){
	objList.push("");
}
var wallList = [];
for(var i = 0; i < objLength; i++){
	wallList.push("");
}

var emptyItem = function(index){
	objList[index] = ""; 
}

// background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "img/background.png";


// level reading
var levelRead = function(lvl){
	for(var i = 0; i < lvl.length; i++){
		for(var j = 0; j < lvl[i].length; j++){
			//console.log("" + 32*i + " yolio " + 32*j);
			switch(lvl[i][j]){
				case 1:
					createWall((32*j),(32*i),32,32);
					break;
				case 2:
					player.x = (32*j);
					player.y = (32*i);
					break;
				case 3:
					createObj((32*j),(32*i),32,32,"img/testEnemy.png", "enemy1", level);
					break;
				case 4:
					createObj((32*j),(32*i),32,32,"img/hitState.png", "enSpawn",level);
					break;
				case 5:
					createObj((32*j),(32*i),32,32,"img/testPit.png", "fallPit",level);
					break;
				case 6:
					createObj((32*j),(32*i),32,32,"img/testGoal.png", "ender",1);
					break;
				case 7:
					createObj((32*j),(32*i),32,32,"img/testGoal.png", "ender",2);
					break;
				case 10:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level10);
					break;
				case 20:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level20);
					break;
				case 11:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level11);
					break;
				case 12:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level12);
					break;
				case 13:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level13);
					break;
				case 14:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level14);
					break;
				case 21:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level21);
					break;
				case 22:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level22);
					break;
				case 23:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level23);
					break;
				case 24:
					createObj((32*j),(32*i),32,32,"img/testUser.png", "leveler",level24);
					break;
			}
		}
	}

	hp = 3;
}

//event listeners
addEventListener("keydown", function(e){
	if(e.keyCode == 90){
		if(dash == 1){
			switch (direction){
				case 0:
					//going down
					if(plState == 0){
						if(player.y + player.height + 96 < canvas.height && player.wallCheck(player.x, (player.y + 96), player.width, player.height)){
							player.y += 96;
						}
						plState = 2;
					}
					break;
				case 1:
					//going up
					if(plState == 0){
						if(player.y > 96 && player.wallCheck(player.x, (player.y - 96), player.width, player.height)){
							player.y -= 96;
						}
						plState = 2;
					}
					break;
				case 2:
					//going left
					if(plState == 0){
						if(player.x > 96 && player.wallCheck((player.x - 96), player.y, player.width, player.height)){
							player.x -= 96;
						}	
						plState = 2;
					}
					break;
				case 3:
					//going right
					if(plState == 0){
						if(player.x + player.width + 96 < canvas.width && player.wallCheck((player.x + 96), player.y, player.width, player.height)){
							player.x += 96;
						}
						plState = 2;
					}
					break;
			}
		}
	}
	if(e.keyCode == 88){
		console.log("arrow");
		if(arrow == 1){
			switch(direction){
				case 0:
					//down
					if(plState == 0){
						createObj(player.x+8,player.y+8,16,16,"img/hitState.png","projectile",0);
						plState = 2;
					}
				case 1:
					//up
					if(plState == 0){
						createObj(player.x+8,player.y+8,16,16,"img/hitState.png","projectile",1);
						plState = 2;
					}
				case 2:
					//left
					if(plState == 0){
						createObj(player.x+8,player.y+8,16,16,"img/hitState.png","projectile",2);
						plState = 2;
					}
				case 3:
					//right
					if(plState == 0){
						createObj(player.x+8,player.y+8,16,16,"img/hitState.png","projectile",3);
						plState = 2;
					}
			}
		}
	}
	if(e.keyCode == 67){
		hp = -1;
	}
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);
