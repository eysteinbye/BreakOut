var gameLoop = function() {
	board.didBallHitBlock(ball,score);
		
	if(board.blocksLeft == 0){
		// Level cleared
		score.Add(100);
		clearInterval(gameLoopId);
	}
		
	if(ball.hitLower()){
		if(DEMO_MODE)
			ball.bounceOfCeling();
		else{
			if (!ball.intersects(bar)) {
				// if ball misses bar, then game is over
				clearInterval(gameLoopId);
			}
		}
	}
		
	bar.draw();
	ball.draw();
};