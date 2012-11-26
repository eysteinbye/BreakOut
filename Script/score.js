
var Score = function () {
    this.Score = 0;
};

Score.prototype.Add = function (points) {
    this.Score += points;
};

var Bar = function (yyy) {
   this.X =  yyy.BAR_START_X;
   this.Y = yyy.height - yyy.MARGING_UNDER_BAR;
   this.Width = yyy.BAR_WIDTH;
   this.Height = yyy.BAR_HEIGHT;
};

var Canvas = function (context, canvas, marginBottom) {
    this.Context = context;
    this.Height = canvas.height;
    this.Width = canvas.width;
    this.Lower = canvas.height - marginBottom;
};
