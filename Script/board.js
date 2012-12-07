

var Board = function (setUp) {
    this.Rows = setUp.NUMBER_OF_BLOCKROWS;
    this.Columns = setUp.NUMBER_OF_BLOCKS_ON_ROW;


    this.Upper = setUp.BLOCKS_START_TOP;
    this.Lower;
    this.Left = setUp.BLOCKS_START_LEFT;
    this.Right;

    this.blocksTotal = this.Columns * this.Rows;
    this.blocksLeft = this.blocksTotal;
    this.blocks = new Array(this.blocksTotal);

    var levelMap;
    if (level === 1) {
        levelMap = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
    } else if (level === 2) {
        levelMap = [1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1];
    } else if (level === 3) {
        levelMap = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
    }

    var tmpBlock = new Block(0, 0, 1, setUp.BLOCK_WIDTH, setUp.BLOCK_HEIGHT),
    x = this.Left,
    y = this.Upper,
    count = 0;
    for (var i = 0; i < this.Rows; i++) {
        for (var j = 0; j < this.Columns; j++) {
            this.blocks[count] = new Block(x, y, levelMap[count], setUp.BLOCK_WIDTH, setUp.BLOCK_HEIGHT);
            count++;
            x += tmpBlock.Width;
        }
        y += tmpBlock.Height;
        this.Right = x;
        x = this.Left;
    }
    this.Lower = y;
};

Board.prototype.didBallHitBlock = function (ball) {
    for (var i = 0; i < this.blocks.length; i++) {
        var block = this.blocks[i];
        if (block.intersect(ball)) {
            return block;
        }
    }
    return null;
};
