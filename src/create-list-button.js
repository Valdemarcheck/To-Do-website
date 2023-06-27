import { PubSub } from "./PubSub";

export const createListButton = document.getElementById("create-list-button");
createListButton.addEventListener("click", () => {
  PubSub.emit("OpenListCreationForm");
});

export const listCreationFormCloseButton = document.getElementById(
  "list-creation-form-close-button"
);
listCreationFormCloseButton.addEventListener("click", () => {
  PubSub.emit("CloseListCreationForm");
});
