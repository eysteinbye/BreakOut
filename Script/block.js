



var Block = function (x, y, durability, width, height) {
    this.X = x;
    this.Y = y;
    this.Upper = this.Y;
    this.Width = width;
    this.Height = height;
    this.Lower = this.Y + height;
    this.Right = this.X + width;
    this.Left = this.X;
    this.hitsLeft = durability;
    this.Show = true;
};

Block.prototype.intersect = function (ball) {

    var didIntersect = false,
    under = false,
    over = false,
    middle = false,
    right = false,
    left = false,
    center = false;
    if (this.Show) {
        if ((this.X <= ball.Left() && ball.Left() <= this.Right) || (this.X <= ball.Right() && ball.Right() <= this.Right)) {
            if ((this.Y <= ball.Upper() && ball.Upper() <= this.Lower) || (this.Y <= ball.Lower() && ball.Lower() <= this.Lower)) {
                didIntersect = true;
                if (this.X < ball.X && ball.X < this.Right) {
                    ball.bounceOfCeling();
                } else if (this.Y < ball.Y && ball.Y < this.Lower) {
                    ball.bounceOfWall();
                    // side = true;
                } else {
                    // corner
                    // har corner blokk ve siden av?
                    if (ball.Upper() < this.Lower) {
                        under = true;
                    } else if (ball.Lower() < this.Y) {
                        over = true;
                    } else {
                        middle = true;
                    }
              
                    if (ball.Left() < this.Right) {
                        right = true;
                    } else if (ball.Right() < this.Left) {
                        left = true;
                    } else {
                        center = true;
                    }

                    if (under && right && ball.goingUpLeft()) {
                        ball.bounceBack();
                    }
                    if (over && right && ball.goingDownleft()) {
                        ball.bounceBack();
                    }
                    if (under && left && ball.goingUpRight()) {
                        ball.bounceBack();
                    }
                    if (over && left && ball.goingDownRight()) {
                        ball.bounceBack();
                    }

                    // Skal disse ha en litt annen vinkel?
                    if (middle) {
                        ball.bounceOfWall();
                    }
                    if (center) {
                        ball.bounceOfCeling();
                    }
                }
            }
        }
    }
    return didIntersect;
};

Block.prototype.hit = function () {
    this.hitsLeft--;
    if (this.hitsLeft === 0) {
        this.Show = false;
    }
    return !this.Show;
};