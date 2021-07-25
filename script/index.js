/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import './ceksw.js';
import DOM from './dom.js';
import Utils from './utils.js';
import './component/index.js';

document.addEventListener('DOMContentLoaded', () => {
  Utils.focusInput('txsearch');
  DOM.searchBook();

  DOM.openFormAddBook();
  DOM.closeFormAddBook();
  DOM.resetFormAddBook();
  DOM.submitFormAddBook();

  DOM.loadDataStorage('all');
});
