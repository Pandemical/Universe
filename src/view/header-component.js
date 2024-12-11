import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate(cartTotal) {
    return `
      <header class="header">
        <div class="container">
          <nav class="menu">
            <ul class="menu-list">
              <div class="header-logo">
                <a href="#"><img src="image/logo.png" alt="logo"></a>
              </div>
              <a href="index.html" class="list-item">Home</a>
              <a href="#" class="list-item">Courses</a>
              <a href="#" class="list-item">Shop</a>
              <a href="#" class="list-item">Blog</a>
              <form class="header-form">
                <input type="text" placeholder="Search For Course..." class="form-input">
                <button type="submit" class="form-button">
                  <img src="image/search.png" alt="">
                </button>
              </form>
                <div class="header-cart">
                <img src="image/backet.png" alt="Cart">
                </div>
              <button class="header-button">Get Started</button>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
  
  export default class HeaderComponent extends AbstractComponent {
    constructor(cartTotal = 0, onClearCart, onShowCart) {
      super();
      this.cartTotal = cartTotal;
      this.onClearCart = onClearCart;
      this.onShowCart = onShowCart;
    }
  
    get template() {
      return createHeaderComponentTemplate(this.cartTotal);
    }
  
    setEventListeners() {
        const clearCartButton = this.element.querySelector('.clear-cart-button');
        if (clearCartButton) {
          clearCartButton.addEventListener('click', () => {
            if (this.onClearCart) {
              this.onClearCart();
            }
          });
        }

        this.element.querySelector('.header-button').addEventListener('click', () => {
          if (this.onShowCart) {
            this.onShowCart(); 
          }
        });
      }      
      updateElement() {
        const oldElement = this.element;
        this.removeElement(); 
        const newElement = this.element; 
        oldElement.replaceWith(newElement); 
      
        this.setEventListeners(); 
      }
      
  }
