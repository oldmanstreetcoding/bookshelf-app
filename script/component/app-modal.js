/* eslint-disable linebreak-style */
class AppModal extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '<section id="boxmodal"></section>';
  }
}

customElements.define('app-modal', AppModal);
