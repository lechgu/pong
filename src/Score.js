export class Score {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.score = 0;
  }

  create() {
    this.text = this.game.add.bitmapText(this.x, this.y, 'font96', '');
  }

  update(dt) {
    this.text.text = `${this.score}`;
  }
}
