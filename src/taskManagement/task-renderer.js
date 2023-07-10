export class TaskRenderer {
  construct() {}

  renderTask(parentListDiv, task) {
    const parentListTaskSection = parentListDiv.querySelector(".task-section");

    const taskDiv = task.div;
    taskDiv.classList.add("task-background");
    parentListTaskSection.append(taskDiv);

    taskDiv.append(task.finishTaskCheckbox);

    const taskNameText = document.createElement("p");
    taskNameText.classList.add("task-name");
    taskNameText.textContent = task.name;
    taskDiv.append(taskNameText);

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = task.dueDate;
    taskDueDate.classList.add("due-date");
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

  rerenderTask(task) {
    const taskDiv = task.div;

    const taskNameText = taskDiv.querySelector(".task-name");
    taskNameText.textContent = task.name;

    const taskDueDate = taskDiv.querySelector(".due-date");
    taskDueDate.textContent = task.dueDate;
    // if (isFuture(task.dueDate)) {
    //   taskDueDate.classList.add("not-postponed");
    //   taskDueDate.classList.remove("postponed");
    // } else {
    //   taskDueDate.classList.add("postponed");
    //   taskDueDate.classList.remove("not-postponed");
    // }
  }
}
