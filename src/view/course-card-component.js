import { AbstractComponent } from "../framework/view/abstract-component.js";
import AddCourseModalComponent from "./course-modal-component.js";  // Импорт компонента для редактирования курса

function createCourseCardComponentTemplate(course) {
  const { image, title, category, rating, instructor, price } = course;
  return (`
    <div class="box">
      <figure>
        <img src="${image}" alt="${title}" />
        <figcaption>${category} (${rating} Reviews)</figcaption>
        <h3>${title}</h3>
        <p>By <span>${instructor}</span></p>
        <div class="d-flex">
          <button class="edit-button">Edit Course</button>
          <button class="delete-button">Delete</button>
          <p>$${price}</p>
        </div>
      </figure>
    </div>
  `);
}

export default class CourseCardComponent extends AbstractComponent {
  constructor({ course, onEnroll, onEdit, onDelete }) { 
    super();
    this.course = course || {};
    this.onEnroll = onEnroll;
    this.onEdit = onEdit;
    this.onDelete = onDelete;
  }

  get template() {
    return createCourseCardComponentTemplate(this.course);
  }

  setEventListeners() {
    const enrollButton = this.element.querySelector('button:not(.edit-button)');
    if (enrollButton) {
      enrollButton.addEventListener('click', () => {
        if (this.onEnroll) {
          this.onEnroll(this.course);
        }
      });
    }
  
    const editButton = this.element.querySelector('.edit-button');
    if (editButton) {
      editButton.addEventListener('click', () => {
        if (this.onEdit) {
          this.onEdit(this.course);
        }
      });
    }
    const deleteButton = this.element.querySelector('.delete-button');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        if (this.onDelete) {
          this.onDelete(this.course);
        }
      });
    }    
  }  
}
