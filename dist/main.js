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

PubSub.on("OpenForm", openForm);
PubSub.on("CloseForm", closeForm);

PubSub.on("UserFinishedUsingForm", getFormData);
PubSub.on("ListRegistryGetsReturned", setupParentListSelection);
PubSub.on("ListIdGetsReturned", setParentListSelectionToValue);

PubSub.on("UserWantsToEditList", prepareFormForEditingMode);
PubSub.on("UserWantsToEditTask", prepareFormForEditingMode);


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

  const listDiv = list.div;
  listDiv.dataset.listId = listData.listId;
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
  div = document.createElement("div");
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

    const taskDiv = task.div;
    taskDiv.classList.add("task-background");
    parentListTaskSection.append(taskDiv);

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
  div = document.createElement("div");
  buttons = {};

  constructor(taskData) {
    this.name = taskData.name || "Unnamed";
    this.description = taskData.description;
    this.dueDate = taskData.dueDate;
    this.priority = taskData.priority;
    this.parentList = taskData.parentList;

    this.div.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditTask", {
        formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task,
        entity: this,
      });
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
    });

    this.finishTaskCheckbox = document.createElement("input");
    this.finishTaskCheckbox.setAttribute("type", "checkbox");
    this.finishTaskCheckbox.addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskChecked", this);
      } else {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskUnchecked", this);
      }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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N0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDTTtBQUNEO0FBQ0o7O0FBRWxDLDJDQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9QdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtTWFuYWdlbWVudC9mb3JtLXV0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3VuaXF1ZS1idXR0b24tbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBQdWJTdWIgPSAoKCkgPT4ge1xuICBjb25zdCBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkgPSAtMTtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgZnVuY3Rpb24gZGVidWdFdmVudEFubm91bmNlKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtkZWJ1Z10gRVZFTlQgJHtldmVudH0gSVMgQ0FMTEVEYCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2ZW50LCBwYXJhbSA9IG51bGwpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZGVidWdFdmVudEFubm91bmNlKGV2ZW50KTtcbiAgICAgIGZvciAobGV0IGZ1bmMgb2YgZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICBmdW5jKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFRoZXJlIGlzIG5vIGV2ZW50IHdpdGggYSBuYW1lICcke2V2ZW50fSdgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBldmVudHNbZXZlbnRdLnB1c2goZnVuYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50c1tldmVudF0gPSBbZnVuY107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGNvbnN0IGluZGV4T2ZHaXZlbkZ1bmN0aW9uID0gZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZ1bmMpO1xuICAgICAgaWYgKGluZGV4T2ZHaXZlbkZ1bmN0aW9uICE9PSBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkpIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXhPZkdpdmVuRnVuY3Rpb24sIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcbiAgICAgICAgYFRoZXJlIGlzIGVpdGhlciBubyBzdWNoIGV2ZW50ICgke2V2ZW50fSkgcmVnaXN0ZXJlZCwgb3IgeW91ciBmdW5jdGlvbiBpc24ndCBwcmVzZW50IHRoZXJlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBlbWl0LCBvbiwgb2ZmIH07XG59KSgpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5pbXBvcnQgKiBhcyBmb3JtVXRpbHMgZnJvbSBcIi4vZm9ybS11dGlsaXRpZXNcIjtcblxuY29uc3QgTU9ERVMgPSB7IENSRUFUSU9OOiAwLCBFRElUSU5HOiAxLCBJTkZPUk1BVElPTjogMiB9O1xuZXhwb3J0IGNvbnN0IEZPUk1fUkVHSVNUUlkgPSB7fTtcblxuY29uc3QgbGlzdEZvcm0gPSByZWdpc3RlckZvcm0oXCJsaXN0LWZvcm0tYmFja2dyb3VuZFwiLCBcIkxpc3RcIik7XG5jb25zdCB0YXNrRm9ybSA9IHJlZ2lzdGVyRm9ybShcInRhc2stZm9ybS1iYWNrZ3JvdW5kXCIsIFwiVGFza1wiKTtcbmNvbnN0IHBhcmVudExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcmVudExpc3RcIik7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRm9ybShiYWNrZ3JvdW5kSWQsIGNvZGVuYW1lKSB7XG4gIEZPUk1fUkVHSVNUUllbY29kZW5hbWVdID0gY29kZW5hbWU7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmFja2dyb3VuZElkKSxcbiAgICBmb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChiYWNrZ3JvdW5kSWQpLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLFxuICAgIG1vZGU6IE1PREVTLkNSRUFUSU9OLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRGb3JtRGF0YShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcblxuICBjb25zdCBmb3JtSW5wdXREYXRhID0ge307XG4gIEFycmF5LmZyb20od29ya2luZ0Zvcm0uZm9ybS5lbGVtZW50cykuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50Lm5vZGVOYW1lICE9PSBcIkJVVFRPTlwiKSB7XG4gICAgICBjb25zdCBpbnB1dENvbnRlbnRUeXBlID0gZWxlbWVudC5pZDtcbiAgICAgIGZvcm1JbnB1dERhdGFbaW5wdXRDb250ZW50VHlwZV0gPSBmb3JtVXRpbHMudHJpbUlucHV0KGVsZW1lbnQudmFsdWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHBhdGggPSBudWxsO1xuICBpZiAod29ya2luZ0Zvcm0ubW9kZSA9PT0gTU9ERVMuRURJVElORykge1xuICAgIHBhdGggPSBmb3JtVXRpbHMuZ2V0RW50aXR5UGF0aCh3b3JraW5nRm9ybSwgZm9ybVR5cGUpO1xuICB9XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgUHViU3ViLmVtaXQoZm9ybVR5cGUgKyBcIklzUmVhZHlGb3JDcmVhdGlvblwiLCBmb3JtSW5wdXREYXRhKTtcbiAgfSBlbHNlIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgUHViU3ViLmVtaXQoZm9ybVR5cGUgKyBcIklzUmVhZHlGb3JFZGl0aW5nXCIsIHtcbiAgICAgIGRhdGE6IGZvcm1JbnB1dERhdGEsXG4gICAgICBwYXRoLFxuICAgIH0pO1xuICB9XG4gIHJlc2V0Rm9ybShmb3JtVHlwZSk7XG59XG5cbmZ1bmN0aW9uIGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKSB7XG4gIHN3aXRjaCAoZm9ybVR5cGUpIHtcbiAgICBjYXNlIEZPUk1fUkVHSVNUUlkuTGlzdDpcbiAgICAgIHJldHVybiBsaXN0Rm9ybTtcbiAgICBjYXNlIEZPUk1fUkVHSVNUUlkuVGFzazpcbiAgICAgIHJldHVybiB0YXNrRm9ybTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNldEZvcm0oZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucmVzZXQoKTtcbiAgd29ya2luZ0Zvcm0uZm9ybS5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLSR7Zm9ybVR5cGV9LWxpc3QtaWRcIik7XG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5DUkVBVElPTjtcbiAgY29uc3QgZmluaXNoVXNpbmdGb3JtQnV0dG9uID1cbiAgICB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoLWJ1dHRvblwiKTtcbiAgZmluaXNoVXNpbmdGb3JtQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xufVxuXG5mdW5jdGlvbiBvcGVuRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtID09PSB0YXNrRm9ybSkge1xuICAgIFB1YlN1Yi5lbWl0KFwiR2V0TGlzdFJlZ2lzdHJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgIT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cFBhcmVudExpc3RTZWxlY3Rpb24ocmVnaXN0cnkpIHtcbiAgbGV0IHBhcmVudExpc3RDb250ZW50ID0gXCJcIjtcbiAgcmVnaXN0cnkuZm9yRWFjaCgobGlzdCkgPT4ge1xuICAgIHBhcmVudExpc3RDb250ZW50ICs9IGA8b3B0aW9uIHZhbHVlPVwiJHtsaXN0LmlkfVwiPiR7bGlzdC5uYW1lfTwvb3B0aW9uPmA7XG4gIH0pO1xuICBwYXJlbnRMaXN0LmlubmVySFRNTCA9IHBhcmVudExpc3RDb250ZW50O1xufVxuXG5mdW5jdGlvbiBzZXRQYXJlbnRMaXN0U2VsZWN0aW9uVG9WYWx1ZShpZCkge1xuICBwYXJlbnRMaXN0LnZhbHVlID0gaWQ7XG59XG5cbmZ1bmN0aW9uIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUoZGF0YSkge1xuICBjb25zdCBmb3JtVHlwZSA9IGRhdGEuZm9ybVR5cGU7XG4gIGNvbnN0IGVudGl0eSA9IGRhdGEuZW50aXR5O1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgY29uc3QgZGF0YXNldFByb3BlcnR5TmFtZSA9IGBlZGl0YWJsZSR7Zm9ybVR5cGV9SWRgO1xuXG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5FRElUSU5HO1xuICBmb3JtVXRpbHMuc2V0dXBGb3JtSW5wdXRWYWx1ZXMod29ya2luZ0Zvcm0sIGRhdGEuZW50aXR5KTtcblxuICBpZiAoZm9ybVR5cGUgPT09IEZPUk1fUkVHSVNUUlkuTGlzdCkge1xuICAgIHdvcmtpbmdGb3JtLmZvcm0uZGF0YXNldFtkYXRhc2V0UHJvcGVydHlOYW1lXSA9IGVudGl0eS5pZDtcbiAgfSBlbHNlIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5UYXNrKSB7XG4gICAgd29ya2luZ0Zvcm0uZm9ybS5kYXRhc2V0W1xuICAgICAgZGF0YXNldFByb3BlcnR5TmFtZVxuICAgIF0gPSBgJHtlbnRpdHkucGFyZW50TGlzdH06JHtlbnRpdHkuaWR9YDtcbiAgfVxufVxuXG5QdWJTdWIub24oXCJPcGVuRm9ybVwiLCBvcGVuRm9ybSk7XG5QdWJTdWIub24oXCJDbG9zZUZvcm1cIiwgY2xvc2VGb3JtKTtcblxuUHViU3ViLm9uKFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIGdldEZvcm1EYXRhKTtcblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RyeUdldHNSZXR1cm5lZFwiLCBzZXR1cFBhcmVudExpc3RTZWxlY3Rpb24pO1xuUHViU3ViLm9uKFwiTGlzdElkR2V0c1JldHVybmVkXCIsIHNldFBhcmVudExpc3RTZWxlY3Rpb25Ub1ZhbHVlKTtcblxuUHViU3ViLm9uKFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCBwcmVwYXJlRm9ybUZvckVkaXRpbmdNb2RlKTtcblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRWRpdFRhc2tcIiwgcHJlcGFyZUZvcm1Gb3JFZGl0aW5nTW9kZSk7XG4iLCJleHBvcnQgZnVuY3Rpb24gdHJpbUlucHV0KGlucHV0VmFsdWUpIHtcbiAgcmV0dXJuIGlucHV0VmFsdWUudHJpbSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW50aXR5UGF0aCh3b3JraW5nRm9ybSwgZm9ybVR5cGUpIHtcbiAgY29uc3QgZGF0YXNldFF1ZXJ5ID0gYGVkaXRhYmxlJHtmb3JtVHlwZX1JZGA7XG4gIGNvbnN0IGVkaXRhYmxlRW50aXR5SWQgPSB3b3JraW5nRm9ybS5mb3JtLmRhdGFzZXRbZGF0YXNldFF1ZXJ5XTtcbiAgY29uc29sZS5sb2cod29ya2luZ0Zvcm0uZm9ybSk7XG4gIGNvbnN0IHBhdGhBcnJheSA9IGVkaXRhYmxlRW50aXR5SWQuc3BsaXQoXCI6XCIpO1xuICBjb25zdCBwYXRoID0geyBsaXN0SWQ6IHBhdGhBcnJheVswXSwgdGFza0lkOiBwYXRoQXJyYXlbMV0gfTtcbiAgcmV0dXJuIHBhdGg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEZvcm1JbnB1dFZhbHVlcyh3b3JraW5nRm9ybSwgZW50aXR5KSB7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpLmZvckVhY2goKGN1cnJlbnQpID0+IHtcbiAgICBjdXJyZW50LnZhbHVlID0gZW50aXR5W2N1cnJlbnQuaWRdO1xuICB9KTtcbn1cbiIsImltcG9ydCBcIi4vbGlzdC1jcmVhdG9yXCI7XG5pbXBvcnQgXCIuL2xpc3QtcmVnaXN0cmFyXCI7XG5pbXBvcnQgXCIuL2xpc3QtcmVuZGVyZXJcIjtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBzZXR1cEJ1dHRvbiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi9saXN0XCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJU1RfSUQgPSBcIkRFRkFVTFRcIjtcblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdExpc3QoKSB7XG4gIGNvbnN0IGNyZWF0aW9uRGF0YSA9IHsgbmFtZTogXCJEZWZhdWx0XCIsIGNvbG9yOiBcIiNjY2NcIiB9O1xuICBjb25zdCBkZWZhdWx0TGlzdCA9IG5ldyBMaXN0KGNyZWF0aW9uRGF0YSk7XG4gIGRlZmF1bHRMaXN0LmlkID0gREVGQVVMVF9MSVNUX0lEO1xuICBjb25zdCBsaXN0RGF0YSA9IHsgbGlzdDogZGVmYXVsdExpc3QsIGxpc3RJZDogZGVmYXVsdExpc3QuaWQgfTtcbiAgUHViU3ViLmVtaXQoXCJEZWZhdWx0TGlzdFBlbmRpbmdcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdMaXN0KG5ld0RhdGEpIHtcbiAgY29uc3QgbGlzdCA9IG5ldyBMaXN0KG5ld0RhdGEpO1xuICBhZGROb25EZWZhdWx0TGlzdEJ1dHRvbnMobGlzdCk7XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFBlbmRpbmdcIiwgbGlzdCk7XG59XG5cbmZ1bmN0aW9uIGFkZE5vbkRlZmF1bHRMaXN0QnV0dG9ucyhsaXN0KSB7XG4gIGxpc3QuRWRpdExpc3RCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICBcImVkaXRcIixcbiAgICBcImVkaXQtYnV0dG9uXCIsXG4gICAgbGlzdCxcbiAgICBcIkVkaXRMaXN0QnV0dG9uXCJcbiAgKTtcbiAgbGlzdC5FZGl0TGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCB7XG4gICAgICBlbnRpdHk6IGxpc3QsXG4gICAgICBmb3JtVHlwZTogRk9STV9SRUdJU1RSWS5MaXN0LFxuICAgIH0pO1xuICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbiAgfSk7XG5cbiAgbGlzdC5SZW1vdmVMaXN0QnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgXCJ4XCIsXG4gICAgXCJyZW1vdmUtYnV0dG9uXCIsXG4gICAgbGlzdCxcbiAgICBcIlJlbW92ZUxpc3RCdXR0b25cIlxuICApO1xuICBsaXN0LlJlbW92ZUxpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBQdWJTdWIuZW1pdChcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgbGlzdCk7XG4gIH0pO1xufVxuXG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckNyZWF0aW9uXCIsIGNyZWF0ZU5ld0xpc3QpO1xuUHViU3ViLm9uKFwiQ3JlYXRlRGVmYXVsdExpc3RcIiwgY3JlYXRlRGVmYXVsdExpc3QpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5cbmNvbnN0IExJU1RfUkVHSVNUUlkgPSBbXTtcbmxldCBkZWZhdWx0TGlzdFJlZmVyZW5jZSA9IG51bGw7XG5cbmZ1bmN0aW9uIGFkZExpc3RUb1JlZ2lzdHJ5KGxpc3QpIHtcbiAgTElTVF9SRUdJU1RSWS5wdXNoKGxpc3QpO1xuICBsaXN0LmlkID0gTElTVF9SRUdJU1RSWS5sZW5ndGggLSAxO1xuICBjb25zdCBsaXN0RGF0YSA9IHsgbGlzdCwgbGlzdElkOiBMSVNUX1JFR0lTVFJZLmxlbmd0aCAtIDEgfTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UmVnaXN0ZXJlZFwiLCBsaXN0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3RJZHMoKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgTElTVF9SRUdJU1RSWS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxpc3QgPSBMSVNUX1JFR0lTVFJZW2ldO1xuICAgIGxpc3QuaWQgPSBpO1xuICAgIGxpc3QuZGl2LmRhdGFzZXQubGlzdElkID0gaTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KGxpc3QpIHtcbiAgTElTVF9SRUdJU1RSWS5zcGxpY2UobGlzdC5pZCwgMSk7XG4gIHVwZGF0ZUxpc3RJZHMoKTtcbn1cblxuZnVuY3Rpb24gZWRpdExpc3QobGlzdERhdGEpIHtcbiAgY29uc3QgZWRpdGFibGVMaXN0ID0gTElTVF9SRUdJU1RSWVtsaXN0RGF0YS5wYXRoLmxpc3RJZF07XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGxpc3REYXRhLmRhdGEpKSB7XG4gICAgZWRpdGFibGVMaXN0W2tleV0gPSB2YWx1ZTtcbiAgfVxuICBQdWJTdWIuZW1pdChcImxpc3RTaG91bGRCZVJlcmVuZGVyZWRcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiBnZXRMaXN0UmVnaXN0cnkoKSB7XG4gIGNvbnN0IGZ1bGxMaXN0UmVnaXN0cnkgPSBbZGVmYXVsdExpc3RSZWZlcmVuY2UsIC4uLkxJU1RfUkVHSVNUUlldO1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RyeUdldHNSZXR1cm5lZFwiLCBmdWxsTGlzdFJlZ2lzdHJ5KTtcbn1cblxuUHViU3ViLm9uKFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIChsaXN0RGF0YSkgPT4ge1xuICBkZWZhdWx0TGlzdFJlZmVyZW5jZSA9IGxpc3REYXRhLmxpc3Q7XG59KTtcblB1YlN1Yi5vbihcIkxpc3RQZW5kaW5nXCIsIGFkZExpc3RUb1JlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgcmVtb3ZlTGlzdEZyb21SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckVkaXRpbmdcIiwgZWRpdExpc3QpO1xuUHViU3ViLm9uKFwiR2V0TGlzdFJlZ2lzdHJ5XCIsIGdldExpc3RSZWdpc3RyeSk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBERUZBVUxUX0xJU1RfSUQgfSBmcm9tIFwiLi9saXN0LWNyZWF0b3JcIjtcblxuY29uc3QgbGlzdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RzXCIpO1xuXG5mdW5jdGlvbiByZW5kZXJMaXN0VXBvbkNyZWF0aW9uKGxpc3REYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBsaXN0RGF0YS5saXN0O1xuXG4gIGNvbnN0IGxpc3REaXYgPSBsaXN0LmRpdjtcbiAgbGlzdERpdi5kYXRhc2V0Lmxpc3RJZCA9IGxpc3REYXRhLmxpc3RJZDtcbiAgbGlzdERpdi5jbGFzc0xpc3QuYWRkKFwibGlzdFwiKTtcbiAgbGlzdERpdi5zdHlsZS5ib3JkZXJDb2xvciA9IGxpc3QuY29sb3I7XG5cbiAgaWYgKGxpc3REYXRhLmxpc3RJZCA9PT0gREVGQVVMVF9MSVNUX0lEKSB7XG4gICAgbGlzdERpc3BsYXkucHJlcGVuZChsaXN0RGl2KTtcbiAgfSBlbHNlIHtcbiAgICBsaXN0RGlzcGxheS5hcHBlbmQobGlzdERpdik7XG4gIH1cblxuICBjb25zdCBsaXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdFJvdy5jbGFzc0xpc3QuYWRkKFwibGlzdC1yb3dcIik7XG4gIGxpc3REaXYuYXBwZW5kKGxpc3RSb3cpO1xuXG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsaXN0TmFtZVRleHQuY2xhc3NMaXN0LmFkZChcImxpc3QtbmFtZVwiKTtcbiAgbGlzdE5hbWVUZXh0LnRleHRDb250ZW50ID0gbGlzdC5uYW1lO1xuICBsaXN0Um93LmFwcGVuZChsaXN0TmFtZVRleHQpO1xuXG4gIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgbGlzdFJvdy5hcHBlbmQoYnV0dG9uc0Rpdik7XG5cbiAgcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdik7XG5cbiAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gIGxpc3REaXYuYXBwZW5kKGhyKTtcblxuICBjb25zdCB0YXNrU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXNlY3Rpb25cIik7XG4gIGxpc3REaXYuYXBwZW5kKHRhc2tTZWN0aW9uKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdikge1xuICBPYmplY3QudmFsdWVzKGxpc3QuYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uc0Rpdi5hcHBlbmQoYnV0dG9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3BSZW5kZXJpbmdMaXN0KGxpc3QpIHtcbiAgbGlzdC5kaXYucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIHJlcmVuZGVyTGlzdChsaXN0RGF0YSkge1xuICBjb25zdCBxdWVyeSA9IGBbZGF0YS1saXN0LWlkPVwiJHtsaXN0RGF0YS5wYXRoLmxpc3RJZH1cIl1gO1xuXG4gIGNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHF1ZXJ5KTtcbiAgbGlzdERpdi5zdHlsZS5ib3JkZXJDb2xvciA9IGxpc3REYXRhLmRhdGEuY29sb3I7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gbGlzdERpdi5xdWVyeVNlbGVjdG9yKFwiLmxpc3QtbmFtZVwiKTtcbiAgbGlzdE5hbWVUZXh0LnRleHRDb250ZW50ID0gbGlzdERhdGEuZGF0YS5uYW1lO1xufVxuXG5QdWJTdWIub24oXCJEZWZhdWx0TGlzdFBlbmRpbmdcIiwgcmVuZGVyTGlzdFVwb25DcmVhdGlvbik7XG5QdWJTdWIub24oXCJMaXN0UmVnaXN0ZXJlZFwiLCByZW5kZXJMaXN0VXBvbkNyZWF0aW9uKTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgc3RvcFJlbmRlcmluZ0xpc3QpO1xuUHViU3ViLm9uKFwibGlzdFNob3VsZEJlUmVyZW5kZXJlZFwiLCByZXJlbmRlckxpc3QpO1xuIiwiaW1wb3J0IHsgVGFza0NyZWF0b3IgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yXCI7XG5pbXBvcnQgeyBUYXNrUmVnaXN0cmFyIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVnaXN0cmFyXCI7XG5pbXBvcnQgeyBUYXNrUmVuZGVyZXIgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1yZW5kZXJlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUYXNrSGVscGVycyhsaXN0KSB7XG4gIGxpc3QudGFza0NyZWF0b3IgPSBuZXcgVGFza0NyZWF0b3IoKTtcbiAgbGlzdC50YXNrUmVnaXN0cmFyID0gbmV3IFRhc2tSZWdpc3RyYXIoKTtcbiAgbGlzdC50YXNrUmVuZGVyZXIgPSBuZXcgVGFza1JlbmRlcmVyKGxpc3QuZGl2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzdGFibGlzaE5ld1Rhc2sodGFza0RhdGEpIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrRGF0YS5wYXJlbnRMaXN0LCB0aGlzLmlkKSkge1xuICAgIGNvbnN0IHRhc2sgPSB0aGlzLnRhc2tDcmVhdG9yLmNyZWF0ZVRhc2sodGFza0RhdGEpO1xuICAgIHRoaXMudGFza1JlZ2lzdHJhci5yZWdpc3RlclRhc2sodGFzayk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVuZGVyVGFzayh0aGlzLmRpdiwgdGFzayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRUYXNrKHRhc2tEYXRhKSB7XG4gIGlmICh0YXNrQmVsb25nc1RvVGhpc0xpc3QodGFza0RhdGEucGF0aC5saXN0SWQsIHRoaXMuaWQpKSB7XG4gICAgY29uc3QgZWRpdGVkVGFzayA9IHRoaXMudGFza1JlZ2lzdHJhci5lZGl0VGFzayh0YXNrRGF0YSk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVyZW5kZXJUYXNrKGVkaXRlZFRhc2spO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVUYXNrKHRhc2spIHtcbiAgY29uc29sZS5sb2codGFzay5wYXJlbnRMaXN0LCB0aGlzLmlkKTtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrLnBhcmVudExpc3QsIHRoaXMuaWQpKSB7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyLmRlbGV0ZVRhc2sodGFzayk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIuc3RvcFJlbmRlcmluZ1Rhc2sodGFzayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFza0JlbG9uZ3NUb1RoaXNMaXN0KGxpc3ROYW1lVGFza0lzTG9va2luZ0ZvciwgY3VycmVudExpc3ROYW1lKSB7XG4gIHJldHVybiBsaXN0TmFtZVRhc2tJc0xvb2tpbmdGb3IgPT0gY3VycmVudExpc3ROYW1lO1xufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCB7IHNldHVwQnV0dG9uIH0gZnJvbSBcIi4uL3V0aWxpdGllc1wiO1xuaW1wb3J0ICogYXMgbGlzdFV0aWxzIGZyb20gXCIuL2xpc3QtdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0IHtcbiAgaWQgPSBudWxsO1xuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zID0ge307XG5cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvcjtcblxuICAgIHRoaXMuU29ydExpc3RCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwic29ydFwiLFxuICAgICAgXCJzb3J0LWJ1dHRvblwiLFxuICAgICAgdGhpcyxcbiAgICAgIFwiU29ydExpc3RCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uID0gc2V0dXBCdXR0b24oXCIrXCIsIFwiYWRkLWJ1dHRvblwiLCB0aGlzLCBcIkFkZFRhc2tCdXR0b25cIik7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJZEdldHNSZXR1cm5lZFwiLCB0aGlzLmlkKTtcbiAgICB9KTtcblxuICAgIGxpc3RVdGlscy5zZXR1cFRhc2tIZWxwZXJzKHRoaXMpO1xuICAgIFB1YlN1Yi5vbihcIlRhc2tJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgbGlzdFV0aWxzLmVzdGFibGlzaE5ld1Rhc2suYmluZCh0aGlzKSk7XG4gICAgUHViU3ViLm9uKFwiVGFza0lzUmVhZHlGb3JFZGl0aW5nXCIsIGxpc3RVdGlscy5lZGl0VGFzay5iaW5kKHRoaXMpKTtcbiAgICBQdWJTdWIub24oXCJVc2VyV2FudHNUb0RlbGV0ZVRhc2tcIiwgbGlzdFV0aWxzLmRlbGV0ZVRhc2suYmluZCh0aGlzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjcmVhdGVUYXNrKHRhc2tEYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBUYXNrKHRhc2tEYXRhKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRhc2tSZWdpc3RyYXIge1xuICBUQVNLX1JFR0lTVFJZID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnB1c2godGFzayk7XG4gICAgdGFzay5pZCA9IHRoaXMuVEFTS19SRUdJU1RSWS5sZW5ndGggLSAxO1xuICB9XG5cbiAgdXBkYXRlSWRzKCkge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgdGFzay5pZCA9IGluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgZWRpdFRhc2sodGFza0RhdGEpIHtcbiAgICBjb25zdCBlZGl0YWJsZVRhc2sgPSB0aGlzLlRBU0tfUkVHSVNUUllbdGFza0RhdGEucGF0aC50YXNrSWRdO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRhc2tEYXRhLmRhdGEpKSB7XG4gICAgICBlZGl0YWJsZVRhc2tba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhlZGl0YWJsZVRhc2ssIGVkaXRhYmxlVGFzay5pZCk7XG4gICAgcmV0dXJuIGVkaXRhYmxlVGFzaztcbiAgfVxuXG4gIGRlbGV0ZVRhc2sodGFzaykge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5zcGxpY2UodGFzay5pZCwgMSk7XG4gICAgdGhpcy51cGRhdGVJZHMoKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLlRBU0tfUkVHSVNUUlkpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVGFza1JlbmRlcmVyIHtcbiAgY29uc3RydWN0KCkge31cblxuICByZW5kZXJUYXNrKHBhcmVudExpc3REaXYsIHRhc2spIHtcbiAgICBjb25zdCBwYXJlbnRMaXN0VGFza1NlY3Rpb24gPSBwYXJlbnRMaXN0RGl2LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1zZWN0aW9uXCIpO1xuXG4gICAgY29uc3QgdGFza0RpdiA9IHRhc2suZGl2O1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2stYmFja2dyb3VuZFwiKTtcbiAgICBwYXJlbnRMaXN0VGFza1NlY3Rpb24uYXBwZW5kKHRhc2tEaXYpO1xuXG4gICAgdGFza0Rpdi5hcHBlbmQodGFzay5maW5pc2hUYXNrQ2hlY2tib3gpO1xuXG4gICAgY29uc3QgdGFza05hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza05hbWVUZXh0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgdGFza05hbWVUZXh0LnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuICAgIHRhc2tEaXYuYXBwZW5kKHRhc2tOYW1lVGV4dCk7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xuICAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJkdWUtZGF0ZVwiKTtcbiAgICB0YXNrRGl2LmFwcGVuZCh0YXNrRHVlRGF0ZSk7XG5cbiAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgICB0YXNrRGl2LmFwcGVuZChidXR0b25zRGl2KTtcblxuICAgIHRoaXMucmVuZGVyVGFza0J1dHRvbnMoYnV0dG9uc0RpdiwgdGFzayk7XG4gIH1cblxuICByZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0YXNrLmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uc0Rpdi5hcHBlbmQoYnV0dG9uKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0b3BSZW5kZXJpbmdUYXNrKHRhc2spIHtcbiAgICB0YXNrLmRpdi5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlcmVuZGVyVGFzayh0YXNrKSB7XG4gICAgY29uc3QgdGFza0RpdiA9IHRhc2suZGl2O1xuXG4gICAgY29uc3QgdGFza05hbWVUZXh0ID0gdGFza0Rpdi5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbmFtZVwiKTtcbiAgICB0YXNrTmFtZVRleHQudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IHRhc2tEaXYucXVlcnlTZWxlY3RvcihcIi5kdWUtZGF0ZVwiKTtcbiAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcbiAgICAvLyBpZiAoaXNGdXR1cmUodGFzay5kdWVEYXRlKSkge1xuICAgIC8vICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZChcIm5vdC1wb3N0cG9uZWRcIik7XG4gICAgLy8gICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QucmVtb3ZlKFwicG9zdHBvbmVkXCIpO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICB0YXNrRHVlRGF0ZS5jbGFzc0xpc3QuYWRkKFwicG9zdHBvbmVkXCIpO1xuICAgIC8vICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LnJlbW92ZShcIm5vdC1wb3N0cG9uZWRcIik7XG4gICAgLy8gfVxuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgU1VCVEFTS1MgPSBbXTtcbiAgaWQgPSBudWxsO1xuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zID0ge307XG5cbiAgY29uc3RydWN0b3IodGFza0RhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSB0YXNrRGF0YS5uYW1lIHx8IFwiVW5uYW1lZFwiO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YXNrRGF0YS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZURhdGUgPSB0YXNrRGF0YS5kdWVEYXRlO1xuICAgIHRoaXMucHJpb3JpdHkgPSB0YXNrRGF0YS5wcmlvcml0eTtcbiAgICB0aGlzLnBhcmVudExpc3QgPSB0YXNrRGF0YS5wYXJlbnRMaXN0O1xuXG4gICAgdGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0VGFza1wiLCB7XG4gICAgICAgIGZvcm1UeXBlOiBGT1JNX1JFR0lTVFJZLlRhc2ssXG4gICAgICAgIGVudGl0eTogdGhpcyxcbiAgICAgIH0pO1xuICAgICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xuICAgIH0pO1xuXG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIHRoaXMuZmluaXNoVGFza0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICBQdWJTdWIuZW1pdChcIlRhc2tDaGVja2VkXCIsIHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJUYXNrVW5jaGVja2VkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgICAgXCJlZGl0XCIsXG4gICAgICBcImVkaXQtYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJFZGl0VGFza0J1dHRvblwiXG4gICAgKTtcbiAgICB0aGlzLkVkaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdFRhc2tcIiwge1xuICAgICAgICBmb3JtVHlwZTogRk9STV9SRUdJU1RSWS5UYXNrLFxuICAgICAgICBlbnRpdHk6IHRoaXMsXG4gICAgICB9KTtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgICB9KTtcblxuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgICAgXCJ4XCIsXG4gICAgICBcImRlbGV0ZS1idXR0b25cIixcbiAgICAgIHRoaXMsXG4gICAgICBcIkRlbGV0ZVRhc2tCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5EZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRGVsZXRlVGFza1wiLCB0aGlzKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBsaXN0Rm9ybU9wZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJsaXN0LWZvcm0tb3Blbi1idXR0b25cIlxuKTtcbmxpc3RGb3JtT3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JtQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJsaXN0LWZvcm0tY2xvc2UtYnV0dG9uXCJcbik7XG5saXN0Rm9ybUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGZpbmlzaFVzaW5nTGlzdEZvcm1CdXR0b24gPVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbmlzaC1saXN0LWJ1dHRvblwiKTtcbmZpbmlzaFVzaW5nTGlzdEZvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJVc2VyRmluaXNoZWRVc2luZ0Zvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgdGFza0Zvcm1DbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcInRhc2stZm9ybS1jbG9zZS1idXR0b25cIlxuKTtcbnRhc2tGb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZmluaXNoVXNpbmdUYXNrRm9ybUJ1dHRvbiA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluaXNoLXRhc2stYnV0dG9uXCIpO1xuZmluaXNoVXNpbmdUYXNrRm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xufSk7XG4iLCJleHBvcnQgZnVuY3Rpb24gc2V0dXBCdXR0b24obmFtZSwgY2xhc3NOYW1lLCBwYXJlbnQsIGJ1dHRvbkFycmF5TmFtZSkge1xuICBjb25zdCBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICBidXR0b24udGV4dENvbnRlbnQgPSBuYW1lO1xuICBidXR0b24uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICBwYXJlbnQuYnV0dG9uc1tidXR0b25BcnJheU5hbWVdID0gYnV0dG9uO1xuICByZXR1cm4gYnV0dG9uO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZVwiO1xuaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4vUHViU3ViXCI7XG5cblB1YlN1Yi5lbWl0KFwiQ3JlYXRlRGVmYXVsdExpc3RcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=