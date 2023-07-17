import { Task } from "./task";

export class TaskCreator {
  constructor() {}

  createTask(taskData) {
    console.log(taskData);
    return new Task(taskData);
  }
}
