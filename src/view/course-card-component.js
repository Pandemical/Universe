import { AbstractComponent } from "../framework/view/abstract-component.js";

function createCourseCardComponentTemplate(course) {
    const {image,title,category,rating,instructor,price} = course;
    return (`
    <div class="box">
      <figure>
        <img src="${image}" alt="${title}" />
        <figcaption>${category} (${rating} Reviews)</figcaption>
        <h3>${title}</h3>
        <p>By <span>${instructor}</span></p>
        <div class="d-flex">
          <button>Enroll Now</button>
          <p>$${price}</p>
        </div>
      </figure>
    </div>
  `);
}
export default class CourseCardComponent extends AbstractComponent {
  constructor({ course, onEnroll }) { // Добавлен обработчик onEnroll
    super();
    this.course = course || {};
    this.onEnroll = onEnroll; 
  }

  get template() {
    return createCourseCardComponentTemplate(this.course);
  }

  setEventListeners() {
    const button = this.element.querySelector('button');
    if (!button) {
      console.error('Кнопка "Enroll Now" не найдена!');
      return;
    }
    button.addEventListener('click', () => {
      if (this.onEnroll) {
        this.onEnroll(this.course); // Добавляем курс в корзину
      }
    });
  }
  
}

