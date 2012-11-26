

var Ball = function (yyy, ballSpeed, ballSpeedFactor) {
    
    this.X = yyy.BALL_START_X;
    this.Y = yyy.BALL_START_Y;
    this.Radius = yyy.BALL_RADIUS;
    this.width = yyy.width;
    this.height = yyy.height - yyy.MARGING_UNDER_BAR;
    this.BallSpeed = ballSpeed;
    this.BallSpeedFactor = ballSpeedFactor;
    this.dx = this.BallSpeed;
    this.dy = -this.BallSpeed;

    this.Diameter = this.Radius * 2;

    this.Left = function () { return this.X - this.Radius; };
    this.Right = function () { return this.X + this.Radius; };
    this.Lower = function () { return this.Y + this.Radius; };
    this.Upper = function () { return this.Y - this.Radius; };

    this.boundarySnd = new Audio('boundary.mp3');
    this.outSnd = new Audio('out.mp3');
};

Ball.prototype.move = function () {
    this.X += this.dx;
    this.Y += this.dy;
    if (this.Left() <= 0 || this.Right() >= this.width) {
        this.bounceOfWall();
    }
    if (this.Upper() <= 0) {
        this.bounceOfCeling();
    }
};
Ball.prototype.bounceOfWall = function () {
    this.dx = -this.dx;
};
Ball.prototype.bounceOfCeling = function () {
    this.dy = -this.dy;
    this.boundarySnd.play();
};
Ball.prototype.bounceOfBar = function (bar) {
    var posOnBar = this.X - bar.X,
        rel = (posOnBar / bar.Width) * 100;

    if (Math.abs(this.dy) === (this.BallSpeed * this.BallSpeedFactor)) {
        this.dy /= (this.BallSpeed * this.BallSpeedFactor);
    }

    this.dy = -this.dy;
    if (rel < 10) {
        this.dy *= (this.BallSpeed * this.BallSpeedFactor);
        this.dx = -this.BallSpeed;
    } else if (rel > 90) {
        this.dy *= (this.BallSpeed * this.BallSpeedFactor);
        this.dx = this.BallSpeed;
    }
    this.boundarySnd.play();
};

Ball.prototype.bounceBack = function () {

    this.dy = -this.dy;
    this.dx = -this.dx;
    this.boundarySnd.play();
};

// Direction of the ball (needed when hitting corners)
Ball.prototype.goingDownRight = function () {
    return (this.dx === this.BallSpeed && this.dy === this.BallSpeed);
};
Ball.prototype.goingUpRight = function () {
    return (this.dx === this.BallSpeed && this.dy === -this.BallSpeed);
};
Ball.prototype.goingDownLeft = function () {
    return (this.dx === -this.BallSpeed && this.dy === this.BallSpeed);
};
Ball.prototype.goingUpLeft = function () {
    return (this.dx === -this.BallSpeed && this.dy === -this.BallSpeed);
};

Ball.prototype.hitLower = function () {
    return (this.Lower() >= (this.height));
};

Ball.prototype.withinRectangle = function (rect) {
    return (this.Upper() <= rect.Lower && this.Lower() >= rect.Upper && this.Left() <= rect.Right && this.Right() >= rect.Left);
};

Ball.prototype.intersects = function (bar) {
    var didIntersect;
    if (this.Right() >= bar.X && this.Left() <= bar.X + bar.Width) {
        this.bounceOfBar(bar);
        // bounce back
        didIntersect = true;
    } else {
        // Ball is out
        this.outSnd.play();
        didIntersect = false;
    }
    return didIntersect;

};
