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

export function addNonDefaultListButtons(list) {
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

  list.ShowListInformationButton = document.createElement("button");
  list.ShowListInformationButton.classList.add("informationButton");
  list.ShowListInformationButton.addEventListener("click", () => {
    PubSub.emit("UserWantsToSeeEntityInformation", {
      formType: FORM_REGISTRY.List,
      entity: this,
    });
    PubSub.emit("OpenForm", FORM_REGISTRY.List);
  });
  list.ShowListInformationButton.textContent = "info";

  list.buttons.ShowListInformationButton = list.ShowListInformationButton;
  list.buttons.EditListButton = list.EditListButton;
  list.buttons.RemoveListButton = list.RemoveListButton;
}

function taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
  return listNameTaskIsLookingFor == currentListName;
}
