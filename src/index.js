import './index.css';
import Phaser from 'phaser';
import font24_png from './assets/font24.png';
import font24_fnt from './assets/font24.fnt';
import font96_png from './assets/font96.png';
import font96_fnt from './assets/font96.fnt';

class Paddle {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  create() {
    this.game.add.image(this.x, this.y, 'paddle');
  }
}

class Ball {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  create() {
    this.game.add.image(this.x, this.y, 'ball');
  }
}

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
  }

  update(dx) {}

  createSolidSprite(name, width, height, color) {
    const texture = this.textures.createCanvas(name, width, height);
    const ctx = texture.getContext();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    texture.refresh();

    this.paddleA = new Paddle(this, 100, 100);
    this.paddleB = new Paddle(
      this,
      this.opts.width - 100,
      this.opts.height - 100
    );
    this.ball = new Ball(this, this.opts.width / 2, this.opts.height / 2);
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

  create() {
    this.add.image(this.opts.width / 2, this.opts.height / 2, 'background');
    this.paddleA.create();
    this.paddleB.create();
    this.ball.create();
    //this.add.image(100, 100, 'paddle');
    // this.add.image(this.opts.width - 100, this.opts.height - 100, 'paddle');
    //this.add.image(this.opts.width / 2, this.opts.height / 2, 'ball');

    this.add.bitmapText(this.opts.width / 2, 100, 'font24', 'Hello Pong!');
  }
  update() {}
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
