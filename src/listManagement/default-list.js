import { PubSub } from "../PubSub";

export class DefaultList {
  TASK_REGISTRY = [];
  id = null;
  div = null;

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = document.createElement("button");
    this.AddTaskButton = document.createElement("button");

    this.buttons = {
      SortListButton: this.SortListButton,
      AddTaskButton: this.AddTaskButton,
    };
  }
}
