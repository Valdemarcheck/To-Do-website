import { PubSub } from "../PubSub";

const listDisplay = document.getElementById("lists");

function clearLists() {
  listDisplay.textContent = "";
}

function renderAllLists(registry) {
  clearLists();
  for (let list of Object.values(registry)) {
    renderList(list);
  }
  console.log("Rendered");
}

function renderList(list) {
  const listDiv = document.createElement("div");
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;
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

  setupAllListButtons(buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.append(hr);

  const tasksSection = document.createElement("div");
  tasksSection.classList.add("tasks-section");
  listDiv.append(tasksSection);
}

function setupAllListButtons(buttonsDiv) {
  const removeListButton = document.createElement("button");
  removeListButton.textContent = "x";
  buttonsDiv.append(removeListButton);

  const editListButton = document.createElement("button");
  editListButton.textContent = "edit";
  buttonsDiv.append(editListButton);

  const sortListButton = document.createElement("button");
  sortListButton.textContent = "sort";
  buttonsDiv.append(sortListButton);

  const addTaskButton = document.createElement("button");
  addTaskButton.textContent = "+";
  buttonsDiv.append(addTaskButton);
}

PubSub.on("ListRegistered", renderAllLists);
