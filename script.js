var matrix = [];
var rain;

for(var i=0; i<20; i++) {
    matrix[i] = [];
    for(var j=0; j<20; j++) {
        matrix[i][j] = '.';
	}
}

var gusti = {
	pos:{
		x:0,
		y:0
	},
	moves: 0,
	points: 0,
	dificulty: 0.1,
	lifes: 3
}

function displayMatrix(){
	var line = '';
	for(var i=19; i>=0; i--) {
		for(var j=0; j<20; j++) {
			if (i === gusti.pos.x && j === gusti.pos.y){
				if (matrix[i][j] === 'X'){
					gotHit();
					matrix[i][j] = '.';
				}
					line +='<div class="elem"><img src="gusti.gif" alt="X" width="30" height="30" align="middle"></div>';
				

			}else if(matrix[i][j] === 'rup'){
				line +='<div class="elem"><img src="rupert.gif" alt="Rup" width="30" height="30" align="middle"></div>';
			}else if(matrix[i][j] === 'X'){
				// line +='<div class="elem"><img src="monkey.gif" alt="X" width="30" height="30" align="middle"></div>';
				// var rand = 0;
				
				switch (gusti.dificulty) {
					case  0.1:
					case  0.15:
						line +='<div class="elem"><img src="monkey.gif" alt="X" width="30" height="30" align="middle"></div>';
					  break;
					case 0.2:
					case 0.25:
					case 0.3:
						line +='<div class="elem"><img src="herbert.jpg" alt="X" width="30" height="30" align="middle"></div>';
					  break;
					case 0.35:
					case 0.4:
						line +='<div class="elem"><img src="consuela.png" alt="X" width="30" height="30" align="middle"></div>';
					  break;
					case 0.45:
					case 0.5:
						line +='<div class="elem"><img src="cock.png" alt="X" width="30" height="30" align="middle"></div>';
					  break;
				}
			}else{
				line +='<div class="elem">' + matrix[i][j] + '</div>';
			}				
		}
		// console.log(line);
		line += '<br>';
	}
	document.getElementById("map").innerHTML = line;
}

function goUp(){
	gusti.moves++;
	document.getElementById("moves").innerHTML = "moves: " + gusti.moves;
	if(gusti.pos.x<19){
		gusti.pos.x++;
	}
	if(matrix[gusti.pos.x][gusti.pos.y] === 'rup'){
		getRupert();
	}
	displayMatrix();	
}

function goDown(){
	gusti.moves++;
	document.getElementById("moves").innerHTML = "moves: " + gusti.moves;
	if(gusti.pos.x>0){
		gusti.pos.x--;
	}
	if(matrix[gusti.pos.x][gusti.pos.y] === 'rup'){
		getRupert();
	}
	displayMatrix();
}

function goRight(){
	gusti.moves++;
	document.getElementById("moves").innerHTML = "moves: " + gusti.moves;
	if(gusti.pos.y<19){
		gusti.pos.y++;
	}
	if(matrix[gusti.pos.x][gusti.pos.y] === 'rup'){
		getRupert();
	}
	displayMatrix();
}

function goLeft(){
	gusti.moves++;
	document.getElementById("moves").innerHTML = "moves: " + gusti.moves;
	if(gusti.pos.y>0){
		gusti.pos.y--;
	}
	if(matrix[gusti.pos.x][gusti.pos.y] === 'rup'){
		getRupert();
	}
	displayMatrix();
}

window.addEventListener("keydown", function (event) {
// debugger;
  switch (event.keyIdentifier) {
    case "Down":
		goDown();
      break;
    case "Up":
        goUp();
      break;
    case "Left":
        goLeft();
      break;
    case "Right":
        goRight();
      break;
	case "U+0020":
	    start();
	  break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Consume the event for suppressing "double action".
  event.preventDefault();
}, true);

function start(){
	rain = setInterval(function(){ myTimer() }, 1000);
}


function myTimer() {
	for (var y = 1; y < 20; y++){
		for (var x = 0; x < 20; x++){
			// console.log("x = " + x + "; y = " + y);
			// debugger;
			if (matrix[y][x] === 'X'){
				if(matrix[y-1][x] === 'rup'){
					matrix[y-2][x] = 'X';
				}else{
					matrix[y-1][x] = 'X';
				}
				// matrix[y][x] = 0;
			}else if(matrix[y-1][x] !== 'rup'){
				matrix[y-1][x] = '.';
			}
		}
	}
	
    for (var i = 19; i >= 0; i--){
		if (Math.random() < gusti.dificulty){
			matrix[19][i] = 'X';
		} else {
			matrix[19][i] = '.';
		}
	}
    displayMatrix();
}

function rainStop() {
    clearInterval(rain);
}



function generateRupert(){
	matrix[gusti.pos.x][gusti.pos.y] = '.';
	var x = Math.floor(Math.random()*18)+1;
	var y = Math.floor(Math.random()*18)+1;
	matrix[x][y] = 'rup';
	console.log("rup e la x= "+ x + ' y= ' + y)
	displayMatrix();
};
generateRupert();

function getRupert(){
	gusti.points += gusti.dificulty*20;
	generateRupert();
	document.getElementById("points").innerHTML = "points: " + gusti.points;
}

function setLevel(){
	gusti.dificulty = document.getElementById("level").value/20;
}

function gotHit(){
	gusti.lifes--;
	document.getElementById("lifes").innerHTML = "lifes: " + gusti.lifes;
	if (gusti.lifes === 0){
		alert("Ai perit! Scorule tau este " + gusti.points);
	}
}








