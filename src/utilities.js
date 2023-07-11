export function setupButton(name, className, parent, buttonArrayName) {
  const button = document.createElement("button");
  button.textContent = name;
  button.classList.add(className);
  parent.buttons[buttonArrayName] = button;
  return button;
}

export function insertAfter(nodeToPutAfter, newNode) {
  nodeToPutAfter.parentNode.insertBefore(newNode, nodeToPutAfter.nextSibling);
}

export function removeEntityDiv(entity) {
  entity.div.remove();
  entity.div = document.createElement("div");
}
