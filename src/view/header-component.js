import { AbstractComponent } from "../framework/view/abstract-component.js";

function createHeaderComponentTemplate() {
    return (
        `<header class="header">
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
                        <img src="image/backet.png" alt="">
                        <p>$00.0</p>
                    </div>
                    <button class="header-button">Get Started</button>
                </ul>
            </nav>
        </div>
    </header>`
    );
}

export default class HeaderComponent extends AbstractComponent {
  get template() {
    return createHeaderComponentTemplate();
  }
}
