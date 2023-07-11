const { PubSub } = require("../PubSub");
import * as formUtils from "./form-utilities";

const MODES = { CREATION: 0, EDITING: 1, INFORMATION: 2 };
export const FORM_REGISTRY = {};

const listForm = registerForm("list-form-background", "List");
const taskForm = registerForm("task-form-background", "Task");
const parentList = document.getElementById("parentList");

function registerForm(backgroundId, codename) {
  FORM_REGISTRY[codename] = codename;
  const formBackground = document.getElementById(backgroundId);
  return {
    background: formBackground,
    form: formBackground.querySelector("form"),
    title: formBackground.getElementsByClassName("form-title")[0],
    mode: MODES.CREATION,
  };
}

function getFormData(formType) {
  const workingForm = getWorkingForm(formType);

  const formInputData = {};
  Array.from(workingForm.form.elements).forEach((element) => {
    if (element.nodeName !== "BUTTON") {
      const inputContentType = element.id;
      formInputData[inputContentType] = formUtils.trimInput(element.value);
    }
  });

  let path = null;
  if (workingForm.mode === MODES.EDITING) {
    path = formUtils.getEntityPath(workingForm, formType);
  }

  if (workingForm.mode === MODES.CREATION) {
    PubSub.emit(formType + "IsReadyForCreation", formInputData);
  } else if (workingForm.mode === MODES.EDITING) {
    PubSub.emit(formType + "IsReadyForEditing", {
      data: formInputData,
      path,
    });
  }
  resetForm(formType);
}

function getWorkingForm(formType) {
  switch (formType) {
    case FORM_REGISTRY.List:
      return listForm;
    case FORM_REGISTRY.Task:
      return taskForm;
  }
}

function resetForm(formType) {
  const workingForm = getWorkingForm(formType);
  workingForm.form.reset();
  workingForm.form.removeAttribute("data-${formType}-list-id");

  workingForm.title.textContent = `Create a new ${formType}`;
  workingForm.mode = MODES.CREATION;

  const finishUsingFormButton =
    workingForm.form.querySelector(".finish-button");
  finishUsingFormButton.style.display = "inline";
}

function openForm(formType) {
  const workingForm = getWorkingForm(formType);
  workingForm.background.style.display = "flex";

  if (workingForm === taskForm) {
    PubSub.emit("GetListRegistry");
  }
}

function closeForm(formType) {
  const workingForm = getWorkingForm(formType);
  workingForm.background.style.display = "none";

  if (workingForm.mode !== MODES.CREATION) {
    resetForm(formType);
  }
}

function setupParentListSelection(registry) {
  let parentListContent = "";
  registry.forEach((list) => {
    parentListContent += `<option value="${list.id}">${list.name}</option>`;
  });
  parentList.innerHTML = parentListContent;
}

function setParentListSelectionToValue(id) {
  parentList.value = id;
}

function prepareFormForEditingMode(data) {
  const formType = data.formType;
  const entity = data.entity;
  const workingForm = getWorkingForm(formType);
  const datasetPropertyName = `editable${formType}Id`;

  workingForm.title.textContent = `Edit a ${data.formType}`;
  workingForm.mode = MODES.EDITING;
  formUtils.setupFormInputValues(workingForm, data.entity);

  if (formType === FORM_REGISTRY.List) {
    workingForm.form.dataset[datasetPropertyName] = entity.id;
  } else if (formType === FORM_REGISTRY.Task) {
    workingForm.form.dataset[
      datasetPropertyName
    ] = `${entity.parentList}:${entity.id}`;
  }
}

PubSub.on("OpenForm", openForm);
PubSub.on("CloseForm", closeForm);

PubSub.on("UserFinishedUsingForm", getFormData);
PubSub.on("ListRegistryGetsReturned", setupParentListSelection);
PubSub.on("ListIdGetsReturned", setParentListSelectionToValue);

PubSub.on("UserWantsToEditList", prepareFormForEditingMode);
PubSub.on("UserWantsToEditTask", prepareFormForEditingMode);
