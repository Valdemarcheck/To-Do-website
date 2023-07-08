import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../formManagement/form-manager";
import { TaskCreator } from "../taskManagement/task-creator";
import { TaskRegistrar } from "../taskManagement/task-registrar";
import { TaskRenderer } from "../taskManagement/task-renderer";

export function setupTaskHelpers(list) {
  list.taskCreator = new TaskCreator();
  list.taskRegistrar = new TaskRegistrar();
  list.taskRenderer = new TaskRenderer(list.div);
}

export function establishNewTask(taskData) {
  if (taskBelongsToThisList(taskData.parentList, this.id)) {
    const task = this.taskCreator.createTask(taskData);
    this.taskRegistrar.registerTask(task);
    this.taskRenderer.renderTask(this.div, task);
  }
}

export function editTask(taskData) {
  if (taskBelongsToThisList(taskData.path.listId, this.id)) {
    const editedTask = this.taskRegistrar.editTask(taskData);
    this.taskRenderer.rerenderTask(editedTask);
  }
}

export function deleteTask(task) {
  console.log(task.parentList, this.id);
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.deleteTask(task);
    this.taskRenderer.stopRenderingTask(task);
  }
}

export function addRemoveAndEditButtons(list) {
  list.EditListButton = document.createElement("button");
  list.EditListButton.addEventListener("click", () => {
    PubSub.emit("UserWantsToEditList", list);
    PubSub.emit("OpenForm", FORM_REGISTRY.List);
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

function taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
  return listNameTaskIsLookingFor == currentListName;
}
