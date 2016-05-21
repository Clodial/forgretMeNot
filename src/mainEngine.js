// reset function
var reset = function(){
	objList = [];
	for(var i = 0; i < objLength; i++){
		objList.push("");
	}
	wallList = [];
	for(var i = 0; i < objLength; i++){
		wallList.push("");
	}
	plState = 0;
	hitTimer = 120;
	mvTimer = 20;
	start();
}

//update game objects
var update = function(mod){
	player.think(mod, "player");
	for(var i = 0; i < objList.length; i++){
		if(objList[i] != ""){
			objList[i].think(mod, objList[i].type);
		}
	}
	
};

// render stuff
var controlZ = new Image();
controlZ.src = "img/contolZ.png";
var controlX = new Image();
controlX.src = "img/contolX.png";
var controlC = new Image();
controlC.src = "img/controlC.png";
var hpImg = new Image();
hpImg.src = "img/hpPiece.png";
var render = function(){
	if (bgReady){
		ctx.drawImage(bgImage, 0, 0);
	}
	for(var i = 0; i < objList.length; i++){
		if(objList[i] != ""){
			ctx.drawImage(objList[i].image, objList[i].x, objList[i].y, objList[i].width, objList[i].height);
		}
	}
	for(var i = 0; i < wallList.length; i++){
		if(wallList[i] != ""){
			ctx.drawImage(wallList[i].image, wallList[i].x, wallList[i].y, wallList[i].width, wallList[i].height)
		}
	}
	ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
	// score
	if(dash == 1){
		ctx.drawImage(controlZ,46-6, canvas.height - (2*46), 46,46);
	}
	if(arrow == 1){
		ctx.drawImage(controlX,46 * 2, canvas.height - (2*46), 46,46);
	}
	ctx.drawImage(controlC,46 * 3 + 6, canvas.height - (2*46),46,46);
	for(var i = 0; i < hp; i++){
		ctx.drawImage(hpImg,i*24+8,4,24,24);
	}
	//ctx.fillText("state: " + plState + "/" + hitTimer, 32,64);
};

// the main game loop
var main = function(){
	var now = Date.now();
	delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again, cuz game loop
	requestAnimationFrame(main);
};

// the init function of the game
var start = function(){

	if(player != null){ player = null; }
	player = new gameObj(0,0,32,32,"img/testUser.png", "player", level);
	if(lvlState == 1 && hp <= 0){
		level = level10;
	}else if(lvlState == 2 && hp <= 0){
		level = level20;
	}
	levelRead(level);
	main();

}
// cross browser support for requestAnimation
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//playing the game
var then = Date.now();
start();