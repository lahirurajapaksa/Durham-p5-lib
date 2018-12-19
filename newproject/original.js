int paddleLx;
int paddleLy;
int paddleRx;
int paddleRy;
float ballX;
float ballY;
float ballVx;
float ballVy;
int ballSize = 20;
int paddleWidth = 20;
int paddleHeight = 60;
int bigWidth = (ballSize + paddleWidth)/2;
int bigHeight = (ballSize + paddleHeight)/2;
int gameOn = 0;
int ticker = 0;
int LScore = 0;
int RScore = 0;

void restart() {
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

void setup() {
    size(400, 400);
    background(0);
    restart();
    textSize(60);
    fill(255);
    text("PONG", 100, 160);
    text("MANIA", 120, 240);
    fill(0,0,255);
    text("PONG", 100+3, 160+3);
    text("MANIA", 120+3, 240+3);
}

void mousePressed() {
    if (gameOn == 0) {
        gameOn = 1;
        ballVx = 5;
    }
    else {
        restart();
        gameOn = 0;
    }
}

void update() {
    background(0);
    fill(255, 100);
    textSize(32);
    text(LScore, 10, 30);
    text(RScore, 360, 30);

    paddleLy = mouseY;
    ballX += ballVx;
    ballY += ballVy;

    ++ticker;

    paddleRy = int(ballY + 50*sin(sin((ballY + ticker)/30)));

    if (ballY < 0 || ballY > 400) {
        ballVy *= -1;
    }
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
    else if (ballX < -2) {
        ballVx = ballVy = 0;
        textSize(32);
        text("You lose!", 200, 200);
        ++RScore;
        gameOn = 0;
        restart();
    }
    else if (ballX > 402) {
        ballVx = ballVy = 0;
        textSize(32);
        text("You win!", 200, 200);
        ++LScore;
        gameOn = 0;
        restart();
    }
}

void draw() {
    if (gameOn == 1) {
        update();
    }
    fill(255);
    rect(paddleLx-(paddleWidth/2), paddleLy-(paddleHeight/2), paddleWidth, paddleHeight);
    rect(paddleRx-(paddleWidth/2), paddleRy-(paddleHeight/2), paddleWidth, paddleHeight);
    ellipse(int(ballX), int(ballY), ballSize, ballSize);
}