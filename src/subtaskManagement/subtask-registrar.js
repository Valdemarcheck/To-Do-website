export class SubtaskRegistrar {
  subtaskRegistry = [];

  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  registerSubtask(subtask) {
    this.subtaskRegistry.push(subtask);
    console.log(this.subtaskRegistry);
  }

  updateIds() {
    this.subtaskRegistry.forEach((subtask, index) => {
      subtask.id = index;
    });
  }

  applyData() {
    const inputs = this.parentDiv.querySelectorAll("input");
    inputs.forEach((item, index) => {
      const subtask = this.subtaskRegistry[index];
      console.log(subtask, subtask.content, item, item.value);
      subtask.content = item.value;
    });
  }

  getSubtasks() {
    return this.subtaskRegistry;
  }

  resetRegistry() {
    this.subtaskRegistry = [];
    console.log(this.subtaskRegistry);
  }
}
