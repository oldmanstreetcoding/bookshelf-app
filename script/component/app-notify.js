/* eslint-disable linebreak-style */
class AppNotify extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '<div id="toast-message"></div>';
  }
}

customElements.define('app-notify', AppNotify);
