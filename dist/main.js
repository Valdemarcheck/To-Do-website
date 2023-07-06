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

/***/ "./src/form-manager.js":
/*!*****************************!*\
  !*** ./src/form-manager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FORM_REGISTRY: () => (/* binding */ FORM_REGISTRY)
/* harmony export */ });
const { PubSub } = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");

const MODES = { CREATION: 0, EDITING: 1 };
const FORM_REGISTRY = {};

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


/***/ }),

/***/ "./src/listManagement/default-list.js":
/*!********************************************!*\
  !*** ./src/listManagement/default-list.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DefaultList: () => (/* binding */ DefaultList)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
/* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form-manager */ "./src/form-manager.js");
/* harmony import */ var _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../taskManagement/task-creator */ "./src/taskManagement/task-creator.js");
/* harmony import */ var _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../taskManagement/task-registrar */ "./src/taskManagement/task-registrar.js");
/* harmony import */ var _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../taskManagement/task-renderer */ "./src/taskManagement/task-renderer.js");






class DefaultList {
  id = null;
  div = null;

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = document.createElement("button");
    this.SortListButton.textContent = "sort";

    this.AddTaskButton = document.createElement("button");
    this.AddTaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task);
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListIdGetsReturned", this.id);
    });
    this.AddTaskButton.textContent = "+";

    this.buttons = {
      SortListButton: this.SortListButton,
      AddTaskButton: this.AddTaskButton,
    };

    this.setupTaskHelpers();

    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("TaskIsReadyForCreation", this.establishNewTask.bind(this));
  }

  setupTaskHelpers() {
    this.taskCreator = new _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_2__.TaskCreator();
    this.taskRegistrar = new _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_3__.TaskRegistrar();
    this.taskRenderer = new _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_4__.TaskRenderer(this.div);
  }

  establishNewTask(taskData) {
    if (this.taskBelongsToThisList(taskData.listSelection, this.name)) {
      console.log(`Task belongs to list named ${this.name}`);
      const task = this.taskCreator.createTask(taskData);
      this.taskRegistrar.registerTask(task);
      this.taskRenderer.renderTask(this.div, task);
    }
  }

  taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
    console.log(listNameTaskIsLookingFor, currentListName);
    return listNameTaskIsLookingFor === currentListName;
  }
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
/* harmony import */ var _default_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-list */ "./src/listManagement/default-list.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list */ "./src/listManagement/list.js");




const DEFAULT_LIST_ID = "DEFAULT";

function createDefaultList() {
  const creationData = { name: "Default", color: "#ccc" };
  const defaultList = new _default_list__WEBPACK_IMPORTED_MODULE_1__.DefaultList(creationData);
  defaultList.id = DEFAULT_LIST_ID;
  const listData = { list: defaultList, listId: defaultList.id };
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("DefaultListPending", listData);
}

function createNewList(newData) {
  const list = new _list__WEBPACK_IMPORTED_MODULE_2__.List(newData);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
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
  const editableList = LIST_REGISTRY[listData.id];
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
  const query = `[data-list-id="${listData.id}"]`;

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
/* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../form-manager */ "./src/form-manager.js");
/* harmony import */ var _default_list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-list */ "./src/listManagement/default-list.js");




class List extends _default_list__WEBPACK_IMPORTED_MODULE_2__.DefaultList {
  constructor(data) {
    super(data);
    this.EditListButton = document.createElement("button");
    this.EditListButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditList", this);
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list);
    });
    this.EditListButton.textContent = "edit";

    this.RemoveListButton = document.createElement("button");
    this.RemoveListButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListShouldBeRemoved", this);
    });
    this.RemoveListButton.textContent = "x";

    this.buttons.RemoveListButton = this.RemoveListButton;
    this.buttons.EditListButton = this.EditListButton;
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
    console.log("task registered");
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
    console.log(parentListTaskSection);

    const taskNameText = document.createElement("p");
    taskNameText.textContent = task.name;
    taskDiv.append(taskNameText);

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


class Task {
  SUBTASKS = [];
  constructor(taskData) {
    this.name = taskData.name || "Unnamed";
    this.description = taskData.description;
    this.due = taskData.due;
    this.priority = taskData.priority;
    this.parentList = taskData.parentList;
    this.finishTaskCheckbox = document.createElement("checkbox");
    this.finishTaskCheckbox.addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskChecked", this);
      } else {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskUnchecked", this);
      }
    });
    this.EditTaskButton = document.createElement("button");
    this.EditTaskButton.textContent = "edit";
    this.EditTaskButton.addEventListener("click", () => {
      // PubSub.emit("UserWantsToEditTask", this);
    });
    this.DeleteTaskButton = document.createElement("button");
    this.DeleteTaskButton.textContent = "x";
    this.DeleteTaskButton.addEventListener("click", () => {
      // PubSub.emit("UserWantsToDeleteTask");
    });

    this.buttons = {
      EditTaskButton: this.EditTaskButton,
      DeleteTaskButton: this.DeleteTaskButton,
    };
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
/* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-manager */ "./src/form-manager.js");



const listFormOpenButton = document.getElementById(
  "list-form-open-button"
);
listFormOpenButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list);
});

const listFormCloseButton = document.getElementById(
  "list-form-close-button"
);
listFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list);
});

const finishUsingListFormButton =
  document.getElementById("create-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserFinishedUsingForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list);
});

const taskFormCloseButton = document.getElementById(
  "task-form-close-button"
);
taskFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task);
});

const finishUsingTaskFormButton =
  document.getElementById("create-task-button");
finishUsingTaskFormButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserFinishedUsingForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task);
});


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
/* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-manager */ "./src/form-manager.js");
/* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listManagement/list-bundle */ "./src/listManagement/list-bundle.js");
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");
/* harmony import */ var _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./taskManagement/task-creator */ "./src/taskManagement/task-creator.js");







_PubSub__WEBPACK_IMPORTED_MODULE_3__.PubSub.emit("CreateDefaultList");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ2tDO0FBQ2E7O0FBRXhDO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSxrQkFBa0Isd0RBQWE7QUFDdkMsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU0sbUJBQW1CLHdEQUFhO0FBQ3hDLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSwrQkFBK0Isd0RBQWE7QUFDcEQsRUFBRSwyQ0FBTSxtQkFBbUIsd0RBQWE7QUFDeEMsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU0sbUJBQW1CLHdEQUFhO0FBQ3hDLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSwrQkFBK0Isd0RBQWE7QUFDcEQsRUFBRSwyQ0FBTSxtQkFBbUIsd0RBQWE7QUFDeEMsQ0FBQzs7Ozs7OztVQ3BDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDVDtBQUNjO0FBQ0o7O0FBRUs7O0FBRXZDLDJDQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9QdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9kZWZhdWx0LWxpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVnaXN0cmFyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLXJlZ2lzdHJhci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gIGNvbnN0IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSA9IC0xO1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBmdW5jdGlvbiBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW2RlYnVnXSBFVkVOVCAke2V2ZW50fSBJUyBDQUxMRURgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQsIHBhcmFtID0gbnVsbCkge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpO1xuICAgICAgZm9yIChsZXQgZnVuYyBvZiBldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZ1bmMocGFyYW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgVGhlcmUgaXMgbm8gZXZlbnQgd2l0aCBhIG5hbWUgJyR7ZXZlbnR9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmdW5jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmdW5jXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgY29uc3QgaW5kZXhPZkdpdmVuRnVuY3Rpb24gPSBldmVudHNbZXZlbnRdLmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXhPZkdpdmVuRnVuY3Rpb24gIT09IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSkge1xuICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpbmRleE9mR2l2ZW5GdW5jdGlvbiwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFxuICAgICAgICBgVGhlcmUgaXMgZWl0aGVyIG5vIHN1Y2ggZXZlbnQgKCR7ZXZlbnR9KSByZWdpc3RlcmVkLCBvciB5b3VyIGZ1bmN0aW9uIGlzbid0IHByZXNlbnQgdGhlcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGVtaXQsIG9uLCBvZmYgfTtcbn0pKCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4vUHViU3ViXCIpO1xuXG5jb25zdCBNT0RFUyA9IHsgQ1JFQVRJT046IDAsIEVESVRJTkc6IDEgfTtcbmV4cG9ydCBjb25zdCBGT1JNX1JFR0lTVFJZID0ge307XG5cbmNvbnN0IGxpc3RGb3JtID0gcmVnaXN0ZXJGb3JtKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIiwgXCJsaXN0XCIpO1xuY29uc3QgdGFza0Zvcm0gPSByZWdpc3RlckZvcm0oXCJ0YXNrLWZvcm0tYmFja2dyb3VuZFwiLCBcInRhc2tcIik7XG5jb25zdCBsaXN0U2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0U2VsZWN0aW9uXCIpO1xuXG5mdW5jdGlvbiByZWdpc3RlckZvcm0oYmFja2dyb3VuZElkLCBjb2RlbmFtZSkge1xuICBGT1JNX1JFR0lTVFJZW2NvZGVuYW1lXSA9IGNvZGVuYW1lO1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJhY2tncm91bmRJZCksXG4gICAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmFja2dyb3VuZElkKS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSxcbiAgICBtb2RlOiBNT0RFUy5DUkVBVElPTixcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybURhdGEoZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBjaG9vc2VXb3JraW5nRm9ybShmb3JtVHlwZSk7XG5cbiAgY29uc3QgZm9ybUlucHV0RGF0YSA9IHt9O1xuICBBcnJheS5mcm9tKHdvcmtpbmdGb3JtLmZvcm0uZWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gXCJCVVRUT05cIikge1xuICAgICAgY29uc3QgaW5wdXRDb250ZW50VHlwZSA9IGVsZW1lbnQuaWQ7XG4gICAgICBmb3JtSW5wdXREYXRhW2lucHV0Q29udGVudFR5cGVdID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5saXN0KSB7XG4gICAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgZm9ybUlucHV0RGF0YSk7XG4gICAgfSBlbHNlIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJc1JlYWR5Rm9yRWRpdGluZ1wiLCB7XG4gICAgICAgIGRhdGE6IGZvcm1JbnB1dERhdGEsXG4gICAgICAgIGlkOiB3b3JraW5nRm9ybS5mb3JtLmRhdGFzZXQuZWRpdGFibGVMaXN0SWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybVR5cGUgPT09IEZPUk1fUkVHSVNUUlkudGFzaykge1xuICAgIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5DUkVBVElPTikge1xuICAgICAgUHViU3ViLmVtaXQoXCJUYXNrSXNSZWFkeUZvckNyZWF0aW9uXCIsIGZvcm1JbnB1dERhdGEpO1xuICAgIH1cbiAgfVxuICByZXNldEZvcm0oZm9ybVR5cGUpO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VXb3JraW5nRm9ybShmb3JtVHlwZSkge1xuICBzd2l0Y2ggKGZvcm1UeXBlKSB7XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLmxpc3Q6XG4gICAgICByZXR1cm4gbGlzdEZvcm07XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLnRhc2s6XG4gICAgICByZXR1cm4gdGFza0Zvcm07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRGb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gY2hvb3NlV29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5mb3JtLnJlc2V0KCk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1lZGl0YWJsZS1saXN0LWlkXCIpO1xuICB3b3JraW5nRm9ybS5tb2RlID0gTU9ERVMuQ1JFQVRJT047XG59XG5cbmZ1bmN0aW9uIG9wZW5Gb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gY2hvb3NlV29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgaWYgKHdvcmtpbmdGb3JtID09PSB0YXNrRm9ybSkge1xuICAgIFB1YlN1Yi5lbWl0KFwiR2V0TGlzdFJlZ2lzdHJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGNob29zZVdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgIT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlTGlzdEZvcm1Gb3JFZGl0aW5nKGxpc3QpIHtcbiAgbGlzdEZvcm0ubW9kZSA9IE1PREVTLkVESVRJTkc7XG5cbiAgbGlzdEZvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIikuZm9yRWFjaCgoY3VycmVudCkgPT4ge1xuICAgIGN1cnJlbnQudmFsdWUgPSBsaXN0W2N1cnJlbnQuaWRdO1xuICB9KTtcbiAgbGlzdEZvcm0uZm9ybS5kYXRhc2V0LmVkaXRhYmxlTGlzdElkID0gbGlzdC5pZDtcbn1cblxuZnVuY3Rpb24gc2V0dXBQYXJlbnRMaXN0U2VsZWN0aW9uKHJlZ2lzdHJ5KSB7XG4gIGxldCBsaXN0U2VsZWN0aW9uQ29udGVudCA9IFwiXCI7XG4gIHJlZ2lzdHJ5LmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBsaXN0U2VsZWN0aW9uQ29udGVudCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7bGlzdC5pZH1cIj4ke2xpc3QubmFtZX08L29wdGlvbj5gO1xuICB9KTtcbiAgbGlzdFNlbGVjdGlvbi5pbm5lckhUTUwgPSBsaXN0U2VsZWN0aW9uQ29udGVudDtcbn1cblxuZnVuY3Rpb24gc2V0TGlzdFNlbGVjdGlvblRvVmFsdWUoaWQpIHtcbiAgbGlzdFNlbGVjdGlvbi52YWx1ZSA9IGlkO1xufVxuXG5QdWJTdWIub24oXCJPcGVuRm9ybVwiLCBvcGVuRm9ybSk7XG5QdWJTdWIub24oXCJDbG9zZUZvcm1cIiwgY2xvc2VGb3JtKTtcblB1YlN1Yi5vbihcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBnZXRGb3JtRGF0YSk7XG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0VkaXRMaXN0XCIsIHByZXBhcmVMaXN0Rm9ybUZvckVkaXRpbmcpO1xuXG5QdWJTdWIub24oXCJMaXN0UmVnaXN0cnlHZXRzUmV0dXJuZWRcIiwgc2V0dXBQYXJlbnRMaXN0U2VsZWN0aW9uKTtcblB1YlN1Yi5vbihcIkxpc3RJZEdldHNSZXR1cm5lZFwiLCBzZXRMaXN0U2VsZWN0aW9uVG9WYWx1ZSk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgVGFza0NyZWF0b3IgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yXCI7XG5pbXBvcnQgeyBUYXNrUmVnaXN0cmFyIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVnaXN0cmFyXCI7XG5pbXBvcnQgeyBUYXNrUmVuZGVyZXIgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1yZW5kZXJlclwiO1xuXG5leHBvcnQgY2xhc3MgRGVmYXVsdExpc3Qge1xuICBpZCA9IG51bGw7XG4gIGRpdiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvcjtcblxuICAgIHRoaXMuU29ydExpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuU29ydExpc3RCdXR0b24udGV4dENvbnRlbnQgPSBcInNvcnRcIjtcblxuICAgIHRoaXMuQWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkudGFzayk7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJZEdldHNSZXR1cm5lZFwiLCB0aGlzLmlkKTtcbiAgICB9KTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24udGV4dENvbnRlbnQgPSBcIitcIjtcblxuICAgIHRoaXMuYnV0dG9ucyA9IHtcbiAgICAgIFNvcnRMaXN0QnV0dG9uOiB0aGlzLlNvcnRMaXN0QnV0dG9uLFxuICAgICAgQWRkVGFza0J1dHRvbjogdGhpcy5BZGRUYXNrQnV0dG9uLFxuICAgIH07XG5cbiAgICB0aGlzLnNldHVwVGFza0hlbHBlcnMoKTtcblxuICAgIFB1YlN1Yi5vbihcIlRhc2tJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgdGhpcy5lc3RhYmxpc2hOZXdUYXNrLmJpbmQodGhpcykpO1xuICB9XG5cbiAgc2V0dXBUYXNrSGVscGVycygpIHtcbiAgICB0aGlzLnRhc2tDcmVhdG9yID0gbmV3IFRhc2tDcmVhdG9yKCk7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyID0gbmV3IFRhc2tSZWdpc3RyYXIoKTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlciA9IG5ldyBUYXNrUmVuZGVyZXIodGhpcy5kaXYpO1xuICB9XG5cbiAgZXN0YWJsaXNoTmV3VGFzayh0YXNrRGF0YSkge1xuICAgIGlmICh0aGlzLnRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrRGF0YS5saXN0U2VsZWN0aW9uLCB0aGlzLm5hbWUpKSB7XG4gICAgICBjb25zb2xlLmxvZyhgVGFzayBiZWxvbmdzIHRvIGxpc3QgbmFtZWQgJHt0aGlzLm5hbWV9YCk7XG4gICAgICBjb25zdCB0YXNrID0gdGhpcy50YXNrQ3JlYXRvci5jcmVhdGVUYXNrKHRhc2tEYXRhKTtcbiAgICAgIHRoaXMudGFza1JlZ2lzdHJhci5yZWdpc3RlclRhc2sodGFzayk7XG4gICAgICB0aGlzLnRhc2tSZW5kZXJlci5yZW5kZXJUYXNrKHRoaXMuZGl2LCB0YXNrKTtcbiAgICB9XG4gIH1cblxuICB0YXNrQmVsb25nc1RvVGhpc0xpc3QobGlzdE5hbWVUYXNrSXNMb29raW5nRm9yLCBjdXJyZW50TGlzdE5hbWUpIHtcbiAgICBjb25zb2xlLmxvZyhsaXN0TmFtZVRhc2tJc0xvb2tpbmdGb3IsIGN1cnJlbnRMaXN0TmFtZSk7XG4gICAgcmV0dXJuIGxpc3ROYW1lVGFza0lzTG9va2luZ0ZvciA9PT0gY3VycmVudExpc3ROYW1lO1xuICB9XG59XG4iLCJpbXBvcnQgXCIuL2xpc3QtY3JlYXRvclwiO1xuaW1wb3J0IFwiLi9saXN0LXJlZ2lzdHJhclwiO1xuaW1wb3J0IFwiLi9saXN0LXJlbmRlcmVyXCI7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBEZWZhdWx0TGlzdCB9IGZyb20gXCIuL2RlZmF1bHQtbGlzdFwiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2xpc3RcIjtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElTVF9JRCA9IFwiREVGQVVMVFwiO1xuXG5mdW5jdGlvbiBjcmVhdGVEZWZhdWx0TGlzdCgpIHtcbiAgY29uc3QgY3JlYXRpb25EYXRhID0geyBuYW1lOiBcIkRlZmF1bHRcIiwgY29sb3I6IFwiI2NjY1wiIH07XG4gIGNvbnN0IGRlZmF1bHRMaXN0ID0gbmV3IERlZmF1bHRMaXN0KGNyZWF0aW9uRGF0YSk7XG4gIGRlZmF1bHRMaXN0LmlkID0gREVGQVVMVF9MSVNUX0lEO1xuICBjb25zdCBsaXN0RGF0YSA9IHsgbGlzdDogZGVmYXVsdExpc3QsIGxpc3RJZDogZGVmYXVsdExpc3QuaWQgfTtcbiAgUHViU3ViLmVtaXQoXCJEZWZhdWx0TGlzdFBlbmRpbmdcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdMaXN0KG5ld0RhdGEpIHtcbiAgY29uc3QgbGlzdCA9IG5ldyBMaXN0KG5ld0RhdGEpO1xuICBQdWJTdWIuZW1pdChcIkxpc3RQZW5kaW5nXCIsIGxpc3QpO1xufVxuXG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckNyZWF0aW9uXCIsIGNyZWF0ZU5ld0xpc3QpO1xuUHViU3ViLm9uKFwiQ3JlYXRlRGVmYXVsdExpc3RcIiwgY3JlYXRlRGVmYXVsdExpc3QpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5cbmNvbnN0IExJU1RfUkVHSVNUUlkgPSBbXTtcbmxldCBkZWZhdWx0TGlzdFJlZmVyZW5jZSA9IG51bGw7XG5cbmZ1bmN0aW9uIGFkZExpc3RUb1JlZ2lzdHJ5KGxpc3QpIHtcbiAgTElTVF9SRUdJU1RSWS5wdXNoKGxpc3QpO1xuICBsaXN0LmlkID0gTElTVF9SRUdJU1RSWS5sZW5ndGggLSAxO1xuICBjb25zdCBsaXN0RGF0YSA9IHsgbGlzdCwgbGlzdElkOiBMSVNUX1JFR0lTVFJZLmxlbmd0aCAtIDEgfTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UmVnaXN0ZXJlZFwiLCBsaXN0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3RJZHMoKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgTElTVF9SRUdJU1RSWS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxpc3QgPSBMSVNUX1JFR0lTVFJZW2ldO1xuICAgIGxpc3QuaWQgPSBpO1xuICAgIGxpc3QuZGl2LmRhdGFzZXQubGlzdElkID0gaTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KGxpc3QpIHtcbiAgTElTVF9SRUdJU1RSWS5zcGxpY2UobGlzdC5pZCwgMSk7XG4gIHVwZGF0ZUxpc3RJZHMoKTtcbn1cblxuZnVuY3Rpb24gZWRpdExpc3QobGlzdERhdGEpIHtcbiAgY29uc3QgZWRpdGFibGVMaXN0ID0gTElTVF9SRUdJU1RSWVtsaXN0RGF0YS5pZF07XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGxpc3REYXRhLmRhdGEpKSB7XG4gICAgZWRpdGFibGVMaXN0W2tleV0gPSB2YWx1ZTtcbiAgfVxuICBQdWJTdWIuZW1pdChcImxpc3RTaG91bGRCZVJlcmVuZGVyZWRcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiBnZXRMaXN0UmVnaXN0cnkoKSB7XG4gIGNvbnN0IGZ1bGxMaXN0UmVnaXN0cnkgPSBbZGVmYXVsdExpc3RSZWZlcmVuY2UsIC4uLkxJU1RfUkVHSVNUUlldO1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RyeUdldHNSZXR1cm5lZFwiLCBmdWxsTGlzdFJlZ2lzdHJ5KTtcbn1cblxuUHViU3ViLm9uKFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIChsaXN0RGF0YSkgPT4ge1xuICBkZWZhdWx0TGlzdFJlZmVyZW5jZSA9IGxpc3REYXRhLmxpc3Q7XG59KTtcblB1YlN1Yi5vbihcIkxpc3RQZW5kaW5nXCIsIGFkZExpc3RUb1JlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgcmVtb3ZlTGlzdEZyb21SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckVkaXRpbmdcIiwgZWRpdExpc3QpO1xuUHViU3ViLm9uKFwiR2V0TGlzdFJlZ2lzdHJ5XCIsIGdldExpc3RSZWdpc3RyeSk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBERUZBVUxUX0xJU1RfSUQgfSBmcm9tIFwiLi9saXN0LWNyZWF0b3JcIjtcblxuY29uc3QgbGlzdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RzXCIpO1xuXG5mdW5jdGlvbiByZW5kZXJMaXN0VXBvbkNyZWF0aW9uKGxpc3REYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBsaXN0RGF0YS5saXN0O1xuXG4gIGNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0RGl2LmRhdGFzZXQubGlzdElkID0gbGlzdERhdGEubGlzdElkO1xuICBsaXN0LmRpdiA9IGxpc3REaXY7XG4gIGxpc3REaXYuY2xhc3NMaXN0LmFkZChcImxpc3RcIik7XG4gIGxpc3REaXYuc3R5bGUuYm9yZGVyQ29sb3IgPSBsaXN0LmNvbG9yO1xuXG4gIGlmIChsaXN0RGF0YS5saXN0SWQgPT09IERFRkFVTFRfTElTVF9JRCkge1xuICAgIGxpc3REaXNwbGF5LnByZXBlbmQobGlzdERpdik7XG4gIH0gZWxzZSB7XG4gICAgbGlzdERpc3BsYXkuYXBwZW5kKGxpc3REaXYpO1xuICB9XG5cbiAgY29uc3QgbGlzdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxpc3RSb3cuY2xhc3NMaXN0LmFkZChcImxpc3Qtcm93XCIpO1xuICBsaXN0RGl2LmFwcGVuZChsaXN0Um93KTtcblxuICBjb25zdCBsaXN0TmFtZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGlzdE5hbWVUZXh0LmNsYXNzTGlzdC5hZGQoXCJsaXN0LW5hbWVcIik7XG4gIGxpc3ROYW1lVGV4dC50ZXh0Q29udGVudCA9IGxpc3QubmFtZTtcbiAgbGlzdFJvdy5hcHBlbmQobGlzdE5hbWVUZXh0KTtcblxuICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9ucy1yb3dcIik7XG4gIGxpc3RSb3cuYXBwZW5kKGJ1dHRvbnNEaXYpO1xuXG4gIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpO1xuXG4gIGNvbnN0IGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICBsaXN0RGl2LmFwcGVuZChocik7XG5cbiAgY29uc3QgdGFza1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0YXNrU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1zZWN0aW9uXCIpO1xuICBsaXN0RGl2LmFwcGVuZCh0YXNrU2VjdGlvbik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpIHtcbiAgT2JqZWN0LnZhbHVlcyhsaXN0LmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbnNEaXYuYXBwZW5kKGJ1dHRvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wUmVuZGVyaW5nTGlzdChsaXN0KSB7XG4gIGxpc3QuZGl2LnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiByZXJlbmRlckxpc3QobGlzdERhdGEpIHtcbiAgY29uc3QgcXVlcnkgPSBgW2RhdGEtbGlzdC1pZD1cIiR7bGlzdERhdGEuaWR9XCJdYDtcblxuICBjb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gIGxpc3REaXYuc3R5bGUuYm9yZGVyQ29sb3IgPSBsaXN0RGF0YS5kYXRhLmNvbG9yO1xuXG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGxpc3REaXYucXVlcnlTZWxlY3RvcihcIi5saXN0LW5hbWVcIik7XG4gIGxpc3ROYW1lVGV4dC50ZXh0Q29udGVudCA9IGxpc3REYXRhLmRhdGEubmFtZTtcbn1cblxuUHViU3ViLm9uKFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIHJlbmRlckxpc3RVcG9uQ3JlYXRpb24pO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdGVyZWRcIiwgcmVuZGVyTGlzdFVwb25DcmVhdGlvbik7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHN0b3BSZW5kZXJpbmdMaXN0KTtcblB1YlN1Yi5vbihcImxpc3RTaG91bGRCZVJlcmVuZGVyZWRcIiwgcmVyZW5kZXJMaXN0KTtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi4vZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBEZWZhdWx0TGlzdCB9IGZyb20gXCIuL2RlZmF1bHQtbGlzdFwiO1xuXG5leHBvcnQgY2xhc3MgTGlzdCBleHRlbmRzIERlZmF1bHRMaXN0IHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHN1cGVyKGRhdGEpO1xuICAgIHRoaXMuRWRpdExpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuRWRpdExpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCB0aGlzKTtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5saXN0KTtcbiAgICB9KTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJlZGl0XCI7XG5cbiAgICB0aGlzLlJlbW92ZUxpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHRoaXMpO1xuICAgIH0pO1xuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwieFwiO1xuXG4gICAgdGhpcy5idXR0b25zLlJlbW92ZUxpc3RCdXR0b24gPSB0aGlzLlJlbW92ZUxpc3RCdXR0b247XG4gICAgdGhpcy5idXR0b25zLkVkaXRMaXN0QnV0dG9uID0gdGhpcy5FZGl0TGlzdEJ1dHRvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcblxuZXhwb3J0IGNsYXNzIFRhc2tDcmVhdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNyZWF0ZVRhc2sodGFza0RhdGEpIHtcbiAgICByZXR1cm4gbmV3IFRhc2sodGFza0RhdGEpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgVGFza1JlZ2lzdHJhciB7XG4gIFRBU0tfUkVHSVNUUlkgPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgcmVnaXN0ZXJUYXNrKHRhc2spIHtcbiAgICB0aGlzLlRBU0tfUkVHSVNUUlkucHVzaCh0YXNrKTtcbiAgICBjb25zb2xlLmxvZyhcInRhc2sgcmVnaXN0ZXJlZFwiKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRhc2tSZW5kZXJlciB7XG4gIGNvbnN0cnVjdCgpIHt9XG5cbiAgcmVuZGVyVGFzayhwYXJlbnRMaXN0RGl2LCB0YXNrKSB7XG4gICAgY29uc3QgcGFyZW50TGlzdFRhc2tTZWN0aW9uID0gcGFyZW50TGlzdERpdi5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VjdGlvblwiKTtcblxuICAgIGNvbnN0IHRhc2tEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInRhc2stYmFja2dyb3VuZFwiKTtcbiAgICBwYXJlbnRMaXN0VGFza1NlY3Rpb24uYXBwZW5kKHRhc2tEaXYpO1xuICAgIGNvbnNvbGUubG9nKHBhcmVudExpc3RUYXNrU2VjdGlvbik7XG5cbiAgICBjb25zdCB0YXNrTmFtZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICB0YXNrTmFtZVRleHQudGV4dENvbnRlbnQgPSB0YXNrLm5hbWU7XG4gICAgdGFza0Rpdi5hcHBlbmQodGFza05hbWVUZXh0KTtcblxuICAgIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnMtcm93XCIpO1xuICAgIHRhc2tEaXYuYXBwZW5kKGJ1dHRvbnNEaXYpO1xuXG4gICAgdGhpcy5yZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKTtcbiAgfVxuXG4gIHJlbmRlclRhc2tCdXR0b25zKGJ1dHRvbnNEaXYsIHRhc2spIHtcbiAgICBPYmplY3QudmFsdWVzKHRhc2suYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b25zRGl2LmFwcGVuZChidXR0b24pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgU1VCVEFTS1MgPSBbXTtcbiAgY29uc3RydWN0b3IodGFza0RhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSB0YXNrRGF0YS5uYW1lIHx8IFwiVW5uYW1lZFwiO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YXNrRGF0YS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLmR1ZSA9IHRhc2tEYXRhLmR1ZTtcbiAgICB0aGlzLnByaW9yaXR5ID0gdGFza0RhdGEucHJpb3JpdHk7XG4gICAgdGhpcy5wYXJlbnRMaXN0ID0gdGFza0RhdGEucGFyZW50TGlzdDtcbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjaGVja2JveFwiKTtcbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJUYXNrQ2hlY2tlZFwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiVGFza1VuY2hlY2tlZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLkVkaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkVkaXRUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gXCJlZGl0XCI7XG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgLy8gUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHRoaXMpO1xuICAgIH0pO1xuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5EZWxldGVUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gICAgdGhpcy5EZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAvLyBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRGVsZXRlVGFza1wiKTtcbiAgICB9KTtcblxuICAgIHRoaXMuYnV0dG9ucyA9IHtcbiAgICAgIEVkaXRUYXNrQnV0dG9uOiB0aGlzLkVkaXRUYXNrQnV0dG9uLFxuICAgICAgRGVsZXRlVGFza0J1dHRvbjogdGhpcy5EZWxldGVUYXNrQnV0dG9uLFxuICAgIH07XG4gIH1cbn1cbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuL2Zvcm0tbWFuYWdlclwiO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1PcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1mb3JtLW9wZW4tYnV0dG9uXCJcbik7XG5saXN0Rm9ybU9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLmxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBsaXN0Rm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLmxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtbGlzdC1idXR0b25cIik7XG5maW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkubGlzdCk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkubGlzdCk7XG59KTtcblxuZXhwb3J0IGNvbnN0IHRhc2tGb3JtQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJ0YXNrLWZvcm0tY2xvc2UtYnV0dG9uXCJcbik7XG50YXNrRm9ybUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkudGFzayk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGZpbmlzaFVzaW5nVGFza0Zvcm1CdXR0b24gPVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZS10YXNrLWJ1dHRvblwiKTtcbmZpbmlzaFVzaW5nVGFza0Zvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJVc2VyRmluaXNoZWRVc2luZ0Zvcm1cIiwgRk9STV9SRUdJU1RSWS50YXNrKTtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS50YXNrKTtcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZVwiO1xuaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4vUHViU3ViXCI7XG5cbmltcG9ydCBcIi4vdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yXCI7XG5cblB1YlN1Yi5lbWl0KFwiQ3JlYXRlRGVmYXVsdExpc3RcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=