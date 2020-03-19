import './index.css';
import Phaser from 'phaser';
import font24_png from './assets/font24.png';
import font24_fnt from './assets/font24.fnt';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
  }

  preload() {
    this.load.bitmapFont('font24', font24_png, font24_fnt);
  }

  create() {
    const txt = this.add.bitmapText(
      this.opts.width / 2,
      this.opts.height / 2,
      'font24',
      'Hello Pong'
    );
    console.log(txt.width);
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
    type: Phaser.CANVAS,
    scene: [mainScene]
  };
  const game = new Phaser.Game(config);
};
