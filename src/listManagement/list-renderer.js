import { PubSub } from "../PubSub";
import { insertAfter, removeEntityDiv } from "../utilities";
import { DEFAULT_LIST_ID } from "./list-creator";

const listDisplay = document.getElementById("lists");

function renderList(listData) {
  console.log(listData);
  const list = listData.list;

  const listDiv = list.div;
  listDiv.dataset.listId = listData.listId;
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;

  if (listData.listId === DEFAULT_LIST_ID) {
    listDisplay.prepend(listDiv);
  } else {
    const siblingListToPutAfter =
      listDisplay.getElementsByClassName("list")[listData.listId];
    insertAfter(siblingListToPutAfter, listDiv);
  }

  const listRow = document.createElement("div");
  listRow.classList.add("list-row");
  listDiv.append(listRow);

  const listNameText = document.createElement("p");
  listNameText.classList.add("list-name");
  listNameText.textContent = list.name;
  listRow.append(listNameText);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-row");
  listRow.append(buttonsDiv);

  renderAllListButtons(list, buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.append(hr);

  const taskSection = document.createElement("div");
  taskSection.classList.add("task-section");
  listDiv.append(taskSection);
}

function renderAllListButtons(list, buttonsDiv) {
  Object.values(list.buttons).forEach((button) => {
    buttonsDiv.append(button);
  });
}

function stopRenderingList(list) {
  removeEntityDiv(list);
}

function rerenderList(listData) {
  stopRenderingList(listData.list);
  renderList(listData);
}

PubSub.on("DefaultListPending", renderList);
PubSub.on("ListRegistered", renderList);
PubSub.on("ListShouldBeRemoved", stopRenderingList);
PubSub.on("listShouldBeRerendered", rerenderList);
