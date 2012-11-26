var SetUp = function () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  

    this.NUMBER_OF_BLOCKROWS = 7;
    this.NUMBER_OF_BLOCKS_ON_ROW = 10;


    this.BLOCKS_START_LEFT = this.width / 10;
    this.BLOCKS_START_TOP = this.width / 20;

    var widthOfAllBlocks = this.width - (this.BLOCKS_START_LEFT * 2);
    this.BLOCK_WIDTH = widthOfAllBlocks / this.NUMBER_OF_BLOCKS_ON_ROW;

    var heightOfAllBlocks = this.height / 3;
    this.BLOCK_HEIGHT = heightOfAllBlocks / this.NUMBER_OF_BLOCKROWS;

    this.MARGING_UNDER_BAR = this.BLOCK_HEIGHT;

    this.BALL_START_X = this.width / 2;
    this.BALL_START_Y = this.height - Math.round(this.MARGING_UNDER_BAR * 2);
    this.BALL_RADIUS = 10;

    this.BAR_START_X = this.width / 2;
    this.BAR_HEIGHT = this.BLOCK_HEIGHT / 2;
    this.BAR_WIDTH = this.BLOCK_WIDTH;
    if (this.BAR_WIDTH <= 50) this.BAR_WIDTH = 50;
};





/*
 var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;
    canvasDom.width = WIDTH;
    canvasDom.height = HEIGHT;

    BLOCKS_START_LEFT = WIDTH / 10;
    BLOCKS_START_TOP = WIDTH / 20;

    var widthOfAllBlocks = WIDTH - (BLOCKS_START_LEFT * 2);
    BLOCK_WIDTH = widthOfAllBlocks / NUMBER_OF_BLOCKS_ON_ROW;

    var heightOfAllBlocks = HEIGHT / 3;
    BLOCK_HEIGHT = heightOfAllBlocks / NUMBER_OF_BLOCKROWS;

    MARGING_UNDER_BAR = BLOCK_HEIGHT;

    BALL_START_X = WIDTH / 2;
    BALL_START_Y = HEIGHT - Math.round(MARGING_UNDER_BAR * 2);

    BAR_START_X = WIDTH / 2;
    BAR_HEIGHT = BLOCK_HEIGHT / 2;
    BAR_WIDTH = BLOCK_WIDTH;
    if (BAR_WIDTH <= 50) BAR_WIDTH = 50;
    
    */