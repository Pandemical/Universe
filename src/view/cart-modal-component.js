import { AbstractComponent } from "../framework/view/abstract-component.js";

function createCartModalTemplate(cart, totalPrice) {
  const coursesList = cart.map((course) => `
    <li class="cart-item">
      <span>${course.title} - $${course.price.toFixed(2)}</span>
    </li>
  `).join('');

  return `
    <div class="cart-modal">
      <div class="cart-modal-content">
        <h2>Cart</h2>
        <ul class="cart-list">
          ${coursesList}
        </ul>
        <p>Total: $${totalPrice.toFixed(2)}</p>
        <div class="cart-modal-actions">
          <button class="clear-cart-button">Clear Cart</button>
          <button class="close-modal-button">Close</button>
        </div>
      </div>
    </div>
  `;
}

export default class CartModalComponent extends AbstractComponent {
  constructor({ cart, totalPrice, onClearCart, onClose }) {
    super();
    this.cart = cart;
    this.totalPrice = totalPrice;
    this.onClearCart = onClearCart;
    this.onClose = onClose;
  }

  get template() {
    return createCartModalTemplate(this.cart, this.totalPrice);
  }

  setEventListeners() {
    this.element.querySelector('.clear-cart-button').addEventListener('click', () => {
      if (this.onClearCart) this.onClearCart();
    });

    this.element.querySelector('.close-modal-button').addEventListener('click', () => {
      if (this.onClose) this.onClose();
    });
  }
}
