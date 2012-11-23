/*

Add hightscore (online)
Use sprites for ball, paddle and blocks
Lage Logo
Preload
Lage about
Lage Privacy
Sound Windows
Move padle by tilting device
Inc speed if tilted forward
Lock orientation

*/

var level = 1;
var gameEndLevel = 4;
var ball;
var bar;
var board;
var score;
score = new Score();

var paint;

var gameLoopId;

var DEMO_MODE = false;
var showFps = true;

var HEIGHT;
var WIDTH;

var BALL_START_X;
var BALL_START_Y;
var BALL_RADIUS = 10;

var BAR_START_X;
var BAR_WIDTH;
var BAR_HEIGHT;

var MARGING_UNDER_BAR;

var BLOCKS_START_LEFT;
var BLOCKS_START_TOP;

var NUMBER_OF_BLOCKROWS = 7;
var NUMBER_OF_BLOCKS_ON_ROW = 10;

var BLOCK_HEIGHT;
var BLOCK_WIDTH;
var BLOCK_BORDER_WIDTH = 1;

var lastTime = new Date();

var startGame = function() {
    document.getElementById('startButton').style.visibility = 'hidden';
    var canvasDom = document.getElementById('GameCanvas');
    canvasDom.style.visibility = "visible";
    canvasDom.style.cursor = "none";
    WIDTH = (window.innerWidth);
    HEIGHT = (window.innerHeight);
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

    var context = canvasDom.getContext('2d');
    var canvas = new Canvas(context, canvasDom);
    paint = new Paint(canvas);

    ball = new Ball();
    bar = new Bar();
    board = new Board();

    // Done init


    // draw once, but not in gameloop
    paint.drawBlocks(board.blocks);

    window.addEventListener('keydown', onKey, true);

    canvasDom.addEventListener('mousemove', function(e) {
        bar.X = e.clientX;
        paint.drawBar(bar);
    }, true);

    gameLoopId = setInterval(gameLoop, 5);
};