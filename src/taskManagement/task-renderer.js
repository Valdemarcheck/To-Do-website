import formatDistanceToNow from "date-fns/formatDistanceToNow";
import isFuture from "date-fns/isFuture";
export class TaskRenderer {
  construct() {}

  renderTask(parentListDiv, task) {
    const parentListTaskSection = parentListDiv.querySelector(".task-section");

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-background");
    parentListTaskSection.append(taskDiv);
    task.div = taskDiv;

    taskDiv.append(task.finishTaskCheckbox);

    const taskNameText = document.createElement("p");
    taskNameText.classList.add("task-name");
    taskNameText.textContent = task.name;
    taskDiv.append(taskNameText);

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = formatDistanceToNow(task.dueDate);
    taskDueDate.classList.add("due-date");
    if (isFuture(task.dueDate)) {
      taskDueDate.classList.add("not-postponed");
    } else {
      taskDueDate.classList.add("postponed");
    }
    taskDiv.append(taskDueDate);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-row");
    taskDiv.append(buttonsDiv);

    this.renderTaskButtons(buttonsDiv, task);
  }

  renderTaskButtons(buttonsDiv, task) {
    Object.values(task.buttons).forEach((button) => {
      buttonsDiv.append(button);
    });
  }

  stopRenderingTask(task) {
    task.div.remove();
  }

  rerenderTask(taskDiv, task) {
    const taskNameText = taskDiv.querySelector(".task-name");
    taskNameText.textContent = task.name;

    const taskDueDate = taskDiv.querySelector(".due-date");
    taskDueDate.textContent = formatDistanceToNow(task.dueDate);
    if (isFuture(task.dueDate)) {
      taskDueDate.classList.add("not-postponed");
      taskDueDate.classList.remove("postponed");
    } else {
      taskDueDate.classList.add("postponed");
      taskDueDate.classList.remove("not-postponed");
    }
  }
}