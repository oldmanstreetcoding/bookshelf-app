/* eslint-disable linebreak-style */
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<footer>
        Bookshelf &#169; 2021 &middot; Streetcoding
    </footer>`;
  }
}

customElements.define('app-footer', AppFooter);
