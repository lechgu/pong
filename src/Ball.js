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
    const x = Math.max(this.x, paddle.x);
    const num1 = Math.min(this.x + this.width, paddle.x + paddle.width);
    const y = Math.max(this.y, paddle.y);
    const num2 = Math.min(this.y + this.height, paddle.y + paddle.height);
    return num1 >= x && num2 >= y;
  }
}
