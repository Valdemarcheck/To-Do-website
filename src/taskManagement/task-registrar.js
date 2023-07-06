export class TaskRegistrar {
  TASK_REGISTRY = [];

  constructor() {}

  registerTask(task) {
    this.TASK_REGISTRY.push(task);
    task.id = this.TASK_REGISTRY.length - 1;
    console.log(this.TASK_REGISTRY);
  }

  updateIds() {
    this.TASK_REGISTRY.forEach((task, index) => {
      task.id = index;
    });
  }

  deleteTask(task) {
    this.TASK_REGISTRY.splice(task.id, 1);
    this.updateIds();
    console.log(this.TASK_REGISTRY);
  }
}
