//alert("hi");
var level0 = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,20,0,0,10,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,2,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1]
];
var level10 = [
	[1,1,1,1,11,11,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,2,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1]
];
var level11 = [
	[1,1,1,1,12,12,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,3,0,0,0,0,0,1],
	[1,0,0,0,4,4,0,0,0,1],
	[1,0,0,0,4,4,0,3,0,1],
	[1,0,3,0,0,0,3,0,0,1],
	[1,0,0,0,3,0,0,0,0,1],
	[1,0,0,0,0,0,3,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,0,2,1,1,1,1]
];
var level12 = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,4,1],
	[1,0,0,0,4,0,0,0,0,1],
	[1,4,0,1,1,1,1,0,0,1],
	[13,0,0,1,0,0,1,0,0,1],
	[13,0,0,1,0,0,1,0,0,1],
	[1,1,1,1,1,1,1,4,0,1],
	[1,5,5,1,0,0,0,0,0,1],
	[1,5,5,1,0,0,0,0,0,1],
	[1,1,1,1,0,2,1,1,1,1]
];
var level13 = [
	[1,1,1,1,14,14,1,1,1,1],
	[1,4,0,0,0,0,1,4,0,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,1,1,1,0,0,1],
	[1,0,0,0,0,0,0,0,0,0],
	[1,0,0,0,0,0,0,0,0,2],
	[1,4,0,0,0,1,0,0,0,1],
	[1,0,0,0,0,1,0,4,0,1],
	[1,0,0,0,4,1,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1]
];
var level14 = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,1,0,0,1,0,0,1],
	[1,0,0,1,0,6,1,0,0,1],
	[1,0,0,1,1,1,1,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,0,2,1,1,1,1]
];
var level20 = [
	[1,1,1,1,21,21,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,2,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1]
];
var level21 = [
	[1,1,1,1,22,22,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,3,0,0,0,0,0,0,1],
	[1,0,0,0,3,0,0,0,0,1],
	[1,0,0,0,0,0,3,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,0,2,1,1,1,1]
];
var level22 = [
	[1,1,1,1,23,23,1,1,1,1],
	[1,5,5,5,0,0,0,0,3,1],
	[1,0,0,5,0,5,0,3,3,1],
	[1,5,0,0,5,5,1,3,3,1],
	[1,0,5,5,5,5,1,3,3,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,0,0,0,0,0,1,0,0,1],
	[1,5,5,5,5,5,5,1,1,1],
	[1,5,5,5,0,0,5,5,5,1],
	[1,1,1,1,0,2,1,1,1,1]
];
var level23 = [
	[1,1,1,1,24,24,1,1,1,1],
	[1,0,0,0,0,0,0,3,0,1],
	[1,0,3,0,0,0,0,0,0,1],
	[1,5,1,1,1,1,1,5,1,1],
	[1,0,0,1,5,5,1,0,0,1],
	[1,3,0,1,0,0,1,0,3,1],
	[1,0,3,1,1,1,1,3,0,1],
	[1,0,0,1,0,0,1,0,0,1],
	[1,0,0,1,0,0,1,0,0,1],
	[1,1,1,1,0,2,1,1,1,1]
];
var level24 = [
	[1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,1,0,0,1,0,0,1],
	[1,0,0,1,0,7,1,0,0,1],
	[1,0,0,1,1,1,1,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,0,2,1,1,1,1]
];

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
	