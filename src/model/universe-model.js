import { courses as initialCourses } from '../mock/courses.js';
console.log('Loaded courses:', initialCourses);
export default class CoursesModel {
  #courses = [];
  #observers = [];
  #currentCategoryFilter = '';

  constructor() {
    this.#courses = [...initialCourses]; // Инициализация данными
  }

  get courses() {
    if (!this.#currentCategoryFilter) {
      return this.#courses;
    }
    return this.#courses.filter(course => course.category === this.#currentCategoryFilter);
  }

  setCategoryFilter(category) {
    this.#currentCategoryFilter = category;
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
}
