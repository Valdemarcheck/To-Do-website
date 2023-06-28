import { PubSub } from "../PubSub";

const listDisplay = document.getElementById("lists");

function renderList(list) {
  const listDiv = document.createElement("div");
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;
  listDiv.dataset.listId = list.name;
  listDisplay.append(listDiv);

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

function setupAllListButtonNames(list) {
  list.RemoveListButton.textContent = "x";
  list.EditListButton.textContent = "edit";
  list.SortListButton.textContent = "sort";
  list.AddTaskButton.textContent = "+";
}

function stopRenderingList(listName) {
  const listDiv = listDisplay.querySelector(`[data-list-id='${listName}']`);
  listDisplay.remove(listDiv);
}

PubSub.on("ListPending", setupAllListButtonNames);
PubSub.on("ListRegistered", renderList);
PubSub.on("ListShouldBeRemoved", stopRenderingList);
