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
    const ball_left = this.x - this.width / 2;
    const ball_top = this.y - this.height / 2;
    const paddle_left = paddle.x - paddle.width / 2;
    const paddle_top = paddle.y - paddle.height / 2;
    const x = Math.max(ball_left, paddle_left);
    const num1 = Math.min(ball_left + this.width, paddle_left + paddle.width);
    const y = Math.max(ball_top, paddle_top - paddle.height);
    const num2 = Math.min(ball_top + this.height, paddle_top + paddle.height);
    return num1 >= x && num2 >= y;
  }
}
