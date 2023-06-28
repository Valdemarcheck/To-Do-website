import { PubSub } from "../PubSub";
import { List } from "./list";

function createNewList(data) {
  const list = new List(data);
  PubSub.emit("ListPending", list);
  PubSub.emit("ListDataIsNotRequired");
}

function askForListData() {
  PubSub.emit("ListDataIsRequired");
}

function setupListButtons() {}

PubSub.on("UserWantsToCreateNewList", askForListData);
PubSub.on("GotListData", createNewList);
PubSub.on("ListButtonsAreCreated", setupListButtons);
