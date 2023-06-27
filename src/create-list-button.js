import { PubSub } from "./PubSub";

export const createListButton = document.getElementById("create-list-button");
createListButton.addEventListener("click", () => {
  PubSub.emit("OpenListCreationForm");
});
