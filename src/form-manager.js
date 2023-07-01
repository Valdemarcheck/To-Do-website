const { PubSub } = require("./PubSub");

const MODES = { CREATION: 0, EDITING: 1 };

const listForm = {
  background: document.getElementById("list-form-background"),
  form: document.getElementById("list-form-background").querySelector("form"),
  mode: MODES.CREATION,
};

function openListForm() {
  listForm.background.style.display = "flex";
}

function closeListForm() {
  listForm.background.style.display = "none";
}

function getListFormData() {
  const listFormInputs = listForm.background.querySelectorAll("input");
  const data = {};
  listFormInputs.forEach((current) => {
    const inputContentType = current.id;
    data[inputContentType] = current.value;
  });
  PubSub.emit("GotListData", data);
}

function resetListForm() {
  listForm.form.reset();
}

PubSub.on("OpenListCreationForm", openListForm);
PubSub.on("CloseListCreationForm", closeListForm);

PubSub.on("UserWantsToCreateNewList", getListFormData);
PubSub.on("ListDataIsNotRequired", resetListForm);
