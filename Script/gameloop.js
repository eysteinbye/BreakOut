/*
Ikke gjør dette mer avansert nå, før alle bugs er fixa

Dont have them global
Add hightscore (online)
Use a game-engin for faster loop
Use sprites for ball, paddle and blocks
Lage Logo
Preload
Lage about
Lage Privacy
Sound Windows
Move padle by tilting device
Inc speed if tilted forward
Lock orientation

Bug : ball detect from side
Bug : 2x blocks get mark when ball returns
Bug : ball hits corner on block even if block is suronded by other blocks
*/


var ball;
var bar;
var board;
var score;
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

var MARGING_UNDER_BAR = 50;


var BLOCKS_START_LEFT = 100;
var BLOCKS_START_TOP = 100;

var NUMBER_OF_BLOCKROWS = 7;
var NUMBER_OF_BLOCKS_ON_ROW = 10;

var BLOCK_HEIGHT;
var BLOCK_WIDTH;
var BLOCK_BORDER_WIDTH = 1;


var lastTime = new Date();

var startGame = function () {
    document.getElementById('startButton').style.visibility = 'hidden';
    var canvasDom = document.getElementById('GameCanvas');
    canvasDom.style.visibility = "visible";
    canvasDom.style.cursor = "none";
    WIDTH = (window.innerWidth);
    HEIGHT = (window.innerHeight);
    canvasDom.width = WIDTH;
    canvasDom.height = HEIGHT;

    var widthOfAllBlocks = WIDTH - (BLOCKS_START_LEFT * 2);
    BLOCK_WIDTH = widthOfAllBlocks / NUMBER_OF_BLOCKS_ON_ROW;

    var heightOfAllBlocks = HEIGHT / 3;
    BLOCK_HEIGHT = heightOfAllBlocks / NUMBER_OF_BLOCKROWS;

    BALL_START_X = WIDTH / 2;
    BALL_START_Y = HEIGHT / 2;

    BAR_START_X = WIDTH / 2;
    BAR_HEIGHT = BLOCK_HEIGHT / 2;
    BAR_WIDTH = BLOCK_WIDTH;
	if(BAR_WIDTH<=50) BAR_WIDTH=50;

    var context = canvasDom.getContext('2d');
    var canvas = new CanvasObj(context, canvasDom);
    paint = new Paint(canvas);

	ball = new BallObj();
    bar = new BarObj();
    board = new BoardObj();
			
	score = new ScoreObj();

	// draw once, but not in gameloop
  	paint.drawBlocks(board.blocks);
			
    window.addEventListener('keydown', onKey, true);
			
    var canvasDom = document.getElementById('GameCanvas');
			
	canvasDom.addEventListener('mousemove', function (e){ 
		bar.X = e.clientX; 
		paint.drawBar(bar);	
	}, true);

    gameLoopId = setInterval(gameLoop, 5);
};

var gameLoop = function () {
	var nowTime = new Date();
	var sidenSist = timeDifference(nowTime, lastTime);

	if (showFps) {
		paint.drawFps(Math.round(1 / (sidenSist/1000)));
	}
	lastTime = nowTime;
	
	/*
	var inc = 4;
	if( Math.abs(bye) > 0.5 ) inc = 5;
	if( Math.abs(bye) > 0.8 ) inc = 7;
	bar.X += (bye*inc);
	if(bar.X<0) bar.X = 0;
	var dd =  document.getElementById('GameCanvas').width;
	if(bar.X>(dd-BAR_WIDTH)) bar.X = dd-BAR_WIDTH;
	paint.drawBar(bar);	
	
	*/
	
	
   var block = board.didBallHitBlock(ball, score);
   if(block != null) {
	   block.hit();
       score.Add(5);
       paint.drawScore(score.Score);
	   // Redraw
   	   paint.drawBlock(block);
  
       if (board.blocksLeft == 0) {
           // Level cleared
           score.Add(100);
           clearInterval(gameLoopId);
			startGame();
			// Start level 2
		   
       }
   }
   
    if (ball.hitLower()) {
        if (DEMO_MODE)
            ball.bounceOfCeling();
        else {
            if (!ball.intersects(bar)) {
                // if ball misses bar, then game is over
                clearInterval(gameLoopId);
				startGame();
            }
        }
    }

	paint.drawBall(ball);

};

var onKey = function (evt) {
    switch (evt.keyCode) {
    case 80:  // p was pressed (112)
        if (gameLoopId == null) {
            pauseGame();			
        } else {
            resumeGame();
        }
        break;				
    case 70:  // f
       showFps = !showFps;
	   if(!showFps) paint.clearFps();
       break;
	case 68: // d
		DEMO_MODE = !DEMO_MODE;
   		break;
	}	
};

var pauseGame = function () {
    gameLoopId = setInterval(gameLoop, 0);
};

var resumeGame = function () {
    clearInterval(gameLoopId);
    gameLoopId = null;
};

function timeDifference(endDate,startDate) {
    var difference = endDate.getTime() - startDate.getTime();
    return difference;
} 
