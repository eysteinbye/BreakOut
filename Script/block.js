var blockObj = function ( x, y) {
    this.X = x;
    this.Y = y;
    this.Width = BLOCK_WIDTH;
    this.Height = BLOCK_HEIGHT;
    this.Upper = this.Y;
    this.Lower = this.Y + this.Height;
    this.Right = this.X + this.Width;
    this.Left = this.X;
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
        if (corner) this.remove();
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

        }

        if (side) this.remove();
    }
    return side;

};
blockObj.prototype.intersectFlat = function (ball) {

    var flat = false;
    if (this.Show) {

        if ((this.Left < ball.Left() && ball.Left() < this.Right) || (this.Left < ball.Right() && ball.Right() < this.Right)) {
			
 //           if (this.Upper == ball.Lower() || this.Lower == ball.Upper()) {
 
 // En bedre sjekk som tillater at ballen beveger seg mer enn 1
 // er den mye tregere?
            if ((ball.Upper() <= this.Lower && ball.Upper() >=  this.Upper) || (ball.Lower() >= this.Upper && ball.Lower() <= this.Lower) ) {
                flat = true;

            }

        }
        if (flat) this.remove();
    }
    return flat;

};

blockObj.prototype.remove = function () {
    this.Show = false;
};
