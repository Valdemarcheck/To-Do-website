import { PubSub } from "../PubSub";
import { appendEntity, removeEntityDiv } from "../utilities";

const listDisplay = document.getElementById("lists");

function renderList(listData) {
  const list = listData.list;

  const listDiv = list.div;
  listDiv.dataset.listId = listData.listId;
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;

  appendEntity(listDisplay, "list", list, listDiv);

  const listRow = document.createElement("div");
  listRow.classList.add("list-row");
  listDiv.appendChild(listRow);

  const listNameText = document.createElement("p");
  listNameText.classList.add("list-name");
  listNameText.textContent = list.name;
  listRow.appendChild(listNameText);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-row");
  listRow.appendChild(buttonsDiv);

  renderAllListButtons(list, buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.appendChild(hr);

  const taskSection = document.createElement("div");
  taskSection.classList.add("task-section");
  listDiv.appendChild(taskSection);
}

function renderAllListButtons(list, buttonsDiv) {
  Object.values(list.buttons).forEach((button) => {
    buttonsDiv.appendChild(button);
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
