import { PubSub } from "../PubSub";

export class List {
  TASK_REGISTRY = [];
  id = null;
  div = null;

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.RemoveListButton = document.createElement("button");
    this.RemoveListButton.addEventListener("click", () => {
      PubSub.emit("ListShouldBeRemoved", this);
    });
    this.SortListButton = document.createElement("button");
    this.EditListButton = document.createElement("button");
    this.EditListButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToEditList", this);
      PubSub.emit("OpenListForm");
    });
    this.AddTaskButton = document.createElement("button");

    this.buttons = {
      RemoveListButton: this.RemoveListButton,
      SortListButton: this.SortListButton,
      EditListButton: this.EditListButton,
      AddTaskButton: this.AddTaskButton,
    };
  }
}
