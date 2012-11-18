var blockObj = function (x, y, durability) {
    this.X = x;
    this.Y = y;
    this.Width = BLOCK_WIDTH;
    this.Height = BLOCK_HEIGHT;
    this.Upper = this.Y;
    this.Lower = this.Y + this.Height;
    this.Right = this.X + this.Width;
    this.Left = this.X;
	this.hitsLeft = durability;
    this.Show = true;

};

// Do we intersect a corner
blockObj.prototype.intersectCorner = function (ball) {
    var corner = false;
    if (this.Show) {
        if (this.Lower == ball.Upper() && this.Left == ball.Right() && ball.goingUpRight()) corner = true; // Lower left corner
        if (this.Lower == ball.Upper() && this.Right == ball.Left() && ball.goingUpLeft()) corner = true; // Lower right corner
        if (this.Upper == ball.Lower() && this.Left == ball.Right() && ball.goingDownRight()) corner = true; // Upper Left corner
        if (this.Upper == ball.Lower() && this.Right == ball.Left() && ball.goingDownLeft()) corner = true; // Upper Right corner
    }
    return corner;
};

blockObj.prototype.intersectSide = function (ball) {
    var side = false;
    if (this.Show) {
        if ((this.Upper < ball.Upper() && ball.Upper() < this.Lower) || (this.Upper < ball.Lower() && ball.Lower() < this.Lower)) {
            if (this.Right == ball.Left() || this.Left == ball.Right()) {
                side = true;
            }
			/*
            if (this.Right+1 == ball.Left() || this.Left+1 == ball.Right()) {
                side = true;
            }
			*/
        }
    }
    return side;
};

blockObj.prototype.intersectFlat = function (ball) {
    var flat = false;
    if (this.Show) {
        if (this.leftSideWithinBlock(ball) || this.rightSideWithinBlock(ball)) {
            if ( this.hitFromUnder(ball) || this.HitFromOver(ball) ) {
                flat = true;
            }
        }
    }
    return flat;
};



blockObj.prototype.rightSideWithinBlock = function (ball) {
	return (this.Left <= ball.Right() && ball.Right() <= this.Right);
};

blockObj.prototype.leftSideWithinBlock = function (ball) {
	return (this.Left <= ball.Left() && ball.Left() <= this.Right);
};



blockObj.prototype.hitFromUnder = function (ball) {
	return (ball.Upper() <= this.Lower && ball.Upper() >=  this.Upper);
};

blockObj.prototype.HitFromOver = function (ball) {
	return (ball.Lower() >= this.Upper && ball.Lower() <= this.Lower);
};



blockObj.prototype.hit = function () {
 	this.hitsLeft--;
    if(this.hitsLeft == 0){
	    this.Show = false;
	    paint.removeBlock(this);	   
    }
	   
};
