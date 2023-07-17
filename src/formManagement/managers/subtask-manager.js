import { SubtaskCreator } from "../../subtaskManagement/subtask-creator";
import { SubtaskRegistrar } from "../../subtaskManagement/subtask-registrar";
import { SubtaskRenderer } from "../../subtaskManagement/subtask-renderer";

export class SubtaskManager {
  constructor(parentForm) {
    this.parentForm = parentForm;
    this.subtaskSection = document.createElement("div");
    this.subtaskSection.id = "subtask-section";

    this.subtaskCreator = new SubtaskCreator();
    this.subtaskRegistrar = new SubtaskRegistrar();
    this.subtaskRenderer = new SubtaskRenderer(this.subtaskSection);
  }

  isInsideParentForm() {
    return this.parentForm.form.contains(this.subtaskSection);
  }

  setup({ nodeBeforeWhichToPutSection = null }) {
    if (nodeBeforeWhichToPutSection) {
      this.parentForm.form.insertBefore(
        this.subtaskSection,
        nodeBeforeWhichToPutSection
      );
    } else {
      this.parentForm.form.appendChild(this.subtaskSection);
    }
  }

  addSubtask() {
    const newSubtask = this.subtaskCreator.createSubtask();
    this.subtaskRegistrar.registerSubtask(newSubtask);
    this.subtaskRegistrar.updateIds(this.subtaskSection);
    this.subtaskRenderer.renderSubtask(newSubtask);
  }

  getData() {
    return this.subtaskRegistrar.getSubtasks();
  }

  reset() {
    this.subtaskRegistrar.resetRegistry();
    this.subtaskSection.innerHTML = "";
    this.subtaskSection.remove();
  }
}
