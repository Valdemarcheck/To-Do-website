export class TaskRegistrar {
  TASK_REGISTRY = [];

  constructor() {}

  registerTask(task) {
    console.log(task);
    this.TASK_REGISTRY.push(task);
  }
}
