import { PubSub } from "../PubSub";
import { DefaultList } from "./default-list";
import { List } from "./list";

export const DEFAULT_LIST_ID = "DEFAULT";

function createDefaultList() {
  const creationData = { name: "Default", color: "#ccc" };
  const defaultList = new DefaultList(creationData);
  defaultList.id = DEFAULT_LIST_ID;
  const listData = { list: defaultList, listId: defaultList.id };
  PubSub.emit("DefaultListPending", listData);
}

function createNewList(newData) {
  const list = new List(newData);
  PubSub.emit("ListPending", list);
}

PubSub.on("ListIsReadyForCreation", createNewList);
PubSub.on("CreateDefaultList", createDefaultList);
