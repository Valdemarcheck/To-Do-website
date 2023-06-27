const { PubSub } = require("./PubSub");

const listFormBackground = document.querySelector(".form-background.list");

function openListForm() {
  listFormBackground.style.display = "flex";
}

function closeListForm() {
  listFormBackground.style.display = "none";
}

PubSub.on("OpenListCreationForm", openListForm);
PubSub.on("CloseListCreationForm", closeListForm);
