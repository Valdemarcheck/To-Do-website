import { PubSub } from "../PubSub";
import { List } from "./list";

function createNewList(data) {
  const list = new List(data);
  PubSub.emit("ListPending", list);
  PubSub.emit("ListDataIsNotRequired");
}

PubSub.on("GotListData", createNewList);
