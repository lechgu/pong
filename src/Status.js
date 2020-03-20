export class Status {
  constructor(game, x, y, status) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.status = status;
  }

  create() {
    this.text = this.game.add.bitmapText(this.x, this.y, 'font24', '');
  }

  setStatus(status) {
    this.status = status;
  }

  render() {
    this.text.x = this.x - this.text.width / 2;
    this.text.y = this.y - this.text.height / 2;
    this.text.text = this.status;
  }
}
