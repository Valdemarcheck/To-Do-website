const { PubSub } = require("../PubSub");

const LIST_REGISTRY = {};

function addListToRegistry(list) {
  LIST_REGISTRY[list.name] = list;
  console.log(LIST_REGISTRY);
}

PubSub.on("ListPending", addListToRegistry);
