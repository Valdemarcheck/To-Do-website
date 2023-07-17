export class Subtask {
  div = document.createElement("div");
  id = null;

  constructor(data = null) {
    this.content = data ? data.content : "";
    this.div.classList.add("subtask-div");
  }
}
