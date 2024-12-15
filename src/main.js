import HeaderComponent from '../src/view/header-component.js';
import CoursesListComponent from '../src/view/course-card-component.js';
import FilterComponent from '../src/view/filter-component.js';
import CoursesModel from '../src/model/universe-model.js';
import CoursesBoardPresenter from '../src/presenter/universe-presenter.js';
import FooterComponent from '../src/view/footer-component.js';
import CourseApiService from '../src/course-api-service.js'; // Добавлен импорт
import ButtonAddComponent from './view/button-add-component.js';
import AddCourseModalComponent from '../src/view/course-modal-component.js'; // Импорт нового компонента

import { render, RenderPosition } from './framework/render.js';

// Контейнеры для компонентов
const headerContainer = document.querySelector('.header-container');
const footerContainer = document.querySelector('.footer-container');
const filtersContainer = document.getElementById('filters-container');
const coursesListContainer = document.getElementById('courses-list-container');
const buttonAddContainer = document.getElementById('button-container');

const END_POINT = "https://6721d14298bbb4d93ca9c778.mockapi.io"; // Убедитесь, что это корректный URL
const courseApiService = new CourseApiService(END_POINT);
const coursesModel = new CoursesModel(courseApiService);

// Инициализация компонентов
const headerComponent = new HeaderComponent();

const footerComponent = new FooterComponent();
render(headerComponent, headerContainer, RenderPosition.AFTERBEGIN);
render(footerComponent, footerContainer, RenderPosition.AFTERBEGIN);

headerComponent.setEventListeners();

const buttonAddComponent = new ButtonAddComponent();

render(buttonAddComponent, buttonAddContainer, RenderPosition.AFTERBEGIN);

// Используем экземпляр презентера для вызова showAddCourseModal
const coursesBoardPresenter = new CoursesBoardPresenter({
  boardContainer: coursesListContainer,
  coursesModel: coursesModel,
  courseApiService: courseApiService,
});

buttonAddComponent.setEventListeners(() => {
  coursesBoardPresenter.showAddCourseModal(); // Теперь вызываем через презентер
});

coursesBoardPresenter.init();

const filterComponent = new FilterComponent((filterName, filterValue) => {
  coursesBoardPresenter.setCategoryFilter(filterName, filterValue);
});
render(filterComponent, filtersContainer, RenderPosition.BEFOREEND);

filterComponent.setEventListeners();
