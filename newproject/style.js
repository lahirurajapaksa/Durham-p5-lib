let button
let button2
let button3
let button4

function setup() {
    createCanvas(400,400)
    background(0)

    menu();


}

function draw() {

}






function menu() {
    background(120,0,255);
    button=createButton("Normal Multiplayer")
    button.mousePressed(NormalMultiplayer)
    button.position(135,60);

    button2=createButton("Multiplayer ball frenzy");
    button2.position(130,180);
    button2.mousePressed(MultiplayerFrenzy);

    button3=createButton("Singleplayer (use mouse)");
    button3.position(125,260);
    button3.mousePressed(Singleplayer)

    button4=createButton("Crazy Paddles")
    button4.position(155,320)
    button4.mousePressed(Crazypaddles)




    textSize(32)
    fill(0)
    text("PONG MANIA",95,30)
    fill(255,0,0)
    text("PONG MANIA",97,32)
    textSize(12)
    fill(0)
    text("Play with your keyboard",130,100)
    text("W and S for player 1",140,119)
    text("ArrowUp and ArrowDown for player 2",110,138)
    text("A lot of balls.", 160, 215)
    text("Guide your paddle with the mouse",115,295)
}

function MultiplayerFrenzy() {
    clear();
    hideButtons();
    text("Multiplayer Frenzy",width/2,height/2)
    let Lscore = 0;
    let Rscore = 0;
    let r2 = 0;
    let b2 = 255;
    //let button;
    balls=[]

    function setup() {
        createCanvas(800, 400);
        //menu();

        ball = new Ball();
        left = new Paddle(true);
        right = new Paddle(false);

        for (let i = 0; i<2; i++) {
            balls[i] = new Ball()

        }

        function draw() {
            background(0);
            r2=map(right.y,0,400,255,0)
            b2-=map(left.y,400,800,0,255)
            background(r2,0,b2)

            for (let i= 0; i<balls.length; i++) {
                balls[i].update();
                balls[i].edges();
                balls[i].show();
                balls[i].checkPaddleRight(right)
                balls[i].checkPaddleLeft(left)
            }
            ball.checkPaddleRight(right);
            ball.checkPaddleLeft(left);

            left.show();
            right.show();
            left.update();
            right.update();

            ball.update();
            ball.edges();
            ball.show();

            fill(255);
            textSize(32);
            text(Lscore, 32, 40);
            text(Rscore, width-64, 40);

        }

        function mouseClicked() {
            let b = new Ball();
            balls.push(b)
        }
        function keyReleased() {
            left.move(0);
            right.move(0);
        }



        function keyPressed() {
            console.log(key);
            if (key == 'W' || key == "w") {
                left.move(-10);
            } else if (key == 'S' || key == "s") {
                left.move(10);
            }

            if (key == 'ArrowUp') {
                right.move(-10);
            } else if (key == 'ArrowDown') {
                right.move(10);
            }
        }
    }

    class Ball {
        constructor() {
            this.x = width/2;
            this.y = height/2;
            this.xspeed = 0;
            this.yspeed = 0;
            this.r = 12;

            this.reset();
        }

        checkPaddleLeft(p) {
            if (this.y - this.r < p.y + p.h/2 &&
                this.y + this.r > p.y - p.h/2 &&
                this.x - this.r < p.x + p.w/2) {

                if (this.x > p.x) {
                    let diff = this.y - (p.y - p.h/2);
                    let rad = radians(45);
                    let angle = map(diff, 0, p.h, -rad, rad);
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x + p.w/2 + this.r;
                }

            }
        }
        checkPaddleRight(p) {
            if (this.y - this.r < p.y + p.h/2 &&
                this.y + this.r > p.y - p.h/2 &&
                this.x + this.r > p.x - p.w/2) {

                if (this.x < p.x) {
                    let diff = this.y - (p.y - p.h/2);
                    let angle = map(diff, 0, p.h, radians(225), radians(135));
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x - p.w/2 - this.r;
                }
            }
        }

        update() {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        reset() {
            this.x = width/2;
            this.y = height/2;
            let angle = random(-PI/4, PI/4);
            this.xspeed = 5 * Math.cos(angle);
            this.yspeed = 5 * Math.sin(angle);

            if (random(1) < 0.5) {
                this.xspeed *= -1;
            }
        }

        edges() {
            if (this.y < 0 || this.y > height) {
                this.yspeed *= -1;
            }

            if (this.x - this.r > width) {
                Lscore++;
                this.reset();
            }

            if (this.x + this.r < 0) {
                Rscore++;
                this.reset();
            }
        }

        show() {
            fill(random(255),0,random(255));
            ellipse(this.x, this.y, this.r*2);
        }
    }
}

class Paddle {
    constructor(isLeft) {
        this.y = height/2;
        this.w = 20;
        this.h = 100;
        this.ychange = 0;

        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }


    }

    update() {
        this.y += this.ychange;
        this.y = constrain(this.y, this.h/2, height-this.h/2);
    }

    move(steps) {
        this.ychange = steps;
    }

    show() {
        rectMode(CENTER);
        fill(random(255),random(255),random(255));
        rect(this.x, this.y, this.w, this.h);


    }


}

function Singleplayer() {
    clear();
    hideButtons();
    text("single player",width/2,height/2)
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
    var paddleHeight = 120;
    var bigWidth = (ballSize + paddleWidth)/2;
    var bigHeight = (ballSize + paddleHeight)/2;
    var gameOn = 0;
    var ticker = 0;
    var LScore = 0;
    var RScore = 0;
    var r2 = 0;
    var b2 = 255;
    let balls = [];


    function restart() {
        paddleLx = 22;
        paddleLy = 300;
        paddleRx = 777;
        paddleRy = 300;
        ballX = paddleLx + ballSize;
        ballY = paddleRy;
        ballVx = 0;
        ballVy = 0;
    }



    function setup() {
        //creates the canvas
        createCanvas(800, 400);
        // change the background attribute so that it changes colour as mousex and mousey changes
        background(0);
        restart();
        // creates the text for the initial page
        textSize(50);
        fill(0,0,255);
        text("PONG", 310, 160);
        text("MODIFIED", 275, 240);
        fill(20,35,86);
        text("PONG", 310+2, 160+2);
        text("MODIFIED", 275+2, 240+2);
    }


//function mousePressed() {
//let b = new Ball();
//	balls.push(b)
//}



//begins the game if the mouse is pressed
    function mousePressed() {
        if (gameOn == 0) {
            gameOn = 1;
            ballVx = 5;
        }

    }




//main function called for the game to be played
    function update() {

        //responsible for moving the user's paddle
        paddleLy = mouseY;

        //
        ballX=ballX+ballVx;
        ballY=ballY+ballVy;

        //increments ticker variable
        ++ticker;



        //defines the movement for the right paddle to move autonomously
        paddleRy = int(ballY + 50*sin(sin((ballY + ticker)/30)));

        // changes background colour when left and right paddle move
        r2=map(paddleRy,0,400,0,255);
        b2=map(mouseY,0,400,255,0);
        background(r2,0,b2);

        fill(255,255,255);
        textSize(32);
        text(LScore, 10, 30);
        text(RScore, 770, 30);

        // if the y coordinate of the ball is out of bounds, its direction is reversed
        if (ballY < 0 || ballY > 400) {
            ballVy=ballVy*-1
        }

        //rules for handling how the paddles interact with the ball
        else if ((paddleLx - bigWidth < ballX) && (ballX < paddleLx + bigWidth) && (paddleLy - bigHeight < ballY) && (ballY < paddleLy + bigHeight)) {
            ballVy = ((ballY - paddleLy)/float(bigHeight))*4;
            ballVx *= -1.1;
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
            textSize(50);
            fill(0,0,0);
            text("GAME OVER!", 215,200);
            fill(random(255),0,0)
            text("GAME OVER!", 215+2, 200+2);

            ++RScore;
            gameOn = 0;
            restart();
        }
        //if player wins
        else if (ballX > 802) {
            ballVx = ballVy = 0;
            textSize(50);
            fill(0,0,0)
            text("YOU WIN!", 260, 200);
            fill(random(255),0,0);
            text("YOU WIN!", 260+2, 200+2);
            ++LScore;
            gameOn = 0;
            restart();
        }
    }


//draw function (repeats continously throughout the course of the sketch)
    function draw() {
        if (gameOn == 1) {
            update();
        }
        fill(random(255),random(255),random(255));
        rect(paddleLx-(paddleWidth/2), paddleLy-(paddleHeight/2), paddleWidth, paddleHeight);

        rect(paddleRx-(paddleWidth/2), paddleRy-(paddleHeight/2), paddleWidth, paddleHeight);
        fill(random(255),0,random(255));
        ellipse(int(ballX), int(ballY), ballSize, ballSize);

    }
}



function NormalMultiplayer() {
    clear();
    hideButtons();
    text("Normal multiplayer",width/2,height/2)
    let Lscore = 0;
    let Rscore = 0;
    let r2 = 0;
    let b2 = 255;
    //let button;
    //balls=[]

    function setup() {
        createCanvas(800, 400);
        //menu();

        ball = new Ball();
        left = new Paddle2(true);
        right = new Paddle2(false);

        //for (let i = 0; i<2; i++) {
        //balls[i] = new Ball()

        //}

        function draw() {
            background(0);
            r2=map(right.y,0,400,255,0)
            b2-=map(left.y,400,800,0,255)
            background(r2,0,b2)

            //for (let i= 0; i<balls.length; i++) {
            //balls[i].update();
            //balls[i].edges();
            //balls[i].show();
            //balls[i].checkPaddleRight(right)
            //balls[i].checkPaddleLeft(left)
            //}
            ball.checkPaddleRight(right);
            ball.checkPaddleLeft(left);

            left.show();
            right.show();
            left.update();
            right.update();

            ball.update();
            ball.edges();
            ball.show();

            fill(255);
            textSize(32);
            text(Lscore, 32, 40);
            text(Rscore, width-64, 40);

        }

        //function mouseClicked() {
        //let b = new Ball();
        //balls.push(b)
//}
        function keyReleased() {
            left.move(0);
            right.move(0);
        }

        function keyPressed() {
            console.log(key);
            if (key == 'W' || key == "w") {
                left.move(-10);
            } else if (key == 'S' || key == "s") {
                left.move(10);
            }

            if (key == 'ArrowUp') {
                right.move(-10);
            } else if (key == 'ArrowDown') {
                right.move(10);
            }
        }
    }

    class Ball {
        constructor() {
            this.x = width/2;
            this.y = height/2;
            this.xspeed = 0;
            this.yspeed = 0;
            this.r = 12;

            this.reset();
        }

        checkPaddleLeft(p) {
            if (this.y - this.r < p.y + p.h/2 &&
                this.y + this.r > p.y - p.h/2 &&
                this.x - this.r < p.x + p.w/2) {

                if (this.x > p.x) {
                    let diff = this.y - (p.y - p.h/2);
                    let rad = radians(45);
                    let angle = map(diff, 0, p.h, -rad, rad);
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x + p.w/2 + this.r;
                }

            }
        }
        checkPaddleRight(p) {
            if (this.y - this.r < p.y + p.h/2 &&
                this.y + this.r > p.y - p.h/2 &&
                this.x + this.r > p.x - p.w/2) {

                if (this.x < p.x) {
                    let diff = this.y - (p.y - p.h/2);
                    let angle = map(diff, 0, p.h, radians(225), radians(135));
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x - p.w/2 - this.r;
                }
            }
        }

        update() {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        reset() {
            this.x = width/2;
            this.y = height/2;
            let angle = random(-PI/4, PI/4);
            this.xspeed = 5 * Math.cos(angle);
            this.yspeed = 5 * Math.sin(angle);

            if (random(1) < 0.5) {
                this.xspeed *= -1;
            }
        }

        edges() {
            if (this.y < 0 || this.y > height) {
                this.yspeed *= -1;
            }

            if (this.x - this.r > width) {
                Lscore++;
                this.reset();
            }

            if (this.x + this.r < 0) {
                Rscore++;
                this.reset();
            }
        }

        show() {
            fill(random(255),0,random(255));
            ellipse(this.x, this.y, this.r*2);
        }
    }
}

class Paddle2 {
    constructor(isLeft) {
        this.y = height/2;
        this.w = 20;
        this.h = 100;
        this.ychange = 0;

        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }


    }

    update() {
        this.y += this.ychange;
        this.y = constrain(this.y, this.h/2, height-this.h/2);
    }

    move(steps) {
        this.ychange = steps;
    }

    show() {
        rectMode(CENTER);
        fill(random(255),random(255),random(255));
        rect(this.x, this.y, this.w, this.h);


    }


}

function Crazypaddles() {
    clear();
    hideButtons();
    text("Crazy paddles",width/2,height/2)
    let Lscore = 0;
    let Rscore = 0;
    let r2 = 0;
    let b2 = 255;
    let button;
//balls=[]

    function setup() {
        createCanvas(800, 400);
        menu();

        ball = new Ball();
        left = new Paddle(true);
        right = new Paddle(false);

        //for (let i = 0; i<2; i++) {
        //  balls[i] = new Ball()

        // }



    }





    function draw() {
        background(0);
        r2=map(right.y,0,400,255,0)
        b2-=map(left.y,400,800,0,255)
        background(r2,0,b2)

        //for (let i= 0; i<balls.length; i++) {
        // balls[i].update();
        // balls[i].edges();
        // balls[i].show();
        // balls[i].checkPaddleRight(right)
        // balls[i].checkPaddleLeft(left)
        // }
        ball.checkPaddleRight(right);
        ball.checkPaddleLeft(left);

        left.show();
        right.show();
        left.update();
        right.update();

        ball.update();
        ball.edges();
        ball.show();

        fill(255);
        textSize(32);
        text(Lscore, 32, 40);
        text(Rscore, width-64, 40);


    }

    function menu() {
        background(0);
        button=createButton("HELLO")
    }


//function mouseClicked() {
//  let b = new Ball();
//balls.push(b)
//}
    function keyReleased() {
        left.move(0);
        right.move(0);
    }

    function keyPressed() {
        console.log(key);
        if (key == 'W' || key == "w") {
            left.move(-10);
        } else if (key == 'S' || key == "s") {
            left.move(10);
        }

        if (key == 'ArrowUp') {
            right.move(-10);
        } else if (key == 'ArrowDown') {
            right.move(10);
        }
    }

    class Ball {
        constructor() {
            this.x = width/2;
            this.y = height/2;
            this.xspeed = 0;
            this.yspeed = 0;
            this.r = random(80);

            this.reset();
        }

        checkPaddleLeft(p) {
            if (this.y - this.r < p.y + p.h/2 &&
                this.y + this.r > p.y - p.h/2 &&
                this.x - this.r < p.x + p.w/2) {

                if (this.x > p.x) {
                    let diff = this.y - (p.y - p.h/2);
                    let rad = radians(45);
                    let angle = map(diff, 0, p.h, -rad, rad);
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x + p.w/2 + this.r;
                }

            }
        }
        checkPaddleRight(p) {
            if (this.y - this.r < p.y + p.h/2 &&
                this.y + this.r > p.y - p.h/2 &&
                this.x + this.r > p.x - p.w/2) {

                if (this.x < p.x) {
                    let diff = this.y - (p.y - p.h/2);
                    let angle = map(diff, 0, p.h, radians(225), radians(135));
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x - p.w/2 - this.r;
                }
            }
        }

        update() {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        reset() {
            this.x = width/2;
            this.y = height/2;
            let angle = random(-PI/4, PI/4);
            this.xspeed = 5 * Math.cos(angle);
            this.yspeed = 5 * Math.sin(angle);

            if (random(1) < 0.5) {
                this.xspeed *= -1;
            }
        }

        edges() {
            if (this.y < 0 || this.y > height) {
                this.yspeed *= -1;
            }

            if (this.x - this.r > width) {
                Lscore++;
                this.reset();
            }

            if (this.x + this.r < 0) {
                Rscore++;
                this.reset();
            }
        }

        show() {
            fill(random(255),0,random(255));
            ellipse(this.x, this.y, this.r*2);
        }
    }

    class Paddle {
        constructor(isLeft) {
            this.y = height/2;
            this.w = random(100);
            this.h = random(300);
            this.ychange = 0;

            if (isLeft) {
                this.x = this.w;
            } else {
                this.x = width - this.w;
            }


        }

        update() {
            this.y += this.ychange;
            this.y = constrain(this.y, this.h/2, height-this.h/2);
        }

        move(steps) {
            this.ychange = steps;
        }

        show() {
            rectMode(CENTER);
            fill(random(255),random(255),random(255));
            rect(this.x, this.y, this.w, this.h);


        }
    }
}


function hideButtons() {
    button.hide();
    button2.hide();
    button3.hide();
    button4.hide();
}
