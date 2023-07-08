import { PubSub } from "./PubSub";
import { FORM_REGISTRY } from "./formManagement/form-manager";

export const listFormOpenButton = document.getElementById(
  "list-form-open-button"
);
listFormOpenButton.addEventListener("click", () => {
  PubSub.emit("OpenForm", FORM_REGISTRY.List);
});

export const listFormCloseButton = document.getElementById(
  "list-form-close-button"
);
listFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseForm", FORM_REGISTRY.List);
});

export const finishUsingListFormButton =
  document.getElementById("create-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  PubSub.emit("UserFinishedUsingForm", FORM_REGISTRY.List);
  PubSub.emit("CloseForm", FORM_REGISTRY.List);
});

export const taskFormCloseButton = document.getElementById(
  "task-form-close-button"
);
taskFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseForm", FORM_REGISTRY.Task);
});

export const finishUsingTaskFormButton =
  document.getElementById("create-task-button");
finishUsingTaskFormButton.addEventListener("click", () => {
  PubSub.emit("UserFinishedUsingForm", FORM_REGISTRY.Task);
  PubSub.emit("CloseForm", FORM_REGISTRY.Task);
});
