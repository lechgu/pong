import './index.css';
import Phaser from 'phaser';
import font24_png from './assets/font24.png';
import font24_fnt from './assets/font24.fnt';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
  }

  createSolidSprite(name, width, height, color) {
    const texture = this.textures.createCanvas(name, width, height);
    const ctx = texture.getContext();
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
    texture.refresh();
  }

  preload() {
    this.load.bitmapFont('font24', font24_png, font24_fnt);
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
    this.add.image(100, 100, 'paddle');
    this.add.image(this.opts.width - 100, this.opts.height - 100, 'paddle');
    this.add.image(this.opts.width / 2, this.opts.height / 2, 'ball');

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
