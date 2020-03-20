export class Paddle {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
  }

  create() {
    this.sprite = this.game.add.image(this.x, this.y, 'paddle');
  }

  incrementY(dy) {
    this.y += dy;
    this.y = Math.max(30, this.y);
    this.y = Math.min(this.y, this.game.opts.height - 30);
  }

  update(dt) {}

  render() {
    this.sprite.x = this.x;
    this.sprite.y = this.y;
  }
}
