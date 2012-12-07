var introSnd = new Audio('Sounds/BreakOut.mp3');
introSnd.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);
introSnd.play();

var introId;
var gameLoopId;
var lastTime = new Date();

var level = 1;
var gameEndLevel = 4;


var BLOCK_BORDER_WIDTH = 1;

var BallSpeed = 1;
var BallSpeedFactor = 2;

var introTextY = 400;
var introTextX = 20;
var introTextRadius = 0;

var score = new Score();








var context;




var paint;




var DEMO_MODE = false;
var showFps = true;


function startIntro() {
    var canvasDom = document.getElementById('GameCanvas');

    var setUp = new SetUp();

    canvasDom.width = setUp.width;
    canvasDom.height = setUp.height;
  
    
    canvasDom.style.cursor = "none";
   

    context = canvasDom.getContext('2d');
    var canvas = new Canvas(context, canvasDom, setUp.MARGING_UNDER_BAR);
    paint = new Paint(canvas);


    window.addEventListener('keydown', onKey, true);

    introId = setInterval(paint.introText, 5);
}






var bar;

var ball;

var board;
var startGame = function () {


    var setUp = new SetUp();


    ball = new Ball(setUp, BallSpeed, BallSpeedFactor);


    bar = new Bar(setUp);
    board = new Board(setUp);

    // draw once, but not in gameloop
    paint.drawBlocks(board.blocks);

    var canvasDom = document.getElementById('GameCanvas');
    canvasDom.addEventListener('mousemove', function (e) {
        bar.X = e.clientX;
        paint.drawBar(bar);
    }, true);

    gameLoopId = setInterval(gameLoop, 5);
};

var gameLoop = function () {
    var nowTime = new Date();
    var sidenSist = timeDifference(nowTime, lastTime);

    if (showFps) {
        paint.drawFps(Math.round(1 / (sidenSist / 1000)));
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


    var block = board.didBallHitBlock(ball);
    if (block !== null) {
        if (block.hit()) {
            paint.removeBlock(block);
        }
        score.Add(5);
        paint.drawScore(score.Score);
        paint.drawBlock(block);

        if (board.blocksLeft === 0) {
            // Level cleared
            score.Add(100 * level);
            level++;
            if (level === gameEndLevel) {
                // Hi-Score ?
            } else {
                clearInterval(gameLoopId);
                startGame();
            }
        }
    }

    if (ball.hitLower()) {
        if (DEMO_MODE) {
            ball.bounceOfCeling();
        } else {
            if (!ball.intersects(bar)) {
                // if ball misses bar, then game is over
                // Hi-Score
                level = 1;
                clearInterval(gameLoopId);
                startGame();
            } else {
                ball.bounceOfCeling();
            }
        }
    }

    paint.drawBall(ball);

};


var onKey = function(evt) {
    switch (evt.keyCode) {
    case 80:
// p was pressed (112)
        if (gameLoopId === null) {
            pauseGame();
        } else {
            resumeGame();
        }
        break;
    case 70:
// f
        showFps = !showFps;
        if (!showFps) paint.clearFps();
        break;
    case 68:
// d
        DEMO_MODE = !DEMO_MODE;
        break;
    case 69:
        clearInterval(introId);
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        startGame();
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

function timeDifference(endDate, startDate) {
    var difference = endDate.getTime() - startDate.getTime();
    return difference;
}