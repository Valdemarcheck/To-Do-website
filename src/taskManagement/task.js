import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../form-manager";

export class Task {
  SUBTASKS = [];
  id = null;
  div = null;

  constructor(taskData) {
    this.name = taskData.name || "Unnamed";
    this.description = taskData.description;
    this.dueDate = new Date(taskData.dueDate) || new Date();
    this.priority = taskData.priority;
    this.parentList = taskData.parentList;
    this.finishTaskCheckbox = document.createElement("input");
    this.finishTaskCheckbox.setAttribute("type", "checkbox");
    this.finishTaskCheckbox.addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        PubSub.emit("TaskChecked", this);
      } else {
        PubSub.emit("TaskUnchecked", this);
      }
    });
    this.EditTaskButton = document.createElement("button");
    this.EditTaskButton.textContent = "edit";
    this.EditTaskButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToEditTask", this);
      PubSub.emit("OpenForm", FORM_REGISTRY.task);
    });
    this.DeleteTaskButton = document.createElement("button");
    this.DeleteTaskButton.textContent = "x";
    this.DeleteTaskButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToDeleteTask", this);
    });

    this.buttons = {
      EditTaskButton: this.EditTaskButton,
      DeleteTaskButton: this.DeleteTaskButton,
    };
  }
}
