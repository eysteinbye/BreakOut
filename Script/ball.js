var BallObj = function (c) {
    this.canvas = c;
    this.X = BALL_START_X;    this.Y = BALL_START_Y;    this.dx = 1;    this.dy = 1;    this.Radius = BALL_RADIUS;    this.Diameter = this.Radius * 2;    this.Left = function () { return this.X - this.Radius; };    this.Right = function () { return this.X + this.Radius; };    this.Lower = function () { return this.Y + this.Radius; };    this.Upper = function () { return this.Y - this.Radius; };    this.boundarySnd = new Audio('boundary.mp3');    this.outSnd = new Audio('out.mp3');
};BallObj.prototype.move = function () {
    this.X += this.dx;    this.Y += this.dy;    if (this.Left() <= 0 || this.Right() >= this.canvas.Width) this.bounceOfWall();    if (this.Upper() <= 0) this.bounceOfCeling();
};BallObj.prototype.bounceOfWall = function () {
    this.dx = -this.dx;
};BallObj.prototype.bounceOfCeling = function () {
    this.dy = -this.dy;    this.boundarySnd.play();
};BallObj.prototype.bounceOfBar = function () {
    var posOnBar = this.X - bar.X;    var rel = (posOnBar / bar.Width) * 100; // 0-1    if (Math.abs(this.dy) == 2) this.dy /= 2;    this.dy = -this.dy;    if (rel < 10) {
        this.dy *= 2;        this.dx = -1;
    } else if (rel > 90) {
        this.dy *= 2;        this.dx = 1;
    }    this.boundarySnd.play();
};BallObj.prototype.bounceBack = function () {
    this.dy = -this.dy;    this.dx = -this.dx;    this.boundarySnd.play();
};// Direction of the ball (needed when hitting corners)BallObj.prototype.goingDownRight = function () {
    return (this.dx == 1 && this.dy == 1);
};BallObj.prototype.goingUpRight = function () {
    return (this.dx == 1 && this.dy == -1);
};BallObj.prototype.goingDownLeft = function () {
    return (this.dx == -1 && this.dy == 1);
};BallObj.prototype.goingUpLeft = function () {
    return (this.dx == -1 && this.dy == -1);
};BallObj.prototype.draw = function () {    //  Clear the old ball    this.canvas.Context.clearRect(this.X - this.Radius, this.Y - this.Radius, this.Diameter, this.Diameter);    // Move the ball    this.move();    // Draw the ball    this.canvas.Context.beginPath();    var gradient = this.canvas.Context.createRadialGradient(this.X, this.Y, 5, this.X + 10, this.Y + 10, 40)    gradient.addColorStop(0, 'White');    gradient.addColorStop(.5, 'Gray');    this.canvas.Context.fillStyle = gradient;    // Draws a circle of radius 20     this.canvas.Context.arc(this.X, this.Y, this.Radius, 0, Math.PI * 2, true);    this.canvas.Context.closePath();    this.canvas.Context.fill();
};BallObj.prototype.hitLower = function () {
    return (this.Lower() >= this.canvas.Lower);
};BallObj.prototype.withinRectangle = function (rect) {
    return (this.Upper() <= rect.Lower && this.Lower() >= rect.Upper && this.Left() <= rect.Right && this.Right() >= rect.Left);
};BallObj.prototype.intersects = function (bar) {
    if (this.Right() >= bar.X && this.Left() <= bar.X + bar.Width) {
        this.bounceOfBar();        // bounce back        return true;
    } else {// Ball is out        this.outSnd.play();        return false;
    }
};