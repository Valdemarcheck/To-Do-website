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

  return { events, emit, on, off };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7OztBQ3pDRCxRQUFRLFNBQVMsRUFBRSxtQkFBTyxDQUFDLGlDQUFVOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUJ3QjtBQUNJO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQ0ZVO0FBQ0w7O0FBRTlCO0FBQ0EsbUJBQW1CLHVDQUFJO0FBQ3ZCLEVBQUUsMkNBQU07QUFDUixFQUFFLDJDQUFNO0FBQ1I7O0FBRUEsMkNBQU07Ozs7Ozs7Ozs7O0FDVE4sUUFBUSxTQUFTLEVBQUUsbUJBQU8sQ0FBQyxrQ0FBVzs7QUFFdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNUJtQzs7QUFFbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQThELFNBQVM7QUFDdkU7QUFDQTs7QUFFQSwyQ0FBTTtBQUNOLDJDQUFNO0FBQ04sMkNBQU07Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEQ2Qjs7QUFFNUI7QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU0sMkNBQU07QUFDWixLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4QmtDOztBQUUzQjtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU07QUFDUixDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsRUFBRSwyQ0FBTTtBQUNSLENBQUM7O0FBRU07QUFDUDtBQUNBLEVBQUUsMkNBQU07QUFDUixFQUFFLDJDQUFNO0FBQ1IsQ0FBQzs7Ozs7OztVQ3BCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNUO0FBQ2MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL1B1YlN1Yi5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2Zvcm0tbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZWdpc3RyYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gIGNvbnN0IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSA9IC0xO1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBmdW5jdGlvbiBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW2RlYnVnXSBFVkVOVCAke2V2ZW50fSBJUyBDQUxMRURgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQsIHBhcmFtID0gbnVsbCkge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpO1xuICAgICAgZm9yIChsZXQgZnVuYyBvZiBldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZ1bmMocGFyYW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgVGhlcmUgaXMgbm8gZXZlbnQgd2l0aCBhIG5hbWUgJyR7ZXZlbnR9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmdW5jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmdW5jXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgY29uc3QgaW5kZXhPZkdpdmVuRnVuY3Rpb24gPSBldmVudHNbZXZlbnRdLmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXhPZkdpdmVuRnVuY3Rpb24gIT09IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSkge1xuICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpbmRleE9mR2l2ZW5GdW5jdGlvbiwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFxuICAgICAgICBgVGhlcmUgaXMgZWl0aGVyIG5vIHN1Y2ggZXZlbnQgKCR7ZXZlbnR9KSByZWdpc3RlcmVkLCBvciB5b3VyIGZ1bmN0aW9uIGlzbid0IHByZXNlbnQgdGhlcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGV2ZW50cywgZW1pdCwgb24sIG9mZiB9O1xufSkoKTtcbiIsImNvbnN0IHsgUHViU3ViIH0gPSByZXF1aXJlKFwiLi9QdWJTdWJcIik7XG5cbmNvbnN0IGxpc3RGb3JtQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIik7XG5cbmZ1bmN0aW9uIG9wZW5MaXN0Rm9ybSgpIHtcbiAgbGlzdEZvcm1CYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbn1cblxuZnVuY3Rpb24gY2xvc2VMaXN0Rm9ybSgpIHtcbiAgbGlzdEZvcm1CYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuZnVuY3Rpb24gZ2V0TGlzdEZvcm1EYXRhKCkge1xuICBjb25zdCBsaXN0Rm9ybSA9IGxpc3RGb3JtQmFja2dyb3VuZC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gIGNvbnN0IGRhdGEgPSB7fTtcbiAgbGlzdEZvcm0uZm9yRWFjaCgoY3VycmVudCkgPT4ge1xuICAgIGNvbnN0IGlucHV0Q29udGVudFR5cGUgPSBjdXJyZW50LmlkO1xuICAgIGRhdGFbaW5wdXRDb250ZW50VHlwZV0gPSBjdXJyZW50LnZhbHVlO1xuICB9KTtcbiAgUHViU3ViLmVtaXQoXCJHb3RMaXN0RGF0YVwiLCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gcmVzZXRMaXN0Rm9ybSgpIHtcbiAgbGlzdEZvcm1CYWNrZ3JvdW5kLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLnJlc2V0KCk7XG59XG5cblB1YlN1Yi5vbihcIk9wZW5MaXN0Q3JlYXRpb25Gb3JtXCIsIG9wZW5MaXN0Rm9ybSk7XG5QdWJTdWIub24oXCJDbG9zZUxpc3RDcmVhdGlvbkZvcm1cIiwgY2xvc2VMaXN0Rm9ybSk7XG5cblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvQ3JlYXRlTmV3TGlzdFwiLCBnZXRMaXN0Rm9ybURhdGEpO1xuUHViU3ViLm9uKFwiTGlzdERhdGFJc05vdFJlcXVpcmVkXCIsIHJlc2V0TGlzdEZvcm0pO1xuIiwiaW1wb3J0IFwiLi9saXN0LWNyZWF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZWdpc3RyYXRvclwiO1xuaW1wb3J0IFwiLi9saXN0LXJlbmRlcmVyXCI7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4vbGlzdFwiO1xuXG5mdW5jdGlvbiBjcmVhdGVOZXdMaXN0KGRhdGEpIHtcbiAgY29uc3QgbGlzdCA9IG5ldyBMaXN0KGRhdGEpO1xuICBQdWJTdWIuZW1pdChcIkxpc3RQZW5kaW5nXCIsIGxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkxpc3REYXRhSXNOb3RSZXF1aXJlZFwiKTtcbn1cblxuUHViU3ViLm9uKFwiR290TGlzdERhdGFcIiwgY3JlYXRlTmV3TGlzdCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4uL1B1YlN1YlwiKTtcblxuY29uc3QgTElTVF9SRUdJU1RSWSA9IHt9O1xuXG5mdW5jdGlvbiBhZGRMaXN0VG9SZWdpc3RyeShsaXN0KSB7XG4gIGlmIChsaXN0Lm5hbWUgaW4gTElTVF9SRUdJU1RSWSkge1xuICAgIGxpc3QubmFtZSA9IG1ha2VMaXN0TmFtZVVuaXF1ZShsaXN0Lm5hbWUpO1xuICB9XG4gIExJU1RfUkVHSVNUUllbbGlzdC5uYW1lXSA9IGxpc3Q7XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFJlZ2lzdGVyZWRcIiwgbGlzdCk7XG4gIGNvbnNvbGUubG9nKExJU1RfUkVHSVNUUlkpO1xufVxuXG5mdW5jdGlvbiBtYWtlTGlzdE5hbWVVbmlxdWUobmFtZSkge1xuICBsZXQgaW5kZXggPSAwO1xuICB3aGlsZSAobmFtZSBpbiBMSVNUX1JFR0lTVFJZKSB7XG4gICAgbmFtZSA9IG5hbWUuc3BsaXQoL1xcZCQvKVswXSArIGluZGV4O1xuICAgIGluZGV4Kys7XG4gIH1cbiAgcmV0dXJuIG5hbWU7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkobGlzdE5hbWUpIHtcbiAgZGVsZXRlIExJU1RfUkVHSVNUUllbbGlzdE5hbWVdO1xuICBjb25zb2xlLmxvZyhMSVNUX1JFR0lTVFJZKTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdFBlbmRpbmdcIiwgYWRkTGlzdFRvUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KTtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcblxuY29uc3QgbGlzdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RzXCIpO1xuXG5mdW5jdGlvbiByZW5kZXJMaXN0KGxpc3QpIHtcbiAgY29uc3QgbGlzdERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxpc3REaXYuY2xhc3NMaXN0LmFkZChcImxpc3RcIik7XG4gIGxpc3REaXYuc3R5bGUuYm9yZGVyQ29sb3IgPSBsaXN0LmNvbG9yO1xuICBsaXN0RGl2LmRhdGFzZXQubGlzdElkID0gbGlzdC5uYW1lO1xuICBsaXN0RGlzcGxheS5hcHBlbmQobGlzdERpdik7XG5cbiAgY29uc3QgbGlzdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxpc3RSb3cuY2xhc3NMaXN0LmFkZChcImxpc3Qtcm93XCIpO1xuICBsaXN0RGl2LmFwcGVuZChsaXN0Um93KTtcblxuICBjb25zdCBsaXN0TmFtZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGlzdE5hbWVUZXh0LmNsYXNzTGlzdC5hZGQoXCJsaXN0LW5hbWVcIik7XG4gIGxpc3ROYW1lVGV4dC50ZXh0Q29udGVudCA9IGxpc3QubmFtZTtcbiAgbGlzdFJvdy5hcHBlbmQobGlzdE5hbWVUZXh0KTtcblxuICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKFwibGlzdC1idXR0b25zXCIpO1xuICBsaXN0Um93LmFwcGVuZChidXR0b25zRGl2KTtcblxuICByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KTtcblxuICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgbGlzdERpdi5hcHBlbmQoaHIpO1xuXG4gIGNvbnN0IHRhc2tzU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tzU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFza3Mtc2VjdGlvblwiKTtcbiAgbGlzdERpdi5hcHBlbmQodGFza3NTZWN0aW9uKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdikge1xuICBPYmplY3QudmFsdWVzKGxpc3QuYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uc0Rpdi5hcHBlbmQoYnV0dG9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldHVwQWxsTGlzdEJ1dHRvbk5hbWVzKGxpc3QpIHtcbiAgbGlzdC5SZW1vdmVMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJ4XCI7XG4gIGxpc3QuRWRpdExpc3RCdXR0b24udGV4dENvbnRlbnQgPSBcImVkaXRcIjtcbiAgbGlzdC5Tb3J0TGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwic29ydFwiO1xuICBsaXN0LkFkZFRhc2tCdXR0b24udGV4dENvbnRlbnQgPSBcIitcIjtcbn1cblxuZnVuY3Rpb24gc3RvcFJlbmRlcmluZ0xpc3QobGlzdE5hbWUpIHtcbiAgY29uc3QgbGlzdERpdiA9IGxpc3REaXNwbGF5LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWxpc3QtaWQ9JyR7bGlzdE5hbWV9J11gKTtcbiAgbGlzdERpdi5yZW1vdmUoKTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdFBlbmRpbmdcIiwgc2V0dXBBbGxMaXN0QnV0dG9uTmFtZXMpO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdGVyZWRcIiwgcmVuZGVyTGlzdCk7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHN0b3BSZW5kZXJpbmdMaXN0KTtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcblxuZXhwb3J0IGNsYXNzIExpc3Qge1xuICBUQVNLX1JFR0lTVFJZID0gW107XG5cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvcjtcblxuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5SZW1vdmVMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgdGhpcy5uYW1lKTtcbiAgICB9KTtcbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgdGhpcy5idXR0b25zID0ge1xuICAgICAgUmVtb3ZlTGlzdEJ1dHRvbjogdGhpcy5SZW1vdmVMaXN0QnV0dG9uLFxuICAgICAgU29ydExpc3RCdXR0b246IHRoaXMuU29ydExpc3RCdXR0b24sXG4gICAgICBFZGl0TGlzdEJ1dHRvbjogdGhpcy5FZGl0TGlzdEJ1dHRvbixcbiAgICAgIEFkZFRhc2tCdXR0b246IHRoaXMuQWRkVGFza0J1dHRvbixcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RDcmVhdGlvbkZvcm1PcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1jcmVhdGlvbi1mb3JtLW9wZW4tYnV0dG9uXCJcbik7XG5saXN0Q3JlYXRpb25Gb3JtT3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIk9wZW5MaXN0Q3JlYXRpb25Gb3JtXCIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBsaXN0Q3JlYXRpb25Gb3JtQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJsaXN0LWNyZWF0aW9uLWZvcm0tY2xvc2UtYnV0dG9uXCJcbik7XG5saXN0Q3JlYXRpb25Gb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUxpc3RDcmVhdGlvbkZvcm1cIik7XG59KTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUxpc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZS1saXN0LWJ1dHRvblwiKTtcbmNyZWF0ZUxpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUxpc3RDcmVhdGlvbkZvcm1cIik7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9DcmVhdGVOZXdMaXN0XCIpO1xufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi91bmlxdWUtYnV0dG9uLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlXCI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=