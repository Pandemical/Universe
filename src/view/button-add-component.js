import { AbstractComponent } from "../framework/view/abstract-component.js";

function createButtonAddComponentTemplate() {
  return `<button class="button-add-course">Add Course</button>`;
}

export default class ButtonAddComponent extends AbstractComponent {
  get template() {
    return createButtonAddComponentTemplate();
  }

  setEventListeners(callback) {
    this.element.addEventListener('click', callback);
  }
}
