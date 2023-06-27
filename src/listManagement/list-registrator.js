const { PubSub } = require("../PubSub");

const LIST_REGISTRY = {};

function addListToRegistry(list) {
  if (list.name in LIST_REGISTRY) {
    list.name = makeListNameUnique(list.name);
  }
  LIST_REGISTRY[list.name] = list;
  console.log(LIST_REGISTRY);
  PubSub.emit("ListRegistered", LIST_REGISTRY);
}

function makeListNameUnique(name) {
  let index = 0;
  while (name in LIST_REGISTRY) {
    name = name.split(/\d$/)[0] + index;
    index++;
  }
  return name;
}

PubSub.on("ListPending", addListToRegistry);
