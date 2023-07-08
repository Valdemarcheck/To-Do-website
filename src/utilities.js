export function setupButton(name, className, parent, buttonArrayName) {
  const button = document.createElement("button");
  button.textContent = name;
  button.classList.add(className);
  parent.buttons[buttonArrayName] = button;
  return button;
}
