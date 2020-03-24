import { collides } from './utils';

export class Paddle {
  constructor(game, x, y) {
    this.game = game;
    this.x = this.x = x;
    this.y = this.y = y;
    this.w = 15;
    this.h = 60;
  }

  create() {
    this.sprite = this.game.add.image(-1000, -1000, 'paddle').setOrigin(0, 0);
  }

  render() {
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  updateY(dy) {
    this.y = Phaser.Math.Clamp(this.y + dy, 0, this.game.opts.h - this.h);
  }
}

export class Ball {
  constructor(game, x, y) {
    this.game = game;
    this.opts = game.opts;
    this.x = x;
    this.y = y;
    this.w = 12;
    this.h = 12;
    this.dx = this.opts.ballSpeed;
    this.dy = this.opts.ballSpeed;
    this.onScored = n => {};
    this.onWallHit = () => {};
    this.onPaddleHit = () => {};
  }

  reset(n) {
    this.x = (this.opts.w - this.w) / 2;
    this.y = (this.opts.h - this.h) / 2;

    this.dx = n == 0 ? this.opts.ballSpeed : -this.opts.ballSpeed;
    this.dy = Phaser.Math.FloatBetween(
      this.opts.ballSpeed * 0.1,
      this.opts.ballSpeed * 1.9
    );
  }

  create() {
    this.sprite = this.game.add.image(-1000, -1000, 'ball').setOrigin(0, 0);
  }

  update(dt) {
    if (collides(this, this.game.paddle0)) {
      this.x = this.game.paddle0.x + this.game.paddle0.w;
      this.dx = -this.dx * this.opts.paddleSpeedup;
      this.onPaddleHit();
      return;
    }
    if (collides(this, this.game.paddle1)) {
      this.x = this.game.paddle1.x - this.w;
      this.dx = -this.dx * this.opts.paddleSpeedup;
      this.onPaddleHit();
      return;
    }
    let x = this.x + this.dx * dt;
    let y = this.y + this.dy * dt;
    if (x <= 0) {
      this.onScored(1);
      return;
    }
    if (x + this.w > this.opts.w) {
      this.onScored(0);
      return;
    }
    if (y <= 0) {
      y = 0;
      this.dy = -this.dy;
      this.onWallHit();
    }
    if (y + this.h > this.opts.h) {
      y = this.opts.h - this.h;
      this.dy = -this.dy;
      this.onWallHit();
    }
    this.x = x;
    this.y = y;
  }

  render() {
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}

export class Score {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.score = 0;
  }

  create() {
    this.sprite = this.game.add
      .bitmapText(this.x, this.y, 'font96', `${this.score}`)
      .setOrigin(0, 0);
  }

  render() {
    this.sprite.text = `${this.score}`;
    this.sprite.x = this.x - this.sprite.width / 2;
    this.sprite.y = this.y - this.sprite.height / 2;
  }
}

export class Status {
  constructor(game, x, y) {
    this.game = game;
    this.opts = game.opts;
    this.x = x;
    this.y = y;
    this.status = '';
  }
  create() {
    this.sprite = this.game.add
      .bitmapText(this.x, this.y, 'font24', this.status)
      .setOrigin(0, 0);
  }

  render() {
    this.sprite.text = this.status;
    this.sprite.x = (this.opts.w - this.sprite.width) / 2;
  }
}
