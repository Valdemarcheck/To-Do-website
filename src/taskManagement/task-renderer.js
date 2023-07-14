import isPast from "date-fns/isPast";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import { appendEntity, removeEntityDiv } from "../utilities";

export class TaskRenderer {
  construct() {}

  renderTask(parentListDiv, task) {
    const parentListTaskSection = parentListDiv.querySelector(".task-section");

    const taskDiv = task.div;
    taskDiv.classList.add("task");
    appendEntity(parentListTaskSection, "task", task, taskDiv);

    taskDiv.append(task.finishTaskCheckbox);

    const taskNameText = document.createElement("p");
    taskNameText.classList.add("task-name");
    taskNameText.textContent = task.name;
    taskDiv.append(taskNameText);

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("due-date");
    taskDueDate.textContent = formatDistanceToNowStrict(task.dueDate);
    setupPostponedClass(task.dueDate, taskDueDate);
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
    removeEntityDiv(task);
  }

  rerenderTask(parentListDiv, task) {
    this.stopRenderingTask(task);
    this.renderTask(parentListDiv, task);
  }
}

function setupPostponedClass(dueDateValue, taskDueDateElement) {
  if (isPostponed(dueDateValue)) {
    taskDueDateElement.classList.add("postponed");
  } else {
    taskDueDateElement.classList.remove("postponed");
  }
}

function isPostponed(dueDateValue) {
  return isPast(dueDateValue);
}
