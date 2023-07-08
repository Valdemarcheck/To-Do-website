import { PubSub } from "../PubSub";
import { List } from "./list";

export const DEFAULT_LIST_ID = "DEFAULT";

function createDefaultList() {
  const creationData = { name: "Default", color: "#ccc" };
  const defaultList = new List(creationData);
  defaultList.id = DEFAULT_LIST_ID;
  const listData = { list: defaultList, listId: defaultList.id };
  PubSub.emit("DefaultListPending", listData);
}

function createNewList(newData) {
  const list = new List(newData);
  addNonDefaultListButtons(list);
  PubSub.emit("ListPending", list);
}

function addNonDefaultListButtons(list) {
  list.EditListButton = document.createElement("button");
  list.EditListButton.addEventListener("click", () => {
    PubSub.emit("UserWantsToEditList", list);
    PubSub.emit("OpenForm", FORM_REGISTRY.List);
  });
  list.EditListButton.textContent = "edit";

  list.RemoveListButton = document.createElement("button");
  list.RemoveListButton.addEventListener("click", () => {
    PubSub.emit("ListShouldBeRemoved", list);
  });
  list.RemoveListButton.textContent = "x";

  list.ShowListInformationButton = document.createElement("button");
  list.ShowListInformationButton.classList.add("informationButton");
  list.ShowListInformationButton.addEventListener("click", () => {
    PubSub.emit("UserWantsToSeeEntityInformation", {
      formType: FORM_REGISTRY.List,
      entity: list,
    });
    PubSub.emit("OpenForm", FORM_REGISTRY.List);
  });
  list.ShowListInformationButton.textContent = "info";

  list.buttons.ShowListInformationButton = list.ShowListInformationButton;
  list.buttons.EditListButton = list.EditListButton;
  list.buttons.RemoveListButton = list.RemoveListButton;
}

PubSub.on("ListIsReadyForCreation", createNewList);
PubSub.on("CreateDefaultList", createDefaultList);
