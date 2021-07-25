/* eslint-disable linebreak-style */
class AppSearch extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="input-group">
                        <div class="input-group-area">
                            <form id="form-search" action="#">
                                <input id="txsearch" type="text" placeholder="Search by title, author or year ...">
                            </form>
                        </div>
                        <div class="input-group-icon">
                            <button id="btn-add-book" title="Add Book">
                                <img id="img-add-book" src="assets/icons/plus.png" alt="addbook" />
                            </button>
                        </div>
                    </div>`;
  }
}

customElements.define('app-search', AppSearch);
