const { PubSub } = require("./PubSub");

const MODES = { CREATION: 0, EDITING: 1 };

const listForm = {
  background: document.getElementById("list-form-background"),
  form: document.getElementById("list-form-background").querySelector("form"),
  mode: MODES.CREATION,
};

const taskForm = {
  background: document.getElementById("task-form-background"),
  form: document.getElementById("task-form-background").querySelector("form"),
  mode: MODES.CREATION,
};

function openListForm() {
  listForm.background.style.display = "flex";
}

function closeListForm() {
  listForm.background.style.display = "none";
  if (listForm.mode !== MODES.CREATION) {
    resetListForm();
  }
}

function getListFormData() {
  const listFormInputs = listForm.background.querySelectorAll("input");
  const newData = {};

  listFormInputs.forEach((current) => {
    const inputContentType = current.id;
    newData[inputContentType] = current.value;
  });

  if (listForm.mode === MODES.CREATION) {
    PubSub.emit("ListIsReadyForCreation", newData);
  } else if (listForm.mode === MODES.EDITING) {
    PubSub.emit("ListIsReadyForEditing", {
      data: newData,
      id: listForm.form.dataset.editableListId,
    });
  }
  resetListForm();
}

function prepareListFormForEditing(list) {
  listForm.mode = MODES.EDITING;

  listForm.form.querySelectorAll("input").forEach((current) => {
    current.value = list[current.id];
  });
  listForm.form.dataset.editableListId = list.id;
}

function resetListForm() {
  listForm.form.reset();
  listForm.form.removeAttribute("data-editable-list-id");
  listForm.mode = MODES.CREATION;
}

function openTaskForm() {
  taskForm.background.style.display = "flex";
}

function closeTaskForm() {
  taskForm.background.style.display = "none";
  if (listForm.mode !== MODES.CREATION) {
    resetTaskForm();
  }
}

function resetTaskForm() {
  taskForm.form.reset();
  taskForm.form.removeAttribute("data-editable-list-id");
  taskForm.mode = MODES.CREATION;
}

PubSub.on("OpenListForm", openListForm);
PubSub.on("CloseListForm", closeListForm);
PubSub.on("UserFinishedUsingListForm", getListFormData);
PubSub.on("UserWantsToEditList", prepareListFormForEditing);

PubSub.on("OpenTaskForm", openTaskForm);
PubSub.on("CloseTaskForm", closeTaskForm);
