export class Ball {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 12;
    this.dx = Phaser.Math.Between(0, 1) == 1 ? -0.1 : 0.1;
    this.dy = Phaser.Math.FloatBetween(-0.05, 0.05);
  }

  reset() {
    this.x = this.game.opts.width / 2;
    this.y = this.game.opts.height / 2;
    this.dx = Phaser.Math.Between(0, 1) == 1 ? -0.1 : 0.1;
    this.dy = Phaser.Math.FloatBetween(-0.05, 0.05);
  }

  adjust(serving) {
    this.dx = serving == 2 ? -0.1 : 0.1;
  }

  create() {
    this.sprite = this.game.add.image(this.x, this.y, 'ball');
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
  }

  render() {
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }

  collides(paddle) {
    const r1 = {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      w: this.width,
      h: this.height
    };
    const r2 = {
      x: paddle.x - paddle.width / 2,
      y: paddle.y - paddle.height / 2,
      w: paddle.width,
      h: paddle.height
    };
    if (r2.x < r1.x + r1.w && r1.x < r2.x + r2.w && r2.y < r1.y + r1.h)
      return r1.y < r2.y + r2.h;
    else return false;
  }
}
