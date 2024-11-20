import HeaderComponent from '../src/view/header-component.js';
import CoursesListComponent from '../src/view/course-card-component.js'; // Компонент списка курсов
import FilterComponent from '../src/view/filter-component.js'; // Компонент фильтрации
import CoursesModel from '../src/model/universe-model.js'; // Модель курсов
import CoursesBoardPresenter from '../src/presenter/universe-presenter.js'; // Презентер

import { render, RenderPosition } from './framework/render.js';

// Контейнер для отрисовки компонентов
const headerContainer = document.querySelector('.header-container');

// Создаем и отображаем заголовок
const headerComponent = new HeaderComponent();
render(headerComponent, headerContainer, RenderPosition.AFTERBEGIN);

// Инициализация модели
const coursesModel = new CoursesModel();

// Основной контейнер для фильтров и списка курсов
const filtersContainer = document.getElementById('filters-container');
const coursesListContainer = document.getElementById('courses-list-container');

// Создаем и отображаем компонент фильтра
const filterComponent = new FilterComponent((selectedCategory) => {
  coursesBoardPresenter.setCategoryFilter(selectedCategory);
});
render(filterComponent, filtersContainer, RenderPosition.BEFOREEND);
filterComponent.setEventListeners();

// Инициализация презентера, который связывает модель и представление
const coursesBoardPresenter = new CoursesBoardPresenter({
  boardContainer: coursesListContainer,
  coursesModel: coursesModel,
});

// Создаем и отображаем компонент списка курсов
const coursesListComponent = new CoursesListComponent();
render(coursesListComponent, coursesListContainer, RenderPosition.BEFOREEND);

// Инициализация презентера
coursesBoardPresenter.init();
