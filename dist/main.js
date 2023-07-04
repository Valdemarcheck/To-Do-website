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
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ FORM_REGISTRY: () => /* binding */ FORM_REGISTRY,
          /* harmony export */
        });
        const { PubSub } = __webpack_require__(
          /*! ./PubSub */ "./src/PubSub.js"
        );

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

        /***/
      },

    /***/ "./src/listManagement/default-list.js":
      /*!********************************************!*\
  !*** ./src/listManagement/default-list.js ***!
  \********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ DefaultList: () => /* binding */ DefaultList,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
        /* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ../form-manager */ "./src/form-manager.js");
        /* harmony import */ var _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../taskManagement/task-registrar */ "./src/taskManagement/task-registrar.js"
          );

        class DefaultList {
          TASK_REGISTRY = [];

          id = null;
          div = null;

          constructor(data) {
            this.taskRegistrar =
              new _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_2__.taskRegistrar(
                this
              );

            this.name = data.name || "Unnamed";
            this.color = data.color;

            this.SortListButton = document.createElement("button");
            this.SortListButton.textContent = "sort";

            this.AddTaskButton = document.createElement("button");
            this.AddTaskButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "OpenForm",
                _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task
              );
            });
            this.AddTaskButton.textContent = "+";

            this.buttons = {
              SortListButton: this.SortListButton,
              AddTaskButton: this.AddTaskButton,
            };
          }
        }

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
        /* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./list-registrar */ "./src/listManagement/list-registrar.js"
          );
        /* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _list_registrar__WEBPACK_IMPORTED_MODULE_1__
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
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ DEFAULT_LIST_ID: () =>
            /* binding */ DEFAULT_LIST_ID,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
        /* harmony import */ var _default_list__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./default-list */ "./src/listManagement/default-list.js"
          );
        /* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ./list */ "./src/listManagement/list.js");

        const DEFAULT_LIST_ID = "DEFAULT";

        function createDefaultList() {
          const creationData = { name: "Default", color: "#ccc" };
          const defaultList =
            new _default_list__WEBPACK_IMPORTED_MODULE_1__.DefaultList(
              creationData
            );
          defaultList.id = DEFAULT_LIST_ID;
          const listData = { list: defaultList, listId: defaultList.id };
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "DefaultListPending",
            listData
          );
        }

        function createNewList(newData) {
          const list = new _list__WEBPACK_IMPORTED_MODULE_2__.List(newData);
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
        }

        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListIsReadyForCreation",
          createNewList
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "CreateDefaultList",
          createDefaultList
        );

        /***/
      },

    /***/ "./src/listManagement/list-registrar.js":
      /*!**********************************************!*\
  !*** ./src/listManagement/list-registrar.js ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        const { PubSub } = __webpack_require__(
          /*! ../PubSub */ "./src/PubSub.js"
        );

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
        /* harmony import */ var _list_creator__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./list-creator */ "./src/listManagement/list-creator.js"
          );

        const listDisplay = document.getElementById("lists");

        function renderListUponCreation(listData) {
          const list = listData.list;

          const listDiv = document.createElement("div");
          listDiv.dataset.listId = listData.listId;
          list.div = listDiv;
          listDiv.classList.add("list");
          listDiv.style.borderColor = list.color;

          if (
            listData.listId ===
            _list_creator__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_LIST_ID
          ) {
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
          taskSection.classList.add("tasks-section");
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

        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "DefaultListPending",
          renderListUponCreation
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
        /* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ../form-manager */ "./src/form-manager.js");
        /* harmony import */ var _default_list__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./default-list */ "./src/listManagement/default-list.js"
          );

        class List extends _default_list__WEBPACK_IMPORTED_MODULE_2__.DefaultList {
          constructor(data) {
            super(data);
            this.EditListButton = document.createElement("button");
            this.EditListButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "UserWantsToEditList",
                this
              );
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "OpenForm",
                _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list
              );
            });
            this.EditListButton.textContent = "edit";

            this.RemoveListButton = document.createElement("button");
            this.RemoveListButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "ListShouldBeRemoved",
                this
              );
            });
            this.RemoveListButton.textContent = "x";

            this.buttons.RemoveListButton = this.RemoveListButton;
            this.buttons.EditListButton = this.EditListButton;
          }
        }

        /***/
      },

    /***/ "./src/taskManagement/task-creator.js":
      /*!********************************************!*\
  !*** ./src/taskManagement/task-creator.js ***!
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
        /* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./task */ "./src/taskManagement/task.js");

        function createTask(taskData) {
          const task = new _task__WEBPACK_IMPORTED_MODULE_1__.Task(taskData);
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskPending", task);
        }

        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "TaskIsReadyForCreation",
          createTask
        );

        /***/
      },

    /***/ "./src/taskManagement/task-registrar.js":
      /*!**********************************************!*\
  !*** ./src/taskManagement/task-registrar.js ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ taskRegistrar: () => /* binding */ taskRegistrar,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");

        class taskRegistrar {
          constructor(parentList) {
            this.parentList = parentList;
            console.log(parentList);
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
              "TaskPending",
              this.registerTask
            );
          }

          registerTask(task) {
            if (task.parentList === this.parentList) {
              console.log("task belongs to " + this.parentList.name);
            } else {
              console.log("task doesn't belong to " + this.parentList.name);
            }
          }
        }

        /***/
      },

    /***/ "./src/taskManagement/task.js":
      /*!************************************!*\
  !*** ./src/taskManagement/task.js ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Task: () => /* binding */ Task,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");

        class Task {
          SUBTASKS = [];
          constructor(taskData) {
            this.name = taskData.name;
            this.description = taskData.description;
            this.due = taskData.due;
            this.priority = taskData.priority;
            this.parentList = taskData.parentList;
            this.finishTaskCheckbox = document.createElement("checkbox");
            this.finishTaskCheckbox.addEventListener("change", (e) => {
              if (e.currentTarget.checked) {
                _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                  "TaskChecked",
                  this
                );
              } else {
                _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                  "TaskUnchecked",
                  this
                );
              }
            });
            this.EditTaskButton = document.createElement("button");
            this.EditTaskButton.addEventListener("click", () => {
              // PubSub.emit("UserWantsToEditTask", this);
            });
            this.DeleteTaskButton = document.createElement("button");
            this.DeleteTaskButton = document.addEventListener("click", () => {
              // PubSub.emit("UserWantsToDeleteTask");
            });
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
          /* harmony export */ finishUsingTaskFormButton: () =>
            /* binding */ finishUsingTaskFormButton,
          /* harmony export */ listFormCloseButton: () =>
            /* binding */ listFormCloseButton,
          /* harmony export */ listFormOpenButton: () =>
            /* binding */ listFormOpenButton,
          /* harmony export */ taskFormCloseButton: () =>
            /* binding */ taskFormCloseButton,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");
        /* harmony import */ var _form_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ./form-manager */ "./src/form-manager.js");

        const listFormOpenButton = document.getElementById(
          "list-form-open-button"
        );
        listFormOpenButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "OpenForm",
            _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list
          );
        });

        const listFormCloseButton = document.getElementById(
          "list-form-close-button"
        );
        listFormCloseButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list
          );
        });

        const finishUsingListFormButton =
          document.getElementById("create-list-button");
        finishUsingListFormButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "UserFinishedUsingForm",
            _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list
          );
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.list
          );
        });

        const taskFormCloseButton = document.getElementById(
          "task-form-close-button"
        );
        taskFormCloseButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task
          );
        });

        const finishUsingTaskFormButton =
          document.getElementById("create-task-button");
        finishUsingTaskFormButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "UserFinishedUsingForm",
            _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task
          );
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.task
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
    /* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(
        /*! ./listManagement/list-bundle */ "./src/listManagement/list-bundle.js"
      );
    /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");
    /* harmony import */ var _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_4__ =
      __webpack_require__(
        /*! ./taskManagement/task-creator */ "./src/taskManagement/task-creator.js"
      );

    _PubSub__WEBPACK_IMPORTED_MODULE_3__.PubSub.emit("CreateDefaultList");
  })();

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MkNBQU0sbUJBQW1CLHdEQUFhO0FBQ3hDLENBQUM7O0FBRU07QUFDUDtBQUNBO0FBQ0E7QUFDQSxFQUFFLDJDQUFNLG1CQUFtQix3REFBYTtBQUN4QyxDQUFDOztBQUVNO0FBQ1A7QUFDQTtBQUNBLEVBQUUsMkNBQU0sK0JBQStCLHdEQUFhO0FBQ3BELEVBQUUsMkNBQU0sbUJBQW1CLHdEQUFhO0FBQ3hDLENBQUM7Ozs7Ozs7VUNwQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTmlDO0FBQ1Q7QUFDYztBQUNKOztBQUVLOztBQUV2QywyQ0FBTSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvUHViU3ViLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvZm9ybS1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvZGVmYXVsdC1saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1idW5kbGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LXJlZ2lzdHJhci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy90YXNrTWFuYWdlbWVudC90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gIGNvbnN0IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSA9IC0xO1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBmdW5jdGlvbiBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW2RlYnVnXSBFVkVOVCAke2V2ZW50fSBJUyBDQUxMRURgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQsIHBhcmFtID0gbnVsbCkge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpO1xuICAgICAgZm9yIChsZXQgZnVuYyBvZiBldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZ1bmMocGFyYW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgVGhlcmUgaXMgbm8gZXZlbnQgd2l0aCBhIG5hbWUgJyR7ZXZlbnR9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmdW5jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmdW5jXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgY29uc3QgaW5kZXhPZkdpdmVuRnVuY3Rpb24gPSBldmVudHNbZXZlbnRdLmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXhPZkdpdmVuRnVuY3Rpb24gIT09IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSkge1xuICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpbmRleE9mR2l2ZW5GdW5jdGlvbiwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFxuICAgICAgICBgVGhlcmUgaXMgZWl0aGVyIG5vIHN1Y2ggZXZlbnQgKCR7ZXZlbnR9KSByZWdpc3RlcmVkLCBvciB5b3VyIGZ1bmN0aW9uIGlzbid0IHByZXNlbnQgdGhlcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGVtaXQsIG9uLCBvZmYgfTtcbn0pKCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4vUHViU3ViXCIpO1xuXG5jb25zdCBNT0RFUyA9IHsgQ1JFQVRJT046IDAsIEVESVRJTkc6IDEgfTtcbmV4cG9ydCBjb25zdCBGT1JNX1JFR0lTVFJZID0ge307XG5cbmNvbnN0IGxpc3RGb3JtID0gcmVnaXN0ZXJGb3JtKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIiwgXCJsaXN0XCIpO1xuY29uc3QgdGFza0Zvcm0gPSByZWdpc3RlckZvcm0oXCJ0YXNrLWZvcm0tYmFja2dyb3VuZFwiLCBcInRhc2tcIik7XG5jb25zdCBsaXN0U2VsZWN0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0U2VsZWN0aW9uXCIpO1xuXG5mdW5jdGlvbiByZWdpc3RlckZvcm0oYmFja2dyb3VuZElkLCBjb2RlbmFtZSkge1xuICBGT1JNX1JFR0lTVFJZW2NvZGVuYW1lXSA9IGNvZGVuYW1lO1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJhY2tncm91bmRJZCksXG4gICAgZm9ybTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmFja2dyb3VuZElkKS5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSxcbiAgICBtb2RlOiBNT0RFUy5DUkVBVElPTixcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybURhdGEoZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBjaG9vc2VXb3JraW5nRm9ybShmb3JtVHlwZSk7XG5cbiAgY29uc3QgZm9ybUlucHV0RGF0YSA9IHt9O1xuICBBcnJheS5mcm9tKHdvcmtpbmdGb3JtLmZvcm0uZWxlbWVudHMpLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICBpZiAoZWxlbWVudC5ub2RlTmFtZSAhPT0gXCJCVVRUT05cIikge1xuICAgICAgY29uc3QgaW5wdXRDb250ZW50VHlwZSA9IGVsZW1lbnQuaWQ7XG4gICAgICBmb3JtSW5wdXREYXRhW2lucHV0Q29udGVudFR5cGVdID0gZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5saXN0KSB7XG4gICAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgZm9ybUlucHV0RGF0YSk7XG4gICAgfSBlbHNlIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJc1JlYWR5Rm9yRWRpdGluZ1wiLCB7XG4gICAgICAgIGRhdGE6IGZvcm1JbnB1dERhdGEsXG4gICAgICAgIGlkOiB3b3JraW5nRm9ybS5mb3JtLmRhdGFzZXQuZWRpdGFibGVMaXN0SWQsXG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZm9ybVR5cGUgPT09IEZPUk1fUkVHSVNUUlkudGFzaykge1xuICAgIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5DUkVBVElPTikge1xuICAgICAgUHViU3ViLmVtaXQoXCJUYXNrSXNSZWFkeUZvckNyZWF0aW9uXCIsIGZvcm1JbnB1dERhdGEpO1xuICAgIH1cbiAgfVxuICByZXNldEZvcm0oZm9ybVR5cGUpO1xufVxuXG5mdW5jdGlvbiBjaG9vc2VXb3JraW5nRm9ybShmb3JtVHlwZSkge1xuICBzd2l0Y2ggKGZvcm1UeXBlKSB7XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLmxpc3Q6XG4gICAgICByZXR1cm4gbGlzdEZvcm07XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLnRhc2s6XG4gICAgICByZXR1cm4gdGFza0Zvcm07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRGb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gY2hvb3NlV29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5mb3JtLnJlc2V0KCk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1lZGl0YWJsZS1saXN0LWlkXCIpO1xuICB3b3JraW5nRm9ybS5tb2RlID0gTU9ERVMuQ1JFQVRJT047XG59XG5cbmZ1bmN0aW9uIG9wZW5Gb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gY2hvb3NlV29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcbiAgaWYgKHdvcmtpbmdGb3JtID09PSB0YXNrRm9ybSkge1xuICAgIFB1YlN1Yi5lbWl0KFwiR2V0TGlzdFJlZ2lzdHJ5XCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb3NlRm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGNob29zZVdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uYmFja2dyb3VuZC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgIT09IE1PREVTLkNSRUFUSU9OKSB7XG4gICAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcmVwYXJlTGlzdEZvcm1Gb3JFZGl0aW5nKGxpc3QpIHtcbiAgbGlzdEZvcm0ubW9kZSA9IE1PREVTLkVESVRJTkc7XG5cbiAgbGlzdEZvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIikuZm9yRWFjaCgoY3VycmVudCkgPT4ge1xuICAgIGN1cnJlbnQudmFsdWUgPSBsaXN0W2N1cnJlbnQuaWRdO1xuICB9KTtcbiAgbGlzdEZvcm0uZm9ybS5kYXRhc2V0LmVkaXRhYmxlTGlzdElkID0gbGlzdC5pZDtcbn1cblxuZnVuY3Rpb24gc2V0dXBMaXN0U2VsZWN0aW9uKHJlZ2lzdHJ5KSB7XG4gIGxldCBsaXN0U2VsZWN0aW9uQ29udGVudCA9IFwiXCI7XG4gIHJlZ2lzdHJ5LmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBsaXN0U2VsZWN0aW9uQ29udGVudCArPSBgPG9wdGlvbiBkYXRhLWxpc3QtaWQ9XCIke2xpc3QuaWR9XCI+JHtsaXN0Lm5hbWV9PC9vcHRpb24+YDtcbiAgfSk7XG4gIGxpc3RTZWxlY3Rpb24uaW5uZXJIVE1MID0gbGlzdFNlbGVjdGlvbkNvbnRlbnQ7XG59XG5cblB1YlN1Yi5vbihcIk9wZW5Gb3JtXCIsIG9wZW5Gb3JtKTtcblB1YlN1Yi5vbihcIkNsb3NlRm9ybVwiLCBjbG9zZUZvcm0pO1xuUHViU3ViLm9uKFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIGdldEZvcm1EYXRhKTtcblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgcHJlcGFyZUxpc3RGb3JtRm9yRWRpdGluZyk7XG5cblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RyeUdldHNSZXR1cm5lZFwiLCBzZXR1cExpc3RTZWxlY3Rpb24pO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuLi9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCB7IFRhc2tSZWdpc3RyYXIgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1yZWdpc3RyYXJcIjtcblxuZXhwb3J0IGNsYXNzIERlZmF1bHRMaXN0IHtcbiAgVEFTS19SRUdJU1RSWSA9IFtdO1xuXG4gIGlkID0gbnVsbDtcbiAgZGl2ID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyID0gbmV3IFRhc2tSZWdpc3RyYXIodGhpcyk7XG5cbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWUgfHwgXCJVbm5hbWVkXCI7XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG5cbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJzb3J0XCI7XG5cbiAgICB0aGlzLkFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuQWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLnRhc2spO1xuICAgIH0pO1xuICAgIHRoaXMuQWRkVGFza0J1dHRvbi50ZXh0Q29udGVudCA9IFwiK1wiO1xuXG4gICAgdGhpcy5idXR0b25zID0ge1xuICAgICAgU29ydExpc3RCdXR0b246IHRoaXMuU29ydExpc3RCdXR0b24sXG4gICAgICBBZGRUYXNrQnV0dG9uOiB0aGlzLkFkZFRhc2tCdXR0b24sXG4gICAgfTtcbiAgfVxufVxuIiwiaW1wb3J0IFwiLi9saXN0LWNyZWF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZWdpc3RyYXJcIjtcbmltcG9ydCBcIi4vbGlzdC1yZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRGVmYXVsdExpc3QgfSBmcm9tIFwiLi9kZWZhdWx0LWxpc3RcIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi9saXN0XCI7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX0xJU1RfSUQgPSBcIkRFRkFVTFRcIjtcblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdExpc3QoKSB7XG4gIGNvbnN0IGNyZWF0aW9uRGF0YSA9IHsgbmFtZTogXCJEZWZhdWx0XCIsIGNvbG9yOiBcIiNjY2NcIiB9O1xuICBjb25zdCBkZWZhdWx0TGlzdCA9IG5ldyBEZWZhdWx0TGlzdChjcmVhdGlvbkRhdGEpO1xuICBkZWZhdWx0TGlzdC5pZCA9IERFRkFVTFRfTElTVF9JRDtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3Q6IGRlZmF1bHRMaXN0LCBsaXN0SWQ6IGRlZmF1bHRMaXN0LmlkIH07XG4gIFB1YlN1Yi5lbWl0KFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChuZXdEYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChuZXdEYXRhKTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UGVuZGluZ1wiLCBsaXN0KTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JDcmVhdGlvblwiLCBjcmVhdGVOZXdMaXN0KTtcblB1YlN1Yi5vbihcIkNyZWF0ZURlZmF1bHRMaXN0XCIsIGNyZWF0ZURlZmF1bHRMaXN0KTtcbiIsImNvbnN0IHsgUHViU3ViIH0gPSByZXF1aXJlKFwiLi4vUHViU3ViXCIpO1xuXG5jb25zdCBMSVNUX1JFR0lTVFJZID0gW107XG5sZXQgZGVmYXVsdExpc3RSZWZlcmVuY2UgPSBudWxsO1xuXG5mdW5jdGlvbiBhZGRMaXN0VG9SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkucHVzaChsaXN0KTtcbiAgbGlzdC5pZCA9IExJU1RfUkVHSVNUUlkubGVuZ3RoIC0gMTtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3QsIGxpc3RJZDogTElTVF9SRUdJU1RSWS5sZW5ndGggLSAxIH07XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFJlZ2lzdGVyZWRcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0SWRzKCkge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IExJU1RfUkVHSVNUUlkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaXN0ID0gTElTVF9SRUdJU1RSWVtpXTtcbiAgICBsaXN0LmlkID0gaTtcbiAgICBsaXN0LmRpdi5kYXRhc2V0Lmxpc3RJZCA9IGk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGlzdEZyb21SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkuc3BsaWNlKGxpc3QuaWQsIDEpO1xuICB1cGRhdGVMaXN0SWRzKCk7XG59XG5cbmZ1bmN0aW9uIGVkaXRMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IGVkaXRhYmxlTGlzdCA9IExJU1RfUkVHSVNUUllbbGlzdERhdGEuaWRdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhsaXN0RGF0YS5kYXRhKSkge1xuICAgIGVkaXRhYmxlTGlzdFtrZXldID0gdmFsdWU7XG4gIH1cbiAgUHViU3ViLmVtaXQoXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlzdFJlZ2lzdHJ5KCkge1xuICBjb25zdCBmdWxsTGlzdFJlZ2lzdHJ5ID0gW2RlZmF1bHRMaXN0UmVmZXJlbmNlLCAuLi5MSVNUX1JFR0lTVFJZXTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UmVnaXN0cnlHZXRzUmV0dXJuZWRcIiwgZnVsbExpc3RSZWdpc3RyeSk7XG59XG5cblB1YlN1Yi5vbihcIkRlZmF1bHRMaXN0UGVuZGluZ1wiLCAobGlzdERhdGEpID0+IHtcbiAgZGVmYXVsdExpc3RSZWZlcmVuY2UgPSBsaXN0RGF0YS5saXN0O1xufSk7XG5QdWJTdWIub24oXCJMaXN0UGVuZGluZ1wiLCBhZGRMaXN0VG9SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JFZGl0aW5nXCIsIGVkaXRMaXN0KTtcblB1YlN1Yi5vbihcIkdldExpc3RSZWdpc3RyeVwiLCBnZXRMaXN0UmVnaXN0cnkpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgREVGQVVMVF9MSVNUX0lEIH0gZnJvbSBcIi4vbGlzdC1jcmVhdG9yXCI7XG5cbmNvbnN0IGxpc3REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0c1wiKTtcblxuZnVuY3Rpb24gcmVuZGVyTGlzdFVwb25DcmVhdGlvbihsaXN0RGF0YSkge1xuICBjb25zdCBsaXN0ID0gbGlzdERhdGEubGlzdDtcblxuICBjb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdERpdi5kYXRhc2V0Lmxpc3RJZCA9IGxpc3REYXRhLmxpc3RJZDtcbiAgbGlzdC5kaXYgPSBsaXN0RGl2O1xuICBsaXN0RGl2LmNsYXNzTGlzdC5hZGQoXCJsaXN0XCIpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdC5jb2xvcjtcblxuICBpZiAobGlzdERhdGEubGlzdElkID09PSBERUZBVUxUX0xJU1RfSUQpIHtcbiAgICBsaXN0RGlzcGxheS5wcmVwZW5kKGxpc3REaXYpO1xuICB9IGVsc2Uge1xuICAgIGxpc3REaXNwbGF5LmFwcGVuZChsaXN0RGl2KTtcbiAgfVxuXG4gIGNvbnN0IGxpc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0Um93LmNsYXNzTGlzdC5hZGQoXCJsaXN0LXJvd1wiKTtcbiAgbGlzdERpdi5hcHBlbmQobGlzdFJvdyk7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxpc3ROYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwibGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0Lm5hbWU7XG4gIGxpc3RSb3cuYXBwZW5kKGxpc3ROYW1lVGV4dCk7XG5cbiAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImxpc3QtYnV0dG9uc1wiKTtcbiAgbGlzdFJvdy5hcHBlbmQoYnV0dG9uc0Rpdik7XG5cbiAgcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdik7XG5cbiAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gIGxpc3REaXYuYXBwZW5kKGhyKTtcblxuICBjb25zdCB0YXNrc1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0YXNrc1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2tzLXNlY3Rpb25cIik7XG4gIGxpc3REaXYuYXBwZW5kKHRhc2tzU2VjdGlvbik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpIHtcbiAgT2JqZWN0LnZhbHVlcyhsaXN0LmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbnNEaXYuYXBwZW5kKGJ1dHRvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wUmVuZGVyaW5nTGlzdChsaXN0KSB7XG4gIGxpc3QuZGl2LnJlbW92ZSgpO1xufVxuXG5mdW5jdGlvbiByZXJlbmRlckxpc3QobGlzdERhdGEpIHtcbiAgY29uc3QgcXVlcnkgPSBgW2RhdGEtbGlzdC1pZD1cIiR7bGlzdERhdGEuaWR9XCJdYDtcblxuICBjb25zdCBsaXN0RGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihxdWVyeSk7XG4gIGxpc3REaXYuc3R5bGUuYm9yZGVyQ29sb3IgPSBsaXN0RGF0YS5kYXRhLmNvbG9yO1xuXG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGxpc3REaXYucXVlcnlTZWxlY3RvcihcIi5saXN0LW5hbWVcIik7XG4gIGxpc3ROYW1lVGV4dC50ZXh0Q29udGVudCA9IGxpc3REYXRhLmRhdGEubmFtZTtcbn1cblxuUHViU3ViLm9uKFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIHJlbmRlckxpc3RVcG9uQ3JlYXRpb24pO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdGVyZWRcIiwgcmVuZGVyTGlzdFVwb25DcmVhdGlvbik7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHN0b3BSZW5kZXJpbmdMaXN0KTtcblB1YlN1Yi5vbihcImxpc3RTaG91bGRCZVJlcmVuZGVyZWRcIiwgcmVyZW5kZXJMaXN0KTtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi4vZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBEZWZhdWx0TGlzdCB9IGZyb20gXCIuL2RlZmF1bHQtbGlzdFwiO1xuXG5leHBvcnQgY2xhc3MgTGlzdCBleHRlbmRzIERlZmF1bHRMaXN0IHtcbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHN1cGVyKGRhdGEpO1xuICAgIHRoaXMuRWRpdExpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuRWRpdExpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCB0aGlzKTtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5saXN0KTtcbiAgICB9KTtcbiAgICB0aGlzLkVkaXRMaXN0QnV0dG9uLnRleHRDb250ZW50ID0gXCJlZGl0XCI7XG5cbiAgICB0aGlzLlJlbW92ZUxpc3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHRoaXMpO1xuICAgIH0pO1xuICAgIHRoaXMuUmVtb3ZlTGlzdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwieFwiO1xuXG4gICAgdGhpcy5idXR0b25zLlJlbW92ZUxpc3RCdXR0b24gPSB0aGlzLlJlbW92ZUxpc3RCdXR0b247XG4gICAgdGhpcy5idXR0b25zLkVkaXRMaXN0QnV0dG9uID0gdGhpcy5FZGl0TGlzdEJ1dHRvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgVGFzayB9IGZyb20gXCIuL3Rhc2tcIjtcblxuZnVuY3Rpb24gY3JlYXRlVGFzayh0YXNrRGF0YSkge1xuICBjb25zdCB0YXNrID0gbmV3IFRhc2sodGFza0RhdGEpO1xuICBQdWJTdWIuZW1pdChcIlRhc2tQZW5kaW5nXCIsIHRhc2spO1xufVxuXG5QdWJTdWIub24oXCJUYXNrSXNSZWFkeUZvckNyZWF0aW9uXCIsIGNyZWF0ZVRhc2spO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuXG5leHBvcnQgY2xhc3MgVGFza1JlZ2lzdHJhciB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudExpc3QpIHtcbiAgICB0aGlzLnBhcmVudExpc3QgPSBwYXJlbnRMaXN0O1xuICAgIGNvbnNvbGUubG9nKHBhcmVudExpc3QpO1xuICAgIFB1YlN1Yi5vbihcIlRhc2tQZW5kaW5nXCIsIHRoaXMucmVnaXN0ZXJUYXNrKTtcbiAgfVxuXG4gIHJlZ2lzdGVyVGFzayh0YXNrKSB7XG4gICAgaWYgKHRhc2sucGFyZW50TGlzdCA9PT0gdGhpcy5wYXJlbnRMaXN0KSB7XG4gICAgICBjb25zb2xlLmxvZyhcInRhc2sgYmVsb25ncyB0byBcIiArIHRoaXMucGFyZW50TGlzdC5uYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCJ0YXNrIGRvZXNuJ3QgYmVsb25nIHRvIFwiICsgdGhpcy5wYXJlbnRMaXN0Lm5hbWUpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gIFNVQlRBU0tTID0gW107XG4gIGNvbnN0cnVjdG9yKHRhc2tEYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gdGFza0RhdGEubmFtZTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFza0RhdGEuZGVzY3JpcHRpb247XG4gICAgdGhpcy5kdWUgPSB0YXNrRGF0YS5kdWU7XG4gICAgdGhpcy5wcmlvcml0eSA9IHRhc2tEYXRhLnByaW9yaXR5O1xuICAgIHRoaXMucGFyZW50TGlzdCA9IHRhc2tEYXRhLmxpc3RTZWxlY3Rpb247XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUuY3VycmVudFRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiVGFza0NoZWNrZWRcIiwgdGhpcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBQdWJTdWIuZW1pdChcIlRhc2tVbmNoZWNrZWRcIiwgdGhpcyk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5lZGl0VGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5lZGl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgLy8gUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHRoaXMpO1xuICAgIH0pO1xuICAgIHRoaXMuZGVsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgdGhpcy5kZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIC8vIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9EZWxldGVUYXNrXCIpO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi9mb3JtLW1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JtT3BlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1vcGVuLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1PcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5saXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1DbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1jbG9zZS1idXR0b25cIlxuKTtcbmxpc3RGb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5saXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbiA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLWxpc3QtYnV0dG9uXCIpO1xuZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBGT1JNX1JFR0lTVFJZLmxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLmxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0YXNrRm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwidGFzay1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xudGFza0Zvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLnRhc2spO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtdGFzay1idXR0b25cIik7XG5maW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkudGFzayk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkudGFzayk7XG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3VuaXF1ZS1idXR0b24tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vbGlzdE1hbmFnZW1lbnQvbGlzdC1idW5kbGVcIjtcbmltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuXG5pbXBvcnQgXCIuL3Rhc2tNYW5hZ2VtZW50L3Rhc2stY3JlYXRvclwiO1xuXG5QdWJTdWIuZW1pdChcIkNyZWF0ZURlZmF1bHRMaXN0XCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
