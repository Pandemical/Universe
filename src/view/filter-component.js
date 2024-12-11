import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFilterComponentTemplate() {
    return `
    <div class="sort">
      <fieldset class="categories">
        <h2>Categories</h2>
        <input type="checkbox" name="category" value="Art & Design" /> Art & Design <br>
        <input type="checkbox" name="category" value="Business" /> Business <br>
        <input type="checkbox" name="category" value="Data Science" /> Data Science <br>
        <input type="checkbox" name="category" value="Development" /> Development <br>
        <input type="checkbox" name="category" value="Finance" /> Finance <br>
        <input type="checkbox" name="category" value="Health & Fitness" /> Health & Fitness <br>
        <input type="checkbox" name="category" value="Lifestyle" /> Lifestyle <br>
      </fieldset>
      <fieldset class="language">
        <h2>Language</h2>
        <input type="checkbox" name="language" value="All Language" checked="true" /> All Language <br>
        <input type="checkbox" name="language" value="Arabic" /> Arabic <br>
        <input type="checkbox" name="language" value="English" /> English <br>
        <input type="checkbox" name="language" value="Spanish" /> Spanish <br>
      </fieldset>
      <fieldset class="price">
        <h2>Price</h2>
        <input type="checkbox" name="price" value="All Price" checked="true" /> All Price <br>
        <input type="checkbox" name="price" value="Free" /> Free <br>
        <input type="checkbox" name="price" value="Paid" /> Paid <br>
      </fieldset>
      <fieldset class="instructors">
        <h2>Instructors</h2>
        <input type="checkbox" name="instructors" value="David Millar" /> David Millar <br>
        <input type="checkbox" name="instructors" value="Wade Warren" /> Wade Warren <br>
        <input type="checkbox" name="instructors" value="Jenny Wilson" /> Jenny Wilson <br>
        <input type="checkbox" name="instructors" value="Jacob Jones" /> Jacob Jones <br>
      </fieldset>
      <fieldset class="ratings">
        <h2>Ratings</h2>
        <input type="checkbox" name="ratings" value="5" /> 5 <br>
        <input type="checkbox" name="ratings" value="4" /> 4 <br>
        <input type="checkbox" name="ratings" value="3" /> 3 <br>
        <input type="checkbox" name="ratings" value="2" /> 2 <br>
        <input type="checkbox" name="ratings" value="1" /> 1 <br>
      </fieldset>
    </div>
    `;
}

export default class FilterComponent extends AbstractComponent {
  #onFilterChange = null;
  constructor(onFilterChange) {
    super();
    this.#onFilterChange = onFilterChange; // Метод для передачи данных в модель
  }

  get template() {
    return createFilterComponentTemplate();
  }

  setEventListeners() {
    this.element.querySelectorAll('input').forEach(input => {
      input.addEventListener('change', (event) => {
        const filterName = event.target.name;
        const checkedInputs = Array.from(
          this.element.querySelectorAll(`input[name="${filterName}"]:checked`)
        ).map(input => {
          return input.value; // Оставляем строковые значения
        });
  
        // Обновляем фильтр через callback
        this.#onFilterChange(filterName, checkedInputs.length > 0 ? checkedInputs : null);
      });
    });
  }
  
}
