const { PubSub } = require("../PubSub");

const LIST_REGISTRY = {};

function addListToRegistry(list) {
  if (list.name in LIST_REGISTRY) {
    list.name = makeListNameUnique(list.name);
  }
  LIST_REGISTRY[list.name] = list;
  PubSub.emit("ListRegistered", list);
  console.log(LIST_REGISTRY);
}

function makeListNameUnique(name) {
  let index = 0;
  while (name in LIST_REGISTRY) {
    name = name.split(/\d$/)[0] + index;
    index++;
  }
  return name;
}

function removeListFromRegistry(listName) {
  delete LIST_REGISTRY[listName];
  console.log(LIST_REGISTRY);
}

function editList(listData) {
  const editableList = LIST_REGISTRY[listData.newListName];
  const previousName = listData.newListName;
  const newName = listData.newData.name;

  for (const [key, value] of Object.entries(listData.newData)) {
    editableList[key] = value;
  }
  delete LIST_REGISTRY[previousName];
  LIST_REGISTRY[newName] = editableList;

  console.log(LIST_REGISTRY);
  PubSub.emit("listShouldBeRerendered", listData);
}

PubSub.on("ListPending", addListToRegistry);
PubSub.on("ListShouldBeRemoved", removeListFromRegistry);
PubSub.on("ListIsReadyForEditing", editList);
