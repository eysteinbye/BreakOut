

var BallSpeed = 2;
var BallSpeedFactor = 1.5;

var BallObj = function () {

    this.X = BALL_START_X;
    this.Y = BALL_START_Y;
    this.dx = BallSpeed;
    this.dy = -BallSpeed;
    this.Radius = BALL_RADIUS;
    this.Diameter = this.Radius * 2;

    this.Left = function () { return this.X - this.Radius; };
    this.Right = function () { return this.X + this.Radius; };
    this.Lower = function () { return this.Y + this.Radius; };
    this.Upper = function () { return this.Y - this.Radius; };

    this.boundarySnd = new Audio('boundary.mp3');
    this.outSnd = new Audio('out.mp3');

};

BallObj.prototype.move = function () {
    this.X += this.dx;
    this.Y += this.dy;
    if (this.Left() <= 0 || this.Right() >= WIDTH) this.bounceOfWall();
    if (this.Upper() <= 0) this.bounceOfCeling();

};

BallObj.prototype.bounceOfWall = function () {

    this.dx = -this.dx;

};
BallObj.prototype.bounceOfCeling = function () {

    this.dy = -this.dy;
    this.boundarySnd.play();

};


BallObj.prototype.bounceOfBar = function () {

    var posOnBar = this.X - bar.X;
    var rel = (posOnBar / bar.Width) * 100;

    if (Math.abs(this.dy) == (BallSpeed * BallSpeedFactor)) this.dy /= (BallSpeed * BallSpeedFactor);

    this.dy = -this.dy;
    if (rel < 10) {

        this.dy *= (BallSpeed*BallSpeedFactor);
        this.dx = -BallSpeed;

    } else if (rel > 90) {

        this.dy *= (BallSpeed * BallSpeedFactor);
        this.dx = BallSpeed;

    }

    this.boundarySnd.play();


};

BallObj.prototype.bounceBack = function () {

    this.dy = -this.dy;
    this.dx = -this.dx;
    this.boundarySnd.play();

};

// Direction of the ball (needed when hitting corners)
BallObj.prototype.goingDownRight = function () {

    return (this.dx == BallSpeed && this.dy == BallSpeed);

};
BallObj.prototype.goingUpRight = function () {

    return (this.dx == BallSpeed && this.dy == -BallSpeed);

};
BallObj.prototype.goingDownLeft = function () {

    return (this.dx == -BallSpeed && this.dy == BallSpeed);

};
BallObj.prototype.goingUpLeft = function () {

    return (this.dx == -BallSpeed && this.dy == -BallSpeed);

};



BallObj.prototype.hitLower = function () {

    return (this.Lower() >= (HEIGHT - MARGING_UNDER_BAR));

};

BallObj.prototype.withinRectangle = function (rect) {

    return (this.Upper() <= rect.Lower && this.Lower() >= rect.Upper && this.Left() <= rect.Right && this.Right() >= rect.Left);

};

BallObj.prototype.intersects = function (bar) {

    if (this.Right() >= bar.X && this.Left() <= bar.X + bar.Width) {

        this.bounceOfBar();
        // bounce back
        return true;

    } else {// Ball is out
        this.outSnd.play();
        return false;

    }

};

