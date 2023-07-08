import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../form-manager";
import { TaskCreator } from "../taskManagement/task-creator";
import { TaskRegistrar } from "../taskManagement/task-registrar";
import { TaskRenderer } from "../taskManagement/task-renderer";

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
    PubSub.on("TaskIsReadyForEditing", this.editTask.bind(this));
    PubSub.on("UserWantsToDeleteTask", this.deleteTask.bind(this));
  }

  setupTaskHelpers() {
    this.taskCreator = new TaskCreator();
    this.taskRegistrar = new TaskRegistrar();
    this.taskRenderer = new TaskRenderer(this.div);
  }

  establishNewTask(taskData) {
    if (this.taskBelongsToThisList(taskData.parentList, this.id)) {
      const task = this.taskCreator.createTask(taskData);
      this.taskRegistrar.registerTask(task);
      this.taskRenderer.renderTask(this.div, task);
    }
  }

  editTask(taskData) {
    if (this.taskBelongsToThisList(taskData.path.listId, this.id)) {
      const editedTask = this.taskRegistrar.editTask(taskData);
      this.taskRenderer.rerenderTask(this.div, editedTask);
    }
  }

  deleteTask(task) {
    console.log(task.parentList, this.id);
    if (this.taskBelongsToThisList(task.parentList, this.id)) {
      this.taskRegistrar.deleteTask(task);
      this.taskRenderer.stopRenderingTask(task);
    }
  }

  taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
    return listNameTaskIsLookingFor == currentListName;
  }
}

export function addRemoveAndEditButtons(list) {
  list.EditListButton = document.createElement("button");
  list.EditListButton.addEventListener("click", () => {
    PubSub.emit("UserWantsToEditList", list);
    PubSub.emit("OpenForm", FORM_REGISTRY.list);
  });
  list.EditListButton.textContent = "edit";

  list.RemoveListButton = document.createElement("button");
  list.RemoveListButton.addEventListener("click", () => {
    PubSub.emit("ListShouldBeRemoved", list);
  });
  list.RemoveListButton.textContent = "x";

  list.buttons.RemoveListButton = list.RemoveListButton;
  list.buttons.EditListButton = list.EditListButton;
}
