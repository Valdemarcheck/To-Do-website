import { PubSub } from "../PubSub";
import { DefaultList } from "./default-list";
import { List } from "./list";

function createDefaultList() {
  const defaultListData = { name: "Default", color: "#ccc" };
  const defaultList = new DefaultList(defaultListData);
  defaultList.id = "DEFAULT";
  PubSub.emit("DefaultListPending", defaultList);
}

function createNewList(newData) {
  const list = new List(newData);
  PubSub.emit("ListPending", list);
}

PubSub.on("ListIsReadyForCreation", createNewList);
PubSub.on("CreateDefaultList", createDefaultList);
