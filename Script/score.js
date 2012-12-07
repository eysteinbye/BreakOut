
var Score = function () {
    this.Score = 0;
};

Score.prototype.Add = function (points) {
    this.Score += points;
};

var Bar = function (setUp) {
   this.X =  setUp.BAR_START_X;
   this.Y = setUp.height - setUp.MARGING_UNDER_BAR;
   this.Width = setUp.BAR_WIDTH;
   this.Height = setUp.BAR_HEIGHT;
};

var Canvas = function (context, canvas, marginBottom) {
    this.Context = context;
    this.Height = canvas.height;
    this.Width = canvas.width;
    this.Lower = canvas.height - marginBottom;
};
