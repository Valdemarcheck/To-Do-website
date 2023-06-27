const { PubSub } = require("./PubSub");

const listFormBackground = document.querySelector(".form-background.list");

function openListForm() {
  listFormBackground.style.display = "flex";
}

function closeListForm(shouldReset) {
  listFormBackground.style.display = "none";
  if (shouldReset) {
    listFormBackground.querySelector("form").reset();
  }
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

PubSub.on("OpenListCreationForm", openListForm);
PubSub.on("CloseListCreationForm", closeListForm);

PubSub.on("ListDataIsRequired", getListFormData);
