var blockObj = function (c, x, y) {
    this.canvas = c;    this.X = x;    this.Y = y;    this.Width = BLOCK_WIDTH;    this.Height = BLOCK_HEIGHT;    this.Upper = this.Y;    this.Lower = this.Y + this.Height;    this.Right = this.X + this.Width;    this.Left = this.X;    this.Show = true;
};blockObj.prototype.draw = function () {
    if (this.Show) {
        var borderWidth = BLOCK_BORDER_WIDTH;        this.canvas.Context.beginPath();        var gradient = this.canvas.Context.createLinearGradient(this.X, this.Y, this.X + this.Width, this.Y + this.Height)        gradient.addColorStop(0, 'Magenta');        gradient.addColorStop(.5, 'Pink');        gradient.addColorStop(1, 'Yellow');        this.canvas.Context.fillStyle = gradient;        this.canvas.Context.rect(this.X + borderWidth, this.Y + borderWidth, this.Width - (borderWidth * 2), this.Height - (borderWidth * 2));        this.canvas.Context.fill();        this.canvas.Context.lineWidth = borderWidth;        this.canvas.Context.strokeStyle = "White";        this.canvas.Context.stroke();
    }
};// Do we intersect a cornerblockObj.prototype.intersectCorner = function (ball) {
    var corner = false;    if (this.Show) {
        if (this.Lower == ball.Upper() && this.Left == ball.Right() && ball.goingUpRight()) corner = true; // Lower left corner        if (this.Lower == ball.Upper() && this.Right == ball.Left() && ball.goingUpLeft()) corner = true; // Lower right corner        if (this.Upper == ball.Lower() && this.Left == ball.Right() && ball.goingDownRight()) corner = true; // Upper Left corner        if (this.Upper == ball.Lower() && this.Right == ball.Left() && ball.goingDownLeft()) corner = true; // Upper Right corner        if (corner) this.remove();
    }    return corner;
};blockObj.prototype.intersectSide = function (ball) {
    var side = false;    if (this.Show) {
        if ((this.Upper < ball.Upper() && ball.Upper() < this.Lower) || (this.Upper < ball.Lower() && ball.Lower() < this.Lower)) {
            if (this.Right == ball.Left() || this.Left == ball.Right()) {
                side = true;
            }
        }        if (side) this.remove();
    }    return side;
};blockObj.prototype.intersectFlat = function (ball) {
    var flat = false;    if (this.Show) {
        if ((this.Left < ball.Left() && ball.Left() < this.Right) || (this.Left < ball.Right() && ball.Right() < this.Right)) {
            if (this.Upper == ball.Lower() || this.Lower == ball.Upper()) {
                flat = true;
            }
        }        if (flat) this.remove();
    }    return flat;
};blockObj.prototype.remove = function () {
    this.Show = false;    this.canvas.Context.clearRect(this.X, this.Y, this.Width, this.Height + 1);    // Play()};