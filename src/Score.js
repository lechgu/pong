export class Score {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.score = 0;
  }

  create() {
    this.text = this.game.add.bitmapText(
      this.x,
      this.y,
      'font96',
      `${this.score}`
    );
  }

  render() {
    this.text.text = `${this.score}`;
    this.text.x = this.x - this.text.width / 2;
    this.text.y = this.y - this.text.height / 2;
  }
}
