import './index.css';
import { Ball, Paddle } from './Objects';
import Phaser, { Tilemaps } from 'phaser';
import font24_png from './assets/font24.png';
import font24_fnt from './assets/font24.fnt';
import font96_png from './assets/font96.png';
import font96_fnt from './assets/font96.fnt';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
    this.ball = new Ball(this, 100, 100);
    this.paddle0 = new Paddle(this, 50, 200);
    this.paddle1 = new Paddle(this, this.opts.w - 50 - this.paddle0.w, 200);
  }

  create() {
    const img = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.ball.create();
    this.paddle0.create();
    this.paddle1.create();
    this.keyW = this.input.keyboard.addKey('w');
    this.keyS = this.input.keyboard.addKey('s');
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(tm, dt) {
    this.ball.update(dt);
    this.hadleCursors(dt);
    this.ball.render();
    this.paddle0.render();
    this.paddle1.render();
  }

  preload() {
    this.load.bitmapFont('font24', font24_png, font24_fnt);
    this.load.bitmapFont('font96', font96_png, font96_fnt);
    this.createSolidSprite(
      'background',
      this.opts.width,
      this.opts.height,
      //'#ff0000'
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

  hadleCursors(dt) {
    if (this.cursors.down.isDown) {
      this.paddle1.updateY(this.opts.paddleSpeed * dt);
    }
    if (this.cursors.up.isDown) {
      this.paddle1.updateY(-this.opts.paddleSpeed * dt);
    }
    if (this.keyS.isDown) {
      this.paddle0.updateY(this.opts.paddleSpeed * dt);
    }
    if (this.keyW.isDown) {
      this.paddle0.updateY(-this.opts.paddleSpeed * dt);
    }
  }
}

window.onload = () => {
  const resizeGame = () => {
    const canvas = document.querySelector('canvas');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  };

  const opts = {
    w: 800,
    h: 600,
    paddleSpeed: 0.3,
    ballSpeed: 0.1
  };

  const mainScene = new MainScene(opts);

  const config = {
    width: opts.w,
    height: opts.h,
    backgroundColor: '#000000',
    scene: [mainScene]
  };
  const game = new Phaser.Game(config);
  window.focus();
  resizeGame();
  window.addEventListener('resize', resizeGame);
};
