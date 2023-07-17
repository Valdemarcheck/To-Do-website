export class SubtaskRegistrar {
  subtaskRegistry = [];

  constructor() {}

  registerSubtask(subtask) {
    this.subtaskRegistry.push();
  }

  updateIds() {
    this.subtaskRegistry.forEach((subtask, index) => {
      subtask.id = index;
    });
  }

  getSubtasks() {
    return this.subtaskRegistry;
  }

  resetRegistry() {
    this.subtaskRegistry = [];
  }
}
