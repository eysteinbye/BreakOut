var gameLoop = function () {
   var block = board.didBallHitBlock(ball, score);
   if(block != null) {
       score.Add(5);
	   paint.removeBlock(block);
       paint.drawScore(score.Score);
  
       if (board.blocksLeft == 0) {
           // Level cleared
           score.Add(100);
           clearInterval(gameLoopId);
       }
   }
   
    if (ball.hitLower()) {
        if (DEMO_MODE)
            ball.bounceOfCeling();
        else {
            if (!ball.intersects(bar)) {
                // if ball misses bar, then game is over
                clearInterval(gameLoopId);
            }
        }
    }

	//paint.drawBar(bar);
	paint.drawBall(ball);
	
};