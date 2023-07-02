/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./src/PubSub.js":
      /*!***********************!*\
  !*** ./src/PubSub.js ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PubSub: () => /* binding */ PubSub,
          /* harmony export */
        });
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

        /***/
      },

    /***/ "./src/form-manager.js":
      /*!*****************************!*\
  !*** ./src/form-manager.js ***!
  \*****************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        const { PubSub } = __webpack_require__(
          /*! ./PubSub */ "./src/PubSub.js"
        );

        const MODES = { CREATION: 0, EDITING: 1 };

        const listForm = {
          background: document.getElementById("list-form-background"),
          form: document
            .getElementById("list-form-background")
            .querySelector("form"),
          mode: MODES.CREATION,
        };

        function openListForm() {
          listForm.background.style.display = "flex";
        }

        function closeListForm() {
          listForm.background.style.display = "none";
          // resetListForm();
        }

        function getListFormData() {
          const listFormInputs = listForm.background.querySelectorAll("input");
          const data = {};
          listFormInputs.forEach((current) => {
            const inputContentType = current.id;
            data[inputContentType] = current.value;
          });
          if (listForm.mode === MODES.CREATION) {
            PubSub.emit("ListIsReadyForCreation", data);
          } else if (listForm.mode === MODES.EDITING) {
            const listData = {
              data,
              newListName: listForm.form.dataset.editableList,
            };
            PubSub.emit("UserWantsToEditList", listData);
          }
        }

        function prepareListFormForEditing(list) {
          listForm.mode = MODES.EDITING;
          listForm.form.querySelectorAll("input").forEach((current) => {
            current.value = list[current.id];
          });
          listForm.form.dataset.editableList = list.name;
        }

        function resetListForm() {
          listForm.form.reset();
        }

        PubSub.on("OpenListForm", openListForm);
        PubSub.on("CloseListForm", closeListForm);

        PubSub.on("UserFinishedUsingListForm", getListFormData);
        PubSub.on("UserWantsToEditList", prepareListFormForEditing);

        /***/
      },

    /***/ "./src/listManagement/list-bundle.js":
      /*!*******************************************!*\
  !*** ./src/listManagement/list-bundle.js ***!
  \*******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _list_creator__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./list-creator */ "./src/listManagement/list-creator.js"
          );
        /* harmony import */ var _list_registrator__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./list-registrator */ "./src/listManagement/list-registrator.js"
          );
        /* harmony import */ var _list_registrator__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _list_registrator__WEBPACK_IMPORTED_MODULE_1__
          );
        /* harmony import */ var _list_renderer__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./list-renderer */ "./src/listManagement/list-renderer.js"
          );

        /***/
      },

    /***/ "./src/listManagement/list-creator.js":
      /*!********************************************!*\
  !*** ./src/listManagement/list-creator.js ***!
  \********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
        /* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./list */ "./src/listManagement/list.js");

        function createNewList(data) {
          const list = new _list__WEBPACK_IMPORTED_MODULE_1__.List(data);
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
        }

        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListIsReadyForCreation",
          createNewList
        );

        /***/
      },

    /***/ "./src/listManagement/list-registrator.js":
      /*!************************************************!*\
  !*** ./src/listManagement/list-registrator.js ***!
  \************************************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        const { PubSub } = __webpack_require__(
          /*! ../PubSub */ "./src/PubSub.js"
        );

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

        function editList(listData) {
          const editableList = LIST_REGISTRY[listData.newListName];
          for (let dataName in listData.data) {
            const dataValue = listData.data[dataName];
            editableList[dataName] = dataValue;
          }
          PubSub.emit("listShouldBeRerendered", listData);
        }

        PubSub.on("ListPending", addListToRegistry);
        PubSub.on("ListShouldBeRemoved", removeListFromRegistry);
        PubSub.on("UserWantsToEditList", editList);

        /***/
      },

    /***/ "./src/listManagement/list-renderer.js":
      /*!*********************************************!*\
  !*** ./src/listManagement/list-renderer.js ***!
  \*********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");

        const listDisplay = document.getElementById("lists");

        function renderListUponCreation(list) {
          const listDiv = document.createElement("div");
          listDiv.classList.add("list");
          listDiv.style.borderColor = list.color;
          listDiv.dataset.newListName = list.name;
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
          const listDiv = listDisplay.querySelector(
            `[data-list-id='${listName}']`
          );
          listDiv.remove();
        }

        function rerenderList(listData) {
          const listDiv = listDisplay.querySelector(
            `[data-list-id="${listData.newListName}"]`
          );
          const listNameText = listDiv.querySelector(".list-name");
          listNameText.textContent = listData.data.name;
        }

        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListPending",
          setupAllListButtonNames
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListRegistered",
          renderListUponCreation
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListShouldBeRemoved",
          stopRenderingList
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "listShouldBeRerendered",
          rerenderList
        );

        /***/
      },

    /***/ "./src/listManagement/list.js":
      /*!************************************!*\
  !*** ./src/listManagement/list.js ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ List: () => /* binding */ List,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");

        class List {
          TASK_REGISTRY = [];

          constructor(data) {
            this.name = data.name || "Unnamed";
            this.color = data.color;

            this.RemoveListButton = document.createElement("button");
            this.RemoveListButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "ListShouldBeRemoved",
                this.name
              );
            });
            this.SortListButton = document.createElement("button");
            this.EditListButton = document.createElement("button");
            this.EditListButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "UserWantsToEditList",
                this
              );
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenListForm");
            });
            this.AddTaskButton = document.createElement("button");

            this.buttons = {
              RemoveListButton: this.RemoveListButton,
              SortListButton: this.SortListButton,
              EditListButton: this.EditListButton,
              AddTaskButton: this.AddTaskButton,
            };
          }
        }

        /***/
      },

    /***/ "./src/unique-button-manager.js":
      /*!**************************************!*\
  !*** ./src/unique-button-manager.js ***!
  \**************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ finishUsingListFormButton: () =>
            /* binding */ finishUsingListFormButton,
          /* harmony export */ listCreationFormCloseButton: () =>
            /* binding */ listCreationFormCloseButton,
          /* harmony export */ listCreationFormOpenButton: () =>
            /* binding */ listCreationFormOpenButton,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");

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
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseListForm");
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "UserFinishedUsingListForm"
          );
        });

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
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
    /* harmony import */ var _unique_button_manager__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./unique-button-manager */ "./src/unique-button-manager.js"
      );
    /* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(/*! ./form-manager */ "./src/form-manager.js");
    /* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1___default =
      /*#__PURE__*/ __webpack_require__.n(
        _form_manager__WEBPACK_IMPORTED_MODULE_1__
      );
    /* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(
        /*! ./listManagement/list-bundle */ "./src/listManagement/list-bundle.js"
      );
  })();

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDVDtBQUNjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9QdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVnaXN0cmF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3VuaXF1ZS1idXR0b24tbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBQdWJTdWIgPSAoKCkgPT4ge1xuICBjb25zdCBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkgPSAtMTtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgZnVuY3Rpb24gZGVidWdFdmVudEFubm91bmNlKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtkZWJ1Z10gRVZFTlQgJHtldmVudH0gSVMgQ0FMTEVEYCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2ZW50LCBwYXJhbSA9IG51bGwpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZGVidWdFdmVudEFubm91bmNlKGV2ZW50KTtcbiAgICAgIGZvciAobGV0IGZ1bmMgb2YgZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICBmdW5jKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFRoZXJlIGlzIG5vIGV2ZW50IHdpdGggYSBuYW1lICcke2V2ZW50fSdgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBldmVudHNbZXZlbnRdLnB1c2goZnVuYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50c1tldmVudF0gPSBbZnVuY107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGNvbnN0IGluZGV4T2ZHaXZlbkZ1bmN0aW9uID0gZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZ1bmMpO1xuICAgICAgaWYgKGluZGV4T2ZHaXZlbkZ1bmN0aW9uICE9PSBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkpIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXhPZkdpdmVuRnVuY3Rpb24sIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcbiAgICAgICAgYFRoZXJlIGlzIGVpdGhlciBubyBzdWNoIGV2ZW50ICgke2V2ZW50fSkgcmVnaXN0ZXJlZCwgb3IgeW91ciBmdW5jdGlvbiBpc24ndCBwcmVzZW50IHRoZXJlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBlbWl0LCBvbiwgb2ZmIH07XG59KSgpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuL1B1YlN1YlwiKTtcblxuY29uc3QgTU9ERVMgPSB7IENSRUFUSU9OOiAwLCBFRElUSU5HOiAxIH07XG5cbmNvbnN0IGxpc3RGb3JtID0ge1xuICBiYWNrZ3JvdW5kOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3QtZm9ybS1iYWNrZ3JvdW5kXCIpLFxuICBmb3JtOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3QtZm9ybS1iYWNrZ3JvdW5kXCIpLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLFxuICBtb2RlOiBNT0RFUy5DUkVBVElPTixcbn07XG5cbmZ1bmN0aW9uIG9wZW5MaXN0Rm9ybSgpIHtcbiAgbGlzdEZvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJmbGV4XCI7XG59XG5cbmZ1bmN0aW9uIGNsb3NlTGlzdEZvcm0oKSB7XG4gIGxpc3RGb3JtLmJhY2tncm91bmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAvLyByZXNldExpc3RGb3JtKCk7XG59XG5cbmZ1bmN0aW9uIGdldExpc3RGb3JtRGF0YSgpIHtcbiAgY29uc3QgbGlzdEZvcm1JbnB1dHMgPSBsaXN0Rm9ybS5iYWNrZ3JvdW5kLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKTtcbiAgY29uc3QgZGF0YSA9IHt9O1xuICBsaXN0Rm9ybUlucHV0cy5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgY29uc3QgaW5wdXRDb250ZW50VHlwZSA9IGN1cnJlbnQuaWQ7XG4gICAgZGF0YVtpbnB1dENvbnRlbnRUeXBlXSA9IGN1cnJlbnQudmFsdWU7XG4gIH0pO1xuICBpZiAobGlzdEZvcm0ubW9kZSA9PT0gTU9ERVMuQ1JFQVRJT04pIHtcbiAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvQ3JlYXRlTGlzdFwiLCBkYXRhKTtcbiAgfSBlbHNlIGlmIChsaXN0Rm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgY29uc3QgbGlzdERhdGEgPSB7IGRhdGEsIGxpc3RJRDogbGlzdEZvcm0uZm9ybS5kYXRhc2V0LmVkaXRhYmxlTGlzdCB9O1xuICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCBsaXN0RGF0YSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHJlcGFyZUxpc3RGb3JtRm9yRWRpdGluZyhsaXN0KSB7XG4gIGxpc3RGb3JtLm1vZGUgPSBNT0RFUy5FRElUSU5HO1xuICBsaXN0Rm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFwiKS5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgY3VycmVudC52YWx1ZSA9IGxpc3RbY3VycmVudC5pZF07XG4gIH0pO1xuICBsaXN0Rm9ybS5mb3JtLmRhdGFzZXQuZWRpdGFibGVMaXN0ID0gbGlzdC5uYW1lO1xufVxuXG5mdW5jdGlvbiByZXNldExpc3RGb3JtKCkge1xuICBsaXN0Rm9ybS5mb3JtLnJlc2V0KCk7XG59XG5cblB1YlN1Yi5vbihcIk9wZW5MaXN0Rm9ybVwiLCBvcGVuTGlzdEZvcm0pO1xuUHViU3ViLm9uKFwiQ2xvc2VMaXN0Rm9ybVwiLCBjbG9zZUxpc3RGb3JtKTtcblxuUHViU3ViLm9uKFwiVXNlckZpbmlzaGVkVXNpbmdMaXN0Rm9ybVwiLCBnZXRMaXN0Rm9ybURhdGEpO1xuUHViU3ViLm9uKFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCBwcmVwYXJlTGlzdEZvcm1Gb3JFZGl0aW5nKTtcbiIsImltcG9ydCBcIi4vbGlzdC1jcmVhdG9yXCI7XG5pbXBvcnQgXCIuL2xpc3QtcmVnaXN0cmF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2xpc3RcIjtcblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChkYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChkYXRhKTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UGVuZGluZ1wiLCBsaXN0KTtcbn1cblxuUHViU3ViLm9uKFwiVXNlcldhbnRzVG9DcmVhdGVMaXN0XCIsIGNyZWF0ZU5ld0xpc3QpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5cbmNvbnN0IExJU1RfUkVHSVNUUlkgPSB7fTtcblxuZnVuY3Rpb24gYWRkTGlzdFRvUmVnaXN0cnkobGlzdCkge1xuICBpZiAobGlzdC5uYW1lIGluIExJU1RfUkVHSVNUUlkpIHtcbiAgICBsaXN0Lm5hbWUgPSBtYWtlTGlzdE5hbWVVbmlxdWUobGlzdC5uYW1lKTtcbiAgfVxuICBMSVNUX1JFR0lTVFJZW2xpc3QubmFtZV0gPSBsaXN0O1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RlcmVkXCIsIGxpc3QpO1xuICBjb25zb2xlLmxvZyhMSVNUX1JFR0lTVFJZKTtcbn1cblxuZnVuY3Rpb24gbWFrZUxpc3ROYW1lVW5pcXVlKG5hbWUpIHtcbiAgbGV0IGluZGV4ID0gMDtcbiAgd2hpbGUgKG5hbWUgaW4gTElTVF9SRUdJU1RSWSkge1xuICAgIG5hbWUgPSBuYW1lLnNwbGl0KC9cXGQkLylbMF0gKyBpbmRleDtcbiAgICBpbmRleCsrO1xuICB9XG4gIHJldHVybiBuYW1lO1xufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KGxpc3ROYW1lKSB7XG4gIGRlbGV0ZSBMSVNUX1JFR0lTVFJZW2xpc3ROYW1lXTtcbiAgY29uc29sZS5sb2coTElTVF9SRUdJU1RSWSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IGVkaXRhYmxlTGlzdCA9IExJU1RfUkVHSVNUUllbbGlzdERhdGEubGlzdElEXTtcbiAgZm9yIChsZXQgZGF0YU5hbWUgaW4gbGlzdERhdGEuZGF0YSkge1xuICAgIGNvbnN0IGRhdGFWYWx1ZSA9IGxpc3REYXRhLmRhdGFbZGF0YU5hbWVdO1xuICAgIGVkaXRhYmxlTGlzdFtkYXRhTmFtZV0gPSBkYXRhVmFsdWU7XG4gIH1cbiAgUHViU3ViLmVtaXQoXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIGxpc3REYXRhKTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdFBlbmRpbmdcIiwgYWRkTGlzdFRvUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgZWRpdExpc3QpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuXG5jb25zdCBsaXN0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdHNcIik7XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3RVcG9uQ3JlYXRpb24obGlzdCkge1xuICBjb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdERpdi5jbGFzc0xpc3QuYWRkKFwibGlzdFwiKTtcbiAgbGlzdERpdi5zdHlsZS5ib3JkZXJDb2xvciA9IGxpc3QuY29sb3I7XG4gIGxpc3REaXYuZGF0YXNldC5saXN0SWQgPSBsaXN0Lm5hbWU7XG4gIGxpc3REaXNwbGF5LmFwcGVuZChsaXN0RGl2KTtcblxuICBjb25zdCBsaXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdFJvdy5jbGFzc0xpc3QuYWRkKFwibGlzdC1yb3dcIik7XG4gIGxpc3REaXYuYXBwZW5kKGxpc3RSb3cpO1xuXG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsaXN0TmFtZVRleHQuY2xhc3NMaXN0LmFkZChcImxpc3QtbmFtZVwiKTtcbiAgbGlzdE5hbWVUZXh0LnRleHRDb250ZW50ID0gbGlzdC5uYW1lO1xuICBsaXN0Um93LmFwcGVuZChsaXN0TmFtZVRleHQpO1xuXG4gIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJsaXN0LWJ1dHRvbnNcIik7XG4gIGxpc3RSb3cuYXBwZW5kKGJ1dHRvbnNEaXYpO1xuXG4gIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpO1xuXG4gIGNvbnN0IGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICBsaXN0RGl2LmFwcGVuZChocik7XG5cbiAgY29uc3QgdGFza3NTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza3NTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrcy1zZWN0aW9uXCIpO1xuICBsaXN0RGl2LmFwcGVuZCh0YXNrc1NlY3Rpb24pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KSB7XG4gIE9iamVjdC52YWx1ZXMobGlzdC5idXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b25zRGl2LmFwcGVuZChidXR0b24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0dXBBbGxMaXN0QnV0dG9uTmFtZXMobGlzdCkge1xuICBsaXN0LlJlbW92ZUxpc3RCdXR0b24udGV4dENvbnRlbnQgPSBcInhcIjtcbiAgbGlzdC5FZGl0TGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiZWRpdFwiO1xuICBsaXN0LlNvcnRMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJzb3J0XCI7XG4gIGxpc3QuQWRkVGFza0J1dHRvbi50ZXh0Q29udGVudCA9IFwiK1wiO1xufVxuXG5mdW5jdGlvbiBzdG9wUmVuZGVyaW5nTGlzdChsaXN0TmFtZSkge1xuICBjb25zdCBsaXN0RGl2ID0gbGlzdERpc3BsYXkucXVlcnlTZWxlY3RvcihgW2RhdGEtbGlzdC1pZD0nJHtsaXN0TmFtZX0nXWApO1xuICBsaXN0RGl2LnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiByZXJlbmRlckxpc3QobGlzdERhdGEpIHtcbiAgY29uc3QgbGlzdERpdiA9IGxpc3REaXNwbGF5LnF1ZXJ5U2VsZWN0b3IoXG4gICAgYFtkYXRhLWxpc3QtaWQ9XCIke2xpc3REYXRhLmxpc3RJRH1cIl1gXG4gICk7XG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGxpc3REaXYucXVlcnlTZWxlY3RvcihcIi5saXN0LW5hbWVcIik7XG4gIGxpc3ROYW1lVGV4dC50ZXh0Q29udGVudCA9IGxpc3REYXRhLmRhdGEubmFtZTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdFBlbmRpbmdcIiwgc2V0dXBBbGxMaXN0QnV0dG9uTmFtZXMpO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdGVyZWRcIiwgcmVuZGVyTGlzdFVwb25DcmVhdGlvbik7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHN0b3BSZW5kZXJpbmdMaXN0KTtcblB1YlN1Yi5vbihcImxpc3RTaG91bGRCZVJlcmVuZGVyZWRcIiwgcmVyZW5kZXJMaXN0KTtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcblxuZXhwb3J0IGNsYXNzIExpc3Qge1xuICBUQVNLX1JFR0lTVFJZID0gW107XG5cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvcjtcblxuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5SZW1vdmVMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgdGhpcy5uYW1lKTtcbiAgICB9KTtcbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgdGhpcyk7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5MaXN0Rm9ybVwiKTtcbiAgICB9KTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXG4gICAgdGhpcy5idXR0b25zID0ge1xuICAgICAgUmVtb3ZlTGlzdEJ1dHRvbjogdGhpcy5SZW1vdmVMaXN0QnV0dG9uLFxuICAgICAgU29ydExpc3RCdXR0b246IHRoaXMuU29ydExpc3RCdXR0b24sXG4gICAgICBFZGl0TGlzdEJ1dHRvbjogdGhpcy5FZGl0TGlzdEJ1dHRvbixcbiAgICAgIEFkZFRhc2tCdXR0b246IHRoaXMuQWRkVGFza0J1dHRvbixcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RDcmVhdGlvbkZvcm1PcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1jcmVhdGlvbi1mb3JtLW9wZW4tYnV0dG9uXCJcbik7XG5saXN0Q3JlYXRpb25Gb3JtT3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIk9wZW5MaXN0Rm9ybVwiKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgbGlzdENyZWF0aW9uRm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1jcmVhdGlvbi1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xubGlzdENyZWF0aW9uRm9ybUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VMaXN0Rm9ybVwiKTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbiA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLWxpc3QtYnV0dG9uXCIpO1xuZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlTGlzdEZvcm1cIik7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdMaXN0Rm9ybVwiKTtcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZVwiO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
