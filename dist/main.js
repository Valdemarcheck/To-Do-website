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

function setupparentList(registry) {
  let parentListContent = "";
  registry.forEach((list) => {
    parentListContent += `<option data-list-id="${list.id}">${list.name}</option>`;
  });
  parentList.innerHTML = parentListContent;
}

PubSub.on("OpenForm", openForm);
PubSub.on("CloseForm", closeForm);
PubSub.on("UserFinishedUsingForm", getFormData);
PubSub.on("UserWantsToEditList", prepareListFormForEditing);

PubSub.on("ListRegistryGetsReturned", setupparentList);


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
    if (this.taskBelongsToThisList(taskData.parentList, this.name)) {
      console.log(`Task belongs to list named ${this.name}`);
      const task = this.taskCreator.createTask(taskData);
      this.taskRegistrar.registerTask(task);
      this.taskRenderer.renderTask(this.div, task);
    }
  }

  taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQ2tDO0FBQ2E7O0FBRXhDO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSxrQkFBa0Isd0RBQWE7QUFDdkMsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU0sbUJBQW1CLHdEQUFhO0FBQ3hDLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSwrQkFBK0Isd0RBQWE7QUFDcEQsRUFBRSwyQ0FBTSxtQkFBbUIsd0RBQWE7QUFDeEMsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU0sbUJBQW1CLHdEQUFhO0FBQ3hDLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0EsRUFBRSwyQ0FBTSwrQkFBK0Isd0RBQWE7QUFDcEQsRUFBRSwyQ0FBTSxtQkFBbUIsd0RBQWE7QUFDeEMsQ0FBQzs7Ozs7OztVQ3BDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDVDtBQUNjO0FBQ0o7O0FBRUs7O0FBRXZDLDJDQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9QdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9kZWZhdWx0LWxpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVnaXN0cmFyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLXJlZ2lzdHJhci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gIGNvbnN0IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSA9IC0xO1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBmdW5jdGlvbiBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW2RlYnVnXSBFVkVOVCAke2V2ZW50fSBJUyBDQUxMRURgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQsIHBhcmFtID0gbnVsbCkge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpO1xuICAgICAgZm9yIChsZXQgZnVuYyBvZiBldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZ1bmMocGFyYW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgVGhlcmUgaXMgbm8gZXZlbnQgd2l0aCBhIG5hbWUgJyR7ZXZlbnR9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmdW5jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmdW5jXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgY29uc3QgaW5kZXhPZkdpdmVuRnVuY3Rpb24gPSBldmVudHNbZXZlbnRdLmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXhPZkdpdmVuRnVuY3Rpb24gIT09IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSkge1xuICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpbmRleE9mR2l2ZW5GdW5jdGlvbiwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFxuICAgICAgICBgVGhlcmUgaXMgZWl0aGVyIG5vIHN1Y2ggZXZlbnQgKCR7ZXZlbnR9KSByZWdpc3RlcmVkLCBvciB5b3VyIGZ1bmN0aW9uIGlzbid0IHByZXNlbnQgdGhlcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGVtaXQsIG9uLCBvZmYgfTtcbn0pKCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4vUHViU3ViXCIpO1xuXG5jb25zdCBNT0RFUyA9IHsgQ1JFQVRJT046IDAsIEVESVRJTkc6IDEgfTtcbmV4cG9ydCBjb25zdCBGT1JNX1JFR0lTVFJZID0ge307XG5cbmNvbnN0IGxpc3RGb3JtID0gcmVnaXN0ZXJGb3JtKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIiwgXCJsaXN0XCIpO1xuY29uc3QgdGFza0Zvcm0gPSByZWdpc3RlckZvcm0oXCJ0YXNrLWZvcm0tYmFja2dyb3VuZFwiLCBcInRhc2tcIik7XG5jb25zdCBwYXJlbnRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXJlbnRMaXN0XCIpO1xuXG5mdW5jdGlvbiByZWdpc3RlckZvcm0oYmFja2dyb3VuZElkLCBjb2RlbmFtZSkge1xuICBGT1JNX1JFR0lTVFJZW2NvZGVuYW1lXSA9IGNvZGVuYW1lO1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJhY2tncm91bmRJZCksXG4gICAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmFja2dyb3VuZElkKS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSxcbiAgICBtb2RlOiBNT0RFUy5DUkVBVElPTixcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybURhdGEoZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBjaG9vc2VXb3JraW5nRm9ybShmb3JtVHlwZSk7XG5cbiAgY29uc3QgZm9ybUlucHV0RGF0YSA9IHt9O1xuICBBcnJheS5mcm9tKHdvcmtpbmdGb3JtLmZvcm0uZWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gXCJCVVRUT05cIikge1xuICAgICAgY29uc3QgaW5wdXRDb250ZW50VHlwZSA9IGVsZW1lbnQuaWQ7XG4gICAgICBmb3JtSW5wdXREYXRhW2lucHV0Q29udGVudFR5cGVdID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5saXN0KSB7XG4gICAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgZm9ybUlucHV0RGF0YSk7XG4gICAgfSBlbHNlIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJc1JlYWR5Rm9yRWRpdGluZ1wiLCB7XG4gICAgICAgIGRhdGE6IGZvcm1JbnB1dERhdGEsXG4gICAgICAgIGlkOiB3b3JraW5nRm9ybS5mb3JtLmRhdGFzZXQuZWRpdGFibGVMaXN0SWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybVR5cGUgPT09IEZPUk1fUkVHSVNUUlkudGFzaykge1xuICAgIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5DUkVBVElPTikge1xuICAgICAgUHViU3ViLmVtaXQoXCJUYXNrSXNSZWFkeUZvckNyZWF0aW9uXCIsIGZvcm1JbnB1dERhdGEpO1xuICAgIH1cbiAgfVxuICByZXNldEZvcm0oZm9ybVR5cGUpO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VXb3JraW5nRm9ybShmb3JtVHlwZSkge1xuICBzd2l0Y2ggKGZvcm1UeXBlKSB7XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLmxpc3Q6XG4gICAgICByZXR1cm4gbGlzdEZvcm07XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLnRhc2s6XG4gICAgICByZXR1cm4gdGFza0Zvcm07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRGb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gY2hvb3NlV29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5mb3JtLnJlc2V0KCk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1lZGl0YWJsZS1saXN0LWlkXCIpO1xuICB3b3JraW5nRm9ybS5tb2RlID0gTU9ERVMuQ1JFQVRJT047XG59XG5cbmZ1bmN0aW9uIG9wZW5Gb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gY2hvb3NlV29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgaWYgKHdvcmtpbmdGb3JtID09PSB0YXNrRm9ybSkge1xuICAgIFB1YlN1Yi5lbWl0KFwiR2V0TGlzdFJlZ2lzdHJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGNob29zZVdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgIT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlTGlzdEZvcm1Gb3JFZGl0aW5nKGxpc3QpIHtcbiAgbGlzdEZvcm0ubW9kZSA9IE1PREVTLkVESVRJTkc7XG5cbiAgbGlzdEZvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIikuZm9yRWFjaCgoY3VycmVudCkgPT4ge1xuICAgIGN1cnJlbnQudmFsdWUgPSBsaXN0W2N1cnJlbnQuaWRdO1xuICB9KTtcbiAgbGlzdEZvcm0uZm9ybS5kYXRhc2V0LmVkaXRhYmxlTGlzdElkID0gbGlzdC5pZDtcbn1cblxuZnVuY3Rpb24gc2V0dXBwYXJlbnRMaXN0KHJlZ2lzdHJ5KSB7XG4gIGxldCBwYXJlbnRMaXN0Q29udGVudCA9IFwiXCI7XG4gIHJlZ2lzdHJ5LmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBwYXJlbnRMaXN0Q29udGVudCArPSBgPG9wdGlvbiBkYXRhLWxpc3QtaWQ9XCIke2xpc3QuaWR9XCI+JHtsaXN0Lm5hbWV9PC9vcHRpb24+YDtcbiAgfSk7XG4gIHBhcmVudExpc3QuaW5uZXJIVE1MID0gcGFyZW50TGlzdENvbnRlbnQ7XG59XG5cblB1YlN1Yi5vbihcIk9wZW5Gb3JtXCIsIG9wZW5Gb3JtKTtcblB1YlN1Yi5vbihcIkNsb3NlRm9ybVwiLCBjbG9zZUZvcm0pO1xuUHViU3ViLm9uKFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIGdldEZvcm1EYXRhKTtcblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgcHJlcGFyZUxpc3RGb3JtRm9yRWRpdGluZyk7XG5cblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RyeUdldHNSZXR1cm5lZFwiLCBzZXR1cHBhcmVudExpc3QpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuLi9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCB7IFRhc2tDcmVhdG9yIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stY3JlYXRvclwiO1xuaW1wb3J0IHsgVGFza1JlZ2lzdHJhciB9IGZyb20gXCIuLi90YXNrTWFuYWdlbWVudC90YXNrLXJlZ2lzdHJhclwiO1xuaW1wb3J0IHsgVGFza1JlbmRlcmVyIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVuZGVyZXJcIjtcblxuZXhwb3J0IGNsYXNzIERlZmF1bHRMaXN0IHtcbiAgaWQgPSBudWxsO1xuICBkaXYgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWUgfHwgXCJVbm5hbWVkXCI7XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG5cbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJzb3J0XCI7XG5cbiAgICB0aGlzLkFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuQWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLnRhc2spO1xuICAgIH0pO1xuICAgIHRoaXMuQWRkVGFza0J1dHRvbi50ZXh0Q29udGVudCA9IFwiK1wiO1xuXG4gICAgdGhpcy5idXR0b25zID0ge1xuICAgICAgU29ydExpc3RCdXR0b246IHRoaXMuU29ydExpc3RCdXR0b24sXG4gICAgICBBZGRUYXNrQnV0dG9uOiB0aGlzLkFkZFRhc2tCdXR0b24sXG4gICAgfTtcblxuICAgIHRoaXMuc2V0dXBUYXNrSGVscGVycygpO1xuXG4gICAgUHViU3ViLm9uKFwiVGFza0lzUmVhZHlGb3JDcmVhdGlvblwiLCB0aGlzLmVzdGFibGlzaE5ld1Rhc2suYmluZCh0aGlzKSk7XG4gIH1cblxuICBzZXR1cFRhc2tIZWxwZXJzKCkge1xuICAgIHRoaXMudGFza0NyZWF0b3IgPSBuZXcgVGFza0NyZWF0b3IoKTtcbiAgICB0aGlzLnRhc2tSZWdpc3RyYXIgPSBuZXcgVGFza1JlZ2lzdHJhcigpO1xuICAgIHRoaXMudGFza1JlbmRlcmVyID0gbmV3IFRhc2tSZW5kZXJlcih0aGlzLmRpdik7XG4gIH1cblxuICBlc3RhYmxpc2hOZXdUYXNrKHRhc2tEYXRhKSB7XG4gICAgaWYgKHRoaXMudGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2tEYXRhLnBhcmVudExpc3QsIHRoaXMubmFtZSkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBUYXNrIGJlbG9uZ3MgdG8gbGlzdCBuYW1lZCAke3RoaXMubmFtZX1gKTtcbiAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLnRhc2tDcmVhdG9yLmNyZWF0ZVRhc2sodGFza0RhdGEpO1xuICAgICAgdGhpcy50YXNrUmVnaXN0cmFyLnJlZ2lzdGVyVGFzayh0YXNrKTtcbiAgICAgIHRoaXMudGFza1JlbmRlcmVyLnJlbmRlclRhc2sodGhpcy5kaXYsIHRhc2spO1xuICAgIH1cbiAgfVxuXG4gIHRhc2tCZWxvbmdzVG9UaGlzTGlzdChsaXN0TmFtZVRhc2tJc0xvb2tpbmdGb3IsIGN1cnJlbnRMaXN0TmFtZSkge1xuICAgIHJldHVybiBsaXN0TmFtZVRhc2tJc0xvb2tpbmdGb3IgPT09IGN1cnJlbnRMaXN0TmFtZTtcbiAgfVxufVxuIiwiaW1wb3J0IFwiLi9saXN0LWNyZWF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZWdpc3RyYXJcIjtcbmltcG9ydCBcIi4vbGlzdC1yZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRGVmYXVsdExpc3QgfSBmcm9tIFwiLi9kZWZhdWx0LWxpc3RcIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi9saXN0XCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJU1RfSUQgPSBcIkRFRkFVTFRcIjtcblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdExpc3QoKSB7XG4gIGNvbnN0IGNyZWF0aW9uRGF0YSA9IHsgbmFtZTogXCJEZWZhdWx0XCIsIGNvbG9yOiBcIiNjY2NcIiB9O1xuICBjb25zdCBkZWZhdWx0TGlzdCA9IG5ldyBEZWZhdWx0TGlzdChjcmVhdGlvbkRhdGEpO1xuICBkZWZhdWx0TGlzdC5pZCA9IERFRkFVTFRfTElTVF9JRDtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3Q6IGRlZmF1bHRMaXN0LCBsaXN0SWQ6IGRlZmF1bHRMaXN0LmlkIH07XG4gIFB1YlN1Yi5lbWl0KFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChuZXdEYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChuZXdEYXRhKTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UGVuZGluZ1wiLCBsaXN0KTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JDcmVhdGlvblwiLCBjcmVhdGVOZXdMaXN0KTtcblB1YlN1Yi5vbihcIkNyZWF0ZURlZmF1bHRMaXN0XCIsIGNyZWF0ZURlZmF1bHRMaXN0KTtcbiIsImNvbnN0IHsgUHViU3ViIH0gPSByZXF1aXJlKFwiLi4vUHViU3ViXCIpO1xuXG5jb25zdCBMSVNUX1JFR0lTVFJZID0gW107XG5sZXQgZGVmYXVsdExpc3RSZWZlcmVuY2UgPSBudWxsO1xuXG5mdW5jdGlvbiBhZGRMaXN0VG9SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkucHVzaChsaXN0KTtcbiAgbGlzdC5pZCA9IExJU1RfUkVHSVNUUlkubGVuZ3RoIC0gMTtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3QsIGxpc3RJZDogTElTVF9SRUdJU1RSWS5sZW5ndGggLSAxIH07XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFJlZ2lzdGVyZWRcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0SWRzKCkge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IExJU1RfUkVHSVNUUlkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaXN0ID0gTElTVF9SRUdJU1RSWVtpXTtcbiAgICBsaXN0LmlkID0gaTtcbiAgICBsaXN0LmRpdi5kYXRhc2V0Lmxpc3RJZCA9IGk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGlzdEZyb21SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkuc3BsaWNlKGxpc3QuaWQsIDEpO1xuICB1cGRhdGVMaXN0SWRzKCk7XG59XG5cbmZ1bmN0aW9uIGVkaXRMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IGVkaXRhYmxlTGlzdCA9IExJU1RfUkVHSVNUUllbbGlzdERhdGEuaWRdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhsaXN0RGF0YS5kYXRhKSkge1xuICAgIGVkaXRhYmxlTGlzdFtrZXldID0gdmFsdWU7XG4gIH1cbiAgUHViU3ViLmVtaXQoXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlzdFJlZ2lzdHJ5KCkge1xuICBjb25zdCBmdWxsTGlzdFJlZ2lzdHJ5ID0gW2RlZmF1bHRMaXN0UmVmZXJlbmNlLCAuLi5MSVNUX1JFR0lTVFJZXTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UmVnaXN0cnlHZXRzUmV0dXJuZWRcIiwgZnVsbExpc3RSZWdpc3RyeSk7XG59XG5cblB1YlN1Yi5vbihcIkRlZmF1bHRMaXN0UGVuZGluZ1wiLCAobGlzdERhdGEpID0+IHtcbiAgZGVmYXVsdExpc3RSZWZlcmVuY2UgPSBsaXN0RGF0YS5saXN0O1xufSk7XG5QdWJTdWIub24oXCJMaXN0UGVuZGluZ1wiLCBhZGRMaXN0VG9SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JFZGl0aW5nXCIsIGVkaXRMaXN0KTtcblB1YlN1Yi5vbihcIkdldExpc3RSZWdpc3RyeVwiLCBnZXRMaXN0UmVnaXN0cnkpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgREVGQVVMVF9MSVNUX0lEIH0gZnJvbSBcIi4vbGlzdC1jcmVhdG9yXCI7XG5cbmNvbnN0IGxpc3REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0c1wiKTtcblxuZnVuY3Rpb24gcmVuZGVyTGlzdFVwb25DcmVhdGlvbihsaXN0RGF0YSkge1xuICBjb25zdCBsaXN0ID0gbGlzdERhdGEubGlzdDtcblxuICBjb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdERpdi5kYXRhc2V0Lmxpc3RJZCA9IGxpc3REYXRhLmxpc3RJZDtcbiAgbGlzdC5kaXYgPSBsaXN0RGl2O1xuICBsaXN0RGl2LmNsYXNzTGlzdC5hZGQoXCJsaXN0XCIpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdC5jb2xvcjtcblxuICBpZiAobGlzdERhdGEubGlzdElkID09PSBERUZBVUxUX0xJU1RfSUQpIHtcbiAgICBsaXN0RGlzcGxheS5wcmVwZW5kKGxpc3REaXYpO1xuICB9IGVsc2Uge1xuICAgIGxpc3REaXNwbGF5LmFwcGVuZChsaXN0RGl2KTtcbiAgfVxuXG4gIGNvbnN0IGxpc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0Um93LmNsYXNzTGlzdC5hZGQoXCJsaXN0LXJvd1wiKTtcbiAgbGlzdERpdi5hcHBlbmQobGlzdFJvdyk7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxpc3ROYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwibGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0Lm5hbWU7XG4gIGxpc3RSb3cuYXBwZW5kKGxpc3ROYW1lVGV4dCk7XG5cbiAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnMtcm93XCIpO1xuICBsaXN0Um93LmFwcGVuZChidXR0b25zRGl2KTtcblxuICByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KTtcblxuICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgbGlzdERpdi5hcHBlbmQoaHIpO1xuXG4gIGNvbnN0IHRhc2tTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2stc2VjdGlvblwiKTtcbiAgbGlzdERpdi5hcHBlbmQodGFza1NlY3Rpb24pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KSB7XG4gIE9iamVjdC52YWx1ZXMobGlzdC5idXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b25zRGl2LmFwcGVuZChidXR0b24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcFJlbmRlcmluZ0xpc3QobGlzdCkge1xuICBsaXN0LmRpdi5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gcmVyZW5kZXJMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gYFtkYXRhLWxpc3QtaWQ9XCIke2xpc3REYXRhLmlkfVwiXWA7XG5cbiAgY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdERhdGEuZGF0YS5jb2xvcjtcblxuICBjb25zdCBsaXN0TmFtZVRleHQgPSBsaXN0RGl2LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0RGF0YS5kYXRhLm5hbWU7XG59XG5cblB1YlN1Yi5vbihcIkRlZmF1bHRMaXN0UGVuZGluZ1wiLCByZW5kZXJMaXN0VXBvbkNyZWF0aW9uKTtcblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RlcmVkXCIsIHJlbmRlckxpc3RVcG9uQ3JlYXRpb24pO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCBzdG9wUmVuZGVyaW5nTGlzdCk7XG5QdWJTdWIub24oXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIHJlcmVuZGVyTGlzdCk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgRGVmYXVsdExpc3QgfSBmcm9tIFwiLi9kZWZhdWx0LWxpc3RcIjtcblxuZXhwb3J0IGNsYXNzIExpc3QgZXh0ZW5kcyBEZWZhdWx0TGlzdCB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihkYXRhKTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgdGhpcyk7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkubGlzdCk7XG4gICAgfSk7XG4gICAgdGhpcy5FZGl0TGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiZWRpdFwiO1xuXG4gICAgdGhpcy5SZW1vdmVMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLlJlbW92ZUxpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCB0aGlzKTtcbiAgICB9KTtcbiAgICB0aGlzLlJlbW92ZUxpc3RCdXR0b24udGV4dENvbnRlbnQgPSBcInhcIjtcblxuICAgIHRoaXMuYnV0dG9ucy5SZW1vdmVMaXN0QnV0dG9uID0gdGhpcy5SZW1vdmVMaXN0QnV0dG9uO1xuICAgIHRoaXMuYnV0dG9ucy5FZGl0TGlzdEJ1dHRvbiA9IHRoaXMuRWRpdExpc3RCdXR0b247XG4gIH1cbn1cbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjcmVhdGVUYXNrKHRhc2tEYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBUYXNrKHRhc2tEYXRhKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRhc2tSZWdpc3RyYXIge1xuICBUQVNLX1JFR0lTVFJZID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnB1c2godGFzayk7XG4gICAgY29uc29sZS5sb2coXCJ0YXNrIHJlZ2lzdGVyZWRcIik7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUYXNrUmVuZGVyZXIge1xuICBjb25zdHJ1Y3QoKSB7fVxuXG4gIHJlbmRlclRhc2socGFyZW50TGlzdERpdiwgdGFzaykge1xuICAgIGNvbnN0IHBhcmVudExpc3RUYXNrU2VjdGlvbiA9IHBhcmVudExpc3REaXYucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlY3Rpb25cIik7XG5cbiAgICBjb25zdCB0YXNrRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWJhY2tncm91bmRcIik7XG4gICAgcGFyZW50TGlzdFRhc2tTZWN0aW9uLmFwcGVuZCh0YXNrRGl2KTtcbiAgICBjb25zb2xlLmxvZyhwYXJlbnRMaXN0VGFza1NlY3Rpb24pO1xuXG4gICAgY29uc3QgdGFza05hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza05hbWVUZXh0LnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuICAgIHRhc2tEaXYuYXBwZW5kKHRhc2tOYW1lVGV4dCk7XG5cbiAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgICB0YXNrRGl2LmFwcGVuZChidXR0b25zRGl2KTtcblxuICAgIHRoaXMucmVuZGVyVGFza0J1dHRvbnMoYnV0dG9uc0RpdiwgdGFzayk7XG4gIH1cblxuICByZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0YXNrLmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uc0Rpdi5hcHBlbmQoYnV0dG9uKTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gIFNVQlRBU0tTID0gW107XG4gIGNvbnN0cnVjdG9yKHRhc2tEYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gdGFza0RhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFza0RhdGEuZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWUgPSB0YXNrRGF0YS5kdWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHRhc2tEYXRhLnByaW9yaXR5O1xuICAgIHRoaXMucGFyZW50TGlzdCA9IHRhc2tEYXRhLnBhcmVudExpc3Q7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiVGFza0NoZWNrZWRcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBQdWJTdWIuZW1pdChcIlRhc2tVbmNoZWNrZWRcIiwgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbi50ZXh0Q29udGVudCA9IFwiZWRpdFwiO1xuICAgIHRoaXMuRWRpdFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIC8vIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0VGFza1wiLCB0aGlzKTtcbiAgICB9KTtcbiAgICB0aGlzLkRlbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbi50ZXh0Q29udGVudCA9IFwieFwiO1xuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgLy8gUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0RlbGV0ZVRhc2tcIik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmJ1dHRvbnMgPSB7XG4gICAgICBFZGl0VGFza0J1dHRvbjogdGhpcy5FZGl0VGFza0J1dHRvbixcbiAgICAgIERlbGV0ZVRhc2tCdXR0b246IHRoaXMuRGVsZXRlVGFza0J1dHRvbixcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi9mb3JtLW1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JtT3BlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1vcGVuLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1PcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5saXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1DbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1jbG9zZS1idXR0b25cIlxuKTtcbmxpc3RGb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5saXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbiA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLWxpc3QtYnV0dG9uXCIpO1xuZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBGT1JNX1JFR0lTVFJZLmxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLmxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0YXNrRm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwidGFzay1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xudGFza0Zvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLnRhc2spO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtdGFzay1idXR0b25cIik7XG5maW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkudGFzayk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkudGFzayk7XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3VuaXF1ZS1idXR0b24tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vbGlzdE1hbmFnZW1lbnQvbGlzdC1idW5kbGVcIjtcbmltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuXG5pbXBvcnQgXCIuL3Rhc2tNYW5hZ2VtZW50L3Rhc2stY3JlYXRvclwiO1xuXG5QdWJTdWIuZW1pdChcIkNyZWF0ZURlZmF1bHRMaXN0XCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9