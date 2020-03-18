import './index.css';
import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
    console.log('constructor');
  }

  preload() {
    const style = {
      fontFamily: '"Arial"',
      color: '#ffffff'
    };
    this.hello = this.add.text(-100, -100, 'Hello Pong!', style);
    this.hello.visible = false;
  }

  create() {
    this.hello.visible = true;
  }

  update() {
    this.hello.x = this.opts.width / 2;
    this.hello.y = this.opts.height - 60;
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
