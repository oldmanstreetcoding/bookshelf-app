/* eslint-disable linebreak-style */
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
  let parsed = [data];
  const bookStorage = getData();

  if (status === 'save') {
    if (bookStorage !== null || bookStorage.length !== 0) {
      for (const book of bookStorage) {
        if (book.title.toLowerCase() === data.title.toLowerCase()
        || book.author.toLowerCase() === data.author.toLowerCase()
        || book.year.toString() === data.year.toLowerCase()
        ) {
          Utils.toggleToast('error', 'Data has existed before.');
        } else {
          bookStorage.push(data);
        }
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
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

  DOM.loadDataStorage('all');

  Utils.toggleToast('success', 'Data Has Updated Succesfully');

  document.getElementById('form-book').reset();

  if (status === 'save') {
    const txinfo = 'Do You Want To Add Another Book ?';
    DOM.openModalDialog(txinfo, 'addnewdata', 0);
  } else {
    Utils.toggleShowItem('box-form-input', false);
  }
};

const DATA = {
  isStorageExist,
  getData,
  saveData,
  STORAGE_KEY,
};

export default DATA;
