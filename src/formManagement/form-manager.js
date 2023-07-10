const { PubSub } = require("../PubSub");
import * as formUtils from "./form-utilities";

const MODES = { CREATION: 0, EDITING: 1, INFORMATION: 2 };
export const FORM_REGISTRY = {};

const listForm = registerForm("list-form-background", "List");
const taskForm = registerForm("task-form-background", "Task");
const parentList = document.getElementById("parentList");

function registerForm(backgroundId, codename) {
  FORM_REGISTRY[codename] = codename;
  return {
    background: document.getElementById(backgroundId),
    form: document.getElementById(backgroundId).querySelector("form"),
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
  const workingForm = getWorkingForm(formType);
  workingForm.mode = MODES.EDITING;

  formUtils.setupFormInputValues(workingForm, data.entity);
  if (formType === FORM_REGISTRY.List) {
    const list = data.entity;
    workingForm.form.dataset.editableListId = list.id;
  } else if (formType === FORM_REGISTRY.Task) {
    const task = data.entity;
    workingForm.form.dataset.editableTaskId = `${task.parentList}:${task.id}`;
  }
}

function prepareFormForInformationMode(data) {
  const workingForm = getWorkingForm(data.formType);
  workingForm.mode = MODES.INFORMATION;
  formUtils.setupFormInputValues(workingForm, data.entity);

  const finishUsingFormButton =
    workingForm.form.querySelector(".finish-button");
  finishUsingFormButton.style.display = "none";

  setupEditThisFormButton(workingForm, data);
}

function setupEditThisFormButton(workingForm, data) {
  const editThisFormButton = document.createElement("button");
  editThisFormButton.setAttribute("type", "button");
  editThisFormButton.classList.add("edit-this-form-button");
  editThisFormButton.textContent = "Edit this " + data.formType.toLowerCase();
  editThisFormButton.addEventListener("click", () => {
    resetForm(data.formType);
    prepareFormForEditingMode(data);
    editThisFormButton.remove();
  });
  workingForm.form.prepend(editThisFormButton);
}

PubSub.on("OpenForm", openForm);
PubSub.on("CloseForm", closeForm);

PubSub.on("UserFinishedUsingForm", getFormData);
PubSub.on("ListRegistryGetsReturned", setupParentListSelection);
PubSub.on("ListIdGetsReturned", setParentListSelectionToValue);

PubSub.on("UserWantsToEditList", prepareFormForEditingMode);
PubSub.on("UserWantsToEditTask", prepareFormForEditingMode);

PubSub.on("UserWantsToSeeEntityInformation", prepareFormForInformationMode);
