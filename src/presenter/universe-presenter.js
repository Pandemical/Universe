import CourseCardComponent from '../view/course-card-component.js';

export default class CoursesBoardPresenter {
  #boardContainer = null;
  #coursesModel = null;

  constructor({ boardContainer, coursesModel }) {
    this.#boardContainer = boardContainer;
    this.#coursesModel = coursesModel;

    this.#coursesModel.addObserver(this._handleModelChange);
  }

  init() {
    this._renderCourses();
  }

  _renderCourses() {
    this.#boardContainer.innerHTML = ''; 

    const courses = this.#coursesModel.courses;

    courses.forEach(course => {
      console.log('Current course:', course); 
      const courseComponent = new CourseCardComponent({ course });
      this.#boardContainer.append(courseComponent.element);
    });
    
    
  }

  setCategoryFilter(filterName, filterValue) {
    this.#coursesModel.setFilter(filterName, filterValue);
  }

  _handleModelChange = () => {
    this._renderCourses();
  };
}
