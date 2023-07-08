import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../form-manager";
import listUtils from "./list-utilities";

export class List {
  id = null;
  div = null;

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = document.createElement("button");
    this.SortListButton.textContent = "sort";

    this.AddTaskButton = document.createElement("button");
    this.AddTaskButton.addEventListener("click", () => {
      PubSub.emit("OpenForm", FORM_REGISTRY.Task);
      PubSub.emit("ListIdGetsReturned", this.id);
    });
    this.AddTaskButton.textContent = "+";

    this.buttons = {
      SortListButton: this.SortListButton,
      AddTaskButton: this.AddTaskButton,
    };

    listUtils.setupTaskHelpers(this);
    PubSub.on("TaskIsReadyForCreation", listUtils.establishNewTask.bind(this));
    PubSub.on("TaskIsReadyForEditing", listUtils.editTask.bind(this));
    PubSub.on("UserWantsToDeleteTask", listUtils.deleteTask.bind(this));
  }
}
