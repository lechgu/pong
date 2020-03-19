import './index.css';
import Phaser from 'phaser';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Score } from './Score';
import font24_png from './assets/font24.png';
import font24_fnt from './assets/font24.fnt';
import font96_png from './assets/font96.png';
import font96_fnt from './assets/font96.fnt';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
    this.paddleA = new Paddle(this, 100, 100);
    this.paddleB = new Paddle(
      this,
      this.opts.width - 100,
      this.opts.height - 100
    );
    this.scoreA = new Score(this, this.opts.width / 2 - 400, 200);
    this.scoreB = new Score(this, this.opts.width / 2 + 400, 200);
    this.ball = new Ball(this, this.opts.width / 2, this.opts.height / 2);
  }

  create() {
    this.add.image(this.opts.width / 2, this.opts.height / 2, 'background');
    this.add.bitmapText(this.x, this.y, 'font24', 'Hello Pong');
    this.paddleA.create();
    this.paddleB.create();
    this.ball.create();
    this.scoreA.create();
    this.scoreB.create();
    this.keyW = this.input.keyboard.addKey('w');
    this.keyS = this.input.keyboard.addKey('s');
    this.keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.keyDown = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
  }
  update(tm, dt) {
    const paddleSpeed = 0.3;
    this.paddleA.update(dt);
    this.paddleB.update(dt);
    this.ball.update(dt);
    this.scoreA.update(dt);
    this.scoreB.update(dt);

    if (this.keyW.isDown) {
      this.paddleA.incrementY(-paddleSpeed * dt);
    } else if (this.keyS.isDown) {
      this.paddleA.incrementY(paddleSpeed * dt);
    }
    if (this.keyUp.isDown) {
      this.paddleB.incrementY(-paddleSpeed * dt);
    } else if (this.keyDown.isDown) {
      this.paddleB.incrementY(paddleSpeed * dt);
    }
  }

  preload() {
    this.load.bitmapFont('font24', font24_png, font24_fnt);
    this.load.bitmapFont('font96', font96_png, font96_fnt);
    this.createSolidSprite(
      'background',
      this.opts.width,
      this.opts.height,
      '#282a34'
    );
    this.createSolidSprite('paddle', 15, 60, '#ffffff');
    this.createSolidSprite('ball', 12, 12, '#ffffff');
  }

  createSolidSprite(name, width, height, color) {
    const texture = this.textures.createCanvas(name, width, height);
    const ctx = texture.getContext();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    texture.refresh();
  }
}

window.onload = () => {
  const opts = {
    width: 1280,
    height: 720
  };

  const mainScene = new MainScene(opts);

  const config = {
    width: opts.width,
    height: opts.height,
    backgroundColor: '#000000',
    scene: [mainScene]
  };
  const game = new Phaser.Game(config);
};
