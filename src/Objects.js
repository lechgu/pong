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
  }

  create() {
    this.sprite = this.game.add.image(-1000, -1000, 'ball').setOrigin(0, 0);
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
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
}

export class Status {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.status = '';
  }
  create() {
    this.sprite = this.game.add
      .bitmapText(this.x, this.y, 'font24', this.status)
      .setOrigin(0, 0);
  }
}
