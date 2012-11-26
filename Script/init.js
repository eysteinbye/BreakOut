/*
Lag hiScore pproject
Lag game controller project
Add hightscore (online)
Use sprites for ball, paddle and blocks
Lage Logo
Preload
Lage about
Lage Privacy
Sound Windows
Move padle by tilting device
Inc speed if tilted forward
Lock orientation

*/






var introId;


var introSnd = new Audio('Sounds/BreakOut.mp3');

introSnd.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
introSnd.play();


var YY = 400;
var XX = 20;		
var tt = 0;
var context;

var level = 1;
var gameEndLevel = 4;
var ball;
var bar;
var board;
var score = new Score();

var paint;

var gameLoopId;

var DEMO_MODE = false;
var showFps = true;

var HEIGHT;
var WIDTH;

var BALL_START_X;
var BALL_START_Y;
var BALL_RADIUS = 10;

var BAR_START_X;
var BAR_WIDTH;
var BAR_HEIGHT;

var MARGING_UNDER_BAR;

var BLOCKS_START_LEFT;
var BLOCKS_START_TOP;

var NUMBER_OF_BLOCKROWS = 7;
var NUMBER_OF_BLOCKS_ON_ROW = 10;

var BLOCK_HEIGHT;
var BLOCK_WIDTH;
var BLOCK_BORDER_WIDTH = 1;

var lastTime = new Date();





function startIntro() {		
	document.getElementById('startButton').style.visibility = 'hidden';
	var canvasDom = document.getElementById('GameCanvas');
	canvasDom.style.visibility = "visible";
	canvasDom.style.cursor = "none";
	WIDTH = (window.innerWidth);
	HEIGHT = (window.innerHeight);
	canvasDom.width = WIDTH;
	canvasDom.height = HEIGHT;

	BLOCKS_START_LEFT = WIDTH / 10;
	BLOCKS_START_TOP = WIDTH / 20;

	var widthOfAllBlocks = WIDTH - (BLOCKS_START_LEFT * 2);
	BLOCK_WIDTH = widthOfAllBlocks / NUMBER_OF_BLOCKS_ON_ROW;

	var heightOfAllBlocks = HEIGHT / 3;
	BLOCK_HEIGHT = heightOfAllBlocks / NUMBER_OF_BLOCKROWS;

	MARGING_UNDER_BAR = BLOCK_HEIGHT;

	BALL_START_X = WIDTH / 2;
	BALL_START_Y = HEIGHT - Math.round(MARGING_UNDER_BAR * 2);

	BAR_START_X = WIDTH / 2;
	BAR_HEIGHT = BLOCK_HEIGHT / 2;
	BAR_WIDTH = BLOCK_WIDTH;
	if (BAR_WIDTH <= 50) BAR_WIDTH = 50;

	 context = canvasDom.getContext('2d');
	var canvas = new Canvas(context, canvasDom);
	paint = new Paint(canvas);	
	
	
    window.addEventListener('keydown', onKey, true);
	
 	introId = setInterval(paint.introText, 5);
}


		
	function randomColor(){
		return '#'+Math.floor(Math.random()*16777215).toString(16);
	}	

	function radi(r){
		r += 0.03;
		if(r > Math.PI * 2) r = 0;
		return r;
	}

	function bounce(radius){
		return (50 * Math.cos(radius)) + 150;
	}


var startGame = function() {

    ball = new Ball();
    bar = new Bar();
    board = new Board();

    // draw once, but not in gameloop
    paint.drawBlocks(board.blocks);

var canvasDom = document.getElementById('GameCanvas');
    canvasDom.addEventListener('mousemove', function(e) {
        bar.X = e.clientX;
        paint.drawBar(bar);
    }, true);

    gameLoopId = setInterval(gameLoop, 5);
};