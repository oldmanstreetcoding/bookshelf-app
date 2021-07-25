/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable array-callback-return */
/* eslint-disable import/no-cycle */
/* eslint-disable no-alert */
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
  if (status === 'save') {
    if (getData() !== null || getData().length !== 0) {
      const books = getData();
      books.push(data);
      parsed = books;
    }
  } else {
    const upbooks = getData();
    let arrId;
    upbooks.map((dataStorage, index) => {
      if (dataStorage.id === parseInt(data.id)) {
        arrId = index;
      }
    });

    upbooks[arrId].title = data.title;
    upbooks[arrId].author = data.author;
    upbooks[arrId].year = data.year;
    upbooks[arrId].isfavorite = data.isfavorite;
    upbooks[arrId].iscomplete = data.iscomplete;

    parsed = upbooks;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

  DOM.loadDataStorage('all');

  Utils.toggleToast('success', 'Data Has Updated Succesfully');

  document.getElementById('form-book').reset();

  if (status === 'save') {
    const strconfirm = confirm('Do You Want To Add Another Book ?');
    if (!strconfirm) {
      Utils.toggleShowItem('box-form-input', false);
    }
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
