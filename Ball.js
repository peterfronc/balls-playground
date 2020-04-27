export default class Ball {
    constructor ({playGround, x, y, speedX, speedY, diameter, color, gravity}) {
        this.playGround = playGround;
        this.context = this.playGround.root.getContext("2d");

        this.x = x;
        this.y = y;

        this.diameter = diameter || 16;

        this.speedX = speedX || 0;
        this.speedY = speedY || 0;

        this.factorX = 0.990;
        this.factorY = 0.99;
        this.fillColor = color || "black";
        this.gravity = gravity || 5000;
    }

    start () {
        this.paint();
    }

    paint () {
        this.calculateCoordinates();

        if (this.doneX && this.doneY) {
            return;
        }

        this.context.beginPath();
        this.context.arc(
            this.x,
            Math.min(this.y, this.maxHeight()),
            this.diameter,
            0,
            2 * Math.PI);
        this.context.fillStyle = this.fillColor;
        this.context.fill();
        this.context.stroke();

        this.lastX = this.x;
        this.lastY = this.y;
    }

    calculateCoordinates () {
        if (!this.started) {
            this.started = Date.now();
        }
        let now = Date.now();
        this.calculateCoordinateX(now);
        this.calculateCoordinateY(now);
        this.started = now;
    }


    calculateCoordinateX (now) {
        if (this.doneX) {
            return;
        }
        let time = (now - this.started) / 1000;

        this.x = this.x + time * this.speedX;
        this.speedX *= this.factorX;

        let maxWidth = this.maxWidth();

        if (Math.abs(this.speedX) < 1) {
            this.speedX = 0;
            this.doneX = true;
        }

        if (this.x >= maxWidth && this.speedX >= 0) {
            this.speedX = -this.speedX;
        }

        if (this.x <= (this.diameter - 0.5) && this.speedX <= 0) {
            this.speedX = -this.speedX;
        }
    }

    calculateCoordinateY (now) {
        if (this.doneY) {
            return;
        }

        let time = (now - this.started) / 1000;
        let delta = time * this.gravity;
        let speed = this.speedY + delta;

        let move = time * ((this.speedY + speed) / 2);
        this.y = this.y + move;
        this.speedY = speed * this.factorY;

        let maxHeight = this.maxHeight();

        if (this.y >= maxHeight && this.speedY > 0) {
            this.speedY = -speed;
            if (this.speedY < 0 && delta > -this.speedY) {
                this.doneY = true;
                this.speedY = 0;
            }
        }
    }

    maxHeight () {
        return (this.playGround.root.height - this.diameter - 0.5);
    }

    maxWidth () {
        return (this.playGround.root.width - this.diameter - 0.5);
    }
}