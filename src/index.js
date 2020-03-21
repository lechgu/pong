import './index.css';
import Phaser from 'phaser';
import { Paddle } from './Paddle';
import { Ball } from './Ball';
import { Score } from './Score';
import { Status } from './Status';
import font24_png from './assets/font24.png';
import font24_fnt from './assets/font24.fnt';
import font96_png from './assets/font96.png';
import font96_fnt from './assets/font96.fnt';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
    this.state = 'started';
    this.paddleA = new Paddle(this, 100, 100);
    this.paddleB = new Paddle(
      this,
      this.opts.width - 100,
      this.opts.height - 100
    );
    this.status = new Status(this, this.opts.width / 2, 40, '[enter] to start');
    this.scoreA = new Score(this, this.opts.width / 2 - 100, 140);
    this.scoreB = new Score(this, this.opts.width / 2 + 100, 140);
    this.ball = new Ball(this, this.opts.width / 2, this.opts.height / 2);
    this.victory = 2;
    this.serving = 1;
    this.needsResetScore = true;
  }

  handleKey(e) {
    if (e.code === 'Enter') {
      if (this.state === 'started') {
        if (this.needsResetScore) {
          this.scoreA.score = 0;
          this.scoreB.score = 0;
          this.needsResetScore = false;
        }
        this.state = 'playing';
        this.status.setStatus('[enter] to pause');
      } else {
        this.state = 'started';
        this.status.setStatus('[enter] to resume');
      }
    }
  }

  create() {
    this.input.keyboard.on('keydown', this.handleKey, this);
    this.add.image(this.opts.width / 2, this.opts.height / 2, 'background');
    this.status.create();
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
    this.status.render();
    this.scoreA.render();
    this.scoreB.render();
    if (this.state == 'playing') {
      const paddleSpeed = 0.3;
      this.paddleA.update(dt);
      this.paddleB.update(dt);
      this.ball.update(dt);

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

      if (this.ball.collides(this.paddleA)) {
        this.ball.dx = -this.ball.dx * 1.03;
        this.ball.x = this.paddleA.x + this.paddleA.width + 10;
        if (this.ball.dy < 0) {
          this.ball.dy = Phaser.Math.FloatBetween(-0.01, 0.001);
        } else {
          this.ball.dy = Phaser.Math.FloatBetween(0.001, 0.01);
        }
      }
      if (this.ball.collides(this.paddleB)) {
        this.ball.dx = -this.ball.dx * 1.03;
        this.ball.x = this.paddleB.x - 12;
        if (this.ball.dy < 0) {
          this.ball.dy = Phaser.Math.FloatBetween(-0.1, 0.01);
        } else {
          this.ball.dy = Phaser.Math.FloatBetween(0.01, 0.1);
        }
      }

      if (this.ball.y < 3) {
        this.ball.y = 3;
        this.ball.dy = -this.ball.dy;
      }
      if (this.ball.y > this.opts.height - 3) {
        this.ball.y = this.opts.height - 3;
        this.ball.dy = this.ball.dy;
      }

      if (this.ball.x < 3) {
        this.scoreB.score += 1;
        this.serving = 1;
        this.ball.reset();
        this.ball.adjust(this.serving);
        this.state = 'started';
        if (this.scoreB.score == this.victory) {
          this.needsResetScore = true;
          this.status.staus = 'Player 2 won, [enter to start again';
        } else {
          this.status.status = '[enter] to continue';
        }
      }
      if (this.ball.x > this.opts.width - 3) {
        this.scoreA.score += 1;
        this.serving = 2;
        this.ball.reset();
        this.ball.adjust(this.serving);
        this.state = 'started';
        if (this.scoreA.score == this.victory) {
          this.needsResetScore = true;
          this.status.status = 'Player 1 won, [entor] to start again';
        } else {
          this.status.status = '[enter] to continue';
        }
      }

      this.paddleA.render();
      this.paddleB.render();
      this.ball.render();
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
