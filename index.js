import BallPlayground from './BallPlayground'

let playGround = new BallPlayground({
    parentContainer: document.body
});

playGround.setSize(800, 800);
playGround.paint();
