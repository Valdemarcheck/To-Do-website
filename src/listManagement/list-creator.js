import { PubSub } from "../PubSub";
import { setupButton } from "../utilities";
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
  list.EditListButton = setupButton(
    "edit",
    "edit-button",
    list,
    "EditListButton"
  );
  list.EditListButton.addEventListener("click", () => {
    PubSub.emit("UserWantsToEditList", list);
    PubSub.emit("OpenForm", FORM_REGISTRY.List);
  });

  list.RemoveListButton = setupButton(
    "x",
    "remove-button",
    list,
    "RemoveListButton"
  );
  list.RemoveListButton.addEventListener("click", () => {
    PubSub.emit("ListShouldBeRemoved", list);
  });

  list.ShowListInformationButton = setupButton(
    "info",
    "information-button",
    list,
    "ShowListInformationButton"
  );
  list.ShowListInformationButton.addEventListener("click", () => {
    PubSub.emit("UserWantsToSeeEntityInformation", {
      formType: FORM_REGISTRY.List,
      entity: list,
    });
    PubSub.emit("OpenForm", FORM_REGISTRY.List);
  });
}

PubSub.on("ListIsReadyForCreation", createNewList);
PubSub.on("CreateDefaultList", createDefaultList);
