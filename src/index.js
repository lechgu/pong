import './index.css';
import { Ball, Paddle, Status, Score } from './Objects';
import Phaser from 'phaser';
import font24_png from './assets/font24.png';
import font24_fnt from './assets/font24.fnt';
import font96_png from './assets/font96.png';
import font96_fnt from './assets/font96.fnt';
import paddle_hit_wav from './assets/paddle_hit.wav';
import wall_hit_wav from './assets/wall_hit.wav';
import score_wav from './assets/score.wav';

class MainScene extends Phaser.Scene {
  constructor(opts) {
    super('MainScene');
    this.opts = opts;
    this.status = new Status(this, 0, 20);
    this.score0 = new Score(this, this.opts.w / 2 - 60, 100);
    this.score1 = new Score(this, this.opts.w / 2 + 60, 100);
    this.ball = new Ball(this, -100, -100);
    this.paddle0 = new Paddle(this, 50, 200);
    this.paddle1 = new Paddle(this, this.opts.w - 50 - this.paddle0.w, 200);
    this.state = {
      name: '',
      serving: 0
    };
  }

  create() {
    this.paddleHitSound = this.sound.add('paddle_hit');
    this.wallHitSound = this.sound.add('wall_hit');
    this.scoreSound = this.sound.add('score');
    const img = this.add.image(0, 0, 'background').setOrigin(0, 0);
    this.status.create();
    this.score0.create();
    this.score1.create();
    this.ball.create();
    this.paddle0.create();
    this.paddle1.create();
    this.keyW = this.input.keyboard.addKey('w');
    this.keyS = this.input.keyboard.addKey('s');
    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterState('idle');
    this.input.keyboard.on('keydown', this.handleKey, this);
    this.ball.onPaddleHit = () => {
      this.paddleHitSound.play();
    };
    this.ball.onWallHit = () => {
      this.wallHitSound.play();
    };
    this.ball.onScored = n => {
      this.scoreSound.play();
      const score = n == 0 ? this.score0 : this.score1;
      score.score += 1;
      if (score.score == this.opts.wins) {
        this.enterState('win', n);
      } else {
        this.ball.reset(1 - n);
        this.enterState('paused');
      }
    };
  }

  update(tm, dt) {
    if (this.state.name === 'playing') {
      this.ball.update(dt);
    }

    this.hadleCursors(dt);
    this.status.render();
    this.score0.render();
    this.score1.render();
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
    this.load.audio('paddle_hit', paddle_hit_wav);
    this.load.audio('wall_hit', wall_hit_wav);
    this.load.audio('score', score_wav);
  }

  enterState(newState, aux) {
    const oldState = this.state.name;
    this.state.name = newState;
    if (newState == 'idle') {
      this.ball.reset(this.state.serving);
      if (oldState !== 'win') {
        this.status.status = '[enter] to begin';
      }
    } else if (newState == 'paused') {
      this.status.status = '[enter] to resume';
    } else if (newState == 'playing') {
      this.status.status = '[enter] to pause';
      this.score0.score = 0;
      this.score1.score = 0;
    } else if (newState == 'win') {
      this.status.status = `Player ${1 + aux} won, [enter] to play again`;
      this.state.serving = 1 - aux;
      this.enterState('idle');
    }
  }

  handleKey(e) {
    if (e.code === 'Enter') {
      if (this.state.name == 'idle') {
        this.enterState('playing');
      } else if (this.state.name == 'playing') {
        this.enterState('paused');
      } else if (this.state.name == 'paused') {
        this.enterState('playing');
      }
    }
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
    ballSpeed: 0.1,
    paddleSpeedup: 1.03,
    wins: 5
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
