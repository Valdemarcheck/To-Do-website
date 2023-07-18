export class Subtask {
  div = document.createElement("div");
  _content = "";
  id = null;

  constructor() {}

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }
}
