import { AbstractComponent } from "../framework/view/abstract-component.js";

function createAddCourseModalTemplate() {
  return `
    <div class="modal-overlay">
      <div class="modal">
        <h2>Add New Course</h2>
        <form class="add-course-form">
          <label>
            Title:
            <input type="text" name="title" required />
          </label>
          <label>
            Instructor:
            <input type="text" name="instructor" required />
          </label>
          <label>
            Price:
            <input type="number" name="price" step="0.01" required />
          </label>
          <label>
            Category:
            <input type="text" name="category" required />
          </label>
          <button type="submit" class="submit-button">Add Course</button>
          <button type="button" class="cancel-button">Cancel</button>
        </form>
      </div>
    </div>
  `;
}

export default class AddCourseModalComponent extends AbstractComponent {
  constructor(onSubmit, onClose) {
    super();
    this.onSubmit = onSubmit;
    this.onClose = onClose;
  }

  get template() {
    return createAddCourseModalTemplate();
  }

  setEventListeners() {
    this.element.querySelector('.add-course-form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.target);
      const newCourse = {
        title: formData.get('title'),
        instructor: formData.get('instructor'),
        price: parseFloat(formData.get('price')),
        category: formData.get('category'),
        image: formData.get('image') || 'image/noimg.png', // Значение по умолчанию
        rating: formData.get('rating') || 'none', // Значение по умолчанию
      };
      if (this.onSubmit) this.onSubmit(newCourse);
    });

    this.element.querySelector('.cancel-button').addEventListener('click', () => {
      if (this.onClose) this.onClose();
    });
  }
}
