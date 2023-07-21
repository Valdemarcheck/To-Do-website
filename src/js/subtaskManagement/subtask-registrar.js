export class SubtaskRegistrar {
  subtaskRegistry = [];

  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  registerSubtask(subtask) {
    this.subtaskRegistry.push(subtask);
  }

  updateIds() {
    this.subtaskRegistry.forEach((subtask, index) => {
      subtask.id = index;
    });
  }

  applyData() {
    const queryForInputElements = "input:not([type='checkbox'])";
    const inputs = this.parentDiv.querySelectorAll(queryForInputElements);

    inputs.forEach((item, index) => {
      const subtask = this.subtaskRegistry[index];
      console.log(subtask, subtask.content, item, item.value);
      subtask.content = item.value;
    });
  }

  getSubtasks() {
    return this.subtaskRegistry;
  }

  removeSubtaskById(id) {
    this.subtaskRegistry.splice(id, 1);
  }

  resetRegistry() {
    this.subtaskRegistry = [];
  }

  setCheckedOrOtherwise(subtask) {
    const checked = subtask.finishSubtaskCheckbox.checked;
    subtask.checked = checked;
  }
}
