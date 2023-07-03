import { PubSub } from "../PubSub";
import { DefaultList } from "./default-list";

export class List extends DefaultList {
  constructor(data) {
    super(data);
    this.EditListButton = document.createElement("button");
    this.EditListButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToEditList", this);
      PubSub.emit("OpenListForm");
    });
    this.RemoveListButton = document.createElement("button");
    this.RemoveListButton.addEventListener("click", () => {
      PubSub.emit("ListShouldBeRemoved", this);
    });
    this.buttons.RemoveListButton = this.RemoveListButton;
    this.buttons.EditListButton = this.EditListButton;
  }
}
