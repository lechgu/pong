export class Ball {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.dx = Phaser.Math.Between(0, 1) == 1 ? -0.1 : 0.1;
    this.dy = Phaser.Math.FloatBetween(-0.05, 0.05);
  }

  create() {
    this.sprite = this.game.add.image(this.x, this.y, 'ball');
  }

  update(dt) {
    this.x += this.dx * dt;
    this.y += this.dy * dt;
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}
