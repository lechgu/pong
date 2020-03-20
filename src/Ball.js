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
    if (this.x > paddle.x + paddle.width) {
      return false;
    }
    if (paddle.x > this.x + this.width) {
      return false;
    }
    if (this.y > paddle.y + paddle.height) {
      return false;
    }
    if (paddle.y > this.y + this.height) {
      return false;
    }
    return true;
  }
}
