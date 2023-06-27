import { PubSub } from "../PubSub";
import { List } from "./list";
import { LIST_REGISTRY } from "./list-registry";

function createNewList(data) {
  const list = new List(data);
  LIST_REGISTRY[list.name] = list;
  console.log("New list is created and added to registry");
  console.log(LIST_REGISTRY);
}

function askForListData() {
  PubSub.emit("ListDataIsRequired");
}

PubSub.on("UserWantsToCreateNewList", askForListData);
PubSub.on("GotListData", createNewList);
