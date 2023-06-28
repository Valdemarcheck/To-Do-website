export class List {
  TASK_REGISTRY = [];

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.RemoveListButton = document.createElement("button");
    this.SortListButton = document.createElement("button");
    this.EditListButton = document.createElement("button");
    this.AddTaskButton = document.createElement("button");

    this.buttons = {
      RemoveListButton: this.RemoveListButton,
      SortListButton: this.SortListButton,
      EditListButton: this.EditListButton,
      AddTaskButton: this.AddTaskButton,
    };
  }
}
