/*
Dont have them global
Add hightscore (online)
Use a game-engin for faster loop
Use sprites for bal, paddle and blocks
Lage Logo
Preload
Lage about
Lage Privacy
*/


var ball;
var bar;
var board;
var score;
var gameLoopId;
var DEMO_MODE = false;
var paint;
var showFps = false;


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

    var context = canvasDom.getContext('2d');
    var canvas = new CanvasObj(context, canvasDom);
    paint = new Paint(canvas);

    run();
};

var run = function () {
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

    gameLoopId = setInterval(gameLoop, 4);
};


var onKey = function (evt) {
    switch (evt.keyCode) {
    case 80:  // p was pressed (112)
        if (gameLoopId == null) {
            pauseGame();
            break;
        } else {
            resumeGame();
            break;
        }
    case 70:  // f
       showFps = !showFps;
	   if(!showFps) paint.clearFps();
    }
};

var pauseGame = function () {
    gameLoopId = setInterval(gameLoop, 0);
};

var resumeGame = function () {
    clearInterval(gameLoopId);
    gameLoopId = null;
};



var gameLoop = function () {
	var nowTime = new Date();
	var sidenSist = timeDifference(nowTime, lastTime);

	if (showFps) {
		paint.drawFps(Math.round(1 / (sidenSist/1000)));
	}
	lastTime = nowTime;
	
   var block = board.didBallHitBlock(ball, score);
   if(block != null) {
       score.Add(5);
	   paint.removeBlock(block);
       paint.drawScore(score.Score);
  
       if (board.blocksLeft == 0) {
           // Level cleared
           score.Add(100);
           clearInterval(gameLoopId);
			startGame();
		   
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


function timeDifference(endDate,startDate) {
    var difference = endDate.getTime() - startDate.getTime();
    return difference;
} 
