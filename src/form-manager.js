const { PubSub } = require("./PubSub");

const MODES = { CREATION: 0, EDITING: 1 };
export const FORM_REGISTRY = {};

const listForm = registerForm("list-form-background", "list");
const taskForm = registerForm("task-form-background", "task");
const listSelection = document.getElementById("listSelection");

function registerForm(backgroundId, codename) {
  FORM_REGISTRY[codename] = codename;
  return {
    background: document.getElementById(backgroundId),
    form: document.getElementById(backgroundId).querySelector("form"),
    mode: MODES.CREATION,
  };
}

function getFormData(formType) {
  const workingForm = chooseWorkingForm(formType);

  const formInputData = {};
  Array.from(workingForm.form.elements).forEach((element) => {
    if (element.nodeName !== "BUTTON") {
      const inputContentType = element.id;
      formInputData[inputContentType] = element.value;
    }
  });

  if (formType === FORM_REGISTRY.list) {
    if (workingForm.mode === MODES.CREATION) {
      PubSub.emit("ListIsReadyForCreation", formInputData);
    } else if (workingForm.mode === MODES.EDITING) {
      PubSub.emit("ListIsReadyForEditing", {
        data: formInputData,
        id: workingForm.form.dataset.editableListId,
      });
    }
  } else if (formType === FORM_REGISTRY.task) {
    if (workingForm.mode === MODES.CREATION) {
      PubSub.emit("TaskIsReadyForCreation", formInputData);
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
  if (workingForm === taskForm) {
    PubSub.emit("GetListRegistry");
  }
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

function setupParentListSelection(registry) {
  let listSelectionContent = "";
  registry.forEach((list) => {
    listSelectionContent += `<option value="${list.id}">${list.name}</option>`;
  });
  listSelection.innerHTML = listSelectionContent;
}

function setListSelectionToValue(id) {
  listSelection.value = id;
}

PubSub.on("OpenForm", openForm);
PubSub.on("CloseForm", closeForm);
PubSub.on("UserFinishedUsingForm", getFormData);
PubSub.on("UserWantsToEditList", prepareListFormForEditing);

PubSub.on("ListRegistryGetsReturned", setupParentListSelection);
PubSub.on("ListIdGetsReturned", setListSelectionToValue);
