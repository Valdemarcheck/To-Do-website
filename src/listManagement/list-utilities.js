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
    console.log(taskData);
    const task = this.taskCreator.createTask(taskData);
    this.taskRegistrar.registerTask(task);
    this.taskRenderer.renderTask(this.div, task);
  }
}

export function editTask(taskData) {
  if (taskBelongsToThisList(taskData.path.listId, this.id)) {
    const editedTask = this.taskRegistrar.editTask(taskData);
    this.taskRenderer.rerenderTask(this.div, editedTask);
  }
}

export function deleteTask(task) {
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.deleteTask(task);
    this.taskRenderer.stopRenderingTask(task);
  }
}

export function checkTask(task) {
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.setTaskFinished({ task, finished: true });
    this.taskRenderer.renderTaskAsChecked(task.div);
  }
}

export function uncheckTask(task) {
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.setTaskFinished({ task, finished: false });
    this.taskRenderer.renderTaskAsUnchecked(task.div);
  }
}

function taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
  return listNameTaskIsLookingFor == currentListName;
}
