export default class CoursesModel {
  #courses = [];
  #cart = [];
  #observers = [];
  #courseApiService = null;
  #filters = {
    category: null,
    language: null,
    price: null,
    skills: null,
    instructors: null,
    ratings: null,
  };

  constructor(courseApiService) {
    this.#courseApiService = courseApiService;
    this.#loadCourses();
  }

  async #loadCourses() {
    try {
      const tasks = await this.#courseApiService.tasks;
      this.#courses = tasks;
      this.#notifyObservers();
    } catch (err) {
      console.error('Ошибка загрузки курсов:', err);
    }
  }

  get courses() {
    return this.#courses.filter((course) => this.#applyFilters(course));
  }

  get cart() {
    return this.#cart;
  }

  get totalCartPrice() {
    return this.#cart.reduce((total, course) => total + course.price, 0);
  }

  addObserver(observer) {
    if (typeof observer === 'function') {
      this.#observers.push(observer);
    } else {
      console.warn('Observer should be a function');
    }
  }

  #notifyObservers() {
    this.#observers.forEach((observer) => {
      try {
        observer();
      } catch (error) {
        console.error('Ошибка в observer:', error);
      }
    });
  }

  setFilter(filterName, value) {
    if (filterName in this.#filters) {
      this.#filters[filterName] = value;
      this.#notifyObservers();
    } else {
      console.warn(`Filter "${filterName}" is not recognized.`);
    }
  }

  async addCourse(course) {
    try {
      const createdCourse = await this.#courseApiService.createCourse(course);
      this.#courses.push(createdCourse);
      this.#notifyObservers();
    } catch (error) {
      console.error('Ошибка при создании курса:', error);
      throw error;
    }
  }

  async deleteCourse(courseId) {
    try {
      await this.#courseApiService.deleteCourse(courseId);
      this.#courses = this.#courses.filter((course) => course.id !== courseId);
      this.#notifyObservers();
    } catch (error) {
      console.error('Ошибка при удалении курса с сервера:', error);
      throw error;
    }
  }

  async updateCourse(courseId, updatedCourse) {
    try {
      const updatedData = await this.#courseApiService.updateCourse(courseId, updatedCourse);
      const courseIndex = this.#courses.findIndex((course) => course.id === courseId);
      if (courseIndex !== -1) {
        this.#courses[courseIndex] = updatedData;
        this.#notifyObservers();
      }
    } catch (error) {
      console.error('Ошибка при обновлении курса:', error);
      throw error;
    }
  }

  #applyFilters(course) {
    return Object.entries(this.#filters).every(([filterName, filterValue]) => {
      if (!filterValue) return true;

      if (filterName === 'language') {
        return filterValue.includes('All Language') || filterValue.includes(course.language);
      }

      if (filterName === 'price') {
        return filterValue.some((priceRange) => {
          if (priceRange === 'All Price') return true;
          if (priceRange === 'Free') return course.price === 0;
          if (priceRange === 'Paid') return course.price > 0;
        });
      }

      if (filterName === 'skills') {
        return filterValue.includes('All Skills') || filterValue.includes(course.skills);
      }

      if (filterName === 'instructors') {
        return filterValue.some((instructor) => instructor === course.instructor);
      }

      if (filterName === 'ratings') {
        return filterValue.some((rating) => course.rating >= parseFloat(rating));
      }

      return filterValue.includes(course[filterName]);
    });
  }
}
