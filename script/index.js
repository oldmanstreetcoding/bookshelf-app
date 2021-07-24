/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import DOM from './dom.js';
import Utils from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  Utils.focusInput('txsearch');

  DOM.openFormAddBook();
  DOM.closeFormAddBook();
  DOM.resetFormAddBook();
  DOM.submitFormAddBook();

  DOM.loadDataStorage();
});
