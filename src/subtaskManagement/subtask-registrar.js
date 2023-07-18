export class SubtaskRegistrar {
  subtaskRegistry = [];

  constructor() {}

  registerSubtask(subtask) {
    this.subtaskRegistry.push(subtask);
    console.log(this.subtaskRegistry);
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
    console.log(this.subtaskRegistry);
  }
}
