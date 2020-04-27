import Ball from "./Ball"

import "./BallPlayground.css"

let colors = [
    "red", "yellow", "blue", "green", "pink", "cyan", "orange"
];

export default class BallPlayground {
    constructor ({parentContainer}) {
        this.parentContainer = parentContainer;
        this.root = document.createElement("canvas");
        this.root.className = "BallPlayground";
        this.context = this.root.getContext("2d");
        this.context.imageSmoothingEnabled = true;
        this.context.imageSmoothingQuality = "high";
        this.balls = [];

        this.paintBalls = this.paintBalls.bind(this);
        this.root.onclick = this.handleClick.bind(this);
    }

    setSize (x, y) {
        this.root.width = x;
        this.root.height = y;
    }

    paint () {
        this.started = Date.now();
        this.parentContainer.appendChild(this.root);
        this.paintBalls();
    }

    handleClick (e) {
        this.dropBall(e.offsetX, e.offsetY);
    }

    paintBalls() {
        this.context.clearRect(
            0, 0, this.root.width, this.root.height);

        this.balls.forEach(ball => {
            ball.paint();
        });

        if (this.started) {
            requestAnimationFrame(this.paintBalls);
        }
    }

    dropBall(x, y) {
        let ball = new Ball({
            playGround: this,
            x,
            y,
            speedX: 1500 - 3000 * Math.random(),
            speedY: -2000 * Math.random(),
            diameter: 7+ Math.random() * 36,
            color: colors[(Math.floor(Math.random() * 7))]
        });
        ball.start();
        this.balls.push(ball);
    }
}
