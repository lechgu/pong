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
    const texture = this.textures.createCanvas(
      'background',
      this.opts.width,
      this.opts.height
    );
    const ctx = texture.getContext();
    ctx.fillStyle = '#282a34';
    ctx.fillRect(0, 0, this.opts.width, this.opts.height);
    texture.refresh();
  }

  create() {
    this.add.image(this.opts.width / 2, this.opts.height / 2, 'background');
    this.add.bitmapText(
      this.opts.width / 2,
      this.opts.height / 2,
      'font24',
      'Hello,  Pong'
    );
  }

  update() {}
}

window.onload = () => {
  const WINDOW_WIDTH = 1280;
  const WINDOW_HEIGHT = 720;
  const VIRTUAL_WIDTH = 432;
  const VIRTUAL_HEIGHT = 243;
  const opts = {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    virtWidth: VIRTUAL_WIDTH,
    virtHeight: VIRTUAL_HEIGHT,
    scaleX: WINDOW_WIDTH / VIRTUAL_WIDTH,
    scaleY: WINDOW_HEIGHT / VIRTUAL_HEIGHT
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
