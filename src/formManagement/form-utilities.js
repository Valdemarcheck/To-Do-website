export function trimInput(inputValue) {
  return inputValue.trim();
}

export function getEntityPath(workingForm, formType) {
  const datasetQuery = `editable${formType}Id`;
  const editableEntityId = workingForm.form.dataset[datasetQuery];
  console.log(workingForm.form);
  const pathArray = editableEntityId.split(":");
  const path = { listId: pathArray[0], taskId: pathArray[1] };
  return path;
}

export function setupFormInputValues(workingForm, entity) {
  workingForm.form.querySelectorAll("input").forEach((current) => {
    current.value = entity[current.id];
  });
}
