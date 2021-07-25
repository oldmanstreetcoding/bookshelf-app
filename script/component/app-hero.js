/* eslint-disable linebreak-style */
class AppHero extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<img id="img-owner" src="assets/images/owner.jpg" width="80px" alt="owner" />
                      <h1 id="title-owner">Ahmad Furqan</h1>
                      <div id="message-owner">" The more you read, The more you forget "</div>`;
  }
}

customElements.define('app-hero', AppHero);
