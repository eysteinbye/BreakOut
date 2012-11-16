var BoardObj = function (c) {
    this.canvas = c;    this.Rows = NUMBER_OF_BLOCKROWS;    this.Columns = NUMBER_OF_BLOCKS_ON_ROW;    this.Upper = BLOCKS_START_TOP;    this.Lower;    this.Left = BLOCKS_START_LEFT;    this.Right;    this.blocksTotal = this.Columns * this.Rows;    this.blocksLeft = this.blocksTotal;    this.blocks = new Array(this.blocksTotal);    var tmpBlock = new blockObj(this.canvas, 0, 0);    var X = this.Left;    var Y = this.Upper;    var count = 0;    for (var i = 0; i < this.Rows; i++) {
        for (var j = 0; j < this.Columns; j++) {
            this.blocks[count] = new blockObj(this.canvas, X, Y);            //this.blocks[count].draw();            X += tmpBlock.Width;            count++;
        }        Y += tmpBlock.Height;        this.Right = X;        X = this.Left;
    }    this.Lower = Y;    // call draw when made    this.draw();
};BoardObj.prototype.didBallHitBlock = function (ball, score) {
    var bounceC = false;    var bounceS = false;    var bounceF = false;    for (var i = 0; i < this.blocks.length; i++) {
        var block = this.blocks[i];        if (block.intersectCorner(ball)) {
            bounceC = true;            score.Add(5);            this.blocksLeft--;
        }        if (block.intersectSide(ball)) {
            bounceS = true;            score.Add(5);            this.blocksLeft--;
        }        if (block.intersectFlat(ball)) {
            bounceF = true;            score.Add(5);            this.blocksLeft--;
        }
    }    if (bounceC || bounceF || bounceS) {        //Debug the hits        //alert("F"- + bounceF + " S-" + bounceS + " C-" + bounceC );    }    if (bounceC && bounceF && bounceS) ball.bounceBack(); // All three (same as a corner)    if (!bounceC && bounceF && bounceS) ball.bounceBack(); // Flat and Side (same as a corner)    if (bounceC && bounceF && !bounceS) ball.bounceOfCeling(); // Corner and flat (two blocks on same row) same as flat    if (bounceC && !bounceF && bounceS) ball.bounceOfWall(); // Corner and Side (two blocks in same column) same as side    if (bounceC && !bounceF && !bounceS) ball.bounceBack(); // Just corner    if (!bounceC && bounceF && !bounceS) ball.bounceOfCeling(); // Just flat    if (!bounceC && !bounceF && bounceS) ball.bounceOfWall(); // Just Side};BoardObj.prototype.draw = function () {
    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].draw();
    }
};