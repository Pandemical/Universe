import HeaderComponent from '../src/view/header-component.js';
import CoursesListComponent from '../src/view/course-card-component.js';
import FilterComponent from '../src/view/filter-component.js';
import CoursesModel from '../src/model/universe-model.js';
import CoursesBoardPresenter from '../src/presenter/universe-presenter.js';
import FooterComponent from '../src/view/footer-component.js';
import CartModalComponent from '../src/view/cart-modal-component.js';
import CourseApiService from '../src/course-api-service.js'; // Добавлен импорт

import { render, RenderPosition } from './framework/render.js';

let cartModalComponent = null;

// Контейнеры для компонентов
const headerContainer = document.querySelector('.header-container');
const footerContainer = document.querySelector('.footer-container');
const filtersContainer = document.getElementById('filters-container');
const coursesListContainer = document.getElementById('courses-list-container');

const END_POINT = "https://6721d14298bbb4d93ca9c778.mockapi.io";
const courseApiService = new CourseApiService(END_POINT);
const coursesModel = new CoursesModel(courseApiService);

function showCartModal() {
  if (cartModalComponent) return; // Если модальное окно уже отображается, ничего не делаем.

  cartModalComponent = new CartModalComponent({
    cart: coursesModel.cart,
    totalPrice: coursesModel.totalCartPrice,
    onClearCart: () => {
      coursesModel.clearCart();
      closeCartModal();
    },
    onClose: closeCartModal,
  });

  render(cartModalComponent, document.body, RenderPosition.BEFOREEND);
  cartModalComponent.setEventListeners();
}

function closeCartModal() {
  if (cartModalComponent) {
    cartModalComponent.element.remove();
    cartModalComponent = null;
  }
}

// Добавляем функцию в глобальную область
window.showCartModal = showCartModal;

// Уведомляем заголовок о смене суммы при изменении корзины
coursesModel.addObserver(() => {
  headerComponent.cartTotal = coursesModel.totalCartPrice;
  headerComponent.updateElement(); // Обновляем элемент
  headerComponent.setEventListeners(); // Переустанавливаем слушатели
});

// Инициализация компонентов
const headerComponent = new HeaderComponent(
  0, 
  () => coursesModel.clearCart(),
  showCartModal // Передаем функцию открытия модального окна
);

const footerComponent = new FooterComponent();
render(headerComponent, headerContainer, RenderPosition.AFTERBEGIN);
render(footerComponent, footerContainer, RenderPosition.AFTERBEGIN);

headerComponent.setEventListeners();

// Инициализация презентера
const coursesBoardPresenter = new CoursesBoardPresenter({
  boardContainer: coursesListContainer,
  coursesModel: coursesModel,
});

coursesBoardPresenter.init();

// Создание и отрисовка фильтров
const filterComponent = new FilterComponent((filterName, filterValue) => {
  coursesBoardPresenter.setCategoryFilter(filterName, filterValue);
});
render(filterComponent, filtersContainer, RenderPosition.BEFOREEND);

// Установка обработчиков событий для фильтров
filterComponent.setEventListeners();
