//instance create
var createObj = function(x,y,w,h,src,tag,lvl){
	var test = new gameObj(x,y,w,h,src,tag,lvl);
	for(var k = 0; k < objList.length; k++){
		if(objList[k] == ""){
			objList[k] = new gameObj(x,y,w,h,src,tag,lvl);
			objList[k].index = k;
			if(objList[k].type=="projectile"){
				objList[k].arDir = lvl;
			}
			return true;
		}
	}
}
var createWall = function(x,y,w,h){
	for(var k = 0; k < wallList.length; k++){
		if(wallList[k] == ""){
			wallList[k] = new wallObj(x,y,w,h);
			wallList[k].index = k;
			return true;
		}
	}
}