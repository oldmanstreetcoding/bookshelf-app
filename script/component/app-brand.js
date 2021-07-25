/* eslint-disable linebreak-style */
class AppBrand extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div id="header_wrapper">
                          <div id="header_brand">
                              <div id="brand_title">
                                  <img id="img-brand" src="assets/icons/logo32.png" alt="logo"/> Bookshelf
                              </div>
                          </div>
                      </div>`;
  }
}

customElements.define('app-brand', AppBrand);
