/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
/* eslint-disable valid-typeof */
// import DOM from './dom.js';
import DOM from './dom.js';
import Utils from './utils.js';

const STORAGE_KEY = 'BOOK_SHELF';

const isStorageExist = () => {
  if (typeof (Storage) === undefined) {
    Utils.toggleToast('error', 'Your browser does not support local storage');
    return false;
  }
  return true;
};

const getData = () => {
  if (isStorageExist) {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(serializedData);
  }

  return null;
};

const saveData = (data, status) => {
  const bookStorage = getData();
  let parsed;
  let nextStep;

  if (status === 'save') {
    if (bookStorage === null) {
      parsed = [data];
      nextStep = true;
    } else if (bookStorage.length === 0) {
      parsed = [data];
      nextStep = true;
    } else {
      let nfound = 0;
      for (const book of bookStorage) {
        if (book.title.toLowerCase() === data.title.toLowerCase()
        && book.author.toLowerCase() === data.author.toLowerCase()
        && book.year === data.year
        ) {
          nfound++;
        }
      }

      if (nfound === 0) {
        bookStorage.push(data);
        nextStep = true;
      } else {
        nextStep = false;
      }

      parsed = bookStorage;
    }
  } else {
    let arrId;
    bookStorage.map((dataStorage, index) => {
      if (dataStorage.id === parseInt(data.id)) {
        arrId = index;
      }
    });

    bookStorage[arrId].title = data.title;
    bookStorage[arrId].author = data.author;
    bookStorage[arrId].year = data.year;
    bookStorage[arrId].isfavorite = data.isfavorite;
    bookStorage[arrId].iscomplete = data.iscomplete;

    parsed = bookStorage;
    nextStep = true;
  }

  if (nextStep) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

    Utils.toggleToast('success', 'Data Has Updated Succesfully');

    DOM.loadDataStorage('all');

    document.getElementById('form-book').reset();

    if (status === 'save') {
      const txinfo = 'Do You Want To Add Another Book ?';
      DOM.openModalDialog(txinfo, 'addnewdata', 0);
    } else {
      Utils.toggleShowItem('box-form-input', false);
    }
  } else {
    Utils.toggleToast('error', 'Data have existed before.');
  }
};

const DATA = {
  isStorageExist,
  getData,
  saveData,
  STORAGE_KEY,
};

export default DATA;
