let Lscore = 0;
let Rscore = 0;
let r2 = 0;
let b2 = 255;
balls=[]

function setup() {
    createCanvas(800, 400);

    ball = new Ball();
    left = new Paddle(true);
    right = new Paddle(false);

    for (let i = 0; i<1; i++) {
        balls[i] = new Ball()
    }



}





function draw() {
    background(0);
    r2=map(right.y,0,400,255,0)
    b2-=map(left.y,400,800,0,255)
    background(r2,0,b2)

    for (let i= 0; i<1; i++) {
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

function mousePressed() {
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
