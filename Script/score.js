var ScoreObj = function (c) {
    this.canvas = c;    this.Score = 0;    this.draw();
};ScoreObj.prototype.Add = function (points) {
    this.Score += points;    this.draw();    return this.Score;
};ScoreObj.prototype.draw = function () {
    var top = this.canvas.Height - MARGING_UNDER_BAR + BAR_HEIGHT; // 580    var height = this.canvas.Height - top; // 20    this.canvas.Context.clearRect(10, top, 300, height);    this.canvas.Context.strokeStyle = "#ffffff";    this.canvas.Context.font = '14px verdana';    this.canvas.Context.strokeText('Score : ' + this.Score, 10, 595);
};