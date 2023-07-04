import { Task } from "./task";

export class TaskCreator {
  constructor() {}

  createTask(taskData) {
    return new Task(taskData);
  }
}
