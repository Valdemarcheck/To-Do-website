import { PubSub } from "../PubSub";

export class Task {
  SUBTASKS = [];
  constructor(taskData) {
    this.name = taskData.name || "Unnamed";
    this.description = taskData.description;
    this.due = taskData.due;
    this.priority = taskData.priority;
    this.parentList = taskData.parentList;
    this.finishTaskCheckbox = document.createElement("checkbox");
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
      // PubSub.emit("UserWantsToEditTask", this);
    });
    this.DeleteTaskButton = document.createElement("button");
    this.DeleteTaskButton.textContent = "x";
    this.DeleteTaskButton.addEventListener("click", () => {
      // PubSub.emit("UserWantsToDeleteTask");
    });

    this.buttons = {
      EditTaskButton: this.EditTaskButton,
      DeleteTaskButton: this.DeleteTaskButton,
    };
  }
}
