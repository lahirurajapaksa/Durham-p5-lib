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

function setup() {
    createCanvas(400, 500)
    background(0)
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
    function drawloop() {
        if (secondflag) {
            speed = map(mouseY, 0, width, 0, 50);
            background(0);
            translate(width / 2, height / 2);
            for (var j = 0; j < stars.length; j++) {
                stars[j].update();
                stars[j].show();
            }
        }
    }
    drawloop()

}

function Star() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    this.update = function() {
        this.z = this.z - speed;
        if (this.z < 1) {
            this.z = width;
            this.x = random(-width, width);
            this.y = random(-height, height);
            this.pz = this.z;
        }
    }

    this.show = function() {
        fill(255);
        noStroke();

        var sx = map(this.x / this.z, 0, 1, 0, width);
        var sy = map(this.y / this.z, 0, 1, 0, height);

        var r = map(this.z, 0, width, 16, 0);
        ellipse(sx, sy, r, r);

        var px = map(this.x / this.pz, 0, 1, 0, width);
        var py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;

        stroke(255);
        line(px, py, sx, sy);

    }
}



function menu() {
    background(120, 0, 255);


    button = createButton("Normal Multiplayer")
    button.mousePressed(beginNormalMultiplayer)
    button.position(135, 225);

    button2 = createButton("Multiplayer ball frenzy");
    button2.position(130, 250);
    button2.mousePressed(beginMultiplayerFrenzy);


    button4 = createButton("Crazy Mode")
    button4.position(152, 175)
    text("Randomly generated paddles and ball",100,295)
    button4.mousePressed(beginCrazyPaddles)

    button5 = createButton("Epilepsy mode")
    button5.position(147, 200)
    text("Too many balls", 151, 355)
    button5.mousePressed(beginEpilepsyMode);




    textSize(32)
    fill(0)
    text("PONG MANIA", 95, 30)
    fill(255, 0, 0)
    text("PONG MANIA", 97, 32)
    textSize(12)
    fill(0)
    text("Play with your keyboard", 130, 100)
    text("W and S for player 1", 140, 119)
    text("ArrowUp and ArrowDown for player 2", 110, 138)
    text("A lot of balls.", 160, 215)
    text("Click the mouse", 152, 230)
}


function beginEpilepsyMode() {
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

function mouseClicked() {
    if (isMultiplayerFrenzy) {
        let b = new Ball();
        balls.push(b)
    }
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

function keyReleased() {
    left.move(0);
    right.move(0);
}

function MultiplayerFrenzymode() {
    clear();
    hideButtons();
    let r2 = 0;
    let b2 = 255;
    //let button;
    balls = []

    this.setup = function() {
        createCanvas(800, 400);
        //menu();

        ball = new Ball();
        left = new Paddle(true);
        right = new Paddle(false);

        for (let i = 0; i < 2; i++) {
            balls[i] = new Ball()

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



        function keyReleased() {
            left.move(0);
            right.move(0);
        }




    }

    class Ball {
        constructor() {
            this.x = width / 2;
            this.y = height / 2;
            this.xspeed = 0;
            this.yspeed = 0;
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
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
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
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x - p.w / 2 - this.r;
                }
            }
        }

        update() {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        reset() {
            this.x = width / 2;
            this.y = height / 2;
            let angle = random(-PI / 4, PI / 4);
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
            fill(random(255), 0, random(255));
            ellipse(this.x, this.y, this.r * 2);
        }
    }
}

class Paddle {
    constructor(isLeft) {
        this.y = height / 2;
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
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }

    move(steps) {
        this.ychange = steps;
    }

    show() {
        rectMode(CENTER);
        fill(random(255), random(255), random(255));
        rect(this.x, this.y, this.w, this.h);


    }


}




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
        //menu();

        ball = new Ball();
        left = new Paddle2(true);
        right = new Paddle2(false);

        //for (let i = 0; i<2; i++) {
        //balls[i] = new Ball()

        //}

        this.draw = function() {
            background(0);
            r2 = map(right.y, 0, 400, 255, 0)
            b2 -= map(left.y, 400, 800, 0, 255)
            background(r2, 0, b2)

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
            text(Rscore, width - 64, 40);

        }
    }



}

class Ball {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
        this.xspeed = 0;
        this.yspeed = 0;
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
                this.xspeed = 5 * cos(angle);
                this.yspeed = 5 * sin(angle);
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
                this.xspeed = 5 * cos(angle);
                this.yspeed = 5 * sin(angle);
                this.x = p.x - p.w / 2 - this.r;
            }
        }
    }

    update() {
        this.x += this.xspeed;
        this.y += this.yspeed;
    }

    reset() {
        this.x = width / 2;
        this.y = height / 2;
        let angle = random(-PI / 4, PI / 4);
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
        fill(random(255), 0, random(255));
        ellipse(this.x, this.y, this.r * 2);
    }

}

class Paddle2 {
    constructor(isLeft) {
        this.y = height / 2;
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
        this.y = constrain(this.y, this.h / 2, height - this.h / 2);
    }

    move(steps) {
        this.ychange = steps;
    }

    show() {
        rectMode(CENTER);
        fill(random(255), random(255), random(255));
        rect(this.x, this.y, this.w, this.h);


    }


}

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

        //for (let i = 0; i<2; i++) {
        //  balls[i] = new Ball()

        // }



    }




    this.draw = function() {
        background(0);
        r2 = map(right.y, 0, 400, 255, 0)
        b2 -= map(left.y, 400, 800, 0, 255)
        background(r2, 0, b2)

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
        text(Rscore, width - 64, 40);


    }

    function menu() {
        background(0);
    }


    //function mouseClicked() {
    //  let b = new Ball();
    //balls.push(b)
    //}
    function keyReleased() {
        left.move(0);
        right.move(0);
    }



    class Ball {
        constructor() {
            this.x = width / 2;
            this.y = height / 2;
            this.xspeed = 0;
            this.yspeed = 0;
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
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
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
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x - p.w / 2 - this.r;
                }
            }
        }

        update() {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        reset() {
            this.x = width / 2;
            this.y = height / 2;
            let angle = random(-PI / 4, PI / 4);
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
            fill(random(255), 0, random(255));
            ellipse(this.x, this.y, this.r * 2);
        }
    }

    class Paddle {
        constructor(isLeft) {
            this.y = height / 2;
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
            this.y = constrain(this.y, this.h / 2, height - this.h / 2);
        }

        move(steps) {
            this.ychange = steps;
        }

        show() {
            rectMode(CENTER);
            fill(random(255), random(255), random(255));
            rect(this.x, this.y, this.w, this.h);


        }
    }
}

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
            this.xspeed = 0;
            this.yspeed = 0;
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
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
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
                    this.xspeed = 5 * cos(angle);
                    this.yspeed = 5 * sin(angle);
                    this.x = p.x - p.w / 2 - this.r;
                }
            }
        }

        update() {
            this.x += this.xspeed;
            this.y += this.yspeed;
        }

        reset() {
            this.x = width / 2;
            this.y = height / 2;
            let angle = random(-PI / 4, PI / 4);
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
            this.ychange = 0;

            if (isLeft) {
                this.x = this.w;
            } else {
                this.x = width - this.w;
            }


        }

        update() {
            this.y += this.ychange;
            this.y = constrain(this.y, this.h / 2, height - this.h / 2);
        }

        move(steps) {
            this.ychange = steps;
        }

        show() {
            rectMode(CENTER);
            fill(random(255), random(255), random(255));
            rect(this.x, this.y, this.w, this.h);


        }
    }
}



function hideButtons() {
    button.hide();
    button2.hide();
    button4.hide();
    button5.hide();
}