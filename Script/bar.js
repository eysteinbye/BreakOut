var BarObj = function (c) {
    this.canvas = c;    this.X = BAR_START_X;    this.Y = this.canvas.Height - MARGING_UNDER_BAR;    this.Width = BAR_WIDTH;    this.Height = BAR_HEIGHT;
};BarObj.prototype.draw = function () {
    var borderWidth = 1;    this.canvas.Context.clearRect(0, this.Y, this.canvas.Width, this.Height);    this.canvas.Context.beginPath();    var gradient = this.canvas.Context.createLinearGradient(this.X, this.Y, this.X, this.Y + this.Height)    gradient.addColorStop(0, 'Gray');    gradient.addColorStop(.3, 'White');    gradient.addColorStop(.5, 'White');    gradient.addColorStop(1, 'Gray');    this.canvas.Context.fillStyle = gradient;    this.canvas.Context.rect(this.X + borderWidth, this.Y + borderWidth, this.Width - (borderWidth * 2), this.Height - (borderWidth * 2));    this.canvas.Context.fill();    this.canvas.Context.lineWidth = borderWidth;    this.canvas.Context.strokeStyle = "white";    this.canvas.Context.stroke();
};/*  this.doKeyDown = function(evt){	  switch (evt.keyCode) {    case 37:  // Left arrow was pressed    if (bar.X > bar.dx){     bar.X -= bar.dx;      }      break;    case 39:  // Right arrow was pressed     if (bar.X + bar.dx < bar.canvas.Width-bar.Width){     bar.X += bar.dx;      }      break;  }};*/