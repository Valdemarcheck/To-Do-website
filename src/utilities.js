export function setupButton(name, className, parent, buttonArrayName) {
  const button = document.createElement("button");
  button.textContent = name;
  button.classList.add(className);
  button.setAttribute("type", "button");
  parent.buttons[buttonArrayName] = button;
  return button;
}

export function removeEntityDiv(entity) {
  entity.div.remove();
  entity.div = document.createElement("div");
}

export function appendEntity(parent, className, entity, entityDiv) {
  const siblingEntityToPutAfter =
    parent.getElementsByClassName(className)[entity.id - 1];
  if (siblingEntityToPutAfter) {
    insertAfter(siblingEntityToPutAfter, entityDiv);
  } else {
    parent.prepend(entityDiv);
  }
}

function insertAfter(nodeToPutAfter, newNode) {
  nodeToPutAfter.parentNode.insertBefore(newNode, nodeToPutAfter.nextSibling);
}
