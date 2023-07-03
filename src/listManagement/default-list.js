import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../form-manager";
import { TaskManager } from "../taskManagement/task-manager";
import { TaskRegistrar } from "../taskManagement/task-registrar";
import { TaskRenderer } from "../taskManagement/task-renderer";

export class DefaultList {
  TASK_REGISTRY = [];
  taskManager = new TaskManager();
  taskRenderer = new TaskRenderer();
  taskRegistrar = new TaskRegistrar();

  id = null;
  div = null;

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = document.createElement("button");
    this.SortListButton.textContent = "sort";

    this.AddTaskButton = document.createElement("button");
    this.AddTaskButton.addEventListener("click", () => {
      PubSub.emit("OpenForm", FORM_REGISTRY.task);
    });
    this.AddTaskButton.textContent = "+";

    this.buttons = {
      SortListButton: this.SortListButton,
      AddTaskButton: this.AddTaskButton,
    };
  }
}
