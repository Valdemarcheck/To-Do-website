import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../form-manager";
import { TaskCreator } from "../taskManagement/task-creator";
import { TaskRegistrar } from "../taskManagement/task-registrar";
import { TaskRenderer } from "../taskManagement/task-renderer";

export class DefaultList {
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
      PubSub.emit("ListIdGetsReturned", this.id);
    });
    this.AddTaskButton.textContent = "+";

    this.buttons = {
      SortListButton: this.SortListButton,
      AddTaskButton: this.AddTaskButton,
    };

    this.setupTaskHelpers();

    PubSub.on("TaskIsReadyForCreation", this.establishNewTask.bind(this));
  }

  setupTaskHelpers() {
    this.taskCreator = new TaskCreator();
    this.taskRegistrar = new TaskRegistrar();
    this.taskRenderer = new TaskRenderer(this.div);
  }

  establishNewTask(taskData) {
    console.log(taskData);
    if (this.taskBelongsToThisList(taskData.listSelection, this.id)) {
      console.log(`Task belongs to list named ${this.name}`);
      const task = this.taskCreator.createTask(taskData);
      this.taskRegistrar.registerTask(task);
      this.taskRenderer.renderTask(this.div, task);
    }
  }

  taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
    console.log(listNameTaskIsLookingFor, currentListName);
    return listNameTaskIsLookingFor === currentListName;
  }
}
