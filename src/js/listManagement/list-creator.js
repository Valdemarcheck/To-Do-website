import { PubSub } from "../PubSub";
import { FORM_REGISTRY } from "../formManagement/form-manager";
import { setupButton } from "../utilities";
import { List } from "./list";

function createDefaultList() {
  const creationData = { name: "Default", color: "#ccc" };
  const defaultList = new List(creationData);
  PubSub.emit("ListPending", defaultList);
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
    PubSub.emit("UserWantsToEditList", {
      entity: list,
      formType: FORM_REGISTRY.List,
    });
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
}

PubSub.on("ListIsReadyForCreation", createNewList);
PubSub.on("CreateDefaultList", createDefaultList);
