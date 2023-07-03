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
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { PubSub } = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");

const MODES = { CREATION: 0, EDITING: 1 };

const listForm = {
  background: document.getElementById("list-form-background"),
  form: document.getElementById("list-form-background").querySelector("form"),
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

PubSub.on("OpenListForm", openListForm);
PubSub.on("CloseListForm", closeListForm);

PubSub.on("UserFinishedUsingListForm", getListFormData);
PubSub.on("UserWantsToEditList", prepareListFormForEditing);


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


class DefaultList {
  TASK_REGISTRY = [];
  id = null;
  div = null;

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = document.createElement("button");
    this.AddTaskButton = document.createElement("button");

    this.buttons = {
      SortListButton: this.SortListButton,
      AddTaskButton: this.AddTaskButton,
    };
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
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
/* harmony import */ var _default_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-list */ "./src/listManagement/default-list.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list */ "./src/listManagement/list.js");




function createDefaultList() {
  const defaultListData = { name: "Default", color: "#ccc" };
  const defaultList = new _default_list__WEBPACK_IMPORTED_MODULE_1__.DefaultList(defaultListData);
  defaultList.id = "DEFAULT";
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("DefaultListPending", defaultList);
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

PubSub.on("ListPending", addListToRegistry);
PubSub.on("ListShouldBeRemoved", removeListFromRegistry);
PubSub.on("ListIsReadyForEditing", editList);


/***/ }),

/***/ "./src/listManagement/list-renderer.js":
/*!*********************************************!*\
  !*** ./src/listManagement/list-renderer.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");


const listDisplay = document.getElementById("lists");

function renderDefaultList(list) {
  const listDiv = document.getElementById("defaultListDiv");
  listDiv.dataset.listId = list.id;
  list.div = listDiv;
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;

  const listRow = document.createElement("div");
  listRow.classList.add("list-row");
  listDiv.append(listRow);

  const listNameText = document.createElement("p");
  listNameText.classList.add("list-name");
  listNameText.textContent = list.name;
  listRow.append(listNameText);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("list-buttons");
  listRow.append(buttonsDiv);

  renderAllListButtons(list, buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.append(hr);

  const tasksSection = document.createElement("div");
  tasksSection.classList.add("tasks-section");
  listDiv.append(tasksSection);

  setupAllListButtonNames(list);
}

function renderListUponCreation(listData) {
  const list = listData.list;

  const listDiv = document.createElement("div");
  listDiv.dataset.listId = listData.listId;
  list.div = listDiv;
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;
  listDisplay.append(listDiv);

  const listRow = document.createElement("div");
  listRow.classList.add("list-row");
  listDiv.append(listRow);

  const listNameText = document.createElement("p");
  listNameText.classList.add("list-name");
  listNameText.textContent = list.name;
  listRow.append(listNameText);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("list-buttons");
  listRow.append(buttonsDiv);

  renderAllListButtons(list, buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.append(hr);

  const tasksSection = document.createElement("div");
  tasksSection.classList.add("tasks-section");
  listDiv.append(tasksSection);
}

function renderAllListButtons(list, buttonsDiv) {
  Object.values(list.buttons).forEach((button) => {
    buttonsDiv.append(button);
  });
}

function setupAllListButtonNames(list) {
  if (list.id !== "DEFAULT") {
    list.RemoveListButton.textContent = "x";
    list.EditListButton.textContent = "edit";
  }
  list.SortListButton.textContent = "sort";
  list.AddTaskButton.textContent = "+";
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

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListPending", setupAllListButtonNames);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("DefaultListPending", renderDefaultList);
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
/* harmony import */ var _default_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-list */ "./src/listManagement/default-list.js");



class List extends _default_list__WEBPACK_IMPORTED_MODULE_1__.DefaultList {
  constructor(data) {
    super(data);
    this.EditListButton = document.createElement("button");
    this.EditListButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditList", this);
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenListForm");
    });
    this.RemoveListButton = document.createElement("button");
    this.RemoveListButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListShouldBeRemoved", this);
    });
    this.buttons.RemoveListButton = this.RemoveListButton;
    this.buttons.EditListButton = this.EditListButton;
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
/* harmony export */   listCreationFormCloseButton: () => (/* binding */ listCreationFormCloseButton),
/* harmony export */   listCreationFormOpenButton: () => (/* binding */ listCreationFormOpenButton)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");


const listCreationFormOpenButton = document.getElementById(
  "list-creation-form-open-button"
);
listCreationFormOpenButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenListForm");
});

const listCreationFormCloseButton = document.getElementById(
  "list-creation-form-close-button"
);
listCreationFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseListForm");
});

const finishUsingListFormButton =
  document.getElementById("create-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserFinishedUsingListForm");
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseListForm");
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
/* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_form_manager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listManagement/list-bundle */ "./src/listManagement/list-bundle.js");
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");





_PubSub__WEBPACK_IMPORTED_MODULE_3__.PubSub.emit("CreateDefaultList");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCa0M7O0FBRTNCO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTTtBQUNSLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJDQUFNO0FBQ1IsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQSxFQUFFLDJDQUFNO0FBQ1IsRUFBRSwyQ0FBTTtBQUNSLENBQUM7Ozs7Ozs7VUNyQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ1Q7QUFDYztBQUNKOztBQUVsQywyQ0FBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvUHViU3ViLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvZm9ybS1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvZGVmYXVsdC1saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1idW5kbGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LXJlZ2lzdHJhci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gIGNvbnN0IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSA9IC0xO1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBmdW5jdGlvbiBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW2RlYnVnXSBFVkVOVCAke2V2ZW50fSBJUyBDQUxMRURgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQsIHBhcmFtID0gbnVsbCkge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpO1xuICAgICAgZm9yIChsZXQgZnVuYyBvZiBldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZ1bmMocGFyYW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgVGhlcmUgaXMgbm8gZXZlbnQgd2l0aCBhIG5hbWUgJyR7ZXZlbnR9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmdW5jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmdW5jXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgY29uc3QgaW5kZXhPZkdpdmVuRnVuY3Rpb24gPSBldmVudHNbZXZlbnRdLmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXhPZkdpdmVuRnVuY3Rpb24gIT09IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSkge1xuICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpbmRleE9mR2l2ZW5GdW5jdGlvbiwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFxuICAgICAgICBgVGhlcmUgaXMgZWl0aGVyIG5vIHN1Y2ggZXZlbnQgKCR7ZXZlbnR9KSByZWdpc3RlcmVkLCBvciB5b3VyIGZ1bmN0aW9uIGlzbid0IHByZXNlbnQgdGhlcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGVtaXQsIG9uLCBvZmYgfTtcbn0pKCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4vUHViU3ViXCIpO1xuXG5jb25zdCBNT0RFUyA9IHsgQ1JFQVRJT046IDAsIEVESVRJTkc6IDEgfTtcblxuY29uc3QgbGlzdEZvcm0gPSB7XG4gIGJhY2tncm91bmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIiksXG4gIGZvcm06IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIikucXVlcnlTZWxlY3RvcihcImZvcm1cIiksXG4gIG1vZGU6IE1PREVTLkNSRUFUSU9OLFxufTtcblxuZnVuY3Rpb24gb3Blbkxpc3RGb3JtKCkge1xuICBsaXN0Rm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VMaXN0Rm9ybSgpIHtcbiAgbGlzdEZvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gIGlmIChsaXN0Rm9ybS5tb2RlICE9PSBNT0RFUy5DUkVBVElPTikge1xuICAgIHJlc2V0TGlzdEZvcm0oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRMaXN0Rm9ybURhdGEoKSB7XG4gIGNvbnN0IGxpc3RGb3JtSW5wdXRzID0gbGlzdEZvcm0uYmFja2dyb3VuZC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gIGNvbnN0IG5ld0RhdGEgPSB7fTtcblxuICBsaXN0Rm9ybUlucHV0cy5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgY29uc3QgaW5wdXRDb250ZW50VHlwZSA9IGN1cnJlbnQuaWQ7XG4gICAgbmV3RGF0YVtpbnB1dENvbnRlbnRUeXBlXSA9IGN1cnJlbnQudmFsdWU7XG4gIH0pO1xuXG4gIGlmIChsaXN0Rm9ybS5tb2RlID09PSBNT0RFUy5DUkVBVElPTikge1xuICAgIFB1YlN1Yi5lbWl0KFwiTGlzdElzUmVhZHlGb3JDcmVhdGlvblwiLCBuZXdEYXRhKTtcbiAgfSBlbHNlIGlmIChsaXN0Rm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgUHViU3ViLmVtaXQoXCJMaXN0SXNSZWFkeUZvckVkaXRpbmdcIiwge1xuICAgICAgZGF0YTogbmV3RGF0YSxcbiAgICAgIGlkOiBsaXN0Rm9ybS5mb3JtLmRhdGFzZXQuZWRpdGFibGVMaXN0SWQsXG4gICAgfSk7XG4gIH1cbiAgcmVzZXRMaXN0Rm9ybSgpO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlTGlzdEZvcm1Gb3JFZGl0aW5nKGxpc3QpIHtcbiAgbGlzdEZvcm0ubW9kZSA9IE1PREVTLkVESVRJTkc7XG5cbiAgbGlzdEZvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIikuZm9yRWFjaCgoY3VycmVudCkgPT4ge1xuICAgIGN1cnJlbnQudmFsdWUgPSBsaXN0W2N1cnJlbnQuaWRdO1xuICB9KTtcbiAgbGlzdEZvcm0uZm9ybS5kYXRhc2V0LmVkaXRhYmxlTGlzdElkID0gbGlzdC5pZDtcbn1cblxuZnVuY3Rpb24gcmVzZXRMaXN0Rm9ybSgpIHtcbiAgbGlzdEZvcm0uZm9ybS5yZXNldCgpO1xuICBsaXN0Rm9ybS5mb3JtLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtZWRpdGFibGUtbGlzdC1pZFwiKTtcbiAgbGlzdEZvcm0ubW9kZSA9IE1PREVTLkNSRUFUSU9OO1xufVxuXG5QdWJTdWIub24oXCJPcGVuTGlzdEZvcm1cIiwgb3Blbkxpc3RGb3JtKTtcblB1YlN1Yi5vbihcIkNsb3NlTGlzdEZvcm1cIiwgY2xvc2VMaXN0Rm9ybSk7XG5cblB1YlN1Yi5vbihcIlVzZXJGaW5pc2hlZFVzaW5nTGlzdEZvcm1cIiwgZ2V0TGlzdEZvcm1EYXRhKTtcblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgcHJlcGFyZUxpc3RGb3JtRm9yRWRpdGluZyk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5cbmV4cG9ydCBjbGFzcyBEZWZhdWx0TGlzdCB7XG4gIFRBU0tfUkVHSVNUUlkgPSBbXTtcbiAgaWQgPSBudWxsO1xuICBkaXYgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWUgfHwgXCJVbm5hbWVkXCI7XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG5cbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgdGhpcy5idXR0b25zID0ge1xuICAgICAgU29ydExpc3RCdXR0b246IHRoaXMuU29ydExpc3RCdXR0b24sXG4gICAgICBBZGRUYXNrQnV0dG9uOiB0aGlzLkFkZFRhc2tCdXR0b24sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IFwiLi9saXN0LWNyZWF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZWdpc3RyYXJcIjtcbmltcG9ydCBcIi4vbGlzdC1yZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRGVmYXVsdExpc3QgfSBmcm9tIFwiLi9kZWZhdWx0LWxpc3RcIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi9saXN0XCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRMaXN0KCkge1xuICBjb25zdCBkZWZhdWx0TGlzdERhdGEgPSB7IG5hbWU6IFwiRGVmYXVsdFwiLCBjb2xvcjogXCIjY2NjXCIgfTtcbiAgY29uc3QgZGVmYXVsdExpc3QgPSBuZXcgRGVmYXVsdExpc3QoZGVmYXVsdExpc3REYXRhKTtcbiAgZGVmYXVsdExpc3QuaWQgPSBcIkRFRkFVTFRcIjtcbiAgUHViU3ViLmVtaXQoXCJEZWZhdWx0TGlzdFBlbmRpbmdcIiwgZGVmYXVsdExpc3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdMaXN0KG5ld0RhdGEpIHtcbiAgY29uc3QgbGlzdCA9IG5ldyBMaXN0KG5ld0RhdGEpO1xuICBQdWJTdWIuZW1pdChcIkxpc3RQZW5kaW5nXCIsIGxpc3QpO1xufVxuXG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckNyZWF0aW9uXCIsIGNyZWF0ZU5ld0xpc3QpO1xuUHViU3ViLm9uKFwiQ3JlYXRlRGVmYXVsdExpc3RcIiwgY3JlYXRlRGVmYXVsdExpc3QpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5cbmNvbnN0IExJU1RfUkVHSVNUUlkgPSBbXTtcblxuZnVuY3Rpb24gYWRkTGlzdFRvUmVnaXN0cnkobGlzdCkge1xuICBMSVNUX1JFR0lTVFJZLnB1c2gobGlzdCk7XG4gIGxpc3QuaWQgPSBMSVNUX1JFR0lTVFJZLmxlbmd0aCAtIDE7XG4gIGNvbnN0IGxpc3REYXRhID0geyBsaXN0LCBsaXN0SWQ6IExJU1RfUkVHSVNUUlkubGVuZ3RoIC0gMSB9O1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RlcmVkXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGlzdElkcygpIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBMSVNUX1JFR0lTVFJZLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbGlzdCA9IExJU1RfUkVHSVNUUllbaV07XG4gICAgbGlzdC5pZCA9IGk7XG4gICAgbGlzdC5kaXYuZGF0YXNldC5saXN0SWQgPSBpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkobGlzdCkge1xuICBMSVNUX1JFR0lTVFJZLnNwbGljZShsaXN0LmlkLCAxKTtcbiAgdXBkYXRlTGlzdElkcygpO1xufVxuXG5mdW5jdGlvbiBlZGl0TGlzdChsaXN0RGF0YSkge1xuICBjb25zdCBlZGl0YWJsZUxpc3QgPSBMSVNUX1JFR0lTVFJZW2xpc3REYXRhLmlkXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobGlzdERhdGEuZGF0YSkpIHtcbiAgICBlZGl0YWJsZUxpc3Rba2V5XSA9IHZhbHVlO1xuICB9XG4gIFB1YlN1Yi5lbWl0KFwibGlzdFNob3VsZEJlUmVyZW5kZXJlZFwiLCBsaXN0RGF0YSk7XG59XG5cblB1YlN1Yi5vbihcIkxpc3RQZW5kaW5nXCIsIGFkZExpc3RUb1JlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgcmVtb3ZlTGlzdEZyb21SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckVkaXRpbmdcIiwgZWRpdExpc3QpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuXG5jb25zdCBsaXN0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdHNcIik7XG5cbmZ1bmN0aW9uIHJlbmRlckRlZmF1bHRMaXN0KGxpc3QpIHtcbiAgY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVmYXVsdExpc3REaXZcIik7XG4gIGxpc3REaXYuZGF0YXNldC5saXN0SWQgPSBsaXN0LmlkO1xuICBsaXN0LmRpdiA9IGxpc3REaXY7XG4gIGxpc3REaXYuY2xhc3NMaXN0LmFkZChcImxpc3RcIik7XG4gIGxpc3REaXYuc3R5bGUuYm9yZGVyQ29sb3IgPSBsaXN0LmNvbG9yO1xuXG4gIGNvbnN0IGxpc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0Um93LmNsYXNzTGlzdC5hZGQoXCJsaXN0LXJvd1wiKTtcbiAgbGlzdERpdi5hcHBlbmQobGlzdFJvdyk7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxpc3ROYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwibGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0Lm5hbWU7XG4gIGxpc3RSb3cuYXBwZW5kKGxpc3ROYW1lVGV4dCk7XG5cbiAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImxpc3QtYnV0dG9uc1wiKTtcbiAgbGlzdFJvdy5hcHBlbmQoYnV0dG9uc0Rpdik7XG5cbiAgcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdik7XG5cbiAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gIGxpc3REaXYuYXBwZW5kKGhyKTtcblxuICBjb25zdCB0YXNrc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0YXNrc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2tzLXNlY3Rpb25cIik7XG4gIGxpc3REaXYuYXBwZW5kKHRhc2tzU2VjdGlvbik7XG5cbiAgc2V0dXBBbGxMaXN0QnV0dG9uTmFtZXMobGlzdCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3RVcG9uQ3JlYXRpb24obGlzdERhdGEpIHtcbiAgY29uc3QgbGlzdCA9IGxpc3REYXRhLmxpc3Q7XG5cbiAgY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxpc3REaXYuZGF0YXNldC5saXN0SWQgPSBsaXN0RGF0YS5saXN0SWQ7XG4gIGxpc3QuZGl2ID0gbGlzdERpdjtcbiAgbGlzdERpdi5jbGFzc0xpc3QuYWRkKFwibGlzdFwiKTtcbiAgbGlzdERpdi5zdHlsZS5ib3JkZXJDb2xvciA9IGxpc3QuY29sb3I7XG4gIGxpc3REaXNwbGF5LmFwcGVuZChsaXN0RGl2KTtcblxuICBjb25zdCBsaXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdFJvdy5jbGFzc0xpc3QuYWRkKFwibGlzdC1yb3dcIik7XG4gIGxpc3REaXYuYXBwZW5kKGxpc3RSb3cpO1xuXG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsaXN0TmFtZVRleHQuY2xhc3NMaXN0LmFkZChcImxpc3QtbmFtZVwiKTtcbiAgbGlzdE5hbWVUZXh0LnRleHRDb250ZW50ID0gbGlzdC5uYW1lO1xuICBsaXN0Um93LmFwcGVuZChsaXN0TmFtZVRleHQpO1xuXG4gIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJsaXN0LWJ1dHRvbnNcIik7XG4gIGxpc3RSb3cuYXBwZW5kKGJ1dHRvbnNEaXYpO1xuXG4gIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpO1xuXG4gIGNvbnN0IGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICBsaXN0RGl2LmFwcGVuZChocik7XG5cbiAgY29uc3QgdGFza3NTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1zZWN0aW9uXCIpO1xuICBsaXN0RGl2LmFwcGVuZCh0YXNrc1NlY3Rpb24pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KSB7XG4gIE9iamVjdC52YWx1ZXMobGlzdC5idXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b25zRGl2LmFwcGVuZChidXR0b24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBBbGxMaXN0QnV0dG9uTmFtZXMobGlzdCkge1xuICBpZiAobGlzdC5pZCAhPT0gXCJERUZBVUxUXCIpIHtcbiAgICBsaXN0LlJlbW92ZUxpc3RCdXR0b24udGV4dENvbnRlbnQgPSBcInhcIjtcbiAgICBsaXN0LkVkaXRMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJlZGl0XCI7XG4gIH1cbiAgbGlzdC5Tb3J0TGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwic29ydFwiO1xuICBsaXN0LkFkZFRhc2tCdXR0b24udGV4dENvbnRlbnQgPSBcIitcIjtcbn1cblxuZnVuY3Rpb24gc3RvcFJlbmRlcmluZ0xpc3QobGlzdCkge1xuICBsaXN0LmRpdi5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gcmVyZW5kZXJMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IHF1ZXJ5ID0gYFtkYXRhLWxpc3QtaWQ9XCIke2xpc3REYXRhLmlkfVwiXWA7XG5cbiAgY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocXVlcnkpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdERhdGEuZGF0YS5jb2xvcjtcblxuICBjb25zdCBsaXN0TmFtZVRleHQgPSBsaXN0RGl2LnF1ZXJ5U2VsZWN0b3IoXCIubGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0RGF0YS5kYXRhLm5hbWU7XG59XG5cblB1YlN1Yi5vbihcIkxpc3RQZW5kaW5nXCIsIHNldHVwQWxsTGlzdEJ1dHRvbk5hbWVzKTtcblB1YlN1Yi5vbihcIkRlZmF1bHRMaXN0UGVuZGluZ1wiLCByZW5kZXJEZWZhdWx0TGlzdCk7XG5QdWJTdWIub24oXCJMaXN0UmVnaXN0ZXJlZFwiLCByZW5kZXJMaXN0VXBvbkNyZWF0aW9uKTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgc3RvcFJlbmRlcmluZ0xpc3QpO1xuUHViU3ViLm9uKFwibGlzdFNob3VsZEJlUmVyZW5kZXJlZFwiLCByZXJlbmRlckxpc3QpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRGVmYXVsdExpc3QgfSBmcm9tIFwiLi9kZWZhdWx0LWxpc3RcIjtcblxuZXhwb3J0IGNsYXNzIExpc3QgZXh0ZW5kcyBEZWZhdWx0TGlzdCB7XG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICBzdXBlcihkYXRhKTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgdGhpcyk7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5MaXN0Rm9ybVwiKTtcbiAgICB9KTtcbiAgICB0aGlzLlJlbW92ZUxpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHRoaXMpO1xuICAgIH0pO1xuICAgIHRoaXMuYnV0dG9ucy5SZW1vdmVMaXN0QnV0dG9uID0gdGhpcy5SZW1vdmVMaXN0QnV0dG9uO1xuICAgIHRoaXMuYnV0dG9ucy5FZGl0TGlzdEJ1dHRvbiA9IHRoaXMuRWRpdExpc3RCdXR0b247XG4gIH1cbn1cbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuXG5leHBvcnQgY29uc3QgbGlzdENyZWF0aW9uRm9ybU9wZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJsaXN0LWNyZWF0aW9uLWZvcm0tb3Blbi1idXR0b25cIlxuKTtcbmxpc3RDcmVhdGlvbkZvcm1PcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiT3Blbkxpc3RGb3JtXCIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBsaXN0Q3JlYXRpb25Gb3JtQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJsaXN0LWNyZWF0aW9uLWZvcm0tY2xvc2UtYnV0dG9uXCJcbik7XG5saXN0Q3JlYXRpb25Gb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUxpc3RGb3JtXCIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtbGlzdC1idXR0b25cIik7XG5maW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdMaXN0Rm9ybVwiKTtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUxpc3RGb3JtXCIpO1xufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi91bmlxdWUtYnV0dG9uLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlXCI7XG5pbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcblxuUHViU3ViLmVtaXQoXCJDcmVhdGVEZWZhdWx0TGlzdFwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==