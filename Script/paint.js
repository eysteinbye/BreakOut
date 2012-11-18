var Paint = function (c) {
	this.canvas = c;
	
  };
  
Paint.prototype.drawScore = function (score) {

    var top = this.canvas.Height - MARGING_UNDER_BAR + BAR_HEIGHT; 
    var height = this.canvas.Height - top; 

    this.canvas.Context.clearRect(10, top, 300, height);

    this.canvas.Context.strokeStyle = "#ffffff";
    this.canvas.Context.font = '14px verdana';
    this.canvas.Context.strokeText('Score : ' + score, 10, (top+15));

};

Paint.prototype.drawFps = function (fps) {

    var top = 10;
    var height = 20; 

    this.canvas.Context.clearRect(10, top, 300, height);

    this.canvas.Context.strokeStyle = "#ffffff";
    this.canvas.Context.font = '14px verdana';
    this.canvas.Context.strokeText('FPS : ' + fps, 10, (top+15));

};

Paint.prototype.clearFps = function () {

    var top = 10;
    var height = 20; 

    this.canvas.Context.clearRect(10, top, 300, height);

};


Paint.prototype.drawBar = function (bar) {

    var borderWidth = 1;

    this.canvas.Context.clearRect(0, bar.Y, this.canvas.Width, bar.Height);
    this.canvas.Context.beginPath();
    var gradient = this.canvas.Context.createLinearGradient(bar.X, bar.Y, bar.X, bar.Y + bar.Height)
    gradient.addColorStop(0, 'Gray');
    gradient.addColorStop(.3, 'White');
    gradient.addColorStop(.5, 'White');
    gradient.addColorStop(1, 'Gray');
    this.canvas.Context.fillStyle = gradient;
    this.canvas.Context.rect(bar.X + borderWidth, bar.Y + borderWidth, bar.Width - (borderWidth * 2), bar.Height - (borderWidth * 2));
    this.canvas.Context.fill();

    this.canvas.Context.lineWidth = borderWidth;
    this.canvas.Context.strokeStyle = "white";
    this.canvas.Context.stroke();


};
Paint.prototype.drawBall = function (ball) {
    //  Clear the old ball
    this.canvas.Context.clearRect(ball.X - ball.Radius, ball.Y - ball.Radius, ball.Diameter, ball.Diameter);
    // Move the ball
    ball.move();
    // Draw the ball

    this.canvas.Context.beginPath();
    var gradient = this.canvas.Context.createRadialGradient(ball.X, ball.Y, 5, ball.X + 10, ball.Y + 10, 40)
    gradient.addColorStop(0, 'White');
    gradient.addColorStop(.5, 'Gray');
    this.canvas.Context.fillStyle = gradient;
    // Draws a circle of radius 20 
    this.canvas.Context.arc(ball.X, ball.Y, ball.Radius, 0, Math.PI * 2, true);
    this.canvas.Context.closePath();
    this.canvas.Context.fill();

};


Paint.prototype.drawBlock = function (block) {

    if (block.Show) {

        var borderWidth = BLOCK_BORDER_WIDTH;


        this.canvas.Context.beginPath();
		var gradient;      
	
		if(block.hitsLeft==2){
			gradient = this.canvas.Context.createLinearGradient(block.X, block.Y, block.X + block.Width, block.Y + block.Height)
        	gradient.addColorStop(0, 'Magenta');
        	gradient.addColorStop(.5, 'Pink');
        	gradient.addColorStop(1, 'Yellow');
		}else if(block.hitsLeft==1){
			gradient = this.canvas.Context.createLinearGradient(block.X, block.Y, block.X + block.Width, block.Y + block.Height)
    		gradient.addColorStop(0, 'Blue');
    		gradient.addColorStop(.5, 'gray');
    		gradient.addColorStop(1, 'black');
		}
		
		this.canvas.Context.fillStyle = gradient;




        this.canvas.Context.rect(block.X + borderWidth, block.Y + borderWidth, block.Width - (borderWidth * 2), block.Height - (borderWidth * 2));
        this.canvas.Context.fill();
        this.canvas.Context.lineWidth = borderWidth;
        this.canvas.Context.strokeStyle = "White";
        this.canvas.Context.stroke();

    }

};
Paint.prototype.drawBlocks = function (blocks) {

    for (var i = 0; i < blocks.length; i++) {

		this.drawBlock(blocks[i]);

    }

};

Paint.prototype.removeBlock = function (block) {
	board.blocksLeft--;
    this.canvas.Context.clearRect(block.X, block.Y, block.Width, block.Height + 1);

};