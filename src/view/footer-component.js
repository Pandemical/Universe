import { AbstractComponent } from "../framework/view/abstract-component.js";

function createFooterComponentTemplate(){
    return (   ` 
    <footer>

        <div class="footer-top">
            <div class="container">
            <div class="footer-logo">
                <img src="image/footer-logo.png" alt="logo">
                <p>when an unknown printer took galley of <br>
                    type and scrambled it to make pspecimen <br>
                    bookt has.</p>
                <p>463 7th Ave, NY 10018, USA</p>
                <p>+123 88 9900 456</p>
            </div>
            <div>
                <h3>Useful Links</h3>
                <li>Our values</li>
                <li>Our advisory board</li>
                <li>Our partners</li>
                <li>Become a partner</li>
                <li>Work at Future Learn</li>
                <li>Quizlet Plus</li>
            </div>
            <div>
                <h3>Our Company</h3>
                <li>Contact Us</li>
                <li>Become Teacher</li>
                <li>Blog</li>
                <li>Instructor</li>
                <li>Events</li>
            </div>
            <div>
                <h3>Get In Touch</h3>
                <p>when an unknown printer took <br>
                    galley type and scrambled</p>
                <div class="links-container">
                    <img src="image/facebook.png" alt="">
                    <img src="image/twitter.png" alt="">
                    <img src="image/whatsup.png" alt="">
                    <img src="image/youtube.png" alt="">
                </div>
            </div>
        </div>
        </div>
        <div class="footer-bot">
            <p>© 2010-2024 skillgro.com. All rights reserved.</p>
        </div>
    
    </footer>`)

}
export default class FooterComponent extends AbstractComponent {
    get template() {
      return createFooterComponentTemplate();
    }
  }