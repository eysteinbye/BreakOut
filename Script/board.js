var Board = function() {
    this.Rows = NUMBER_OF_BLOCKROWS;
    this.Columns = NUMBER_OF_BLOCKS_ON_ROW;

    this.Upper = BLOCKS_START_TOP;
    this.Lower;
    this.Left = BLOCKS_START_LEFT;
    this.Right;

    this.blocksTotal = this.Columns * this.Rows;
    this.blocksLeft = this.blocksTotal;
    this.blocks = new Array(this.blocksTotal);


    var level = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    var tmpBlock = new Block(0, 0, 1);
    var x = this.Left;
    var y = this.Upper;
    var count = 0;
    for (var i = 0; i < this.Rows; i++) {
        for (var j = 0; j < this.Columns; j++) {
            this.blocks[count] = new Block(x, y, level[count]);
            count++;
            x += tmpBlock.Width;
        }
        y += tmpBlock.Height;
        this.Right = x;
        x = this.Left;
    }
    this.Lower = y;
};

Board.prototype.didBallHitBlock = function(ball) {
    var bounceC = false;
    var bounceS = false;
    var bounceF = false;

    var blockToRemove = null;

    for (var i = 0; i < this.blocks.length; i++) {

        var block = this.blocks[i];

        if (block.intersectCorner(ball)) {
            bounceC = true;
            blockToRemove = block;
        }
        if (block.intersectSide(ball)) {
            bounceS = true;
            blockToRemove = block;
        }
        if (block.intersectFlat(ball)) {
            bounceF = true;
            blockToRemove = block;
        }

        if (bounceC || bounceF || bounceS) {
            break;
        }
    }

    if (bounceC && bounceF && bounceS) ball.bounceBack(); // All three (same as a corner)
    if (!bounceC && bounceF && bounceS) ball.bounceBack(); // Flat and Side (same as a corner)
    if (bounceC && bounceF && !bounceS) ball.bounceOfCeling(); // Corner and flat (two blocks on same row) same as flat
    if (bounceC && !bounceF && bounceS) ball.bounceOfWall(); // Corner and Side (two blocks in same column) same as side

    if (bounceC && !bounceF && !bounceS) ball.bounceBack(); // Just corner
    if (!bounceC && bounceF && !bounceS) ball.bounceOfCeling(); // Just flat
    if (!bounceC && !bounceF && bounceS) ball.bounceOfWall(); // Just Side

    return blockToRemove;
};