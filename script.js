window.onload = () => {
	window.onresize = boxSize
	boxSize()
	startPage()
}

var interwalel
var board
var pressedArrow = ""
var direction = ""
var sizeBar = [4, 4]
var size = [sizeBar[0]*2+3, sizeBar[1]*2+7]
var speedBar = 2
var speed = 200
var apple = [0,0]
var texturesBar = 0
var textures = {0:"default",1:"holy-shit",2:"ukraina",3:"duda",4:"arnold"}
var speedNames = {0:"bardzo wolna",1:"wolna",2:"normalna",3:"szybka",4:"bardzo szybka"}
var bsize = 50

function boxSize() {
	var bs1 = Math.floor(window.innerHeight / (size[0]))
	var bs2 = Math.floor(window.innerWidth / (size[1]))
	bsize = bs1>bs2?bs2:bs1
	//bsize = bs1
	document.documentElement.style.setProperty('--box-size', bsize+'px');
}
function startPage(){
	document.getElementsByTagName("main")[0].innerHTML='<h1>Swobodny wenż</h1>Tekstury:<br><input id="textures" type="range" min="0" max="'+(Object.keys(textures).length-1)+'" value="'+texturesBar+'"><br><span id="texturesDisplay">'+textures[texturesBar]+'</span><br><br><div id="texturesPresentation"><div id="texturesPresentation"><img class="dimg" src="resources/'+textures[texturesBar]+'/skin0.png"><img class="dimg" src="resources/'+textures[texturesBar]+'/skin1.png"><img class="dimg" src="resources/'+textures[texturesBar]+'/skin2.png"> <img class="dimg" src="resources/'+textures[texturesBar]+'/fruit.png"> <img class="dimg" src="resources/'+textures[texturesBar]+'/background.png"></div></div><br>Wysokość planszy:<input id="boardHeight" type="range" min="1" max="8" value="'+sizeBar[0]+'"><span id="boardHeightDisplay">'+size[0]+'</span><br>Szerokość planszy:<input id="boardWidth" type="range" min="1" max="8" value="'+sizeBar[1]+'"><span id="boardWidthDisplay">'+size[1]+'</span><br>Szybkość:<input id="boardSpeed" type="range" min="0" max="4" value="'+speedBar+'"><span id="boardSpeedDisplay">normalna</span><br><br><button onclick=\'start(size[0],size[1])\'>Rozpocznij!</button>';
	document.querySelector("#textures").oninput = function(){
		texturesBar = this.value;
		var fldName = textures[texturesBar];
		document.querySelector("#texturesDisplay").innerHTML = fldName+":";
		document.querySelector("#texturesPresentation").innerHTML = '<img class="dimg" src="resources/'+fldName+'/skin0.png"><img class="dimg" src="resources/'+fldName+'/skin1.png"><img class="dimg" src="resources/'+fldName+'/skin2.png">&emsp;<img class="dimg" src="resources/'+fldName+'/fruit.png">&emsp;<img class="dimg" src="resources/'+fldName+'/background.png">';
		document.documentElement.style.setProperty('--skin0', 'url("resources/'+fldName+'/skin0.png")');
		document.documentElement.style.setProperty('--skin1', 'url("resources/'+fldName+'/skin1.png")');
		document.documentElement.style.setProperty('--skin2', 'url("resources/'+fldName+'/skin2.png")');
		document.documentElement.style.setProperty('--bgground', 'url("resources/'+fldName+'/background.png")');
		document.documentElement.style.setProperty('--fruit', 'url("resources/'+fldName+'/fruit.png")');
	}
	document.querySelector("#boardHeight").oninput = function(){
		sizeBar[0] = this.value;
		size[0] = sizeBar[0]*2+3;
		document.querySelector("#boardHeightDisplay").innerHTML = size[0];
		boxSize()
	}
	document.querySelector("#boardWidth").oninput = function(){
		sizeBar[1] = this.value;
		size[1] = sizeBar[1]*2+7;
		document.querySelector("#boardWidthDisplay").innerHTML = size[1];
		boxSize()
	}
	document.querySelector("#boardSpeed").oninput = function(){
		speedBar = this.value;
		document.querySelector("#boardSpeedDisplay").innerHTML = speedNames[speedBar];
		if (this.value == 0){
			speed = 500;
		}
		else if (this.value == 1){
			speed = 300;
		}
		else if (this.value == 2){
			speed = 200;
		}
		else if (this.value == 3){
			speed = 100;
		}
		else if (this.value == 4){
			speed = 50;
		}
	}
}

function placeApple(){
	var repeat = true;
	while (repeat){
		repeat = false;
		var x = Math.floor(Math.random()*size[0]);
		var y = Math.floor(Math.random()*size[1]);
		for (const i of board){
			if(i[0]==x && i[1]==y){
				repeat = true;
			}
		}
	}
	apple = [x,y];
}
function game(){
	var panzerkampfwagen = "";
	var xmov = 0;
	var ymov = 0;

	/* Określenie kierunku */
	if (pressedArrow=="ArrowUp" && direction!="down"){
		direction = "up";
	}
	else if (pressedArrow=="ArrowDown" && direction!="up"){
		direction = "down";
	}
	else if (pressedArrow=="ArrowLeft" && direction!="right"){
		direction = "left";
	}
	else if (pressedArrow=="ArrowRight" && direction!="left"){
		direction = "right";
	}

	/* Ruch */
	if (direction == "up"){
		ymov = -1;
		document.documentElement.style.setProperty('--headdirection', "50% 50% 0 0");
	}
	else if (direction == "down"){
		ymov = 1;
		document.documentElement.style.setProperty('--headdirection', "0 0 50% 50%");
	}
	else if (direction == "left"){
		xmov = -1;
		document.documentElement.style.setProperty('--headdirection', "50% 0 0 50%");
	}
	else if (direction == "right"){
		xmov = 1;
		document.documentElement.style.setProperty('--headdirection', "0 50% 50% 0");
	}

	/* Tworzenie w tablicy nowego punktu bycia wonza */
	if (xmov != 0 || ymov != 0){
		board.push([(board[board.length-1][0] + ymov),(board[board.length-1][1] + xmov)])
	}
	var lose = false
	/* sprawdzanie samouderzenia */
	for (var i = 0; i<board.length-1; i++){
		if(board[i]+""==board[board.length-1]+"" && direction!=""){
			lose = true
		}
	}
	if ((board[board.length-1][0]>=size[0] || board[board.length-1][1]>=size[1] || board[board.length-1][0]<0 || board[board.length-1][1]<0) || lose){
		/* W razie przegranej */
		document.querySelector("#snake").innerHTML += '<span id="snejklus">Przegrałeś!!!</span><div id="wynikulus">Wynik: '+(board.length-4)+'</div><div id="divulus"><button onclick="start()">Jeszcze raz</button> <button onclick="startPage()">Zmień ustawienia</button></div>';
		clearInterval(interwalel);
		pressedArrow = "";
	}
	else{
		document.querySelector("#snake").innerHTML = "";
		/* Sprawdzanie czy jabłko wszamane i losowanie mu nowej pozycji */
		if ((board[board.length-1][0] == apple[0] && board[board.length-1][1] == apple[1]) == false && direction != ""){
			board.splice(0,1)
		}
		else{
			placeApple();
		}
		/* Wyświetlanie ciała wonża */
		for (var i = 0; i < board.length-1; i++){
			if ((board.length-i)%2==0){
				var ins = "ba";
			}
			else{
				var ins = "bb"
			}
			document.querySelector("#snake").innerHTML += '<div class="a '+ins+'" style="top: calc(var(--box-size) * '+board[i][0]+'); left: calc(var(--box-size) * '+board[i][1]+');"></div>';
		}
		/* Wyświetlanie głowy wonża */
		document.querySelector("#snake").innerHTML += '<div class="a c" style="top: calc(var(--box-size) * '+board[board.length-1][0]+'); left: calc(var(--box-size) * '+board[board.length-1][1]+');"></div>';
		/* Wyświetlanie owoceła */
		document.querySelector("#snake").innerHTML += '<div id="frucht" style="top: calc(var(--box-size) * '+apple[0]+'); left: calc(var(--box-size) * '+apple[1]+');"></div>';
	}
}
function start(){
	direction = "";
	pressedArrow = "";
	document.documentElement.style.setProperty('--headdirection', "0 0 0 0");
	board = [[Math.floor((size[0])/2),Math.floor((size[1])/2)],[Math.floor((size[0])/2),Math.floor((size[1])/2)],[Math.floor((size[0])/2),Math.floor((size[1])/2)]];
	document.documentElement.style .setProperty('--hei', size[0]);
	document.documentElement.style .setProperty('--wid', size[1]);
	document.getElementsByTagName("main")[0].innerHTML='<div id="snake"></div>';
	interwalel = setInterval(game,speed);
	game();
}
document.addEventListener('keydown', (e) => {
	pressedArrow = e.code;
});
