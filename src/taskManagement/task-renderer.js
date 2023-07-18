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

    taskDiv.appendChild(task.finishTaskCheckbox);

    const taskNameText = document.createElement("p");
    taskNameText.classList.add("task-name");
    taskNameText.textContent = task.name;
    taskDiv.appendChild(taskNameText);

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("due-date");
    taskDueDate.textContent = formatDistanceToNowStrict(task.dueDate);
    setupPostponedClass(task.dueDate, taskDueDate);
    taskDiv.appendChild(taskDueDate);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-row");
    taskDiv.appendChild(buttonsDiv);

    this.renderTaskButtons(buttonsDiv, task);
    this.renderTaskAsUnchecked(taskDiv);
  }

  renderTaskButtons(buttonsDiv, task) {
    Object.values(task.buttons).forEach((button) => {
      buttonsDiv.appendChild(button);
    });
  }

  rerenderTask(parentListDiv, task) {
    this.stopRenderingTask(task);
    this.renderTask(parentListDiv, task);
  }

  renderTaskAsChecked(taskDiv) {
    taskDiv.classList.add("checked");
  }

  renderTaskAsUnchecked(taskDiv) {
    taskDiv.classList.remove("checked");
  }

  stopRenderingTask(task) {
    removeEntityDiv(task);
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
