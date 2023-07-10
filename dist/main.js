/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/PubSub.js":
/*!***********************!*\
  !*** ./src/PubSub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PubSub: () => (/* binding */ PubSub)
/* harmony export */ });
const PubSub = (() => {
  const NOT_PRESENT_IN_THE_ARRAY = -1;
  const events = {};

  function debugEventAnnounce(event) {
    console.log(`[debug] EVENT ${event} IS CALLED`);
  }

  function emit(event, param = null) {
    if (events[event]) {
      debugEventAnnounce(event);
      for (let func of events[event]) {
        func(param);
      }
    } else {
      alert(`There is no event with a name '${event}'`);
    }
  }

  function on(event, func) {
    if (events[event]) {
      events[event].push(func);
    } else {
      events[event] = [func];
    }
  }

  function off(event, func) {
    if (events[event]) {
      const indexOfGivenFunction = events[event].indexOf(func);
      if (indexOfGivenFunction !== NOT_PRESENT_IN_THE_ARRAY) {
        events[event].splice(indexOfGivenFunction, 1);
      }
    } else {
      alert(
        `There is either no such event (${event}) registered, or your function isn't present there`
      );
    }
  }

  return { emit, on, off };
})();


/***/ }),

/***/ "./src/formManagement/form-manager.js":
/*!********************************************!*\
  !*** ./src/formManagement/form-manager.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FORM_REGISTRY: () => (/* binding */ FORM_REGISTRY)
/* harmony export */ });
/* harmony import */ var _form_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-utilities */ "./src/formManagement/form-utilities.js");
const { PubSub } = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");


const MODES = { CREATION: 0, EDITING: 1, INFORMATION: 2 };
const FORM_REGISTRY = {};

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
      formInputData[inputContentType] = _form_utilities__WEBPACK_IMPORTED_MODULE_0__.trimInput(element.value);
    }
  });

  let path = null;
  if (workingForm.mode === MODES.EDITING) {
    path = _form_utilities__WEBPACK_IMPORTED_MODULE_0__.getEntityPath(workingForm, formType);
  }

  // if (formType === FORM_REGISTRY.Task) {
  //   formInputData.dueDate =
  //     formInputData.dueDate === ""
  //       ? new Date()
  //       : new Date(formInputData.dueDate);
  // }

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

  _form_utilities__WEBPACK_IMPORTED_MODULE_0__.setupFormInputValues(workingForm, data.entity);
  if (formType === FORM_REGISTRY.Task) {
    const list = data.entity;
    workingForm.form.dataset.editableListId = list.id;
  } else if (formType === FORM_REGISTRY.List) {
    const task = data.entity;
    workingForm.form.dataset.editableTaskId = `${task.parentList}:${task.id}`;
  }
}

function prepareFormForInformationMode(data) {
  const workingForm = getWorkingForm(data.formType);
  workingForm.mode = MODES.INFORMATION;
  _form_utilities__WEBPACK_IMPORTED_MODULE_0__.setupFormInputValues(workingForm, data.entity);

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
PubSub.on("UserWantsToEditList", prepareFormForEditingMode);
PubSub.on("ListRegistryGetsReturned", setupParentListSelection);
PubSub.on("ListIdGetsReturned", setParentListSelectionToValue);

PubSub.on("UserWantsToEditTask", prepareFormForEditingMode);

PubSub.on("UserWantsToSeeEntityInformation", prepareFormForInformationMode);


/***/ }),

/***/ "./src/formManagement/form-utilities.js":
/*!**********************************************!*\
  !*** ./src/formManagement/form-utilities.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEntityPath: () => (/* binding */ getEntityPath),
/* harmony export */   setupFormInputValues: () => (/* binding */ setupFormInputValues),
/* harmony export */   trimInput: () => (/* binding */ trimInput)
/* harmony export */ });
function trimInput(inputValue) {
  return inputValue.trim();
}

function getEntityPath(workingForm, formType) {
  const datasetQuery = `editable${formType}Id`;
  const editableEntityId = workingForm.form.dataset[datasetQuery];
  console.log(editableEntityId);
  const pathArray = editableEntityId.split(":");
  const path = { listId: pathArray[0], taskId: pathArray[1] };
  return path;
}

function setupFormInputValues(workingForm, entity) {
  workingForm.form.querySelectorAll("input").forEach((current) => {
    current.value = entity[current.id];
  });
}


/***/ }),

/***/ "./src/listManagement/list-bundle.js":
/*!*******************************************!*\
  !*** ./src/listManagement/list-bundle.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-creator */ "./src/listManagement/list-creator.js");
/* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-registrar */ "./src/listManagement/list-registrar.js");
/* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_list_registrar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _list_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list-renderer */ "./src/listManagement/list-renderer.js");





/***/ }),

/***/ "./src/listManagement/list-creator.js":
/*!********************************************!*\
  !*** ./src/listManagement/list-creator.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_LIST_ID: () => (/* binding */ DEFAULT_LIST_ID)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities */ "./src/utilities.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list */ "./src/listManagement/list.js");




const DEFAULT_LIST_ID = "DEFAULT";

function createDefaultList() {
  const creationData = { name: "Default", color: "#ccc" };
  const defaultList = new _list__WEBPACK_IMPORTED_MODULE_2__.List(creationData);
  defaultList.id = DEFAULT_LIST_ID;
  const listData = { list: defaultList, listId: defaultList.id };
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("DefaultListPending", listData);
}

function createNewList(newData) {
  const list = new _list__WEBPACK_IMPORTED_MODULE_2__.List(newData);
  addNonDefaultListButtons(list);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
}

function addNonDefaultListButtons(list) {
  list.EditListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.setupButton)(
    "edit",
    "edit-button",
    list,
    "EditListButton"
  );
  list.EditListButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditList", list);
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", FORM_REGISTRY.List);
  });

  list.RemoveListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.setupButton)(
    "x",
    "remove-button",
    list,
    "RemoveListButton"
  );
  list.RemoveListButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListShouldBeRemoved", list);
  });

  list.ShowListInformationButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.setupButton)(
    "info",
    "information-button",
    list,
    "ShowListInformationButton"
  );
  list.ShowListInformationButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToSeeEntityInformation", {
      formType: FORM_REGISTRY.List,
      entity: list,
    });
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", FORM_REGISTRY.List);
  });
}

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListIsReadyForCreation", createNewList);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("CreateDefaultList", createDefaultList);


/***/ }),

/***/ "./src/listManagement/list-registrar.js":
/*!**********************************************!*\
  !*** ./src/listManagement/list-registrar.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { PubSub } = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");

const LIST_REGISTRY = [];
let defaultListReference = null;

function addListToRegistry(list) {
  LIST_REGISTRY.push(list);
  list.id = LIST_REGISTRY.length - 1;
  const listData = { list, listId: LIST_REGISTRY.length - 1 };
  PubSub.emit("ListRegistered", listData);
}

function updateListIds() {
  for (let i = 1; i < LIST_REGISTRY.length; i++) {
    const list = LIST_REGISTRY[i];
    list.id = i;
    list.div.dataset.listId = i;
  }
}

function removeListFromRegistry(list) {
  LIST_REGISTRY.splice(list.id, 1);
  updateListIds();
}

function editList(listData) {
  const editableList = LIST_REGISTRY[listData.path.listId];
  for (const [key, value] of Object.entries(listData.data)) {
    editableList[key] = value;
  }
  PubSub.emit("listShouldBeRerendered", listData);
}

function getListRegistry() {
  const fullListRegistry = [defaultListReference, ...LIST_REGISTRY];
  PubSub.emit("ListRegistryGetsReturned", fullListRegistry);
}

PubSub.on("DefaultListPending", (listData) => {
  defaultListReference = listData.list;
});
PubSub.on("ListPending", addListToRegistry);
PubSub.on("ListShouldBeRemoved", removeListFromRegistry);
PubSub.on("ListIsReadyForEditing", editList);
PubSub.on("GetListRegistry", getListRegistry);


/***/ }),

/***/ "./src/listManagement/list-renderer.js":
/*!*********************************************!*\
  !*** ./src/listManagement/list-renderer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
/* harmony import */ var _list_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-creator */ "./src/listManagement/list-creator.js");



const listDisplay = document.getElementById("lists");

function renderListUponCreation(listData) {
  const list = listData.list;

  const listDiv = document.createElement("div");
  listDiv.dataset.listId = listData.listId;
  list.div = listDiv;
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;

  if (listData.listId === _list_creator__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_LIST_ID) {
    listDisplay.prepend(listDiv);
  } else {
    listDisplay.append(listDiv);
  }

  const listRow = document.createElement("div");
  listRow.classList.add("list-row");
  listDiv.append(listRow);

  const listNameText = document.createElement("p");
  listNameText.classList.add("list-name");
  listNameText.textContent = list.name;
  listRow.append(listNameText);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-row");
  listRow.append(buttonsDiv);

  renderAllListButtons(list, buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.append(hr);

  const taskSection = document.createElement("div");
  taskSection.classList.add("task-section");
  listDiv.append(taskSection);
}

function renderAllListButtons(list, buttonsDiv) {
  Object.values(list.buttons).forEach((button) => {
    buttonsDiv.append(button);
  });
}

function stopRenderingList(list) {
  list.div.remove();
}

function rerenderList(listData) {
  const query = `[data-list-id="${listData.path.listId}"]`;

  const listDiv = document.querySelector(query);
  listDiv.style.borderColor = listData.data.color;

  const listNameText = listDiv.querySelector(".list-name");
  listNameText.textContent = listData.data.name;
}

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("DefaultListPending", renderListUponCreation);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListRegistered", renderListUponCreation);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListShouldBeRemoved", stopRenderingList);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("listShouldBeRerendered", rerenderList);


/***/ }),

/***/ "./src/listManagement/list-utilities.js":
/*!**********************************************!*\
  !*** ./src/listManagement/list-utilities.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   deleteTask: () => (/* binding */ deleteTask),
/* harmony export */   editTask: () => (/* binding */ editTask),
/* harmony export */   establishNewTask: () => (/* binding */ establishNewTask),
/* harmony export */   setupTaskHelpers: () => (/* binding */ setupTaskHelpers)
/* harmony export */ });
/* harmony import */ var _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../taskManagement/task-creator */ "./src/taskManagement/task-creator.js");
/* harmony import */ var _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../taskManagement/task-registrar */ "./src/taskManagement/task-registrar.js");
/* harmony import */ var _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../taskManagement/task-renderer */ "./src/taskManagement/task-renderer.js");




function setupTaskHelpers(list) {
  list.taskCreator = new _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_0__.TaskCreator();
  list.taskRegistrar = new _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_1__.TaskRegistrar();
  list.taskRenderer = new _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_2__.TaskRenderer(list.div);
}

function establishNewTask(taskData) {
  if (taskBelongsToThisList(taskData.parentList, this.id)) {
    const task = this.taskCreator.createTask(taskData);
    this.taskRegistrar.registerTask(task);
    this.taskRenderer.renderTask(this.div, task);
  }
}

function editTask(taskData) {
  if (taskBelongsToThisList(taskData.path.listId, this.id)) {
    const editedTask = this.taskRegistrar.editTask(taskData);
    this.taskRenderer.rerenderTask(editedTask);
  }
}

function deleteTask(task) {
  console.log(task.parentList, this.id);
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.deleteTask(task);
    this.taskRenderer.stopRenderingTask(task);
  }
}

function taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
  return listNameTaskIsLookingFor == currentListName;
}


/***/ }),

/***/ "./src/listManagement/list.js":
/*!************************************!*\
  !*** ./src/listManagement/list.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   List: () => (/* binding */ List)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formManagement/form-manager */ "./src/formManagement/form-manager.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities */ "./src/utilities.js");
/* harmony import */ var _list_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list-utilities */ "./src/listManagement/list-utilities.js");





class List {
  id = null;
  div = null;
  buttons = {};

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
      "sort",
      "sort-button",
      this,
      "SortListButton"
    );
    this.AddTaskButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)("+", "add-button", this, "AddTaskButton");
    this.AddTaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListIdGetsReturned", this.id);
    });

    _list_utilities__WEBPACK_IMPORTED_MODULE_3__.setupTaskHelpers(this);
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("TaskIsReadyForCreation", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.establishNewTask.bind(this));
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("TaskIsReadyForEditing", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.editTask.bind(this));
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("UserWantsToDeleteTask", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.deleteTask.bind(this));
  }
}


/***/ }),

/***/ "./src/taskManagement/task-creator.js":
/*!********************************************!*\
  !*** ./src/taskManagement/task-creator.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskCreator: () => (/* binding */ TaskCreator)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/taskManagement/task.js");


class TaskCreator {
  constructor() {}

  createTask(taskData) {
    return new _task__WEBPACK_IMPORTED_MODULE_0__.Task(taskData);
  }
}


/***/ }),

/***/ "./src/taskManagement/task-registrar.js":
/*!**********************************************!*\
  !*** ./src/taskManagement/task-registrar.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskRegistrar: () => (/* binding */ TaskRegistrar)
/* harmony export */ });
class TaskRegistrar {
  TASK_REGISTRY = [];

  constructor() {}

  registerTask(task) {
    this.TASK_REGISTRY.push(task);
    task.id = this.TASK_REGISTRY.length - 1;
  }

  updateIds() {
    this.TASK_REGISTRY.forEach((task, index) => {
      task.id = index;
    });
  }

  editTask(taskData) {
    const editableTask = this.TASK_REGISTRY[taskData.path.taskId];
    for (const [key, value] of Object.entries(taskData.data)) {
      editableTask[key] = value;
    }
    console.log(editableTask, editableTask.id);
    return editableTask;
  }

  deleteTask(task) {
    this.TASK_REGISTRY.splice(task.id, 1);
    this.updateIds();
    console.log(this.TASK_REGISTRY);
  }
}


/***/ }),

/***/ "./src/taskManagement/task-renderer.js":
/*!*********************************************!*\
  !*** ./src/taskManagement/task-renderer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskRenderer: () => (/* binding */ TaskRenderer)
/* harmony export */ });


class TaskRenderer {
  construct() {}

  renderTask(parentListDiv, task) {
    const parentListTaskSection = parentListDiv.querySelector(".task-section");

    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-background");
    parentListTaskSection.append(taskDiv);
    task.div = taskDiv;

    taskDiv.append(task.finishTaskCheckbox);

    const taskNameText = document.createElement("p");
    taskNameText.classList.add("task-name");
    taskNameText.textContent = task.name;
    taskDiv.append(taskNameText);

    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = task.dueDate;
    taskDueDate.classList.add("due-date");
    // if (isFuture(task.dueDate)) {
    //   taskDueDate.classList.add("not-postponed");
    // } else {
    //   taskDueDate.classList.add("postponed");
    // }
    taskDiv.append(taskDueDate);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-row");
    taskDiv.append(buttonsDiv);

    this.renderTaskButtons(buttonsDiv, task);
  }

  renderTaskButtons(buttonsDiv, task) {
    Object.values(task.buttons).forEach((button) => {
      buttonsDiv.append(button);
    });
  }

  stopRenderingTask(task) {
    task.div.remove();
  }

  rerenderTask(task) {
    const taskDiv = task.div;

    const taskNameText = taskDiv.querySelector(".task-name");
    taskNameText.textContent = task.name;

    const taskDueDate = taskDiv.querySelector(".due-date");
    taskDueDate.textContent = task.dueDate;
    // if (isFuture(task.dueDate)) {
    //   taskDueDate.classList.add("not-postponed");
    //   taskDueDate.classList.remove("postponed");
    // } else {
    //   taskDueDate.classList.add("postponed");
    //   taskDueDate.classList.remove("not-postponed");
    // }
  }
}


/***/ }),

/***/ "./src/taskManagement/task.js":
/*!************************************!*\
  !*** ./src/taskManagement/task.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formManagement/form-manager */ "./src/formManagement/form-manager.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities */ "./src/utilities.js");




class Task {
  SUBTASKS = [];
  id = null;
  div = null;
  buttons = {};

  constructor(taskData) {
    this.name = taskData.name || "Unnamed";
    this.description = taskData.description;
    this.dueDate = taskData.dueDate;
    this.priority = taskData.priority;
    this.parentList = taskData.parentList;

    this.finishTaskCheckbox = document.createElement("input");
    this.finishTaskCheckbox.setAttribute("type", "checkbox");
    this.finishTaskCheckbox.addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskChecked", this);
      } else {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskUnchecked", this);
      }
    });

    this.ShowTaskInformationButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
      "info",
      "information-button",
      this,
      "ShowTaskInformationButton"
    );
    this.ShowTaskInformationButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToSeeEntityInformation", {
        formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task,
        entity: this,
      });
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
    });

    this.EditTaskButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
      "edit",
      "edit-button",
      this,
      "EditTaskButton"
    );
    this.EditTaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditTask", {
        formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task,
        entity: this,
      });
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
    });

    this.DeleteTaskButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
      "x",
      "delete-button",
      this,
      "DeleteTaskButton"
    );
    this.DeleteTaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToDeleteTask", this);
    });
  }
}


/***/ }),

/***/ "./src/unique-button-manager.js":
/*!**************************************!*\
  !*** ./src/unique-button-manager.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   finishUsingListFormButton: () => (/* binding */ finishUsingListFormButton),
/* harmony export */   finishUsingTaskFormButton: () => (/* binding */ finishUsingTaskFormButton),
/* harmony export */   listFormCloseButton: () => (/* binding */ listFormCloseButton),
/* harmony export */   listFormOpenButton: () => (/* binding */ listFormOpenButton),
/* harmony export */   taskFormCloseButton: () => (/* binding */ taskFormCloseButton)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formManagement/form-manager */ "./src/formManagement/form-manager.js");



const listFormOpenButton = document.getElementById(
  "list-form-open-button"
);
listFormOpenButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
});

const listFormCloseButton = document.getElementById(
  "list-form-close-button"
);
listFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
});

const finishUsingListFormButton =
  document.getElementById("finish-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserFinishedUsingForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
});

const taskFormCloseButton = document.getElementById(
  "task-form-close-button"
);
taskFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
});

const finishUsingTaskFormButton =
  document.getElementById("finish-task-button");
finishUsingTaskFormButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserFinishedUsingForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
});


/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupButton: () => (/* binding */ setupButton)
/* harmony export */ });
function setupButton(name, className, parent, buttonArrayName) {
  const button = document.createElement("button");
  button.textContent = name;
  button.classList.add(className);
  parent.buttons[buttonArrayName] = button;
  return button;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unique_button_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unique-button-manager */ "./src/unique-button-manager.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formManagement/form-manager */ "./src/formManagement/form-manager.js");
/* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listManagement/list-bundle */ "./src/listManagement/list-bundle.js");
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");





_PubSub__WEBPACK_IMPORTED_MODULE_3__.PubSub.emit("CreateDefaultList");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDRCxRQUFRLFNBQVMsRUFBRSxtQkFBTyxDQUFDLGtDQUFXO0FBQ1E7O0FBRTlDLGdCQUFnQjtBQUNUOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msc0RBQW1CO0FBQzNEO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsV0FBVywwREFBdUI7QUFDbEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxTQUFTO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsUUFBUSxJQUFJLFVBQVU7QUFDakUsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEVBQUUsaUVBQThCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLGlEQUFpRCxnQkFBZ0IsR0FBRyxRQUFRO0FBQzVFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRSxpRUFBOEI7O0FBRWhDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hKTztBQUNQO0FBQ0E7O0FBRU87QUFDUCxrQ0FBa0MsU0FBUztBQUMzQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJ3QjtBQUNFO0FBQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGVTtBQUNRO0FBQ2I7O0FBRXZCOztBQUVQO0FBQ0EseUJBQXlCO0FBQ3pCLDBCQUEwQix1Q0FBSTtBQUM5QjtBQUNBLHFCQUFxQjtBQUNyQixFQUFFLDJDQUFNO0FBQ1I7O0FBRUE7QUFDQSxtQkFBbUIsdUNBQUk7QUFDdkI7QUFDQSxFQUFFLDJDQUFNO0FBQ1I7O0FBRUE7QUFDQSx3QkFBd0IsdURBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU07QUFDVixHQUFHOztBQUVILDBCQUEwQix1REFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDJDQUFNO0FBQ1YsR0FBRzs7QUFFSCxtQ0FBbUMsdURBQVc7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyQ0FBTTtBQUNWO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsSUFBSSwyQ0FBTTtBQUNWLEdBQUc7QUFDSDs7QUFFQSwyQ0FBTTtBQUNOLDJDQUFNOzs7Ozs7Ozs7OztBQzFETixRQUFRLFNBQVMsRUFBRSxtQkFBTyxDQUFDLGtDQUFXOztBQUV0QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLDBCQUEwQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzVDbUM7QUFDYzs7QUFFakQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQiwwREFBZTtBQUN6QztBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0NBQWtDLHFCQUFxQjs7QUFFdkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsMkNBQU07QUFDTiwyQ0FBTTtBQUNOLDJDQUFNO0FBQ04sMkNBQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsRXVEO0FBQ0k7QUFDRjs7QUFFeEQ7QUFDUCx5QkFBeUIscUVBQVc7QUFDcEMsMkJBQTJCLHlFQUFhO0FBQ3hDLDBCQUEwQix1RUFBWTtBQUN0Qzs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DbUM7QUFDNEI7QUFDcEI7QUFDRzs7QUFFdkM7QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQix1REFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVEQUFXO0FBQ3BDO0FBQ0EsTUFBTSwyQ0FBTSxrQkFBa0IsdUVBQWE7QUFDM0MsTUFBTSwyQ0FBTTtBQUNaLEtBQUs7O0FBRUwsSUFBSSw2REFBMEI7QUFDOUIsSUFBSSwyQ0FBTSw4QkFBOEIsNkRBQTBCO0FBQ2xFLElBQUksMkNBQU0sNkJBQTZCLHFEQUFrQjtBQUN6RCxJQUFJLDJDQUFNLDZCQUE2Qix1REFBb0I7QUFDM0Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQjhCOztBQUV2QjtBQUNQOztBQUVBO0FBQ0EsZUFBZSx1Q0FBSTtBQUNuQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDUk87QUFDUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5QitEO0FBQ3RCO0FBQ2xDO0FBQ1A7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRG1DO0FBQzRCO0FBQ3BCOztBQUVwQztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkNBQU07QUFDZCxRQUFRO0FBQ1IsUUFBUSwyQ0FBTTtBQUNkO0FBQ0EsS0FBSzs7QUFFTCxxQ0FBcUMsdURBQVc7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSwyQ0FBTTtBQUNaLGtCQUFrQix1RUFBYTtBQUMvQjtBQUNBLE9BQU87QUFDUCxNQUFNLDJDQUFNLGtCQUFrQix1RUFBYTtBQUMzQyxLQUFLOztBQUVMLDBCQUEwQix1REFBVztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDJDQUFNO0FBQ1osa0JBQWtCLHVFQUFhO0FBQy9CO0FBQ0EsT0FBTztBQUNQLE1BQU0sMkNBQU0sa0JBQWtCLHVFQUFhO0FBQzNDLEtBQUs7O0FBRUwsNEJBQTRCLHVEQUFXO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMkNBQU07QUFDWixLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFa0M7QUFDNEI7O0FBRXZEO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSxrQkFBa0IsdUVBQWE7QUFDdkMsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU0sbUJBQW1CLHVFQUFhO0FBQ3hDLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSwrQkFBK0IsdUVBQWE7QUFDcEQsRUFBRSwyQ0FBTSxtQkFBbUIsdUVBQWE7QUFDeEMsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU0sbUJBQW1CLHVFQUFhO0FBQ3hDLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSwrQkFBK0IsdUVBQWE7QUFDcEQsRUFBRSwyQ0FBTSxtQkFBbUIsdUVBQWE7QUFDeEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDTTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ05BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ007QUFDRDtBQUNKOztBQUVsQywyQ0FBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvUHViU3ViLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvZm9ybU1hbmFnZW1lbnQvZm9ybS11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVnaXN0cmFyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtdXRpbGl0aWVzLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2stY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVnaXN0cmFyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy91bmlxdWUtYnV0dG9uLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgUHViU3ViID0gKCgpID0+IHtcbiAgY29uc3QgTk9UX1BSRVNFTlRfSU5fVEhFX0FSUkFZID0gLTE7XG4gIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGRlYnVnRXZlbnRBbm5vdW5jZShldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGBbZGVidWddIEVWRU5UICR7ZXZlbnR9IElTIENBTExFRGApO1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdChldmVudCwgcGFyYW0gPSBudWxsKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGRlYnVnRXZlbnRBbm5vdW5jZShldmVudCk7XG4gICAgICBmb3IgKGxldCBmdW5jIG9mIGV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgZnVuYyhwYXJhbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KGBUaGVyZSBpcyBubyBldmVudCB3aXRoIGEgbmFtZSAnJHtldmVudH0nYCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb24oZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZXZlbnRzW2V2ZW50XS5wdXNoKGZ1bmMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudHNbZXZlbnRdID0gW2Z1bmNdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBjb25zdCBpbmRleE9mR2l2ZW5GdW5jdGlvbiA9IGV2ZW50c1tldmVudF0uaW5kZXhPZihmdW5jKTtcbiAgICAgIGlmIChpbmRleE9mR2l2ZW5GdW5jdGlvbiAhPT0gTk9UX1BSRVNFTlRfSU5fVEhFX0FSUkFZKSB7XG4gICAgICAgIGV2ZW50c1tldmVudF0uc3BsaWNlKGluZGV4T2ZHaXZlbkZ1bmN0aW9uLCAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXG4gICAgICAgIGBUaGVyZSBpcyBlaXRoZXIgbm8gc3VjaCBldmVudCAoJHtldmVudH0pIHJlZ2lzdGVyZWQsIG9yIHlvdXIgZnVuY3Rpb24gaXNuJ3QgcHJlc2VudCB0aGVyZWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgZW1pdCwgb24sIG9mZiB9O1xufSkoKTtcbiIsImNvbnN0IHsgUHViU3ViIH0gPSByZXF1aXJlKFwiLi4vUHViU3ViXCIpO1xuaW1wb3J0ICogYXMgZm9ybVV0aWxzIGZyb20gXCIuL2Zvcm0tdXRpbGl0aWVzXCI7XG5cbmNvbnN0IE1PREVTID0geyBDUkVBVElPTjogMCwgRURJVElORzogMSwgSU5GT1JNQVRJT046IDIgfTtcbmV4cG9ydCBjb25zdCBGT1JNX1JFR0lTVFJZID0ge307XG5cbmNvbnN0IGxpc3RGb3JtID0gcmVnaXN0ZXJGb3JtKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIiwgXCJMaXN0XCIpO1xuY29uc3QgdGFza0Zvcm0gPSByZWdpc3RlckZvcm0oXCJ0YXNrLWZvcm0tYmFja2dyb3VuZFwiLCBcIlRhc2tcIik7XG5jb25zdCBwYXJlbnRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXJlbnRMaXN0XCIpO1xuXG5mdW5jdGlvbiByZWdpc3RlckZvcm0oYmFja2dyb3VuZElkLCBjb2RlbmFtZSkge1xuICBGT1JNX1JFR0lTVFJZW2NvZGVuYW1lXSA9IGNvZGVuYW1lO1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJhY2tncm91bmRJZCksXG4gICAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmFja2dyb3VuZElkKS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSxcbiAgICBtb2RlOiBNT0RFUy5DUkVBVElPTixcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybURhdGEoZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG5cbiAgY29uc3QgZm9ybUlucHV0RGF0YSA9IHt9O1xuICBBcnJheS5mcm9tKHdvcmtpbmdGb3JtLmZvcm0uZWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gXCJCVVRUT05cIikge1xuICAgICAgY29uc3QgaW5wdXRDb250ZW50VHlwZSA9IGVsZW1lbnQuaWQ7XG4gICAgICBmb3JtSW5wdXREYXRhW2lucHV0Q29udGVudFR5cGVdID0gZm9ybVV0aWxzLnRyaW1JbnB1dChlbGVtZW50LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIGxldCBwYXRoID0gbnVsbDtcbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkVESVRJTkcpIHtcbiAgICBwYXRoID0gZm9ybVV0aWxzLmdldEVudGl0eVBhdGgod29ya2luZ0Zvcm0sIGZvcm1UeXBlKTtcbiAgfVxuXG4gIC8vIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5UYXNrKSB7XG4gIC8vICAgZm9ybUlucHV0RGF0YS5kdWVEYXRlID1cbiAgLy8gICAgIGZvcm1JbnB1dERhdGEuZHVlRGF0ZSA9PT0gXCJcIlxuICAvLyAgICAgICA/IG5ldyBEYXRlKClcbiAgLy8gICAgICAgOiBuZXcgRGF0ZShmb3JtSW5wdXREYXRhLmR1ZURhdGUpO1xuICAvLyB9XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgUHViU3ViLmVtaXQoZm9ybVR5cGUgKyBcIklzUmVhZHlGb3JDcmVhdGlvblwiLCBmb3JtSW5wdXREYXRhKTtcbiAgfSBlbHNlIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgUHViU3ViLmVtaXQoZm9ybVR5cGUgKyBcIklzUmVhZHlGb3JFZGl0aW5nXCIsIHtcbiAgICAgIGRhdGE6IGZvcm1JbnB1dERhdGEsXG4gICAgICBwYXRoLFxuICAgIH0pO1xuICB9XG4gIHJlc2V0Rm9ybShmb3JtVHlwZSk7XG59XG5cbmZ1bmN0aW9uIGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKSB7XG4gIHN3aXRjaCAoZm9ybVR5cGUpIHtcbiAgICBjYXNlIEZPUk1fUkVHSVNUUlkuTGlzdDpcbiAgICAgIHJldHVybiBsaXN0Rm9ybTtcbiAgICBjYXNlIEZPUk1fUkVHSVNUUlkuVGFzazpcbiAgICAgIHJldHVybiB0YXNrRm9ybTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldEZvcm0oZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucmVzZXQoKTtcbiAgd29ya2luZ0Zvcm0uZm9ybS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLSR7Zm9ybVR5cGV9LWxpc3QtaWRcIik7XG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5DUkVBVElPTjtcbiAgY29uc3QgZmluaXNoVXNpbmdGb3JtQnV0dG9uID1cbiAgICB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoLWJ1dHRvblwiKTtcbiAgZmluaXNoVXNpbmdGb3JtQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xufVxuXG5mdW5jdGlvbiBvcGVuRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtID09PSB0YXNrRm9ybSkge1xuICAgIFB1YlN1Yi5lbWl0KFwiR2V0TGlzdFJlZ2lzdHJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgIT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cFBhcmVudExpc3RTZWxlY3Rpb24ocmVnaXN0cnkpIHtcbiAgbGV0IHBhcmVudExpc3RDb250ZW50ID0gXCJcIjtcbiAgcmVnaXN0cnkuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIHBhcmVudExpc3RDb250ZW50ICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtsaXN0LmlkfVwiPiR7bGlzdC5uYW1lfTwvb3B0aW9uPmA7XG4gIH0pO1xuICBwYXJlbnRMaXN0LmlubmVySFRNTCA9IHBhcmVudExpc3RDb250ZW50O1xufVxuXG5mdW5jdGlvbiBzZXRQYXJlbnRMaXN0U2VsZWN0aW9uVG9WYWx1ZShpZCkge1xuICBwYXJlbnRMaXN0LnZhbHVlID0gaWQ7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUoZGF0YSkge1xuICBjb25zdCBmb3JtVHlwZSA9IGRhdGEuZm9ybVR5cGU7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5tb2RlID0gTU9ERVMuRURJVElORztcblxuICBmb3JtVXRpbHMuc2V0dXBGb3JtSW5wdXRWYWx1ZXMod29ya2luZ0Zvcm0sIGRhdGEuZW50aXR5KTtcbiAgaWYgKGZvcm1UeXBlID09PSBGT1JNX1JFR0lTVFJZLlRhc2spIHtcbiAgICBjb25zdCBsaXN0ID0gZGF0YS5lbnRpdHk7XG4gICAgd29ya2luZ0Zvcm0uZm9ybS5kYXRhc2V0LmVkaXRhYmxlTGlzdElkID0gbGlzdC5pZDtcbiAgfSBlbHNlIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5MaXN0KSB7XG4gICAgY29uc3QgdGFzayA9IGRhdGEuZW50aXR5O1xuICAgIHdvcmtpbmdGb3JtLmZvcm0uZGF0YXNldC5lZGl0YWJsZVRhc2tJZCA9IGAke3Rhc2sucGFyZW50TGlzdH06JHt0YXNrLmlkfWA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJlcGFyZUZvcm1Gb3JJbmZvcm1hdGlvbk1vZGUoZGF0YSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGRhdGEuZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5tb2RlID0gTU9ERVMuSU5GT1JNQVRJT047XG4gIGZvcm1VdGlscy5zZXR1cEZvcm1JbnB1dFZhbHVlcyh3b3JraW5nRm9ybSwgZGF0YS5lbnRpdHkpO1xuXG4gIGNvbnN0IGZpbmlzaFVzaW5nRm9ybUJ1dHRvbiA9XG4gICAgd29ya2luZ0Zvcm0uZm9ybS5xdWVyeVNlbGVjdG9yKFwiLmZpbmlzaC1idXR0b25cIik7XG4gIGZpbmlzaFVzaW5nRm9ybUJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgc2V0dXBFZGl0VGhpc0Zvcm1CdXR0b24od29ya2luZ0Zvcm0sIGRhdGEpO1xufVxuXG5mdW5jdGlvbiBzZXR1cEVkaXRUaGlzRm9ybUJ1dHRvbih3b3JraW5nRm9ybSwgZGF0YSkge1xuICBjb25zdCBlZGl0VGhpc0Zvcm1CdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBlZGl0VGhpc0Zvcm1CdXR0b24uc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImJ1dHRvblwiKTtcbiAgZWRpdFRoaXNGb3JtQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJlZGl0LXRoaXMtZm9ybS1idXR0b25cIik7XG4gIGVkaXRUaGlzRm9ybUJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdCB0aGlzIFwiICsgZGF0YS5mb3JtVHlwZS50b0xvd2VyQ2FzZSgpO1xuICBlZGl0VGhpc0Zvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICByZXNldEZvcm0oZGF0YS5mb3JtVHlwZSk7XG4gICAgcHJlcGFyZUZvcm1Gb3JFZGl0aW5nTW9kZShkYXRhKTtcbiAgICBlZGl0VGhpc0Zvcm1CdXR0b24ucmVtb3ZlKCk7XG4gIH0pO1xuICB3b3JraW5nRm9ybS5mb3JtLnByZXBlbmQoZWRpdFRoaXNGb3JtQnV0dG9uKTtcbn1cblxuUHViU3ViLm9uKFwiT3BlbkZvcm1cIiwgb3BlbkZvcm0pO1xuUHViU3ViLm9uKFwiQ2xvc2VGb3JtXCIsIGNsb3NlRm9ybSk7XG5cblB1YlN1Yi5vbihcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBnZXRGb3JtRGF0YSk7XG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0VkaXRMaXN0XCIsIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUpO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdHJ5R2V0c1JldHVybmVkXCIsIHNldHVwUGFyZW50TGlzdFNlbGVjdGlvbik7XG5QdWJTdWIub24oXCJMaXN0SWRHZXRzUmV0dXJuZWRcIiwgc2V0UGFyZW50TGlzdFNlbGVjdGlvblRvVmFsdWUpO1xuXG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUpO1xuXG5QdWJTdWIub24oXCJVc2VyV2FudHNUb1NlZUVudGl0eUluZm9ybWF0aW9uXCIsIHByZXBhcmVGb3JtRm9ySW5mb3JtYXRpb25Nb2RlKTtcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmltSW5wdXQoaW5wdXRWYWx1ZSkge1xuICByZXR1cm4gaW5wdXRWYWx1ZS50cmltKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRpdHlQYXRoKHdvcmtpbmdGb3JtLCBmb3JtVHlwZSkge1xuICBjb25zdCBkYXRhc2V0UXVlcnkgPSBgZWRpdGFibGUke2Zvcm1UeXBlfUlkYDtcbiAgY29uc3QgZWRpdGFibGVFbnRpdHlJZCA9IHdvcmtpbmdGb3JtLmZvcm0uZGF0YXNldFtkYXRhc2V0UXVlcnldO1xuICBjb25zb2xlLmxvZyhlZGl0YWJsZUVudGl0eUlkKTtcbiAgY29uc3QgcGF0aEFycmF5ID0gZWRpdGFibGVFbnRpdHlJZC5zcGxpdChcIjpcIik7XG4gIGNvbnN0IHBhdGggPSB7IGxpc3RJZDogcGF0aEFycmF5WzBdLCB0YXNrSWQ6IHBhdGhBcnJheVsxXSB9O1xuICByZXR1cm4gcGF0aDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwRm9ybUlucHV0VmFsdWVzKHdvcmtpbmdGb3JtLCBlbnRpdHkpIHtcbiAgd29ya2luZ0Zvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIikuZm9yRWFjaCgoY3VycmVudCkgPT4ge1xuICAgIGN1cnJlbnQudmFsdWUgPSBlbnRpdHlbY3VycmVudC5pZF07XG4gIH0pO1xufVxuIiwiaW1wb3J0IFwiLi9saXN0LWNyZWF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZWdpc3RyYXJcIjtcbmltcG9ydCBcIi4vbGlzdC1yZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4vbGlzdFwiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9MSVNUX0lEID0gXCJERUZBVUxUXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRMaXN0KCkge1xuICBjb25zdCBjcmVhdGlvbkRhdGEgPSB7IG5hbWU6IFwiRGVmYXVsdFwiLCBjb2xvcjogXCIjY2NjXCIgfTtcbiAgY29uc3QgZGVmYXVsdExpc3QgPSBuZXcgTGlzdChjcmVhdGlvbkRhdGEpO1xuICBkZWZhdWx0TGlzdC5pZCA9IERFRkFVTFRfTElTVF9JRDtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3Q6IGRlZmF1bHRMaXN0LCBsaXN0SWQ6IGRlZmF1bHRMaXN0LmlkIH07XG4gIFB1YlN1Yi5lbWl0KFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChuZXdEYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChuZXdEYXRhKTtcbiAgYWRkTm9uRGVmYXVsdExpc3RCdXR0b25zKGxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkxpc3RQZW5kaW5nXCIsIGxpc3QpO1xufVxuXG5mdW5jdGlvbiBhZGROb25EZWZhdWx0TGlzdEJ1dHRvbnMobGlzdCkge1xuICBsaXN0LkVkaXRMaXN0QnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgXCJlZGl0XCIsXG4gICAgXCJlZGl0LWJ1dHRvblwiLFxuICAgIGxpc3QsXG4gICAgXCJFZGl0TGlzdEJ1dHRvblwiXG4gICk7XG4gIGxpc3QuRWRpdExpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgbGlzdCk7XG4gICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xuICB9KTtcblxuICBsaXN0LlJlbW92ZUxpc3RCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICBcInhcIixcbiAgICBcInJlbW92ZS1idXR0b25cIixcbiAgICBsaXN0LFxuICAgIFwiUmVtb3ZlTGlzdEJ1dHRvblwiXG4gICk7XG4gIGxpc3QuUmVtb3ZlTGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFB1YlN1Yi5lbWl0KFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCBsaXN0KTtcbiAgfSk7XG5cbiAgbGlzdC5TaG93TGlzdEluZm9ybWF0aW9uQnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgXCJpbmZvXCIsXG4gICAgXCJpbmZvcm1hdGlvbi1idXR0b25cIixcbiAgICBsaXN0LFxuICAgIFwiU2hvd0xpc3RJbmZvcm1hdGlvbkJ1dHRvblwiXG4gICk7XG4gIGxpc3QuU2hvd0xpc3RJbmZvcm1hdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9TZWVFbnRpdHlJbmZvcm1hdGlvblwiLCB7XG4gICAgICBmb3JtVHlwZTogRk9STV9SRUdJU1RSWS5MaXN0LFxuICAgICAgZW50aXR5OiBsaXN0LFxuICAgIH0pO1xuICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbiAgfSk7XG59XG5cblB1YlN1Yi5vbihcIkxpc3RJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgY3JlYXRlTmV3TGlzdCk7XG5QdWJTdWIub24oXCJDcmVhdGVEZWZhdWx0TGlzdFwiLCBjcmVhdGVEZWZhdWx0TGlzdCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4uL1B1YlN1YlwiKTtcblxuY29uc3QgTElTVF9SRUdJU1RSWSA9IFtdO1xubGV0IGRlZmF1bHRMaXN0UmVmZXJlbmNlID0gbnVsbDtcblxuZnVuY3Rpb24gYWRkTGlzdFRvUmVnaXN0cnkobGlzdCkge1xuICBMSVNUX1JFR0lTVFJZLnB1c2gobGlzdCk7XG4gIGxpc3QuaWQgPSBMSVNUX1JFR0lTVFJZLmxlbmd0aCAtIDE7XG4gIGNvbnN0IGxpc3REYXRhID0geyBsaXN0LCBsaXN0SWQ6IExJU1RfUkVHSVNUUlkubGVuZ3RoIC0gMSB9O1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RlcmVkXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGlzdElkcygpIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBMSVNUX1JFR0lTVFJZLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbGlzdCA9IExJU1RfUkVHSVNUUllbaV07XG4gICAgbGlzdC5pZCA9IGk7XG4gICAgbGlzdC5kaXYuZGF0YXNldC5saXN0SWQgPSBpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkobGlzdCkge1xuICBMSVNUX1JFR0lTVFJZLnNwbGljZShsaXN0LmlkLCAxKTtcbiAgdXBkYXRlTGlzdElkcygpO1xufVxuXG5mdW5jdGlvbiBlZGl0TGlzdChsaXN0RGF0YSkge1xuICBjb25zdCBlZGl0YWJsZUxpc3QgPSBMSVNUX1JFR0lTVFJZW2xpc3REYXRhLnBhdGgubGlzdElkXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobGlzdERhdGEuZGF0YSkpIHtcbiAgICBlZGl0YWJsZUxpc3Rba2V5XSA9IHZhbHVlO1xuICB9XG4gIFB1YlN1Yi5lbWl0KFwibGlzdFNob3VsZEJlUmVyZW5kZXJlZFwiLCBsaXN0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIGdldExpc3RSZWdpc3RyeSgpIHtcbiAgY29uc3QgZnVsbExpc3RSZWdpc3RyeSA9IFtkZWZhdWx0TGlzdFJlZmVyZW5jZSwgLi4uTElTVF9SRUdJU1RSWV07XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFJlZ2lzdHJ5R2V0c1JldHVybmVkXCIsIGZ1bGxMaXN0UmVnaXN0cnkpO1xufVxuXG5QdWJTdWIub24oXCJEZWZhdWx0TGlzdFBlbmRpbmdcIiwgKGxpc3REYXRhKSA9PiB7XG4gIGRlZmF1bHRMaXN0UmVmZXJlbmNlID0gbGlzdERhdGEubGlzdDtcbn0pO1xuUHViU3ViLm9uKFwiTGlzdFBlbmRpbmdcIiwgYWRkTGlzdFRvUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIkxpc3RJc1JlYWR5Rm9yRWRpdGluZ1wiLCBlZGl0TGlzdCk7XG5QdWJTdWIub24oXCJHZXRMaXN0UmVnaXN0cnlcIiwgZ2V0TGlzdFJlZ2lzdHJ5KTtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IERFRkFVTFRfTElTVF9JRCB9IGZyb20gXCIuL2xpc3QtY3JlYXRvclwiO1xuXG5jb25zdCBsaXN0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdHNcIik7XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3RVcG9uQ3JlYXRpb24obGlzdERhdGEpIHtcbiAgY29uc3QgbGlzdCA9IGxpc3REYXRhLmxpc3Q7XG5cbiAgY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxpc3REaXYuZGF0YXNldC5saXN0SWQgPSBsaXN0RGF0YS5saXN0SWQ7XG4gIGxpc3QuZGl2ID0gbGlzdERpdjtcbiAgbGlzdERpdi5jbGFzc0xpc3QuYWRkKFwibGlzdFwiKTtcbiAgbGlzdERpdi5zdHlsZS5ib3JkZXJDb2xvciA9IGxpc3QuY29sb3I7XG5cbiAgaWYgKGxpc3REYXRhLmxpc3RJZCA9PT0gREVGQVVMVF9MSVNUX0lEKSB7XG4gICAgbGlzdERpc3BsYXkucHJlcGVuZChsaXN0RGl2KTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0RGlzcGxheS5hcHBlbmQobGlzdERpdik7XG4gIH1cblxuICBjb25zdCBsaXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdFJvdy5jbGFzc0xpc3QuYWRkKFwibGlzdC1yb3dcIik7XG4gIGxpc3REaXYuYXBwZW5kKGxpc3RSb3cpO1xuXG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsaXN0TmFtZVRleHQuY2xhc3NMaXN0LmFkZChcImxpc3QtbmFtZVwiKTtcbiAgbGlzdE5hbWVUZXh0LnRleHRDb250ZW50ID0gbGlzdC5uYW1lO1xuICBsaXN0Um93LmFwcGVuZChsaXN0TmFtZVRleHQpO1xuXG4gIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgbGlzdFJvdy5hcHBlbmQoYnV0dG9uc0Rpdik7XG5cbiAgcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdik7XG5cbiAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gIGxpc3REaXYuYXBwZW5kKGhyKTtcblxuICBjb25zdCB0YXNrU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXNlY3Rpb25cIik7XG4gIGxpc3REaXYuYXBwZW5kKHRhc2tTZWN0aW9uKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdikge1xuICBPYmplY3QudmFsdWVzKGxpc3QuYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uc0Rpdi5hcHBlbmQoYnV0dG9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3BSZW5kZXJpbmdMaXN0KGxpc3QpIHtcbiAgbGlzdC5kaXYucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIHJlcmVuZGVyTGlzdChsaXN0RGF0YSkge1xuICBjb25zdCBxdWVyeSA9IGBbZGF0YS1saXN0LWlkPVwiJHtsaXN0RGF0YS5wYXRoLmxpc3RJZH1cIl1gO1xuXG4gIGNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgbGlzdERpdi5zdHlsZS5ib3JkZXJDb2xvciA9IGxpc3REYXRhLmRhdGEuY29sb3I7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gbGlzdERpdi5xdWVyeVNlbGVjdG9yKFwiLmxpc3QtbmFtZVwiKTtcbiAgbGlzdE5hbWVUZXh0LnRleHRDb250ZW50ID0gbGlzdERhdGEuZGF0YS5uYW1lO1xufVxuXG5QdWJTdWIub24oXCJEZWZhdWx0TGlzdFBlbmRpbmdcIiwgcmVuZGVyTGlzdFVwb25DcmVhdGlvbik7XG5QdWJTdWIub24oXCJMaXN0UmVnaXN0ZXJlZFwiLCByZW5kZXJMaXN0VXBvbkNyZWF0aW9uKTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgc3RvcFJlbmRlcmluZ0xpc3QpO1xuUHViU3ViLm9uKFwibGlzdFNob3VsZEJlUmVyZW5kZXJlZFwiLCByZXJlbmRlckxpc3QpO1xuIiwiaW1wb3J0IHsgVGFza0NyZWF0b3IgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yXCI7XG5pbXBvcnQgeyBUYXNrUmVnaXN0cmFyIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVnaXN0cmFyXCI7XG5pbXBvcnQgeyBUYXNrUmVuZGVyZXIgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1yZW5kZXJlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUYXNrSGVscGVycyhsaXN0KSB7XG4gIGxpc3QudGFza0NyZWF0b3IgPSBuZXcgVGFza0NyZWF0b3IoKTtcbiAgbGlzdC50YXNrUmVnaXN0cmFyID0gbmV3IFRhc2tSZWdpc3RyYXIoKTtcbiAgbGlzdC50YXNrUmVuZGVyZXIgPSBuZXcgVGFza1JlbmRlcmVyKGxpc3QuZGl2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzdGFibGlzaE5ld1Rhc2sodGFza0RhdGEpIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrRGF0YS5wYXJlbnRMaXN0LCB0aGlzLmlkKSkge1xuICAgIGNvbnN0IHRhc2sgPSB0aGlzLnRhc2tDcmVhdG9yLmNyZWF0ZVRhc2sodGFza0RhdGEpO1xuICAgIHRoaXMudGFza1JlZ2lzdHJhci5yZWdpc3RlclRhc2sodGFzayk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVuZGVyVGFzayh0aGlzLmRpdiwgdGFzayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRUYXNrKHRhc2tEYXRhKSB7XG4gIGlmICh0YXNrQmVsb25nc1RvVGhpc0xpc3QodGFza0RhdGEucGF0aC5saXN0SWQsIHRoaXMuaWQpKSB7XG4gICAgY29uc3QgZWRpdGVkVGFzayA9IHRoaXMudGFza1JlZ2lzdHJhci5lZGl0VGFzayh0YXNrRGF0YSk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVyZW5kZXJUYXNrKGVkaXRlZFRhc2spO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVUYXNrKHRhc2spIHtcbiAgY29uc29sZS5sb2codGFzay5wYXJlbnRMaXN0LCB0aGlzLmlkKTtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrLnBhcmVudExpc3QsIHRoaXMuaWQpKSB7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyLmRlbGV0ZVRhc2sodGFzayk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIuc3RvcFJlbmRlcmluZ1Rhc2sodGFzayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFza0JlbG9uZ3NUb1RoaXNMaXN0KGxpc3ROYW1lVGFza0lzTG9va2luZ0ZvciwgY3VycmVudExpc3ROYW1lKSB7XG4gIHJldHVybiBsaXN0TmFtZVRhc2tJc0xvb2tpbmdGb3IgPT0gY3VycmVudExpc3ROYW1lO1xufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCB7IHNldHVwQnV0dG9uIH0gZnJvbSBcIi4uL3V0aWxpdGllc1wiO1xuaW1wb3J0ICogYXMgbGlzdFV0aWxzIGZyb20gXCIuL2xpc3QtdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0IHtcbiAgaWQgPSBudWxsO1xuICBkaXYgPSBudWxsO1xuICBidXR0b25zID0ge307XG5cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvcjtcblxuICAgIHRoaXMuU29ydExpc3RCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwic29ydFwiLFxuICAgICAgXCJzb3J0LWJ1dHRvblwiLFxuICAgICAgdGhpcyxcbiAgICAgIFwiU29ydExpc3RCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uID0gc2V0dXBCdXR0b24oXCIrXCIsIFwiYWRkLWJ1dHRvblwiLCB0aGlzLCBcIkFkZFRhc2tCdXR0b25cIik7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJZEdldHNSZXR1cm5lZFwiLCB0aGlzLmlkKTtcbiAgICB9KTtcblxuICAgIGxpc3RVdGlscy5zZXR1cFRhc2tIZWxwZXJzKHRoaXMpO1xuICAgIFB1YlN1Yi5vbihcIlRhc2tJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgbGlzdFV0aWxzLmVzdGFibGlzaE5ld1Rhc2suYmluZCh0aGlzKSk7XG4gICAgUHViU3ViLm9uKFwiVGFza0lzUmVhZHlGb3JFZGl0aW5nXCIsIGxpc3RVdGlscy5lZGl0VGFzay5iaW5kKHRoaXMpKTtcbiAgICBQdWJTdWIub24oXCJVc2VyV2FudHNUb0RlbGV0ZVRhc2tcIiwgbGlzdFV0aWxzLmRlbGV0ZVRhc2suYmluZCh0aGlzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjcmVhdGVUYXNrKHRhc2tEYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBUYXNrKHRhc2tEYXRhKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRhc2tSZWdpc3RyYXIge1xuICBUQVNLX1JFR0lTVFJZID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnB1c2godGFzayk7XG4gICAgdGFzay5pZCA9IHRoaXMuVEFTS19SRUdJU1RSWS5sZW5ndGggLSAxO1xuICB9XG5cbiAgdXBkYXRlSWRzKCkge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgdGFzay5pZCA9IGluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgZWRpdFRhc2sodGFza0RhdGEpIHtcbiAgICBjb25zdCBlZGl0YWJsZVRhc2sgPSB0aGlzLlRBU0tfUkVHSVNUUllbdGFza0RhdGEucGF0aC50YXNrSWRdO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRhc2tEYXRhLmRhdGEpKSB7XG4gICAgICBlZGl0YWJsZVRhc2tba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhlZGl0YWJsZVRhc2ssIGVkaXRhYmxlVGFzay5pZCk7XG4gICAgcmV0dXJuIGVkaXRhYmxlVGFzaztcbiAgfVxuXG4gIGRlbGV0ZVRhc2sodGFzaykge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5zcGxpY2UodGFzay5pZCwgMSk7XG4gICAgdGhpcy51cGRhdGVJZHMoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLlRBU0tfUkVHSVNUUlkpO1xuICB9XG59XG4iLCJpbXBvcnQgZm9ybWF0RGlzdGFuY2VUb05vdyBmcm9tIFwiZGF0ZS1mbnMvZm9ybWF0RGlzdGFuY2VUb05vd1wiO1xuaW1wb3J0IGlzRnV0dXJlIGZyb20gXCJkYXRlLWZucy9pc0Z1dHVyZVwiO1xuZXhwb3J0IGNsYXNzIFRhc2tSZW5kZXJlciB7XG4gIGNvbnN0cnVjdCgpIHt9XG5cbiAgcmVuZGVyVGFzayhwYXJlbnRMaXN0RGl2LCB0YXNrKSB7XG4gICAgY29uc3QgcGFyZW50TGlzdFRhc2tTZWN0aW9uID0gcGFyZW50TGlzdERpdi5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VjdGlvblwiKTtcblxuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2stYmFja2dyb3VuZFwiKTtcbiAgICBwYXJlbnRMaXN0VGFza1NlY3Rpb24uYXBwZW5kKHRhc2tEaXYpO1xuICAgIHRhc2suZGl2ID0gdGFza0RpdjtcblxuICAgIHRhc2tEaXYuYXBwZW5kKHRhc2suZmluaXNoVGFza0NoZWNrYm94KTtcblxuICAgIGNvbnN0IHRhc2tOYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tOYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgIHRhc2tOYW1lVGV4dC50ZXh0Q29udGVudCA9IHRhc2submFtZTtcbiAgICB0YXNrRGl2LmFwcGVuZCh0YXNrTmFtZVRleHQpO1xuXG4gICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwiZHVlLWRhdGVcIik7XG4gICAgLy8gaWYgKGlzRnV0dXJlKHRhc2suZHVlRGF0ZSkpIHtcbiAgICAvLyAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJub3QtcG9zdHBvbmVkXCIpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwicG9zdHBvbmVkXCIpO1xuICAgIC8vIH1cbiAgICB0YXNrRGl2LmFwcGVuZCh0YXNrRHVlRGF0ZSk7XG5cbiAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgICB0YXNrRGl2LmFwcGVuZChidXR0b25zRGl2KTtcblxuICAgIHRoaXMucmVuZGVyVGFza0J1dHRvbnMoYnV0dG9uc0RpdiwgdGFzayk7XG4gIH1cblxuICByZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0YXNrLmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uc0Rpdi5hcHBlbmQoYnV0dG9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BSZW5kZXJpbmdUYXNrKHRhc2spIHtcbiAgICB0YXNrLmRpdi5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlcmVuZGVyVGFzayh0YXNrKSB7XG4gICAgY29uc3QgdGFza0RpdiA9IHRhc2suZGl2O1xuXG4gICAgY29uc3QgdGFza05hbWVUZXh0ID0gdGFza0Rpdi5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbmFtZVwiKTtcbiAgICB0YXNrTmFtZVRleHQudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IHRhc2tEaXYucXVlcnlTZWxlY3RvcihcIi5kdWUtZGF0ZVwiKTtcbiAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICAvLyBpZiAoaXNGdXR1cmUodGFzay5kdWVEYXRlKSkge1xuICAgIC8vICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZChcIm5vdC1wb3N0cG9uZWRcIik7XG4gICAgLy8gICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QucmVtb3ZlKFwicG9zdHBvbmVkXCIpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwicG9zdHBvbmVkXCIpO1xuICAgIC8vICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LnJlbW92ZShcIm5vdC1wb3N0cG9uZWRcIik7XG4gICAgLy8gfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgU1VCVEFTS1MgPSBbXTtcbiAgaWQgPSBudWxsO1xuICBkaXYgPSBudWxsO1xuICBidXR0b25zID0ge307XG5cbiAgY29uc3RydWN0b3IodGFza0RhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSB0YXNrRGF0YS5uYW1lIHx8IFwiVW5uYW1lZFwiO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YXNrRGF0YS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSB0YXNrRGF0YS5kdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSB0YXNrRGF0YS5wcmlvcml0eTtcbiAgICB0aGlzLnBhcmVudExpc3QgPSB0YXNrRGF0YS5wYXJlbnRMaXN0O1xuXG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIHRoaXMuZmluaXNoVGFza0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICBQdWJTdWIuZW1pdChcIlRhc2tDaGVja2VkXCIsIHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJUYXNrVW5jaGVja2VkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5TaG93VGFza0luZm9ybWF0aW9uQnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgICBcImluZm9cIixcbiAgICAgIFwiaW5mb3JtYXRpb24tYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJTaG93VGFza0luZm9ybWF0aW9uQnV0dG9uXCJcbiAgICApO1xuICAgIHRoaXMuU2hvd1Rhc2tJbmZvcm1hdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb1NlZUVudGl0eUluZm9ybWF0aW9uXCIsIHtcbiAgICAgICAgZm9ybVR5cGU6IEZPUk1fUkVHSVNUUlkuVGFzayxcbiAgICAgICAgZW50aXR5OiB0aGlzLFxuICAgICAgfSk7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgfSk7XG5cbiAgICB0aGlzLkVkaXRUYXNrQnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgICBcImVkaXRcIixcbiAgICAgIFwiZWRpdC1idXR0b25cIixcbiAgICAgIHRoaXMsXG4gICAgICBcIkVkaXRUYXNrQnV0dG9uXCJcbiAgICApO1xuICAgIHRoaXMuRWRpdFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0VGFza1wiLCB7XG4gICAgICAgIGZvcm1UeXBlOiBGT1JNX1JFR0lTVFJZLlRhc2ssXG4gICAgICAgIGVudGl0eTogdGhpcyxcbiAgICAgIH0pO1xuICAgICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xuICAgIH0pO1xuXG4gICAgdGhpcy5EZWxldGVUYXNrQnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgICBcInhcIixcbiAgICAgIFwiZGVsZXRlLWJ1dHRvblwiLFxuICAgICAgdGhpcyxcbiAgICAgIFwiRGVsZXRlVGFza0J1dHRvblwiXG4gICAgKTtcbiAgICB0aGlzLkRlbGV0ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9EZWxldGVUYXNrXCIsIHRoaXMpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JtT3BlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1vcGVuLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1PcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1DbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1jbG9zZS1idXR0b25cIlxuKTtcbmxpc3RGb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbiA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluaXNoLWxpc3QtYnV0dG9uXCIpO1xuZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0YXNrRm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwidGFzay1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xudGFza0Zvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5pc2gtdGFzay1idXR0b25cIik7XG5maW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG59KTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzZXR1cEJ1dHRvbihuYW1lLCBjbGFzc05hbWUsIHBhcmVudCwgYnV0dG9uQXJyYXlOYW1lKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9IG5hbWU7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIHBhcmVudC5idXR0b25zW2J1dHRvbkFycmF5TmFtZV0gPSBidXR0b247XG4gIHJldHVybiBidXR0b247XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi91bmlxdWUtYnV0dG9uLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlXCI7XG5pbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcblxuUHViU3ViLmVtaXQoXCJDcmVhdGVEZWZhdWx0TGlzdFwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==