export class SubtaskRenderer {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  renderSubtask(subtask) {
    const subtaskDiv = subtask.div;
    subtaskDiv.classList.add("subtask-div");
    this.parentDiv.appendChild(subtaskDiv);

    Object.values(subtask.buttons).forEach((button) => {
      subtaskDiv.appendChild(button);
    });

    const contentInput = subtask.contentInput;
    contentInput.value = subtask.content;
    subtaskDiv.appendChild(contentInput);

    const subtaskCheckbox = subtask.finishSubtaskCheckbox;
    subtaskDiv.appendChild(subtaskCheckbox);
  }

  stopRenderingSubtasksInnerElements(subtasksRegistry) {
    subtasksRegistry.forEach((item) => {
      item.div.innerHTML = "";
    });
  }

  stopRenderingSubtask(subtaskDiv) {
    subtaskDiv.remove();
  }

  renderCheckedOrOtherwise(subtask) {
    if (subtask.checked) {
      subtask.div.classList.remove("unchecked");
      subtask.div.classList.add("checked");
    } else {
      subtask.div.classList.add("unchecked");
      subtask.div.classList.remove("checked");
    }
  }
}
