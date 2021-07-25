/* eslint-disable linebreak-style */
class AppFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<footer>
        Readaholic &#169; 2021 &middot; Streetcoding
    </footer>`;
  }
}

customElements.define('app-footer', AppFooter);
