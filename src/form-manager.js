const { PubSub } = require("./PubSub");

const MODES = { CREATION: 0, EDITING: 1 };
export const FORM_REGISTRY = { list: "LIST", task: "TASK" };

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

function getListFormData(formType) {
  const workingForm = chooseWorkingForm(formType);
  const formInputs = workingForm.background.querySelectorAll("input");
  const newData = {};

  formInputs.forEach((current) => {
    const inputContentType = current.id;
    newData[inputContentType] = current.value;
  });

  if (formType === FORM_REGISTRY.list) {
    if (workingForm.mode === MODES.CREATION) {
      PubSub.emit("ListIsReadyForCreation", newData);
    } else if (workingForm.mode === MODES.EDITING) {
      PubSub.emit("ListIsReadyForEditing", {
        data: newData,
        id: workingForm.form.dataset.editableListId,
      });
    }
  }
  resetForm(formType);
}

function chooseWorkingForm(formType) {
  switch (formType) {
    case FORM_REGISTRY.list:
      return listForm;
    case FORM_REGISTRY.task:
      return taskForm;
  }
}

function resetForm(formType) {
  const workingForm = chooseWorkingForm(formType);
  workingForm.form.reset();
  workingForm.form.removeAttribute("data-editable-list-id");
  workingForm.mode = MODES.CREATION;
}

function openForm(formType) {
  const workingForm = chooseWorkingForm(formType);
  workingForm.background.style.display = "flex";
}

function closeForm(formType) {
  const workingForm = chooseWorkingForm(formType);
  workingForm.background.style.display = "none";

  if (workingForm.mode !== MODES.CREATION) {
    resetForm(formType);
  }
}

function prepareListFormForEditing(list) {
  listForm.mode = MODES.EDITING;

  listForm.form.querySelectorAll("input").forEach((current) => {
    current.value = list[current.id];
  });
  listForm.form.dataset.editableListId = list.id;
}

PubSub.on("OpenForm", openForm);
PubSub.on("CloseForm", closeForm);
PubSub.on("UserFinishedUsingForm", getListFormData);
PubSub.on("UserWantsToEditList", prepareListFormForEditing);
