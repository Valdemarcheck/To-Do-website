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

/***/ "./src/create-list-button.js":
/*!***********************************!*\
  !*** ./src/create-list-button.js ***!
  \***********************************/
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


/***/ }),

/***/ "./src/form-manager.js":
/*!*****************************!*\
  !*** ./src/form-manager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { PubSub } = __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");

const listFormBackground = document.querySelector(".form-background.list");

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

PubSub.on("OpenListCreationForm", openListForm);
PubSub.on("CloseListCreationForm", closeListForm);

PubSub.on("ListDataIsRequired", getListFormData);


/***/ }),

/***/ "./src/listManagement/list-creation-manager.js":
/*!*****************************************************!*\
  !*** ./src/listManagement/list-creation-manager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list */ "./src/listManagement/list.js");



function createNewList(data) {
  const list = new _list__WEBPACK_IMPORTED_MODULE_1__.List(data);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
}

function askForListData() {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListDataIsRequired");
}

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("UserWantsToCreateNewList", askForListData);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("GotListData", createNewList);


/***/ }),

/***/ "./src/listManagement/list-registry-manager.js":
/*!*****************************************************!*\
  !*** ./src/listManagement/list-registry-manager.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { PubSub } = __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");

const LIST_REGISTRY = {};

function addListToRegistry(list) {
  if (list.name in LIST_REGISTRY) {
    list.name = makeListNameUnique(list.name);
  }
  LIST_REGISTRY[list.name] = list;
  console.log(LIST_REGISTRY);
}

function makeListNameUnique(name) {
  let index = 0;
  while (name in LIST_REGISTRY) {
    name = name.split(" ")[0] + " " + index;
    console.log(name);
    setTimeout(() => {
      return;
    }, 1000);
    index++;
  }
  return name;
}

PubSub.on("ListPending", addListToRegistry);


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
class List {
  TASK_REGISTRY = [];

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;
  }
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
/* harmony import */ var _create_list_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./create-list-button */ "./src/create-list-button.js");
/* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form-manager */ "./src/form-manager.js");
/* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_form_manager__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _listManagement_list_creation_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listManagement/list-creation-manager */ "./src/listManagement/list-creation-manager.js");
/* harmony import */ var _listManagement_list_registry_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listManagement/list-registry-manager */ "./src/listManagement/list-registry-manager.js");
/* harmony import */ var _listManagement_list_registry_manager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_listManagement_list_registry_manager__WEBPACK_IMPORTED_MODULE_3__);





})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQyxPQUFPO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTiw4Q0FBOEMsTUFBTTtBQUNwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBOztBQUVBLFdBQVc7QUFDWCxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekNpQzs7QUFFM0I7QUFDUDtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJDQUFNO0FBQ1IsQ0FBQzs7QUFFTTtBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMkNBQU07QUFDUixDQUFDOztBQUVNO0FBQ1A7QUFDQSxFQUFFLDJDQUFNO0FBQ1IsRUFBRSwyQ0FBTTtBQUNSLENBQUM7Ozs7Ozs7Ozs7O0FDcEJELFFBQVEsU0FBUyxFQUFFLG1CQUFPLENBQUMsaUNBQVU7O0FBRXJDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDekJtQztBQUNMOztBQUU5QjtBQUNBLG1CQUFtQix1Q0FBSTtBQUN2QixFQUFFLDJDQUFNO0FBQ1I7O0FBRUE7QUFDQSxFQUFFLDJDQUFNO0FBQ1I7O0FBRUEsMkNBQU07QUFDTiwyQ0FBTTs7Ozs7Ozs7Ozs7QUNiTixRQUFRLFNBQVMsRUFBRSxtQkFBTyxDQUFDLGtDQUFXOztBQUV0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3pCTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNQQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjhCO0FBQ047QUFDd0I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvUHViU3ViLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvY3JlYXRlLWxpc3QtYnV0dG9uLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvZm9ybS1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1jcmVhdGlvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZWdpc3RyeS1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBQdWJTdWIgPSAoKCkgPT4ge1xuICBjb25zdCBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkgPSAtMTtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgZnVuY3Rpb24gZGVidWdFdmVudEFubm91bmNlKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtkZWJ1Z10gRVZFTlQgJHtldmVudH0gSVMgQ0FMTEVEYCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2ZW50LCBwYXJhbSA9IG51bGwpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZGVidWdFdmVudEFubm91bmNlKGV2ZW50KTtcbiAgICAgIGZvciAobGV0IGZ1bmMgb2YgZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICBmdW5jKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFRoZXJlIGlzIG5vIGV2ZW50IHdpdGggYSBuYW1lICcke2V2ZW50fSdgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBldmVudHNbZXZlbnRdLnB1c2goZnVuYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50c1tldmVudF0gPSBbZnVuY107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGNvbnN0IGluZGV4T2ZHaXZlbkZ1bmN0aW9uID0gZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZ1bmMpO1xuICAgICAgaWYgKGluZGV4T2ZHaXZlbkZ1bmN0aW9uICE9PSBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkpIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXhPZkdpdmVuRnVuY3Rpb24sIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcbiAgICAgICAgYFRoZXJlIGlzIGVpdGhlciBubyBzdWNoIGV2ZW50ICgke2V2ZW50fSkgcmVnaXN0ZXJlZCwgb3IgeW91ciBmdW5jdGlvbiBpc24ndCBwcmVzZW50IHRoZXJlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBldmVudHMsIGVtaXQsIG9uLCBvZmYgfTtcbn0pKCk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RDcmVhdGlvbkZvcm1PcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1jcmVhdGlvbi1mb3JtLW9wZW4tYnV0dG9uXCJcbik7XG5saXN0Q3JlYXRpb25Gb3JtT3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIk9wZW5MaXN0Q3JlYXRpb25Gb3JtXCIpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBsaXN0Q3JlYXRpb25Gb3JtQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJsaXN0LWNyZWF0aW9uLWZvcm0tY2xvc2UtYnV0dG9uXCJcbik7XG5saXN0Q3JlYXRpb25Gb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUxpc3RDcmVhdGlvbkZvcm1cIik7XG59KTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUxpc3RCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZS1saXN0LWJ1dHRvblwiKTtcbmNyZWF0ZUxpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUxpc3RDcmVhdGlvbkZvcm1cIik7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9DcmVhdGVOZXdMaXN0XCIpO1xufSk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4vUHViU3ViXCIpO1xuXG5jb25zdCBsaXN0Rm9ybUJhY2tncm91bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm0tYmFja2dyb3VuZC5saXN0XCIpO1xuXG5mdW5jdGlvbiBvcGVuTGlzdEZvcm0oKSB7XG4gIGxpc3RGb3JtQmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTGlzdEZvcm0oKSB7XG4gIGxpc3RGb3JtQmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbmZ1bmN0aW9uIGdldExpc3RGb3JtRGF0YSgpIHtcbiAgY29uc3QgbGlzdEZvcm0gPSBsaXN0Rm9ybUJhY2tncm91bmQucXVlcnlTZWxlY3RvckFsbChcImlucHV0XCIpO1xuICBjb25zdCBkYXRhID0ge307XG4gIGxpc3RGb3JtLmZvckVhY2goKGN1cnJlbnQpID0+IHtcbiAgICBjb25zdCBpbnB1dENvbnRlbnRUeXBlID0gY3VycmVudC5pZDtcbiAgICBkYXRhW2lucHV0Q29udGVudFR5cGVdID0gY3VycmVudC52YWx1ZTtcbiAgfSk7XG4gIFB1YlN1Yi5lbWl0KFwiR290TGlzdERhdGFcIiwgZGF0YSk7XG59XG5cblB1YlN1Yi5vbihcIk9wZW5MaXN0Q3JlYXRpb25Gb3JtXCIsIG9wZW5MaXN0Rm9ybSk7XG5QdWJTdWIub24oXCJDbG9zZUxpc3RDcmVhdGlvbkZvcm1cIiwgY2xvc2VMaXN0Rm9ybSk7XG5cblB1YlN1Yi5vbihcIkxpc3REYXRhSXNSZXF1aXJlZFwiLCBnZXRMaXN0Rm9ybURhdGEpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2xpc3RcIjtcblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChkYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChkYXRhKTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UGVuZGluZ1wiLCBsaXN0KTtcbn1cblxuZnVuY3Rpb24gYXNrRm9yTGlzdERhdGEoKSB7XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdERhdGFJc1JlcXVpcmVkXCIpO1xufVxuXG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0NyZWF0ZU5ld0xpc3RcIiwgYXNrRm9yTGlzdERhdGEpO1xuUHViU3ViLm9uKFwiR290TGlzdERhdGFcIiwgY3JlYXRlTmV3TGlzdCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4uL1B1YlN1YlwiKTtcblxuY29uc3QgTElTVF9SRUdJU1RSWSA9IHt9O1xuXG5mdW5jdGlvbiBhZGRMaXN0VG9SZWdpc3RyeShsaXN0KSB7XG4gIGlmIChsaXN0Lm5hbWUgaW4gTElTVF9SRUdJU1RSWSkge1xuICAgIGxpc3QubmFtZSA9IG1ha2VMaXN0TmFtZVVuaXF1ZShsaXN0Lm5hbWUpO1xuICB9XG4gIExJU1RfUkVHSVNUUllbbGlzdC5uYW1lXSA9IGxpc3Q7XG4gIGNvbnNvbGUubG9nKExJU1RfUkVHSVNUUlkpO1xufVxuXG5mdW5jdGlvbiBtYWtlTGlzdE5hbWVVbmlxdWUobmFtZSkge1xuICBsZXQgaW5kZXggPSAwO1xuICB3aGlsZSAobmFtZSBpbiBMSVNUX1JFR0lTVFJZKSB7XG4gICAgbmFtZSA9IG5hbWUuc3BsaXQoXCIgXCIpWzBdICsgXCIgXCIgKyBpbmRleDtcbiAgICBjb25zb2xlLmxvZyhuYW1lKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHJldHVybjtcbiAgICB9LCAxMDAwKTtcbiAgICBpbmRleCsrO1xuICB9XG4gIHJldHVybiBuYW1lO1xufVxuXG5QdWJTdWIub24oXCJMaXN0UGVuZGluZ1wiLCBhZGRMaXN0VG9SZWdpc3RyeSk7XG4iLCJleHBvcnQgY2xhc3MgTGlzdCB7XG4gIFRBU0tfUkVHSVNUUlkgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lIHx8IFwiVW5uYW1lZFwiO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yO1xuICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9jcmVhdGUtbGlzdC1idXR0b25cIjtcbmltcG9ydCBcIi4vZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2xpc3RNYW5hZ2VtZW50L2xpc3QtY3JlYXRpb24tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9saXN0TWFuYWdlbWVudC9saXN0LXJlZ2lzdHJ5LW1hbmFnZXJcIjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==