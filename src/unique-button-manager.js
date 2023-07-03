import { PubSub } from "./PubSub";
import { FORM_REGISTRY } from "./form-manager";

export const listFormOpenButton = document.getElementById(
  "list-form-open-button"
);
listFormOpenButton.addEventListener("click", () => {
  PubSub.emit("OpenForm", FORM_REGISTRY.list);
});

export const listFormCloseButton = document.getElementById(
  "list-form-close-button"
);
listFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseForm", FORM_REGISTRY.list);
});

export const finishUsingListFormButton =
  document.getElementById("create-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  PubSub.emit("UserFinishedUsingForm", FORM_REGISTRY.list);
  PubSub.emit("CloseForm", FORM_REGISTRY.list);
});

export const taskFormCloseButton = document.getElementById(
  "task-form-close-button"
);
taskFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseForm", FORM_REGISTRY.task);
});
