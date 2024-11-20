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
  constructor({ course } = {}) {
    super();
    this.course = course || {}; 
  }
  

  get template() {
    return createCourseCardComponentTemplate(this.course);
  }
}
