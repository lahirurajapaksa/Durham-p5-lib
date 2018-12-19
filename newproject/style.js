//declare all variables
var paddleLx;
var paddleLy;
var paddleRx;
var paddleRy;
var ballX;
var ballY;
var ballVx;
var ballVy;
var ballSize = 20;
var paddleWidth = 20;
var paddleHeight = 60;
var bigWidth = (ballSize + paddleWidth)/2;
var bigHeight = (ballSize + paddleHeight)/2;
var gameOn = 0;
var ticker = 0;
var LScore = 0;
var RScore = 0;

function restart() {
    paddleLx = 20;
    paddleLy = 200;
    paddleRx = 380;
    paddleRy = 200;
    ballX = paddleLx + ballSize;
    ballY = paddleRy;
    ballVx = 0;
    ballVy = 0;
    paddleLx = 20;
    paddleLy = 200;
    paddleRx = 380;
    paddleRy = 200;
}

function setup() {
    //creates the canvas
    createCanvas(400, 400);
    // change the background attribute so that it changes colour as mousex and mousey changes
    background(0);
    restart();
    // creates the text for the initial page
    textSize(50);
    fill(255);
    text("PONG", 100, 160);
    text("MODIFIED", 120, 240);
    fill(0,0,255);
    text("PONG", 100+3, 160+3);
    text("MODIFIED", 120+3, 240+3);
}

//begins the game if the mouse is pressed
function mousePressed() {
    if (gameOn == 0) {
        gameOn = 1;
        ballVx = 5;
    }
    //if the game has ended and the mouse has been pressed again, the game is restarted
    else {
        restart();
        gameOn = 0;
    }
}

//main function called for the game to be played
function update() {
    background(0);
    fill(255, 100);
    textSize(32);
    text(LScore, 10, 30);
    text(RScore, 360, 30);

    //responsible for moving the user's paddle
    paddleLy = mouseY;

    //
    ballX=ballX+ballVx;
    ballY=ballY+ballVy;

    //increments ticker variable
    ++ticker;

    //defines the movement for the right paddle to move autonomously
    paddleRy = int(ballY + 50*sin(sin((ballY + ticker)/30)));

    // if the y coordinate of the ball is out of bounds, its direction is reversed
    if (ballY < 0 || ballY > 400) {
        ballVy=ballVy*-1
    }

    //rules for handling how the paddles interact with the ball
    else if ((paddleLx - bigWidth < ballX) && (ballX < paddleLx + bigWidth) && (paddleLy - bigHeight < ballY) && (ballY < paddleLy + bigHeight)) {
        ballVy = ((ballY - paddleLy)/float(bigHeight))*4;
        ballVx *= -1;
        ballX += 1;
    }
    else if ((paddleRx - bigWidth < ballX) && (ballX < paddleRx + bigWidth) && (paddleRy - bigHeight < ballY) && (ballY < paddleRy + bigHeight)) {
        ballVy = ((ballY - paddleRy)/float(bigHeight))*4;
        ballVx *= -1;
        ballX -= 1;
    }
    //if player loses
    else if (ballX < -2) {
        ballVx = ballVy = 0;
        textSize(32);
        text("GAME OVER", 200, 200);
        ++RScore;
        gameOn = 0;
        restart();
    }
    //if player wins
    else if (ballX > 402) {
        ballVx = ballVy = 0;
        textSize(32);
        text("You win!", 200, 200);
        ++LScore;
        gameOn = 0;
        restart();
    }
}
//draw function (repeats continoulsy throughout the course of the sketch)
function draw() {
    if (gameOn == 1) {
        update();
    }
    fill(255);
    rect(paddleLx-(paddleWidth/2), paddleLy-(paddleHeight/2), paddleWidth, paddleHeight);
    rect(paddleRx-(paddleWidth/2), paddleRy-(paddleHeight/2), paddleWidth, paddleHeight);
    ellipse(int(ballX), int(ballY), ballSize, ballSize);
}