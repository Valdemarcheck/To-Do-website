export class SubtaskRenderer {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  renderSubtask(subtask) {
    const subtaskDiv = subtask.div;
    subtaskDiv.classList.add("subtask-div");
    this.parentDiv.appendChild(subtaskDiv);

    const subtaskContentInput = document.createElement("input");
    subtaskContentInput.classList.add("subtask-content");

    subtaskDiv.appendChild(subtaskContentInput);
    if (subtask) {
      subtaskContentInput.value = subtask.content;
    }
  }

  stopRenderingSubtasksInnerElements(subtasksRegistry) {
    subtasksRegistry.forEach((item) => {
      item.div.innerHTML = "";
    });
  }
}
