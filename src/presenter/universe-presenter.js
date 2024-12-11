import CourseCardComponent from '../view/course-card-component.js';

export default class CoursesBoardPresenter {
  #boardContainer = null;
  #coursesModel = null;

  constructor({ boardContainer, coursesModel }) {
    this.#boardContainer = boardContainer;
    this.#coursesModel = coursesModel;

    // Добавляем слушателя на обновление модели
    this.#coursesModel.addObserver(() => this.#renderCourses());
  }

  init() {
    this.#renderCourses();
  }

  setCategoryFilter(filterName, filterValue) {
    this.#coursesModel.setFilter(filterName, filterValue);
  }

  #clearCourses() {
    this.#boardContainer.innerHTML = ''; // Очищаем контейнер
  }

  #renderCourses() {
    this.#clearCourses();
  
    const courses = this.#coursesModel.courses;
  
    courses.forEach((course) => {
      const courseCardComponent = new CourseCardComponent({
        course,
        onEnroll: (course) => this.#coursesModel.addToCart(course), // Передаём обработчик
      });
      this.#boardContainer.appendChild(courseCardComponent.element);
      courseCardComponent.setEventListeners(); // Устанавливаем обработчики после добавления в DOM
      
    });
  }
  
  
}
