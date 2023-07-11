import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../formManagement/form-manager";
import { setupButton } from "../utilities";
import * as listUtils from "./list-utilities";

export class List {
  id = null;
  div = document.createElement("div");
  buttons = {};

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = setupButton(
      "sort",
      "sort-button",
      this,
      "SortListButton"
    );
    this.AddTaskButton = setupButton("+", "add-button", this, "AddTaskButton");
    this.AddTaskButton.addEventListener("click", () => {
      PubSub.emit("OpenForm", FORM_REGISTRY.Task);
      PubSub.emit("ListIdGetsReturned", this.id);
    });

    listUtils.setupTaskHelpers(this);
    PubSub.on("TaskIsReadyForCreation", listUtils.establishNewTask.bind(this));
    PubSub.on("TaskIsReadyForEditing", listUtils.editTask.bind(this));
    PubSub.on("UserWantsToDeleteTask", listUtils.deleteTask.bind(this));
  }
}
