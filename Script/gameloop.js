var gameLoop = function() {
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
    if (block != null) {
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

var onKey = function(evt) {
    switch (evt.keyCode) {
    case 80:
// p was pressed (112)
        if (gameLoopId == null) {
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
    }
};

var pauseGame = function() {
    gameLoopId = setInterval(gameLoop, 0);
};

var resumeGame = function() {
    clearInterval(gameLoopId);
    gameLoopId = null;
};

function timeDifference(endDate, startDate) {
    var difference = endDate.getTime() - startDate.getTime();
    return difference;
}