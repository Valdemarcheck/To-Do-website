import { PubSub } from "../PubSub";
import { List } from "./list";

function createNewList(newData) {
  const list = new List(newData);
  PubSub.emit("ListPending", list);
}

PubSub.on("ListIsReadyForCreation", createNewList);
