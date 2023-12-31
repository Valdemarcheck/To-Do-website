import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../formManagement/form-manager";
import { setupButton } from "../utilities";
import { setupDueDate } from "./task-utilities";

export class Task {
  id = null;
  finished = false;
  div = document.createElement("div");
  buttons = {};

  constructor(taskData) {
    this.name = taskData.name || "Unnamed";
    this.description = taskData.description;
    this._dueDate = setupDueDate(taskData.dueDate);
    this.subtasks = taskData.subtasks;
    this.priority = taskData.priority;
    this.parentList = taskData.parentList;

    this.div.addEventListener("click", (e) => {
      if (e.target.classList.contains("task") || e.target.nodeName === "P") {
        PubSub.emit("UserWantsToEditTask", {
          formType: FORM_REGISTRY.Task,
          entity: this,
        });
        PubSub.emit("OpenForm", FORM_REGISTRY.Task);
      }
    });

    this.finishTaskCheckbox = document.createElement("input");
    this.finishTaskCheckbox.setAttribute("type", "checkbox");
    this.finishTaskCheckbox.classList.add("finish-checkbox");
    this.finishTaskCheckbox.addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        PubSub.emit("TaskChecked", this);
      } else {
        PubSub.emit("TaskUnchecked", this);
      }
    });

    this.EditTaskButton = setupButton(
      "edit",
      "edit-button",
      this,
      "EditTaskButton"
    );
    this.EditTaskButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToEditTask", {
        formType: FORM_REGISTRY.Task,
        entity: this,
      });
      PubSub.emit("OpenForm", FORM_REGISTRY.Task);
    });

    this.DeleteTaskButton = setupButton(
      "x",
      "delete-button",
      this,
      "DeleteTaskButton"
    );
    this.DeleteTaskButton.addEventListener("click", () => {
      PubSub.emit("UserWantsToDeleteTask", this);
    });
  }

  removeDiv() {
    this.div.remove();
    this.div = document.createElement("div");
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    this._dueDate = setupDueDate(value);
  }
}
