import { courses as initialCourses } from '../mock/courses.js';

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
  
    this.#courseApiService.tasks
      .then((tasks) => {
        console.log('Инициализация модели курсами из API:', tasks);
        this.#courses = tasks; // Сохраняем курсы в модель
        this._notifyObservers(); // Уведомляем подписчиков
      })
      .catch((err) => console.error('Ошибка загрузки курсов:', err));
  }
  
  

  get courses() {
    return this.#courses.filter(course => this.#applyFilters(course));
  }

  get cart() {
    return this.#cart; // Возвращаем содержимое корзины
  }

  get totalCartPrice() {
    return this.#cart.reduce((total, course) => total + course.price, 0); // Общая сумма
  }
  addObserver(observer) {
    this.#observers.push(observer);
  }
  
  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }
  addToCart(course) {
    if (!this.#cart.some(cartItem => cartItem.id === course.id)) {
      this.#cart.push(course);
      this._notifyObservers(); // Уведомляем подписчиков о изменении корзины
    }
  }
  
  
  clearCart() {
    this.#cart = [];
    this._notifyObservers(); // Уведомляем подписчиков о очистке корзины
  }  

  setFilter(filterName, value) {
    if (filterName in this.#filters) {
      this.#filters[filterName] = value;
      this._notifyObservers();
    } else {
      console.warn(`Filter "${filterName}" is not recognized.`);
    }
  }
  #applyFilters(course) {
    return Object.entries(this.#filters).every(([filterName, filterValue]) => {
      if (!filterValue) return true;
  
      if (filterName === 'language') {
        return filterValue.includes('All Language') || filterValue.includes(course.language);
      }
  
      if (filterName === 'price') {
        return filterValue.some(priceRange => {
          if (priceRange === 'All Price') return filterValue.includes('All Price') || filterValue.includes(course.price);
          if (priceRange === 'Free') return course.price === 0;
          if (priceRange === 'Paid') return course.price > 0;
        });
      }
  
      if (filterName === 'skills') {
        return filterValue.includes('All Skills') || filterValue.includes(course.skills);
      }
  
      if (filterName === 'instructors') {
        return filterValue.some(instructor => {
          if (instructor === 'David Millar') return course.instructor === 'David Millar';
          if (instructor === 'Wade Warren') return course.instructor === 'Wade Warren';
          if (instructor === 'Jenny Wilson') return course.instructor === 'Jenny Wilson';
          if (instructor === 'Jacob Jones') return course.instructor === 'Jacob Jones';
        });
      }
  
      if (filterName === 'ratings') {
        return filterValue.some(rating => course.rating >= parseFloat(rating));
      }
  
      return filterValue.includes(course[filterName]);
    });
  }
  
}


