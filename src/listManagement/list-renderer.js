import { PubSub } from "../PubSub";
import { DEFAULT_LIST_ID } from "./list-creator";

const listDisplay = document.getElementById("lists");

function renderListUponCreation(listData) {
  const list = listData.list;

  const listDiv = document.createElement("div");
  listDiv.dataset.listId = listData.listId;
  list.div = listDiv;
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;

  if (listData.listId === DEFAULT_LIST_ID) {
    listDisplay.prepend(listDiv);
  } else {
    listDisplay.append(listDiv);
  }

  const listRow = document.createElement("div");
  listRow.classList.add("list-row");
  listDiv.append(listRow);

  const listNameText = document.createElement("p");
  listNameText.classList.add("list-name");
  listNameText.textContent = list.name;
  listRow.append(listNameText);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("list-buttons");
  listRow.append(buttonsDiv);

  renderAllListButtons(list, buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.append(hr);

  const tasksSection = document.createElement("div");
  tasksSection.classList.add("tasks-section");
  listDiv.append(tasksSection);
}

function renderAllListButtons(list, buttonsDiv) {
  Object.values(list.buttons).forEach((button) => {
    buttonsDiv.append(button);
  });
}

function stopRenderingList(list) {
  list.div.remove();
}

function rerenderList(listData) {
  const query = `[data-list-id="${listData.id}"]`;

  const listDiv = document.querySelector(query);
  listDiv.style.borderColor = listData.data.color;

  const listNameText = listDiv.querySelector(".list-name");
  listNameText.textContent = listData.data.name;
}

PubSub.on("DefaultListPending", renderListUponCreation);
PubSub.on("ListRegistered", renderListUponCreation);
PubSub.on("ListShouldBeRemoved", stopRenderingList);
PubSub.on("listShouldBeRerendered", rerenderList);
