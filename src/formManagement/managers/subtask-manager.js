import { SubtaskCreator } from "../../subtaskManagement/subtask-creator";
import { SubtaskRegistrar } from "../../subtaskManagement/subtask-registrar";
import { SubtaskRenderer } from "../../subtaskManagement/subtask-renderer";

export class SubtaskManager {
  constructor(parentForm) {
    this.parentForm = parentForm;
    this.subtaskSection = document.createElement("div");
    this.subtaskSection.id = "subtask-section";

    this.subtaskCreator = new SubtaskCreator();
    this.subtaskRegistrar = new SubtaskRegistrar(this.subtaskSection);
    this.subtaskRenderer = new SubtaskRenderer(this.subtaskSection);
  }

  isInsideParentForm() {
    return this.parentForm.form.contains(this.subtaskSection);
  }

  setup({ nodeBeforeWhichToPutSection = null, entity = null }) {
    if (entity) {
      entity.subtasks.forEach((subtask) => {
        this.addSubtask(subtask);
      });
    }
    if (nodeBeforeWhichToPutSection) {
      this.parentForm.form.insertBefore(
        this.subtaskSection,
        nodeBeforeWhichToPutSection
      );
    } else {
      this.parentForm.form.appendChild(this.subtaskSection);
    }
  }

  addSubtask(subtask) {
    const newSubtask = subtask ? subtask : this.subtaskCreator.createSubtask();
    this.subtaskRegistrar.registerSubtask(newSubtask);
    this.subtaskRenderer.renderSubtask(newSubtask);
    this.subtaskRegistrar.updateIds();
  }

  getData() {
    this.subtaskRegistrar.applyData();
    return this.subtaskRegistrar.getSubtasks(this.subtaskSection);
  }

  reset() {
    const registry = this.subtaskRegistrar.getSubtasks();
    this.subtaskRenderer.stopRenderingSubtasksInnerElements(registry);

    this.subtaskRegistrar.resetRegistry();
    this.subtaskSection.innerHTML = "";
    this.subtaskSection.remove();
  }
}
