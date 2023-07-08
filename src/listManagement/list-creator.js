import { PubSub } from "../PubSub";
import { List, addRemoveAndEditButtons } from "./list";

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
  addRemoveAndEditButtons(list);
  PubSub.emit("ListPending", list);
}

PubSub.on("ListIsReadyForCreation", createNewList);
PubSub.on("CreateDefaultList", createDefaultList);
