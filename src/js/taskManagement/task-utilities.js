export function setupDueDate(dueDateString) {
  if (dueDateString) {
    return new Date(dueDateString);
  } else {
    return new Date();
  }
}
