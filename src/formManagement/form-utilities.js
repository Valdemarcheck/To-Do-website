export function trimInput(inputValue) {
  return inputValue.trim();
}

export function getEntityPath(workingForm, formType) {
  const datasetQuery = `editable${formType}Id`;
  const editableEntityId = workingForm.form.dataset[datasetQuery];
  const pathArray = editableEntityId.split(":");
  const path = { listId: pathArray[0], taskId: pathArray[1] };
  return path;
}

export function setupFormInputValues(workingForm, entity) {
  Array.from(workingForm.form.elements).forEach((current) => {
    if (current.nodeName === "INPUT" || current.nodeName === "SELECT") {
      current.value = entity[current.id];

      if (current.nodeName === "SELECT") {
        console.log(current.selectedOptions[0]);
      }
    }
  });
}
