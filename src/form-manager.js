const { PubSub } = require("./PubSub");

const listFormBackground = document.querySelector(".form-background.list");

function openListForm() {
  listFormBackground.style.display = "flex";
}

PubSub.on("OpenListCreationForm", openListForm);
