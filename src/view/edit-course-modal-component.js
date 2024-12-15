import { AbstractComponent } from "../framework/view/abstract-component.js";

function createEditCourseModalTemplate() {
  return `
    <div class="modal-overlay">
      <div class="modal edit-course-modal">
        <h2>Edit Course</h2>
        <form class="edit-course-form">
          <label>
            Title:
            <input type="text" class="course-title" name="title" required />
          </label>
          <label>
            Instructor:
            <input type="text" class="course-instructor" name="instructor" required />
          </label>
          <label>
            Price:
            <input type="number" class="course-price" name="price" step="0.01" required />
          </label>
          <label>
            Category:
            <input type="text" class="course-category" name="category" required />
          </label>
          <button type="submit" class="save-button">Save</button>
          <button type="button" class="cancel-button">Cancel</button>
        </form>
      </div>
    </div>
  `;
}

export default class EditCourseModalComponent extends AbstractComponent {
    constructor(onSubmit, onClose, courseApiService) {
      super();
      this.onSubmit = onSubmit;
      this.onClose = onClose;
      this.courseApiService = courseApiService; // Убедитесь, что courseApiService присваивается
    }
  
    get template() {
      return createEditCourseModalTemplate();
    }
  
    setEventListeners() {
      this.element.querySelector('.edit-course-form').addEventListener('submit', (evt) => {
        evt.preventDefault();
        const formData = new FormData(evt.target);
        const updatedCourse = {
          title: formData.get('title'),
          instructor: formData.get('instructor'),
          price: parseFloat(formData.get('price')),
          category: formData.get('category'),
        };
        if (this.onSubmit) this.onSubmit(updatedCourse);
      });
  
      this.element.querySelector('.cancel-button').addEventListener('click', () => {
        if (this.onClose) this.onClose(); 
      });
    }
  
    fillForm(course) {
      const titleInput = this.element.querySelector('.course-title');
      const instructorInput = this.element.querySelector('.course-instructor');
      const priceInput = this.element.querySelector('.course-price');
      const categoryInput = this.element.querySelector('.course-category');
  
      if (titleInput) titleInput.value = course.title || '';
      if (instructorInput) instructorInput.value = course.instructor || '';
      if (priceInput) priceInput.value = course.price || '';
      if (categoryInput) categoryInput.value = course.category || '';
    }
  }  