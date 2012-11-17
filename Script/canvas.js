var HEIGHT = 800;
var WIDTH = 1000;

var BALL_START_X = 20;
var BALL_START_Y = 300;
var BALL_RADIUS = 10;

var BAR_START_X = 350;
var BAR_WIDTH = 100;
var BAR_HEIGHT = 20;

var MARGING_UNDER_BAR = 50;

var BLOCK_HEIGHT = 20;
var BLOCK_WIDTH = 70;
var BLOCK_BORDER_WIDTH = 1;

var BLOCKS_START_LEFT = 50;
var BLOCKS_START_TOP = 100;

var NUMBER_OF_BLOCKROWS = 7;
var NUMBER_OF_BLOCKS_ON_ROW = 10;
/*
50+(70*10)+50 = 800 width
width/

*/
var CanvasObj = function (context, canvas) {

    this.Context = context;
    this.marginUnderBar = MARGING_UNDER_BAR;
    this.Height = canvas.height;
    this.Width = canvas.width;
    this.Lower = canvas.height - this.marginUnderBar;

};
