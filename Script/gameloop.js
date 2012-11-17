/*
Dont have them global
Add hightscore (online)
Use a game-engin for faster loop
Use sprites for bal, paddle and blocks
*/

var ball;
var bar;
var board;
var score;
var gameLoopId;
var DEMO_MODE = false;
var paint;
var showFps = false;
var startGame = function () {
    document.getElementById('startButton').style.visibility = 'hidden';
    var canvasDom = document.getElementById('GameCanvas');
    canvasDom.style.visibility = "visible";
    canvasDom.style.cursor = "none";
    WIDTH = (window.innerWidth);
    HEIGHT = (window.innerHeight);
    canvasDom.width = WIDTH;
    canvasDom.height = HEIGHT;


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

	//Bruker: ball, score, board
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


var lastTime = new Date(2010,5,10,8,0);

var gameLoop = function () {
	
	
	
	var nowTime = new Date();
	
	var sidenSist = timeDifference(nowTime, lastTime);
	

	if(showFps){
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

	//paint.drawBar(bar);
	paint.drawBall(ball);
	
};


function timeDifference(endDate,startDate) {
 var difference = endDate.getTime() - startDate.getTime();
 //difference = Math.floor(difference/1000);
 return difference;
} 

/*
var startDateTime = new Date(2010,5,10,8,0);
var endDateTime = new Date(2010,5,11,8,0); 
 
var secDiff = timeSecondDifference(endDateTime,startDateTime); 

*/