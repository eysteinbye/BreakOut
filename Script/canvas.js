

var CanvasObj = function (context, canvas) {

    this.Context = context;
    this.marginUnderBar = MARGING_UNDER_BAR;
    this.Height = canvas.height;
    this.Width = canvas.width;
    this.Lower = canvas.height - this.marginUnderBar;

};
