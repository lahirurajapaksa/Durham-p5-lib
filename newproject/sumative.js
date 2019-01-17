//declare all variables

let button
let button2
let button3
let button4
let button5
let button6
let isEpilepsyMode = false;
let epilepsyMode;
let isNormalMultiplayer = false;
let NormalMultiplayer;
let isMultiplayerFrenzy = false;
let MultiplayerFrenzy;
let isCrazyPaddles = false;
let CrazyPaddles;
let Lscore=0
let Rscore=0
let stars=[]
let speed
let firstflag=true
let secondflag=true

//setup function

function setup() {
    //make createcanvas a variable
    let cnv = createCanvas(400, 500)
    //assign x and y values
    let xofcnv=(windowWidth - width)/2
    let yofcnv=(windowHeight - width-100)/2
    //position the canvas on the page
    cnv.position(xofcnv,yofcnv)
    background(0)
    //runs function for background of menuscreen
    function setuploop() {
        if (firstflag){
            for (var i = 0; i < 800; i++) {
                stars[i] = new Star()
            }
        }
    }
    setuploop()

    menu();
}

//uses true and false values to check select a game mode and draw that on to the canvas, ensures that only one game mode is operational at a time
function draw() {
    if (isEpilepsyMode) {
        epilepsyMode.draw();
    } else if (isNormalMultiplayer) {
        NormalMultiplayer.draw();
    } else if (isMultiplayerFrenzy) {
        MultiplayerFrenzy.draw();
    } else if (isCrazyPaddles) {
        CrazyPaddles.draw();
    }
    //draws background of the menu if the secondflag is true
    function drawloop() {
        if (secondflag) {
            //allows the speed of the stars to increase depending on the y co-ordinates of the mouse pointer
            speed = map(mouseY, 0, width, 0, 50);
            background(0);
            translate(width / 2, height / 2);
            //for loop that is dependant on the length of the stars array, and runs in order to move the stars and show them on the screen
            for (var j = 0; j < stars.length; j++) {
                stars[j].update();
                stars[j].show();
            }
        }
    }
    drawloop()

}

function Star() {
    //x and y coordinate
    this.x = random(-width, width);
    this.y = random(-height, height);
    //randomly generated value between the values of the width
    this.z = random(width);

    this.update = function() {
        //subtracts the speed value which is corelated to the position of the mouse y pointer
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
        }
    }

    this.show = function() {
        fill(255);
        noStroke();
        //  this.x/this.z and this.y/this.z allows the value being divided to keep getting bigger and bigger so that the ellipses
        //will get mapped properly allowing them to move out from the center to the edge
        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);

        var r = map(this.z, 0, width, 16, 0);
        ellipse(sx, sy, r, r);


    }
}



function menu() {
    background(120, 0, 255);

    //creates different buttons for the menu and maps each button press to its corresponding function
    button = createButton("Normal Multiplayer")
    button.mousePressed(beginNormalMultiplayer)
    button.position(655, 345);

    button2 = createButton("Multiplayer ball frenzy");
    button2.position(650, 370);
    button2.mousePressed(beginMultiplayerFrenzy);


    button4 = createButton("Crazy Mode")
    button4.position(672, 295)
    text("Randomly generated paddles and ball",100,295)
    button4.mousePressed(beginCrazyPaddles)

    button5 = createButton("SPAWN! mode")
    button5.position(667, 320)
    text("Too many balls", 151, 355)
    button5.mousePressed(beginEpilepsyMode);





}

//all the functions that allow one game mode to run at a time by changing the boolean values of each of them
function beginEpilepsyMode() {
    //sets firstflag and secondflag to false in order to ensure that the background is not running at the same time otherwise the game mode would not be displayed
    firstflag=false
    secondflag=false
    isEpilepsyMode = true;
    epilepsyMode = new Epilepsymode();
    epilepsyMode.setup();

}


function beginNormalMultiplayer() {
    firstflag=false
    secondflag=false
    isNormalMultiplayer = true
    NormalMultiplayer = new NormalMultiplayermode()
    NormalMultiplayer.setup()
}

function beginMultiplayerFrenzy() {
    firstflag=false
    secondflag=false
    isMultiplayerFrenzy = true
    MultiplayerFrenzy = new MultiplayerFrenzymode();
    MultiplayerFrenzy.setup();
}

function beginCrazyPaddles() {
    firstflag=false
    secondflag=false
    isCrazyPaddles = true
    CrazyPaddles = new CrazyPaddlesmode();
    CrazyPaddles.setup();
}

//allows balls to be produced when the mouse is clicked in MultiplayerFrenzy
function mouseClicked() {
    if (isMultiplayerFrenzy) {
        let b = new Ball();
        balls.push(b)
    }
}



//defines how the paddles are moved depending on the relevant key press
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

//allows the paddles to move continously when a button is held down, if this function didn't exist the user would repeatedly have to keep clicking the button to move the paddle up or down

function keyReleased() {
    left.move(0);
    right.move(0);
}

//runs the game mode MultiplayerFrenzy
function MultiplayerFrenzymode() {
    //gets rid of the menu

    clear();
    hideButtons();

    let r2 = 0;
    let b2 = 255;
    //let button;
    balls = []

    this.setup = function() {
        createCanvas(800, 400);
        //menu();

        //creates a ball and 2 paddles
        ball = new Ball();
        //assigning isLeft to True ensures that the Paddle class works properly to implement the paddle object
        left = new Paddle(true);
        //assigned to false as its the right paddle
        right = new Paddle(false);

        for (let i = 0; i < 2; i++) {
            balls[i] = new Ball()

        }

        this.draw = function() {
            background(0);
            //changes background colour when paddles are moved, however is only working for right paddle
            r2 = map(right.y, 0, 400, 255, 0)
            b2 -= map(left.y, 400, 800, 0, 255)
            background(r2, 0, b2)

            //defines what happens each time a ball or paddle is produced
            for (let i = 0; i < balls.length; i++) {
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

        //the score board
            fill(255);
            textSize(32);
            text(Lscore, 32, 40);
            text(Rscore, width - 64, 40);

        }



        function keyReleased() {
            left.move(0);
            right.move(0);
        }




    }
    //defines the ball class
    class Ball {
        constructor() {
            //x and y position
            this.x = width / 2;
            this.y = height / 2;
            //x and y speeds
            this.ballvx = 0;
            this.ballvy = 0;
            //the radius of the ball
            this.r = 12;

            this.reset();
        }

        checkPaddleLeft(p) {
            //function allows the ball to properly bounce off the paddle
            //if statement ensures that the ball is within the x and y co-ordinates in relation to its radius so that
            //it can bounce off the relevant paddle
            if (this.y - this.r < p.y + p.h / 2 &&
                this.y + this.r > p.y - p.h / 2 &&
                this.x - this.r < p.x + p.w / 2) {

                //this means that the x coordinate of the ball is greater than that of the ball and as a result it should rebound
                if (this.x > p.x) {
                    //defines the different angles at which the ball would bounce off the paddle depending on where it hits the paddle
                    let diff = this.y - (p.y - p.h / 2);
                    let rad = radians(45);
                    let angle = map(diff, 0, p.h, -rad, rad);
                    this.ballvx = 5 * cos(angle);
                    this.ballvy = 5 * sin(angle);
                    this.x = p.x + p.w / 2 + this.r;
                }

            }
        }
        checkPaddleRight(p) {
            //same as checkPaddleLeft except the last part of the if statement has this.x+this.r>p.x-p.w/2 because of the
            //horizontal difference between the two left and right paddles, as checkPaddleLeft had this.x+this.r<p.x+p.w
            if (this.y - this.r < p.y + p.h / 2 &&
                this.y + this.r > p.y - p.h / 2 &&
                this.x + this.r > p.x - p.w / 2) {

                //this means that the x coordinate of the ball is greater than that of the ball and as a result it should rebound
                if (this.x < p.x) {
                    //defines the different angles at which the ball would bounce off the paddle depending on where it hits the paddle

                    let difference = this.y - (p.y - p.h / 2);
                    let angle = map(difference, 0, p.h, radians(225), radians(135));
                    this.ballvx = 5 * cos(angle);
                    this.ballvy = 5 * sin(angle);
                    this.x = p.x - p.w / 2 - this.r;
                }
            }
        }
        //updates the position of the ball by adding on the speed to x and y coordinates
        update() {
            this.x += this.ballvx;
            this.y += this.ballvy;
        }
        //when the ball has gone out of bounds this function is called to respawn the ball
        reset() {
            //spawns it at the middle of the sketch
            this.x = width / 2;
            this.y = height / 2;
            //allows the ball to pop up at a random speed and angle when it has been generated
            let angle = random(-PI / 4, PI / 4);
            this.ballvx = 5 * Math.cos(angle);
            this.ballvy = 5 * Math.sin(angle);

            if (random(1) < 0.5) {
                this.ballvx *= -1;
            }
        }

        edges() {
            //if the ball hits the top or bottom edges, it then bounces back as its ballvy is made negative, sending it in the opposite y direction
            if (this.y < 0 || this.y > height) {
                this.ballvy *= -1;
            }
            //checks whether the ball has gone past the right side
            //this means there would be a point for the left player, which is why Lscore is incremented
            if (this.x - this.r > width) {
                Lscore++;
                this.reset();
            }
            //checks whether the ball has gone past the left side
            //this means there would be a point for the right player, which is why Rscore is incremented

            if (this.x + this.r < 0) {
                Rscore++;
                this.reset();
            }
        }

        show() {
            //displays the ball on screen
            fill(random(255), 0, random(255));
            ellipse(this.x, this.y, this.r * 2);
        }
    }
}
//defines paddle class
class Paddle {
    constructor(isLeft) {
        this.y = height / 2;
        this.w = 20;
        this.h = 100;
        this.stepchange = 0;

        //assigns the x position of the paddle depending on whether it is the left or the right paddle
        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }


    }

    update() {
        this.y += this.stepchange;
        //ensures that the paddle stays in between the playing regions due to the constrain function
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }
    //defines how far the paddle should be moved depending on the step count which is incremented when move control keys are held down
    move(steps) {
        this.stepchange = steps;
    }

    show() {
        //displays the paddle
        rectMode(CENTER);
        fill(random(255), random(255), random(255));
        rect(this.x, this.y, this.w, this.h);


    }


}



//runs the game mode NormalMultiplayer
function NormalMultiplayermode() {
    clear();
    hideButtons();
    text("Normal multiplayer", width / 2, height / 2)
    let r2 = 0;
    let b2 = 255;
    //let button;
    //balls=[]

    this.setup = function() {
        createCanvas(800, 400);

        ball = new Ball();
        left = new Paddle2(true);
        right = new Paddle2(false);



        this.draw = function() {
            background(0);
            r2 = map(right.y, 0, 400, 255, 0)
            b2 -= map(left.y, 400, 800, 0, 255)
            background(r2, 0, b2)


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
            text(Rscore, width - 64, 40);

        }
    }



}

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.ballvx = 0;
        this.ballvy = 0;
        this.r = 12;

        this.reset();
    }

    checkPaddleLeft(p) {
        if (this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x - this.r < p.x + p.w / 2) {

            if (this.x > p.x) {
                let diff = this.y - (p.y - p.h / 2);
                let rad = radians(45);
                let angle = map(diff, 0, p.h, -rad, rad);
                this.ballvx = 5 * cos(angle);
                this.ballvy = 5 * sin(angle);
                this.x = p.x + p.w / 2 + this.r;
            }

        }
    }
    checkPaddleRight(p) {
        if (this.y - this.r < p.y + p.h / 2 &&
            this.y + this.r > p.y - p.h / 2 &&
            this.x + this.r > p.x - p.w / 2) {

            if (this.x < p.x) {
                let diff = this.y - (p.y - p.h / 2);
                let angle = map(diff, 0, p.h, radians(225), radians(135));
                this.ballvx = 5 * cos(angle);
                this.ballvy = 5 * sin(angle);
                this.x = p.x - p.w / 2 - this.r;
            }
        }
    }

    update() {
        this.x += this.ballvx;
        this.y += this.ballvy;
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        let angle = random(-PI / 4, PI / 4);
        this.ballvx = 5 * Math.cos(angle);
        this.ballvy = 5 * Math.sin(angle);

        if (random(1) < 0.5) {
            this.ballvx *= -1;
        }
    }

    edges() {
        if (this.y < 0 || this.y > height) {
            this.ballvy *= -1;
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
        fill(random(255), 0, random(255));
        ellipse(this.x, this.y, this.r * 2);
    }

}

class Paddle2 {
    constructor(isLeft) {
        this.y = height / 2;
        this.w = 20;
        this.h = 100;
        this.stepchange = 0;

        if (isLeft) {
            this.x = this.w;
        } else {
            this.x = width - this.w;
        }


    }

    update() {
        this.y += this.stepchange;
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }

    move(steps) {
        this.stepchange = steps;
    }

    show() {
        rectMode(CENTER);
        fill(random(255), random(255), random(255));
        rect(this.x, this.y, this.w, this.h);


    }


}

//runs the game mode CrazyPaddles
function CrazyPaddlesmode() {
    clear();
    hideButtons();
    text("Crazy paddles", width / 2, height / 2)
    let r2 = 0;
    let b2 = 255;
    let button;
    //balls=[]

    this.setup = function() {
        createCanvas(800, 400);
        menu();

        ball = new Ball();
        left = new Paddle(true);
        right = new Paddle(false);




    }




    this.draw = function() {
        background(0);

        r2 = map(right.y, 0, 400, 255, 0)
        b2 -= map(left.y, 400, 800, 0, 255)
        background(r2, 0, b2)


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
        text(Rscore, width - 64, 40);


    }

    function menu() {
        background(0);
    }


    function keyReleased() {
        left.move(0);
        right.move(0);
    }



    class Ball {
        constructor() {
            this.x = width / 2;
            this.y = height / 2;
            this.ballvx = 0;
            this.ballvy = 0;
            //randomly generates the size of the ball
            this.r = random(80);

            this.reset();
        }

        checkPaddleLeft(p) {
            if (this.y - this.r < p.y + p.h / 2 &&
                this.y + this.r > p.y - p.h / 2 &&
                this.x - this.r < p.x + p.w / 2) {

                if (this.x > p.x) {
                    let diff = this.y - (p.y - p.h / 2);
                    let rad = radians(45);
                    let angle = map(diff, 0, p.h, -rad, rad);
                    this.ballvx = 5 * cos(angle);
                    this.ballvy = 5 * sin(angle);
                    this.x = p.x + p.w / 2 + this.r;
                }

            }
        }
        checkPaddleRight(p) {
            if (this.y - this.r < p.y + p.h / 2 &&
                this.y + this.r > p.y - p.h / 2 &&
                this.x + this.r > p.x - p.w / 2) {

                if (this.x < p.x) {
                    let diff = this.y - (p.y - p.h / 2);
                    let angle = map(diff, 0, p.h, radians(225), radians(135));
                    this.ballvx = 5 * cos(angle);
                    this.ballvy = 5 * sin(angle);
                    this.x = p.x - p.w / 2 - this.r;
                }
            }
        }

        update() {
            this.x += this.ballvx;
            this.y += this.ballvy;
        }

        reset() {
            this.x = width / 2;
            this.y = height / 2;
            let angle = random(-PI / 4, PI / 4);
            this.ballvx = 5 * Math.cos(angle);
            this.ballvy = 5 * Math.sin(angle);

            if (random(1) < 0.5) {
                this.ballvx *= -1.5;
            }
        }

        edges() {
            if (this.y < 0 || this.y > height) {
                this.ballvy *= -1.5;
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
            fill(random(255), 0, random(255));
            ellipse(this.x, this.y, this.r * 2);
        }
    }

    class Paddle {
        constructor(isLeft) {
            this.y = height / 2;
            this.w = random(100);
            this.h = random(300);
            this.stepchange = 0;

            if (isLeft) {
                this.x = this.w;
            } else {
                this.x = width - this.w;
            }


        }

        update() {
            this.y += this.stepchange;
            this.y = constrain(this.y, this.h / 2, height - this.h / 2);
        }

        move(steps) {
            this.stepchange = steps;
        }

        show() {
            rectMode(CENTER);
            fill(random(255), random(255), random(255));
            rect(this.x, this.y, this.w, this.h);


        }
    }
}

//runs the game mode epilepsymode
function Epilepsymode() {
    clear();
    hideButtons();
    let r2 = 0;
    let b2 = 255;
    let button;
    balls = []

    this.setup = function() {
        createCanvas(800, 400);
        menu();
        ball = new Ball();
        left = new Paddle(true);
        right = new Paddle(false);

        //the start of the for loop is changed in order to produce a lot more balls, this is originally the same for loop from the function MultiplayerFrenzy

        for (let i = 0; i <= 1000; i++) {
            balls[i] = new Ball()
        }
    }




    this.draw = function() {
        background(0);
        r2 = map(right.y, 0, 400, 255, 0)
        b2 -= map(left.y, 400, 800, 0, 255)
        background(r2, 0, b2)

        for (let i = 0; i < balls.length; i++) {
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
        text(Rscore, width - 64, 40);

    }

    function menu() {
        background(0);
    }


    function mouseClicked() {
        let b = new Ball();
        balls.push(b)
    }

    function keyReleased() {
        left.move(0);
        right.move(0);
    }



    class Ball {
        constructor() {
            this.x = width / 2;
            this.y = height / 2;
            this.ballvx = 0;
            this.ballvy = 0;
            this.r = 12;

            this.reset();
        }

        checkPaddleLeft(p) {
            if (this.y - this.r < p.y + p.h / 2 &&
                this.y + this.r > p.y - p.h / 2 &&
                this.x - this.r < p.x + p.w / 2) {

                if (this.x > p.x) {
                    let diff = this.y - (p.y - p.h / 2);
                    let rad = radians(45);
                    let angle = map(diff, 0, p.h, -rad, rad);
                    this.ballvx = 5 * cos(angle);
                    this.ballvy = 5 * sin(angle);
                    this.x = p.x + p.w / 2 + this.r;
                }

            }
        }
        checkPaddleRight(p) {
            if (this.y - this.r < p.y + p.h / 2 &&
                this.y + this.r > p.y - p.h / 2 &&
                this.x + this.r > p.x - p.w / 2) {

                if (this.x < p.x) {
                    let diff = this.y - (p.y - p.h / 2);
                    let angle = map(diff, 0, p.h, radians(225), radians(135));
                    this.ballvx = 5 * cos(angle);
                    this.ballvy = 5 * sin(angle);
                    this.x = p.x - p.w / 2 - this.r;
                }
            }
        }

        update() {
            this.x += this.ballvx;
            this.y += this.ballvy;
        }

        reset() {
            this.x = width / 2;
            this.y = height / 2;
            let angle = random(-PI / 4, PI / 4);
            this.ballvx = 5 * Math.cos(angle);
            this.ballvy = 5 * Math.sin(angle);

            if (random(1) < 0.5) {
                this.ballvx *= -1;
            }
        }

        edges() {
            if (this.y < 0 || this.y > height) {
                this.ballvy *= -1;
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
            fill(random(255), 0, random(255));
            fill(random(250), random(50), 40)
            ellipse(this.x, this.y, this.r * 2);
        }
    }

    class Paddle {
        constructor(isLeft) {
            this.y = height / 2;
            this.w = 20;
            this.h = 100;
            this.stepchange = 0;

            if (isLeft) {
                this.x = this.w;
            } else {
                this.x = width - this.w;
            }


        }

        update() {
            this.y += this.stepchange;
            this.y = constrain(this.y, this.h / 2, height - this.h / 2);
        }

        move(steps) {
            this.stepchange = steps;
        }

        show() {
            rectMode(CENTER);
            fill(random(255), random(255), random(255));
            rect(this.x, this.y, this.w, this.h);


        }
    }
}


//hides the buttons when a game mode has been selected
function hideButtons() {
    button.hide();
    button2.hide();
    button4.hide();
    button5.hide();
}