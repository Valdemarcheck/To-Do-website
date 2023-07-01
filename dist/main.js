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

const listFormBackground = document.getElementById("list-form-background");

function openListForm() {
  listFormBackground.style.display = "flex";
}

function closeListForm() {
  listFormBackground.style.display = "none";
}

function getListFormData() {
  const listForm = listFormBackground.querySelectorAll("input");
  const data = {};
  listForm.forEach((current) => {
    const inputContentType = current.id;
    data[inputContentType] = current.value;
  });
  PubSub.emit("GotListData", data);
}

function resetListForm() {
  listFormBackground.querySelector("form").reset();
}

PubSub.on("OpenListCreationForm", openListForm);
PubSub.on("CloseListCreationForm", closeListForm);

PubSub.on("UserWantsToCreateNewList", getListFormData);
PubSub.on("ListDataIsNotRequired", resetListForm);


/***/ }),

/***/ "./src/listManagement/list-bundle.js":
/*!*******************************************!*\
  !*** ./src/listManagement/list-bundle.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-creator */ "./src/listManagement/list-creator.js");
/* harmony import */ var _list_registrator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-registrator */ "./src/listManagement/list-registrator.js");
/* harmony import */ var _list_registrator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_list_registrator__WEBPACK_IMPORTED_MODULE_1__);
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
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list */ "./src/listManagement/list.js");



function createNewList(data) {
  const list = new _list__WEBPACK_IMPORTED_MODULE_1__.List(data);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListDataIsNotRequired");
}

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("GotListData", createNewList);


/***/ }),

/***/ "./src/listManagement/list-registrator.js":
/*!************************************************!*\
  !*** ./src/listManagement/list-registrator.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { PubSub } = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");

const LIST_REGISTRY = {};

function addListToRegistry(list) {
  if (list.name in LIST_REGISTRY) {
    list.name = makeListNameUnique(list.name);
  }
  LIST_REGISTRY[list.name] = list;
  PubSub.emit("ListRegistered", list);
  console.log(LIST_REGISTRY);
}

function makeListNameUnique(name) {
  let index = 0;
  while (name in LIST_REGISTRY) {
    name = name.split(/\d$/)[0] + index;
    index++;
  }
  return name;
}

function removeListFromRegistry(listName) {
  delete LIST_REGISTRY[listName];
  console.log(LIST_REGISTRY);
}

PubSub.on("ListPending", addListToRegistry);
PubSub.on("ListShouldBeRemoved", removeListFromRegistry);


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

function renderList(list) {
  const listDiv = document.createElement("div");
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;
  listDiv.dataset.listId = list.name;
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
  list.RemoveListButton.textContent = "x";
  list.EditListButton.textContent = "edit";
  list.SortListButton.textContent = "sort";
  list.AddTaskButton.textContent = "+";
}

function stopRenderingList(listName) {
  const listDiv = listDisplay.querySelector(`[data-list-id='${listName}']`);
  listDiv.remove();
}

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListPending", setupAllListButtonNames);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListRegistered", renderList);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListShouldBeRemoved", stopRenderingList);


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


class List {
  TASK_REGISTRY = [];

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.RemoveListButton = document.createElement("button");
    this.RemoveListButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListShouldBeRemoved", this.name);
    });
    this.SortListButton = document.createElement("button");
    this.EditListButton = document.createElement("button");
    this.AddTaskButton = document.createElement("button");

    this.buttons = {
      RemoveListButton: this.RemoveListButton,
      SortListButton: this.SortListButton,
      EditListButton: this.EditListButton,
      AddTaskButton: this.AddTaskButton,
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
/* harmony export */   createListButton: () => (/* binding */ createListButton),
/* harmony export */   listCreationFormCloseButton: () => (/* binding */ listCreationFormCloseButton),
/* harmony export */   listCreationFormOpenButton: () => (/* binding */ listCreationFormOpenButton)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");


const listCreationFormOpenButton = document.getElementById(
  "list-creation-form-open-button"
);
listCreationFormOpenButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenListCreationForm");
});

const listCreationFormCloseButton = document.getElementById(
  "list-creation-form-close-button"
);
listCreationFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseListCreationForm");
});

const createListButton = document.getElementById("create-list-button");
createListButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseListCreationForm");
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToCreateNewList");
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




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7OztBQ3pDRCxRQUFRLFNBQVMsRUFBRSxtQkFBTyxDQUFDLGlDQUFVOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJ3QjtBQUNJO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ0ZVO0FBQ0w7O0FBRTlCO0FBQ0EsbUJBQW1CLHVDQUFJO0FBQ3ZCLEVBQUUsMkNBQU07QUFDUixFQUFFLDJDQUFNO0FBQ1I7O0FBRUEsMkNBQU07Ozs7Ozs7Ozs7O0FDVE4sUUFBUSxTQUFTLEVBQUUsbUJBQU8sQ0FBQyxrQ0FBVzs7QUFFdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNUJtQzs7QUFFbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQThELFNBQVM7QUFDdkU7QUFDQTs7QUFFQSwyQ0FBTTtBQUNOLDJDQUFNO0FBQ04sMkNBQU07Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEQ2Qjs7QUFFNUI7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sMkNBQU07QUFDWixLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmtDOztBQUUzQjtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU07QUFDUixDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTTtBQUNSLENBQUM7O0FBRU07QUFDUDtBQUNBLEVBQUUsMkNBQU07QUFDUixFQUFFLDJDQUFNO0FBQ1IsQ0FBQzs7Ozs7OztVQ3BCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNUO0FBQ2MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL1B1YlN1Yi5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2Zvcm0tbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZWdpc3RyYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gIGNvbnN0IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSA9IC0xO1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBmdW5jdGlvbiBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW2RlYnVnXSBFVkVOVCAke2V2ZW50fSBJUyBDQUxMRURgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQsIHBhcmFtID0gbnVsbCkge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpO1xuICAgICAgZm9yIChsZXQgZnVuYyBvZiBldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZ1bmMocGFyYW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgVGhlcmUgaXMgbm8gZXZlbnQgd2l0aCBhIG5hbWUgJyR7ZXZlbnR9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmdW5jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmdW5jXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgY29uc3QgaW5kZXhPZkdpdmVuRnVuY3Rpb24gPSBldmVudHNbZXZlbnRdLmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXhPZkdpdmVuRnVuY3Rpb24gIT09IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSkge1xuICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpbmRleE9mR2l2ZW5GdW5jdGlvbiwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFxuICAgICAgICBgVGhlcmUgaXMgZWl0aGVyIG5vIHN1Y2ggZXZlbnQgKCR7ZXZlbnR9KSByZWdpc3RlcmVkLCBvciB5b3VyIGZ1bmN0aW9uIGlzbid0IHByZXNlbnQgdGhlcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGVtaXQsIG9uLCBvZmYgfTtcbn0pKCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4vUHViU3ViXCIpO1xuXG5jb25zdCBsaXN0Rm9ybUJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3QtZm9ybS1iYWNrZ3JvdW5kXCIpO1xuXG5mdW5jdGlvbiBvcGVuTGlzdEZvcm0oKSB7XG4gIGxpc3RGb3JtQmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTGlzdEZvcm0oKSB7XG4gIGxpc3RGb3JtQmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGdldExpc3RGb3JtRGF0YSgpIHtcbiAgY29uc3QgbGlzdEZvcm0gPSBsaXN0Rm9ybUJhY2tncm91bmQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuICBjb25zdCBkYXRhID0ge307XG4gIGxpc3RGb3JtLmZvckVhY2goKGN1cnJlbnQpID0+IHtcbiAgICBjb25zdCBpbnB1dENvbnRlbnRUeXBlID0gY3VycmVudC5pZDtcbiAgICBkYXRhW2lucHV0Q29udGVudFR5cGVdID0gY3VycmVudC52YWx1ZTtcbiAgfSk7XG4gIFB1YlN1Yi5lbWl0KFwiR290TGlzdERhdGFcIiwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0TGlzdEZvcm0oKSB7XG4gIGxpc3RGb3JtQmFja2dyb3VuZC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKS5yZXNldCgpO1xufVxuXG5QdWJTdWIub24oXCJPcGVuTGlzdENyZWF0aW9uRm9ybVwiLCBvcGVuTGlzdEZvcm0pO1xuUHViU3ViLm9uKFwiQ2xvc2VMaXN0Q3JlYXRpb25Gb3JtXCIsIGNsb3NlTGlzdEZvcm0pO1xuXG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0NyZWF0ZU5ld0xpc3RcIiwgZ2V0TGlzdEZvcm1EYXRhKTtcblB1YlN1Yi5vbihcIkxpc3REYXRhSXNOb3RSZXF1aXJlZFwiLCByZXNldExpc3RGb3JtKTtcbiIsImltcG9ydCBcIi4vbGlzdC1jcmVhdG9yXCI7XG5pbXBvcnQgXCIuL2xpc3QtcmVnaXN0cmF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2xpc3RcIjtcblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChkYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChkYXRhKTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UGVuZGluZ1wiLCBsaXN0KTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0RGF0YUlzTm90UmVxdWlyZWRcIik7XG59XG5cblB1YlN1Yi5vbihcIkdvdExpc3REYXRhXCIsIGNyZWF0ZU5ld0xpc3QpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5cbmNvbnN0IExJU1RfUkVHSVNUUlkgPSB7fTtcblxuZnVuY3Rpb24gYWRkTGlzdFRvUmVnaXN0cnkobGlzdCkge1xuICBpZiAobGlzdC5uYW1lIGluIExJU1RfUkVHSVNUUlkpIHtcbiAgICBsaXN0Lm5hbWUgPSBtYWtlTGlzdE5hbWVVbmlxdWUobGlzdC5uYW1lKTtcbiAgfVxuICBMSVNUX1JFR0lTVFJZW2xpc3QubmFtZV0gPSBsaXN0O1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RlcmVkXCIsIGxpc3QpO1xuICBjb25zb2xlLmxvZyhMSVNUX1JFR0lTVFJZKTtcbn1cblxuZnVuY3Rpb24gbWFrZUxpc3ROYW1lVW5pcXVlKG5hbWUpIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgd2hpbGUgKG5hbWUgaW4gTElTVF9SRUdJU1RSWSkge1xuICAgIG5hbWUgPSBuYW1lLnNwbGl0KC9cXGQkLylbMF0gKyBpbmRleDtcbiAgICBpbmRleCsrO1xuICB9XG4gIHJldHVybiBuYW1lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KGxpc3ROYW1lKSB7XG4gIGRlbGV0ZSBMSVNUX1JFR0lTVFJZW2xpc3ROYW1lXTtcbiAgY29uc29sZS5sb2coTElTVF9SRUdJU1RSWSk7XG59XG5cblB1YlN1Yi5vbihcIkxpc3RQZW5kaW5nXCIsIGFkZExpc3RUb1JlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgcmVtb3ZlTGlzdEZyb21SZWdpc3RyeSk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5cbmNvbnN0IGxpc3REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0c1wiKTtcblxuZnVuY3Rpb24gcmVuZGVyTGlzdChsaXN0KSB7XG4gIGNvbnN0IGxpc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0RGl2LmNsYXNzTGlzdC5hZGQoXCJsaXN0XCIpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdC5jb2xvcjtcbiAgbGlzdERpdi5kYXRhc2V0Lmxpc3RJZCA9IGxpc3QubmFtZTtcbiAgbGlzdERpc3BsYXkuYXBwZW5kKGxpc3REaXYpO1xuXG4gIGNvbnN0IGxpc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0Um93LmNsYXNzTGlzdC5hZGQoXCJsaXN0LXJvd1wiKTtcbiAgbGlzdERpdi5hcHBlbmQobGlzdFJvdyk7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxpc3ROYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwibGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0Lm5hbWU7XG4gIGxpc3RSb3cuYXBwZW5kKGxpc3ROYW1lVGV4dCk7XG5cbiAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImxpc3QtYnV0dG9uc1wiKTtcbiAgbGlzdFJvdy5hcHBlbmQoYnV0dG9uc0Rpdik7XG5cbiAgcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdik7XG5cbiAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gIGxpc3REaXYuYXBwZW5kKGhyKTtcblxuICBjb25zdCB0YXNrc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0YXNrc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2tzLXNlY3Rpb25cIik7XG4gIGxpc3REaXYuYXBwZW5kKHRhc2tzU2VjdGlvbik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpIHtcbiAgT2JqZWN0LnZhbHVlcyhsaXN0LmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbnNEaXYuYXBwZW5kKGJ1dHRvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzZXR1cEFsbExpc3RCdXR0b25OYW1lcyhsaXN0KSB7XG4gIGxpc3QuUmVtb3ZlTGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwieFwiO1xuICBsaXN0LkVkaXRMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJlZGl0XCI7XG4gIGxpc3QuU29ydExpc3RCdXR0b24udGV4dENvbnRlbnQgPSBcInNvcnRcIjtcbiAgbGlzdC5BZGRUYXNrQnV0dG9uLnRleHRDb250ZW50ID0gXCIrXCI7XG59XG5cbmZ1bmN0aW9uIHN0b3BSZW5kZXJpbmdMaXN0KGxpc3ROYW1lKSB7XG4gIGNvbnN0IGxpc3REaXYgPSBsaXN0RGlzcGxheS5xdWVyeVNlbGVjdG9yKGBbZGF0YS1saXN0LWlkPScke2xpc3ROYW1lfSddYCk7XG4gIGxpc3REaXYucmVtb3ZlKCk7XG59XG5cblB1YlN1Yi5vbihcIkxpc3RQZW5kaW5nXCIsIHNldHVwQWxsTGlzdEJ1dHRvbk5hbWVzKTtcblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RlcmVkXCIsIHJlbmRlckxpc3QpO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCBzdG9wUmVuZGVyaW5nTGlzdCk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0IHtcbiAgVEFTS19SRUdJU1RSWSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWUgfHwgXCJVbm5hbWVkXCI7XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG5cbiAgICB0aGlzLlJlbW92ZUxpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHRoaXMubmFtZSk7XG4gICAgfSk7XG4gICAgdGhpcy5Tb3J0TGlzdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5FZGl0TGlzdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblxuICAgIHRoaXMuYnV0dG9ucyA9IHtcbiAgICAgIFJlbW92ZUxpc3RCdXR0b246IHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbixcbiAgICAgIFNvcnRMaXN0QnV0dG9uOiB0aGlzLlNvcnRMaXN0QnV0dG9uLFxuICAgICAgRWRpdExpc3RCdXR0b246IHRoaXMuRWRpdExpc3RCdXR0b24sXG4gICAgICBBZGRUYXNrQnV0dG9uOiB0aGlzLkFkZFRhc2tCdXR0b24sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4vUHViU3ViXCI7XG5cbmV4cG9ydCBjb25zdCBsaXN0Q3JlYXRpb25Gb3JtT3BlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtY3JlYXRpb24tZm9ybS1vcGVuLWJ1dHRvblwiXG4pO1xubGlzdENyZWF0aW9uRm9ybU9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJPcGVuTGlzdENyZWF0aW9uRm9ybVwiKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgbGlzdENyZWF0aW9uRm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1jcmVhdGlvbi1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xubGlzdENyZWF0aW9uRm9ybUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VMaXN0Q3JlYXRpb25Gb3JtXCIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBjcmVhdGVMaXN0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtbGlzdC1idXR0b25cIik7XG5jcmVhdGVMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VMaXN0Q3JlYXRpb25Gb3JtXCIpO1xuICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvQ3JlYXRlTmV3TGlzdFwiKTtcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZVwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9