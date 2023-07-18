import { PubSub } from "./../PubSub";
import { setupButton } from "./../utilities";

export class Subtask {
  buttons = {};
  _content = "";
  checked = false;
  id = null;

  constructor() {
    this.div = document.createElement("div");
    this.div.classList.add("unchecked");

    this.contentInput = document.createElement("input");
    this.contentInput.classList.add("subtask-content");

    this.finishSubtaskCheckbox = document.createElement("input");
    this.finishSubtaskCheckbox.setAttribute("type", "checkbox");
    this.finishSubtaskCheckbox.classList.add("finish-checkbox");
    this.finishSubtaskCheckbox.addEventListener("click", () => {
      PubSub.emit("UserWantsToCheckSubtask", this);
    });

    this.removeSubtaskButton = setupButton(
      "x",
      "remove-button",
      this,
      "removeSubtaskButton"
    );
    this.removeSubtaskButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToRemoveSubtask", this);
    });
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }
}
