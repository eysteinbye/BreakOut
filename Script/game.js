var lastTime = new Date(2010,5,10,8,0);

var gameLoop = function () {
	
	
	
	var nowTime = new Date();
	
	var sidenSist = timeDifference(nowTime, lastTime);
	
	
	
	
    var ee = document.getElementById('www');
ee.innerHTML = (1 / (sidenSist/1000));
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