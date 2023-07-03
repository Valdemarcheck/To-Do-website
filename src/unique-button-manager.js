import { PubSub } from "./PubSub";

export const listFormOpenButton = document.getElementById(
  "list-form-open-button"
);
listFormOpenButton.addEventListener("click", () => {
  PubSub.emit("OpenListForm");
});

export const listFormCloseButton = document.getElementById(
  "list-form-close-button"
);
listFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseListForm");
});

export const finishUsingListFormButton =
  document.getElementById("create-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  PubSub.emit("UserFinishedUsingListForm");
  PubSub.emit("CloseListForm");
});

export const taskFormCloseButton = document.getElementById(
  "task-form-close-button"
);
taskFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseTaskForm");
});
