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
  const entity = data.entity;
  const workingForm = getWorkingForm(formType);
  const datasetPropertyName = `editable${formType}Id`;

  workingForm.mode = MODES.EDITING;
  _form_utilities__WEBPACK_IMPORTED_MODULE_0__.setupFormInputValues(workingForm, data.entity);

  if (formType === FORM_REGISTRY.List) {
    workingForm.form.dataset[datasetPropertyName] = entity.id;
  } else if (formType === FORM_REGISTRY.Task) {
    workingForm.form.dataset[
      datasetPropertyName
    ] = `${entity.parentList}:${entity.id}`;
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
PubSub.on("ListRegistryGetsReturned", setupParentListSelection);
PubSub.on("ListIdGetsReturned", setParentListSelectionToValue);

PubSub.on("UserWantsToEditList", prepareFormForEditingMode);
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
  console.log(workingForm.form);
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
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formManagement/form-manager */ "./src/formManagement/form-manager.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities */ "./src/utilities.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list */ "./src/listManagement/list.js");





const DEFAULT_LIST_ID = "DEFAULT";

function createDefaultList() {
  const creationData = { name: "Default", color: "#ccc" };
  const defaultList = new _list__WEBPACK_IMPORTED_MODULE_3__.List(creationData);
  defaultList.id = DEFAULT_LIST_ID;
  const listData = { list: defaultList, listId: defaultList.id };
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("DefaultListPending", listData);
}

function createNewList(newData) {
  const list = new _list__WEBPACK_IMPORTED_MODULE_3__.List(newData);
  addNonDefaultListButtons(list);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
}

function addNonDefaultListButtons(list) {
  list.EditListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
    "edit",
    "edit-button",
    list,
    "EditListButton"
  );
  list.EditListButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditList", {
      entity: list,
      formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List,
    });
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
  });

  list.RemoveListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
    "x",
    "remove-button",
    list,
    "RemoveListButton"
  );
  list.RemoveListButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListShouldBeRemoved", list);
  });

  list.ShowListInformationButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
    "info",
    "information-button",
    list,
    "ShowListInformationButton"
  );
  list.ShowListInformationButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToSeeEntityInformation", {
      formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List,
      entity: list,
    });
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDTkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDTTtBQUNEO0FBQ0o7O0FBRWxDLDJDQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9QdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtTWFuYWdlbWVudC9mb3JtLXV0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3VuaXF1ZS1idXR0b24tbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBQdWJTdWIgPSAoKCkgPT4ge1xuICBjb25zdCBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkgPSAtMTtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgZnVuY3Rpb24gZGVidWdFdmVudEFubm91bmNlKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtkZWJ1Z10gRVZFTlQgJHtldmVudH0gSVMgQ0FMTEVEYCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2ZW50LCBwYXJhbSA9IG51bGwpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZGVidWdFdmVudEFubm91bmNlKGV2ZW50KTtcbiAgICAgIGZvciAobGV0IGZ1bmMgb2YgZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICBmdW5jKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFRoZXJlIGlzIG5vIGV2ZW50IHdpdGggYSBuYW1lICcke2V2ZW50fSdgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBldmVudHNbZXZlbnRdLnB1c2goZnVuYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50c1tldmVudF0gPSBbZnVuY107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGNvbnN0IGluZGV4T2ZHaXZlbkZ1bmN0aW9uID0gZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZ1bmMpO1xuICAgICAgaWYgKGluZGV4T2ZHaXZlbkZ1bmN0aW9uICE9PSBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkpIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXhPZkdpdmVuRnVuY3Rpb24sIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcbiAgICAgICAgYFRoZXJlIGlzIGVpdGhlciBubyBzdWNoIGV2ZW50ICgke2V2ZW50fSkgcmVnaXN0ZXJlZCwgb3IgeW91ciBmdW5jdGlvbiBpc24ndCBwcmVzZW50IHRoZXJlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBlbWl0LCBvbiwgb2ZmIH07XG59KSgpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5pbXBvcnQgKiBhcyBmb3JtVXRpbHMgZnJvbSBcIi4vZm9ybS11dGlsaXRpZXNcIjtcblxuY29uc3QgTU9ERVMgPSB7IENSRUFUSU9OOiAwLCBFRElUSU5HOiAxLCBJTkZPUk1BVElPTjogMiB9O1xuZXhwb3J0IGNvbnN0IEZPUk1fUkVHSVNUUlkgPSB7fTtcblxuY29uc3QgbGlzdEZvcm0gPSByZWdpc3RlckZvcm0oXCJsaXN0LWZvcm0tYmFja2dyb3VuZFwiLCBcIkxpc3RcIik7XG5jb25zdCB0YXNrRm9ybSA9IHJlZ2lzdGVyRm9ybShcInRhc2stZm9ybS1iYWNrZ3JvdW5kXCIsIFwiVGFza1wiKTtcbmNvbnN0IHBhcmVudExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcmVudExpc3RcIik7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRm9ybShiYWNrZ3JvdW5kSWQsIGNvZGVuYW1lKSB7XG4gIEZPUk1fUkVHSVNUUllbY29kZW5hbWVdID0gY29kZW5hbWU7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmFja2dyb3VuZElkKSxcbiAgICBmb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChiYWNrZ3JvdW5kSWQpLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLFxuICAgIG1vZGU6IE1PREVTLkNSRUFUSU9OLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRGb3JtRGF0YShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcblxuICBjb25zdCBmb3JtSW5wdXREYXRhID0ge307XG4gIEFycmF5LmZyb20od29ya2luZ0Zvcm0uZm9ybS5lbGVtZW50cykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSBcIkJVVFRPTlwiKSB7XG4gICAgICBjb25zdCBpbnB1dENvbnRlbnRUeXBlID0gZWxlbWVudC5pZDtcbiAgICAgIGZvcm1JbnB1dERhdGFbaW5wdXRDb250ZW50VHlwZV0gPSBmb3JtVXRpbHMudHJpbUlucHV0KGVsZW1lbnQudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHBhdGggPSBudWxsO1xuICBpZiAod29ya2luZ0Zvcm0ubW9kZSA9PT0gTU9ERVMuRURJVElORykge1xuICAgIHBhdGggPSBmb3JtVXRpbHMuZ2V0RW50aXR5UGF0aCh3b3JraW5nRm9ybSwgZm9ybVR5cGUpO1xuICB9XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgUHViU3ViLmVtaXQoZm9ybVR5cGUgKyBcIklzUmVhZHlGb3JDcmVhdGlvblwiLCBmb3JtSW5wdXREYXRhKTtcbiAgfSBlbHNlIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgUHViU3ViLmVtaXQoZm9ybVR5cGUgKyBcIklzUmVhZHlGb3JFZGl0aW5nXCIsIHtcbiAgICAgIGRhdGE6IGZvcm1JbnB1dERhdGEsXG4gICAgICBwYXRoLFxuICAgIH0pO1xuICB9XG4gIHJlc2V0Rm9ybShmb3JtVHlwZSk7XG59XG5cbmZ1bmN0aW9uIGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKSB7XG4gIHN3aXRjaCAoZm9ybVR5cGUpIHtcbiAgICBjYXNlIEZPUk1fUkVHSVNUUlkuTGlzdDpcbiAgICAgIHJldHVybiBsaXN0Rm9ybTtcbiAgICBjYXNlIEZPUk1fUkVHSVNUUlkuVGFzazpcbiAgICAgIHJldHVybiB0YXNrRm9ybTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldEZvcm0oZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucmVzZXQoKTtcbiAgd29ya2luZ0Zvcm0uZm9ybS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLSR7Zm9ybVR5cGV9LWxpc3QtaWRcIik7XG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5DUkVBVElPTjtcbiAgY29uc3QgZmluaXNoVXNpbmdGb3JtQnV0dG9uID1cbiAgICB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoLWJ1dHRvblwiKTtcbiAgZmluaXNoVXNpbmdGb3JtQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xufVxuXG5mdW5jdGlvbiBvcGVuRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtID09PSB0YXNrRm9ybSkge1xuICAgIFB1YlN1Yi5lbWl0KFwiR2V0TGlzdFJlZ2lzdHJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgIT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cFBhcmVudExpc3RTZWxlY3Rpb24ocmVnaXN0cnkpIHtcbiAgbGV0IHBhcmVudExpc3RDb250ZW50ID0gXCJcIjtcbiAgcmVnaXN0cnkuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIHBhcmVudExpc3RDb250ZW50ICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtsaXN0LmlkfVwiPiR7bGlzdC5uYW1lfTwvb3B0aW9uPmA7XG4gIH0pO1xuICBwYXJlbnRMaXN0LmlubmVySFRNTCA9IHBhcmVudExpc3RDb250ZW50O1xufVxuXG5mdW5jdGlvbiBzZXRQYXJlbnRMaXN0U2VsZWN0aW9uVG9WYWx1ZShpZCkge1xuICBwYXJlbnRMaXN0LnZhbHVlID0gaWQ7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUoZGF0YSkge1xuICBjb25zdCBmb3JtVHlwZSA9IGRhdGEuZm9ybVR5cGU7XG4gIGNvbnN0IGVudGl0eSA9IGRhdGEuZW50aXR5O1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgY29uc3QgZGF0YXNldFByb3BlcnR5TmFtZSA9IGBlZGl0YWJsZSR7Zm9ybVR5cGV9SWRgO1xuXG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5FRElUSU5HO1xuICBmb3JtVXRpbHMuc2V0dXBGb3JtSW5wdXRWYWx1ZXMod29ya2luZ0Zvcm0sIGRhdGEuZW50aXR5KTtcblxuICBpZiAoZm9ybVR5cGUgPT09IEZPUk1fUkVHSVNUUlkuTGlzdCkge1xuICAgIHdvcmtpbmdGb3JtLmZvcm0uZGF0YXNldFtkYXRhc2V0UHJvcGVydHlOYW1lXSA9IGVudGl0eS5pZDtcbiAgfSBlbHNlIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5UYXNrKSB7XG4gICAgd29ya2luZ0Zvcm0uZm9ybS5kYXRhc2V0W1xuICAgICAgZGF0YXNldFByb3BlcnR5TmFtZVxuICAgIF0gPSBgJHtlbnRpdHkucGFyZW50TGlzdH06JHtlbnRpdHkuaWR9YDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlRm9ybUZvckluZm9ybWF0aW9uTW9kZShkYXRhKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZGF0YS5mb3JtVHlwZSk7XG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5JTkZPUk1BVElPTjtcbiAgZm9ybVV0aWxzLnNldHVwRm9ybUlucHV0VmFsdWVzKHdvcmtpbmdGb3JtLCBkYXRhLmVudGl0eSk7XG5cbiAgY29uc3QgZmluaXNoVXNpbmdGb3JtQnV0dG9uID1cbiAgICB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoLWJ1dHRvblwiKTtcbiAgZmluaXNoVXNpbmdGb3JtQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBzZXR1cEVkaXRUaGlzRm9ybUJ1dHRvbih3b3JraW5nRm9ybSwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwRWRpdFRoaXNGb3JtQnV0dG9uKHdvcmtpbmdGb3JtLCBkYXRhKSB7XG4gIGNvbnN0IGVkaXRUaGlzRm9ybUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGVkaXRUaGlzRm9ybUJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICBlZGl0VGhpc0Zvcm1CdXR0b24uY2xhc3NMaXN0LmFkZChcImVkaXQtdGhpcy1mb3JtLWJ1dHRvblwiKTtcbiAgZWRpdFRoaXNGb3JtQnV0dG9uLnRleHRDb250ZW50ID0gXCJFZGl0IHRoaXMgXCIgKyBkYXRhLmZvcm1UeXBlLnRvTG93ZXJDYXNlKCk7XG4gIGVkaXRUaGlzRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIHJlc2V0Rm9ybShkYXRhLmZvcm1UeXBlKTtcbiAgICBwcmVwYXJlRm9ybUZvckVkaXRpbmdNb2RlKGRhdGEpO1xuICAgIGVkaXRUaGlzRm9ybUJ1dHRvbi5yZW1vdmUoKTtcbiAgfSk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucHJlcGVuZChlZGl0VGhpc0Zvcm1CdXR0b24pO1xufVxuXG5QdWJTdWIub24oXCJPcGVuRm9ybVwiLCBvcGVuRm9ybSk7XG5QdWJTdWIub24oXCJDbG9zZUZvcm1cIiwgY2xvc2VGb3JtKTtcblxuUHViU3ViLm9uKFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIGdldEZvcm1EYXRhKTtcblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RyeUdldHNSZXR1cm5lZFwiLCBzZXR1cFBhcmVudExpc3RTZWxlY3Rpb24pO1xuUHViU3ViLm9uKFwiTGlzdElkR2V0c1JldHVybmVkXCIsIHNldFBhcmVudExpc3RTZWxlY3Rpb25Ub1ZhbHVlKTtcblxuUHViU3ViLm9uKFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCBwcmVwYXJlRm9ybUZvckVkaXRpbmdNb2RlKTtcblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRWRpdFRhc2tcIiwgcHJlcGFyZUZvcm1Gb3JFZGl0aW5nTW9kZSk7XG5cblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvU2VlRW50aXR5SW5mb3JtYXRpb25cIiwgcHJlcGFyZUZvcm1Gb3JJbmZvcm1hdGlvbk1vZGUpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyaW1JbnB1dChpbnB1dFZhbHVlKSB7XG4gIHJldHVybiBpbnB1dFZhbHVlLnRyaW0oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudGl0eVBhdGgod29ya2luZ0Zvcm0sIGZvcm1UeXBlKSB7XG4gIGNvbnN0IGRhdGFzZXRRdWVyeSA9IGBlZGl0YWJsZSR7Zm9ybVR5cGV9SWRgO1xuICBjb25zdCBlZGl0YWJsZUVudGl0eUlkID0gd29ya2luZ0Zvcm0uZm9ybS5kYXRhc2V0W2RhdGFzZXRRdWVyeV07XG4gIGNvbnNvbGUubG9nKHdvcmtpbmdGb3JtLmZvcm0pO1xuICBjb25zdCBwYXRoQXJyYXkgPSBlZGl0YWJsZUVudGl0eUlkLnNwbGl0KFwiOlwiKTtcbiAgY29uc3QgcGF0aCA9IHsgbGlzdElkOiBwYXRoQXJyYXlbMF0sIHRhc2tJZDogcGF0aEFycmF5WzFdIH07XG4gIHJldHVybiBwYXRoO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBGb3JtSW5wdXRWYWx1ZXMod29ya2luZ0Zvcm0sIGVudGl0eSkge1xuICB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKS5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgY3VycmVudC52YWx1ZSA9IGVudGl0eVtjdXJyZW50LmlkXTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgXCIuL2xpc3QtY3JlYXRvclwiO1xuaW1wb3J0IFwiLi9saXN0LXJlZ2lzdHJhclwiO1xuaW1wb3J0IFwiLi9saXN0LXJlbmRlcmVyXCI7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4vbGlzdFwiO1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9MSVNUX0lEID0gXCJERUZBVUxUXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRMaXN0KCkge1xuICBjb25zdCBjcmVhdGlvbkRhdGEgPSB7IG5hbWU6IFwiRGVmYXVsdFwiLCBjb2xvcjogXCIjY2NjXCIgfTtcbiAgY29uc3QgZGVmYXVsdExpc3QgPSBuZXcgTGlzdChjcmVhdGlvbkRhdGEpO1xuICBkZWZhdWx0TGlzdC5pZCA9IERFRkFVTFRfTElTVF9JRDtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3Q6IGRlZmF1bHRMaXN0LCBsaXN0SWQ6IGRlZmF1bHRMaXN0LmlkIH07XG4gIFB1YlN1Yi5lbWl0KFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChuZXdEYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChuZXdEYXRhKTtcbiAgYWRkTm9uRGVmYXVsdExpc3RCdXR0b25zKGxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkxpc3RQZW5kaW5nXCIsIGxpc3QpO1xufVxuXG5mdW5jdGlvbiBhZGROb25EZWZhdWx0TGlzdEJ1dHRvbnMobGlzdCkge1xuICBsaXN0LkVkaXRMaXN0QnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgXCJlZGl0XCIsXG4gICAgXCJlZGl0LWJ1dHRvblwiLFxuICAgIGxpc3QsXG4gICAgXCJFZGl0TGlzdEJ1dHRvblwiXG4gICk7XG4gIGxpc3QuRWRpdExpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwge1xuICAgICAgZW50aXR5OiBsaXN0LFxuICAgICAgZm9ybVR5cGU6IEZPUk1fUkVHSVNUUlkuTGlzdCxcbiAgICB9KTtcbiAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG4gIH0pO1xuXG4gIGxpc3QuUmVtb3ZlTGlzdEJ1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgIFwieFwiLFxuICAgIFwicmVtb3ZlLWJ1dHRvblwiLFxuICAgIGxpc3QsXG4gICAgXCJSZW1vdmVMaXN0QnV0dG9uXCJcbiAgKTtcbiAgbGlzdC5SZW1vdmVMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgUHViU3ViLmVtaXQoXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIGxpc3QpO1xuICB9KTtcblxuICBsaXN0LlNob3dMaXN0SW5mb3JtYXRpb25CdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICBcImluZm9cIixcbiAgICBcImluZm9ybWF0aW9uLWJ1dHRvblwiLFxuICAgIGxpc3QsXG4gICAgXCJTaG93TGlzdEluZm9ybWF0aW9uQnV0dG9uXCJcbiAgKTtcbiAgbGlzdC5TaG93TGlzdEluZm9ybWF0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb1NlZUVudGl0eUluZm9ybWF0aW9uXCIsIHtcbiAgICAgIGZvcm1UeXBlOiBGT1JNX1JFR0lTVFJZLkxpc3QsXG4gICAgICBlbnRpdHk6IGxpc3QsXG4gICAgfSk7XG4gICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xuICB9KTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JDcmVhdGlvblwiLCBjcmVhdGVOZXdMaXN0KTtcblB1YlN1Yi5vbihcIkNyZWF0ZURlZmF1bHRMaXN0XCIsIGNyZWF0ZURlZmF1bHRMaXN0KTtcbiIsImNvbnN0IHsgUHViU3ViIH0gPSByZXF1aXJlKFwiLi4vUHViU3ViXCIpO1xuXG5jb25zdCBMSVNUX1JFR0lTVFJZID0gW107XG5sZXQgZGVmYXVsdExpc3RSZWZlcmVuY2UgPSBudWxsO1xuXG5mdW5jdGlvbiBhZGRMaXN0VG9SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkucHVzaChsaXN0KTtcbiAgbGlzdC5pZCA9IExJU1RfUkVHSVNUUlkubGVuZ3RoIC0gMTtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3QsIGxpc3RJZDogTElTVF9SRUdJU1RSWS5sZW5ndGggLSAxIH07XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFJlZ2lzdGVyZWRcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0SWRzKCkge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IExJU1RfUkVHSVNUUlkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaXN0ID0gTElTVF9SRUdJU1RSWVtpXTtcbiAgICBsaXN0LmlkID0gaTtcbiAgICBsaXN0LmRpdi5kYXRhc2V0Lmxpc3RJZCA9IGk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGlzdEZyb21SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkuc3BsaWNlKGxpc3QuaWQsIDEpO1xuICB1cGRhdGVMaXN0SWRzKCk7XG59XG5cbmZ1bmN0aW9uIGVkaXRMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IGVkaXRhYmxlTGlzdCA9IExJU1RfUkVHSVNUUllbbGlzdERhdGEucGF0aC5saXN0SWRdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhsaXN0RGF0YS5kYXRhKSkge1xuICAgIGVkaXRhYmxlTGlzdFtrZXldID0gdmFsdWU7XG4gIH1cbiAgUHViU3ViLmVtaXQoXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlzdFJlZ2lzdHJ5KCkge1xuICBjb25zdCBmdWxsTGlzdFJlZ2lzdHJ5ID0gW2RlZmF1bHRMaXN0UmVmZXJlbmNlLCAuLi5MSVNUX1JFR0lTVFJZXTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UmVnaXN0cnlHZXRzUmV0dXJuZWRcIiwgZnVsbExpc3RSZWdpc3RyeSk7XG59XG5cblB1YlN1Yi5vbihcIkRlZmF1bHRMaXN0UGVuZGluZ1wiLCAobGlzdERhdGEpID0+IHtcbiAgZGVmYXVsdExpc3RSZWZlcmVuY2UgPSBsaXN0RGF0YS5saXN0O1xufSk7XG5QdWJTdWIub24oXCJMaXN0UGVuZGluZ1wiLCBhZGRMaXN0VG9SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JFZGl0aW5nXCIsIGVkaXRMaXN0KTtcblB1YlN1Yi5vbihcIkdldExpc3RSZWdpc3RyeVwiLCBnZXRMaXN0UmVnaXN0cnkpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgREVGQVVMVF9MSVNUX0lEIH0gZnJvbSBcIi4vbGlzdC1jcmVhdG9yXCI7XG5cbmNvbnN0IGxpc3REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0c1wiKTtcblxuZnVuY3Rpb24gcmVuZGVyTGlzdFVwb25DcmVhdGlvbihsaXN0RGF0YSkge1xuICBjb25zdCBsaXN0ID0gbGlzdERhdGEubGlzdDtcblxuICBjb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdERpdi5kYXRhc2V0Lmxpc3RJZCA9IGxpc3REYXRhLmxpc3RJZDtcbiAgbGlzdC5kaXYgPSBsaXN0RGl2O1xuICBsaXN0RGl2LmNsYXNzTGlzdC5hZGQoXCJsaXN0XCIpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdC5jb2xvcjtcblxuICBpZiAobGlzdERhdGEubGlzdElkID09PSBERUZBVUxUX0xJU1RfSUQpIHtcbiAgICBsaXN0RGlzcGxheS5wcmVwZW5kKGxpc3REaXYpO1xuICB9IGVsc2Uge1xuICAgIGxpc3REaXNwbGF5LmFwcGVuZChsaXN0RGl2KTtcbiAgfVxuXG4gIGNvbnN0IGxpc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0Um93LmNsYXNzTGlzdC5hZGQoXCJsaXN0LXJvd1wiKTtcbiAgbGlzdERpdi5hcHBlbmQobGlzdFJvdyk7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxpc3ROYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwibGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0Lm5hbWU7XG4gIGxpc3RSb3cuYXBwZW5kKGxpc3ROYW1lVGV4dCk7XG5cbiAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnMtcm93XCIpO1xuICBsaXN0Um93LmFwcGVuZChidXR0b25zRGl2KTtcblxuICByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KTtcblxuICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgbGlzdERpdi5hcHBlbmQoaHIpO1xuXG4gIGNvbnN0IHRhc2tTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2stc2VjdGlvblwiKTtcbiAgbGlzdERpdi5hcHBlbmQodGFza1NlY3Rpb24pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KSB7XG4gIE9iamVjdC52YWx1ZXMobGlzdC5idXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b25zRGl2LmFwcGVuZChidXR0b24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcFJlbmRlcmluZ0xpc3QobGlzdCkge1xuICBsaXN0LmRpdi5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gcmVyZW5kZXJMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gYFtkYXRhLWxpc3QtaWQ9XCIke2xpc3REYXRhLnBhdGgubGlzdElkfVwiXWA7XG5cbiAgY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdERhdGEuZGF0YS5jb2xvcjtcblxuICBjb25zdCBsaXN0TmFtZVRleHQgPSBsaXN0RGl2LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0RGF0YS5kYXRhLm5hbWU7XG59XG5cblB1YlN1Yi5vbihcIkRlZmF1bHRMaXN0UGVuZGluZ1wiLCByZW5kZXJMaXN0VXBvbkNyZWF0aW9uKTtcblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RlcmVkXCIsIHJlbmRlckxpc3RVcG9uQ3JlYXRpb24pO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCBzdG9wUmVuZGVyaW5nTGlzdCk7XG5QdWJTdWIub24oXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIHJlcmVuZGVyTGlzdCk7XG4iLCJpbXBvcnQgeyBUYXNrQ3JlYXRvciB9IGZyb20gXCIuLi90YXNrTWFuYWdlbWVudC90YXNrLWNyZWF0b3JcIjtcbmltcG9ydCB7IFRhc2tSZWdpc3RyYXIgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1yZWdpc3RyYXJcIjtcbmltcG9ydCB7IFRhc2tSZW5kZXJlciB9IGZyb20gXCIuLi90YXNrTWFuYWdlbWVudC90YXNrLXJlbmRlcmVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFRhc2tIZWxwZXJzKGxpc3QpIHtcbiAgbGlzdC50YXNrQ3JlYXRvciA9IG5ldyBUYXNrQ3JlYXRvcigpO1xuICBsaXN0LnRhc2tSZWdpc3RyYXIgPSBuZXcgVGFza1JlZ2lzdHJhcigpO1xuICBsaXN0LnRhc2tSZW5kZXJlciA9IG5ldyBUYXNrUmVuZGVyZXIobGlzdC5kaXYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXN0YWJsaXNoTmV3VGFzayh0YXNrRGF0YSkge1xuICBpZiAodGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2tEYXRhLnBhcmVudExpc3QsIHRoaXMuaWQpKSB7XG4gICAgY29uc3QgdGFzayA9IHRoaXMudGFza0NyZWF0b3IuY3JlYXRlVGFzayh0YXNrRGF0YSk7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyLnJlZ2lzdGVyVGFzayh0YXNrKTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5yZW5kZXJUYXNrKHRoaXMuZGl2LCB0YXNrKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdFRhc2sodGFza0RhdGEpIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrRGF0YS5wYXRoLmxpc3RJZCwgdGhpcy5pZCkpIHtcbiAgICBjb25zdCBlZGl0ZWRUYXNrID0gdGhpcy50YXNrUmVnaXN0cmFyLmVkaXRUYXNrKHRhc2tEYXRhKTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5yZXJlbmRlclRhc2soZWRpdGVkVGFzayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVRhc2sodGFzaykge1xuICBjb25zb2xlLmxvZyh0YXNrLnBhcmVudExpc3QsIHRoaXMuaWQpO1xuICBpZiAodGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2sucGFyZW50TGlzdCwgdGhpcy5pZCkpIHtcbiAgICB0aGlzLnRhc2tSZWdpc3RyYXIuZGVsZXRlVGFzayh0YXNrKTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5zdG9wUmVuZGVyaW5nVGFzayh0YXNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0YXNrQmVsb25nc1RvVGhpc0xpc3QobGlzdE5hbWVUYXNrSXNMb29raW5nRm9yLCBjdXJyZW50TGlzdE5hbWUpIHtcbiAgcmV0dXJuIGxpc3ROYW1lVGFza0lzTG9va2luZ0ZvciA9PSBjdXJyZW50TGlzdE5hbWU7XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5pbXBvcnQgKiBhcyBsaXN0VXRpbHMgZnJvbSBcIi4vbGlzdC11dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIExpc3Qge1xuICBpZCA9IG51bGw7XG4gIGRpdiA9IG51bGw7XG4gIGJ1dHRvbnMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lIHx8IFwiVW5uYW1lZFwiO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yO1xuXG4gICAgdGhpcy5Tb3J0TGlzdEJ1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgICAgXCJzb3J0XCIsXG4gICAgICBcInNvcnQtYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJTb3J0TGlzdEJ1dHRvblwiXG4gICAgKTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcIitcIiwgXCJhZGQtYnV0dG9uXCIsIHRoaXMsIFwiQWRkVGFza0J1dHRvblwiKTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiTGlzdElkR2V0c1JldHVybmVkXCIsIHRoaXMuaWQpO1xuICAgIH0pO1xuXG4gICAgbGlzdFV0aWxzLnNldHVwVGFza0hlbHBlcnModGhpcyk7XG4gICAgUHViU3ViLm9uKFwiVGFza0lzUmVhZHlGb3JDcmVhdGlvblwiLCBsaXN0VXRpbHMuZXN0YWJsaXNoTmV3VGFzay5iaW5kKHRoaXMpKTtcbiAgICBQdWJTdWIub24oXCJUYXNrSXNSZWFkeUZvckVkaXRpbmdcIiwgbGlzdFV0aWxzLmVkaXRUYXNrLmJpbmQodGhpcykpO1xuICAgIFB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRGVsZXRlVGFza1wiLCBsaXN0VXRpbHMuZGVsZXRlVGFzay5iaW5kKHRoaXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcblxuZXhwb3J0IGNsYXNzIFRhc2tDcmVhdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNyZWF0ZVRhc2sodGFza0RhdGEpIHtcbiAgICByZXR1cm4gbmV3IFRhc2sodGFza0RhdGEpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVGFza1JlZ2lzdHJhciB7XG4gIFRBU0tfUkVHSVNUUlkgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcmVnaXN0ZXJUYXNrKHRhc2spIHtcbiAgICB0aGlzLlRBU0tfUkVHSVNUUlkucHVzaCh0YXNrKTtcbiAgICB0YXNrLmlkID0gdGhpcy5UQVNLX1JFR0lTVFJZLmxlbmd0aCAtIDE7XG4gIH1cblxuICB1cGRhdGVJZHMoKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICB0YXNrLmlkID0gaW5kZXg7XG4gICAgfSk7XG4gIH1cblxuICBlZGl0VGFzayh0YXNrRGF0YSkge1xuICAgIGNvbnN0IGVkaXRhYmxlVGFzayA9IHRoaXMuVEFTS19SRUdJU1RSWVt0YXNrRGF0YS5wYXRoLnRhc2tJZF07XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXModGFza0RhdGEuZGF0YSkpIHtcbiAgICAgIGVkaXRhYmxlVGFza1trZXldID0gdmFsdWU7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGVkaXRhYmxlVGFzaywgZWRpdGFibGVUYXNrLmlkKTtcbiAgICByZXR1cm4gZWRpdGFibGVUYXNrO1xuICB9XG5cbiAgZGVsZXRlVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnNwbGljZSh0YXNrLmlkLCAxKTtcbiAgICB0aGlzLnVwZGF0ZUlkcygpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuVEFTS19SRUdJU1RSWSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUYXNrUmVuZGVyZXIge1xuICBjb25zdHJ1Y3QoKSB7fVxuXG4gIHJlbmRlclRhc2socGFyZW50TGlzdERpdiwgdGFzaykge1xuICAgIGNvbnN0IHBhcmVudExpc3RUYXNrU2VjdGlvbiA9IHBhcmVudExpc3REaXYucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlY3Rpb25cIik7XG5cbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWJhY2tncm91bmRcIik7XG4gICAgcGFyZW50TGlzdFRhc2tTZWN0aW9uLmFwcGVuZCh0YXNrRGl2KTtcbiAgICB0YXNrLmRpdiA9IHRhc2tEaXY7XG5cbiAgICB0YXNrRGl2LmFwcGVuZCh0YXNrLmZpbmlzaFRhc2tDaGVja2JveCk7XG5cbiAgICBjb25zdCB0YXNrTmFtZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrTmFtZVRleHQuY2xhc3NMaXN0LmFkZChcInRhc2stbmFtZVwiKTtcbiAgICB0YXNrTmFtZVRleHQudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG4gICAgdGFza0Rpdi5hcHBlbmQodGFza05hbWVUZXh0KTtcblxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XG4gICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZChcImR1ZS1kYXRlXCIpO1xuICAgIHRhc2tEaXYuYXBwZW5kKHRhc2tEdWVEYXRlKTtcblxuICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnMtcm93XCIpO1xuICAgIHRhc2tEaXYuYXBwZW5kKGJ1dHRvbnNEaXYpO1xuXG4gICAgdGhpcy5yZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKTtcbiAgfVxuXG4gIHJlbmRlclRhc2tCdXR0b25zKGJ1dHRvbnNEaXYsIHRhc2spIHtcbiAgICBPYmplY3QudmFsdWVzKHRhc2suYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b25zRGl2LmFwcGVuZChidXR0b24pO1xuICAgIH0pO1xuICB9XG5cbiAgc3RvcFJlbmRlcmluZ1Rhc2sodGFzaykge1xuICAgIHRhc2suZGl2LnJlbW92ZSgpO1xuICB9XG5cbiAgcmVyZW5kZXJUYXNrKHRhc2spIHtcbiAgICBjb25zdCB0YXNrRGl2ID0gdGFzay5kaXY7XG5cbiAgICBjb25zdCB0YXNrTmFtZVRleHQgPSB0YXNrRGl2LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1uYW1lXCIpO1xuICAgIHRhc2tOYW1lVGV4dC50ZXh0Q29udGVudCA9IHRhc2submFtZTtcblxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gdGFza0Rpdi5xdWVyeVNlbGVjdG9yKFwiLmR1ZS1kYXRlXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuICAgIC8vIGlmIChpc0Z1dHVyZSh0YXNrLmR1ZURhdGUpKSB7XG4gICAgLy8gICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwibm90LXBvc3Rwb25lZFwiKTtcbiAgICAvLyAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5yZW1vdmUoXCJwb3N0cG9uZWRcIik7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJwb3N0cG9uZWRcIik7XG4gICAgLy8gICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QucmVtb3ZlKFwibm90LXBvc3Rwb25lZFwiKTtcbiAgICAvLyB9XG4gIH1cbn1cbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBzZXR1cEJ1dHRvbiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIFRhc2sge1xuICBTVUJUQVNLUyA9IFtdO1xuICBpZCA9IG51bGw7XG4gIGRpdiA9IG51bGw7XG4gIGJ1dHRvbnMgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcih0YXNrRGF0YSkge1xuICAgIHRoaXMubmFtZSA9IHRhc2tEYXRhLm5hbWUgfHwgXCJVbm5hbWVkXCI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhc2tEYXRhLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuZHVlRGF0ZSA9IHRhc2tEYXRhLmR1ZURhdGU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHRhc2tEYXRhLnByaW9yaXR5O1xuICAgIHRoaXMucGFyZW50TGlzdCA9IHRhc2tEYXRhLnBhcmVudExpc3Q7XG5cbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiVGFza0NoZWNrZWRcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBQdWJTdWIuZW1pdChcIlRhc2tVbmNoZWNrZWRcIiwgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLlNob3dUYXNrSW5mb3JtYXRpb25CdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwiaW5mb1wiLFxuICAgICAgXCJpbmZvcm1hdGlvbi1idXR0b25cIixcbiAgICAgIHRoaXMsXG4gICAgICBcIlNob3dUYXNrSW5mb3JtYXRpb25CdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5TaG93VGFza0luZm9ybWF0aW9uQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvU2VlRW50aXR5SW5mb3JtYXRpb25cIiwge1xuICAgICAgICBmb3JtVHlwZTogRk9STV9SRUdJU1RSWS5UYXNrLFxuICAgICAgICBlbnRpdHk6IHRoaXMsXG4gICAgICB9KTtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgICB9KTtcblxuICAgIHRoaXMuRWRpdFRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwiZWRpdFwiLFxuICAgICAgXCJlZGl0LWJ1dHRvblwiLFxuICAgICAgdGhpcyxcbiAgICAgIFwiRWRpdFRhc2tCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHtcbiAgICAgICAgZm9ybVR5cGU6IEZPUk1fUkVHSVNUUlkuVGFzayxcbiAgICAgICAgZW50aXR5OiB0aGlzLFxuICAgICAgfSk7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgfSk7XG5cbiAgICB0aGlzLkRlbGV0ZVRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwieFwiLFxuICAgICAgXCJkZWxldGUtYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJEZWxldGVUYXNrQnV0dG9uXCJcbiAgICApO1xuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0RlbGV0ZVRhc2tcIiwgdGhpcyk7XG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1PcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1mb3JtLW9wZW4tYnV0dG9uXCJcbik7XG5saXN0Rm9ybU9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBsaXN0Rm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5pc2gtbGlzdC1idXR0b25cIik7XG5maW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG59KTtcblxuZXhwb3J0IGNvbnN0IHRhc2tGb3JtQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJ0YXNrLWZvcm0tY2xvc2UtYnV0dG9uXCJcbik7XG50YXNrRm9ybUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGZpbmlzaFVzaW5nVGFza0Zvcm1CdXR0b24gPVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbmlzaC10YXNrLWJ1dHRvblwiKTtcbmZpbmlzaFVzaW5nVGFza0Zvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJVc2VyRmluaXNoZWRVc2luZ0Zvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbn0pO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHNldHVwQnV0dG9uKG5hbWUsIGNsYXNzTmFtZSwgcGFyZW50LCBidXR0b25BcnJheU5hbWUpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gbmFtZTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgcGFyZW50LmJ1dHRvbnNbYnV0dG9uQXJyYXlOYW1lXSA9IGJ1dHRvbjtcbiAgcmV0dXJuIGJ1dHRvbjtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3VuaXF1ZS1idXR0b24tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vbGlzdE1hbmFnZW1lbnQvbGlzdC1idW5kbGVcIjtcbmltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuXG5QdWJTdWIuZW1pdChcIkNyZWF0ZURlZmF1bHRMaXN0XCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9