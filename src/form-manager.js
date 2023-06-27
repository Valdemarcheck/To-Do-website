const { PubSub } = require("./PubSub");

const listFormBackground = document.getElementById("list-form-background");

function openListForm() {
  listFormBackground.style.display = "flex";
}

function closeListForm() {
  listFormBackground.style.display = "none";
}

function getListFormData() {
  const listForm = listFormBackground.querySelectorAll("input");
  const data = {};
  listForm.forEach((current) => {
    const inputContentType = current.id;
    data[inputContentType] = current.value;
  });
  PubSub.emit("GotListData", data);
}

function resetListForm() {
  listFormBackground.querySelector("form").reset();
}

PubSub.on("OpenListCreationForm", openListForm);
PubSub.on("CloseListCreationForm", closeListForm);

PubSub.on("ListDataIsRequired", getListFormData);
PubSub.on("ListDataIsNotRequired", resetListForm);
