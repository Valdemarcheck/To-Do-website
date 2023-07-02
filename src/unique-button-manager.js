import { PubSub } from "./PubSub";

export const listCreationFormOpenButton = document.getElementById(
  "list-creation-form-open-button"
);
listCreationFormOpenButton.addEventListener("click", () => {
  PubSub.emit("OpenListForm");
});

export const listCreationFormCloseButton = document.getElementById(
  "list-creation-form-close-button"
);
listCreationFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseListForm");
});

export const finishUsingListFormButton =
  document.getElementById("create-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  PubSub.emit("UserFinishedUsingListForm");
  PubSub.emit("CloseListForm");
});
