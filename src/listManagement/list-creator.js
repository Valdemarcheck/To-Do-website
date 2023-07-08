import { PubSub } from "../PubSub";
import { List } from "./list";
import * as listUtils from "./list-utilities";

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
  listUtils.addNonDefaultListButtons(list);
  PubSub.emit("ListPending", list);
}

PubSub.on("ListIsReadyForCreation", createNewList);
PubSub.on("CreateDefaultList", createDefaultList);
