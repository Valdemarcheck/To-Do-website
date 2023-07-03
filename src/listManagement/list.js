import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../form-manager";
import { DefaultList } from "./default-list";

export class List extends DefaultList {
  constructor(data) {
    super(data);
    this.EditListButton = document.createElement("button");
    this.EditListButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToEditList", this);
      PubSub.emit("OpenForm", FORM_REGISTRY.list);
    });
    this.EditListButton.textContent = "edit";

    this.RemoveListButton = document.createElement("button");
    this.RemoveListButton.addEventListener("click", () => {
      PubSub.emit("ListShouldBeRemoved", this);
    });
    this.RemoveListButton.textContent = "x";

    this.buttons.RemoveListButton = this.RemoveListButton;
    this.buttons.EditListButton = this.EditListButton;
  }
}
