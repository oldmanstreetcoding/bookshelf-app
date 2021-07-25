/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import './ceksw.js';
import DOM from './dom.js';
import './component/index.js';

document.addEventListener('DOMContentLoaded', () => {
  DOM.searchBook();

  DOM.openFormAddBook();
  DOM.closeFormAddBook();
  DOM.resetFormAddBook();
  DOM.submitFormAddBook();

  DOM.loadDataStorage('all');
});
