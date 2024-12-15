import CourseCardComponent from '../view/course-card-component.js';
import EditCourseModalComponent from '../view/edit-course-modal-component.js';
import AddCourseModalComponent from '../view/course-modal-component.js'; 
import { render, RenderPosition } from '../framework/render.js';

export default class CoursesBoardPresenter {
  #boardContainer = null;
  #coursesModel = null;
  #addCourseModalComponent = null;
  #courseApiService = null; 

  constructor({ boardContainer, coursesModel, courseApiService }) { 
    this.#boardContainer = boardContainer;
    this.#coursesModel = coursesModel;
    this.#courseApiService = courseApiService; 
    this.#coursesModel.addObserver(() => this.#renderCourses());
  }

  init() {
    this.#renderCourses();
  }

  setCategoryFilter(filterName, filterValue) {
    this.#coursesModel.setFilter(filterName, filterValue);
  }

  #clearCourses() {
    this.#boardContainer.innerHTML = ''; 
  }

  #renderCourses() {
    this.#clearCourses(); 
    const courses = this.#coursesModel.courses;

    if (courses.length === 0) {
      const noCoursesMessage = document.createElement('div');
      noCoursesMessage.classList.add('no-courses-message');
      noCoursesMessage.textContent = 'There are no courses matching this request.';
      this.#boardContainer.appendChild(noCoursesMessage); 
    } else {
      courses.forEach((course) => {
        const courseCardComponent = new CourseCardComponent({
          course,
          onEdit: (course) => this.showEditCourseModal(course),
          onDelete: (course) => this.#deleteCourse(course), 
        });
        this.#boardContainer.appendChild(courseCardComponent.element);
        courseCardComponent.setEventListeners();
      });
    }
  }

  #deleteCourse(course) {
    this.#coursesModel.deleteCourse(course.id) 
      .then(() => {
        this.#renderCourses(); 
      });
  }

  showEditCourseModal(course) {
    if (this.editCourseModalComponent) return;
  
    this.editCourseModalComponent = new EditCourseModalComponent(
      (updatedCourse) => {
        this.#coursesModel.updateCourse(course.id, updatedCourse)
          .then(() => {
            this.#renderCourses();
            this.closeEditCourseModal();
          });
      },
      this.closeEditCourseModal.bind(this)
    );
  
    render(this.editCourseModalComponent, document.body, RenderPosition.BEFOREEND);
    this.editCourseModalComponent.setEventListeners();
    this.editCourseModalComponent.fillForm(course);
  }
  
  closeEditCourseModal() {
    if (this.editCourseModalComponent) {
      this.editCourseModalComponent.element.remove();
      this.editCourseModalComponent = null;
    }
  }
  
  showAddCourseModal = () => { 
    if (this.#addCourseModalComponent) return;

    this.#addCourseModalComponent = new AddCourseModalComponent(
      (newCourse) => {
        this.#coursesModel.addCourse(newCourse).then(() => {
          this.#renderCourses(); 
          this.closeAddCourseModal(); 
        });
      },
      this.closeAddCourseModal 
    );

    render(this.#addCourseModalComponent, document.body, RenderPosition.BEFOREEND);
    this.#addCourseModalComponent.setEventListeners();
  };

  closeAddCourseModal = () => { 
    if (this.#addCourseModalComponent) {
      this.#addCourseModalComponent.element.remove();
      this.#addCourseModalComponent = null;
    }
  };
}
