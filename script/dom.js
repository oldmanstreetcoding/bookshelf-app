/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable no-use-before-define */
/* eslint-disable import/no-cycle */
/* eslint-disable radix */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/extensions */
import DATA from './data.js';
import Utils from './utils.js';

const formBook = document.getElementById('form-book');

const makeDialog = (info, type, id) => `<article id="box-dialog">
    <p id="title-dialog">${info}</p>
    <hr/>
    <div class="btn-group-confirm">
      <button class="btn-confirm btn-no-confirm" id="${id}-${type}-no">No</button>
      <button class="btn-confirm btn-ok-confirm" id="${id}-${type}">Yes</button>
    </div>
  </article>`;

const openFormAddBook = () => {
  const btnAddBook = document.querySelector('#btn-add-book');
  btnAddBook.addEventListener('click', () => {
    Utils.toggleShowItem('box-form-input', true);
    Utils.focusInput('title');
  });
};

const closeFormAddBook = () => {
  const btnCancel = document.querySelector('#btnCancel');
  btnCancel.addEventListener('click', () => {
    Utils.toggleShowItem('box-form-input', false);
    formBook.reset();
    document.getElementById('id').value = '';
  });
};

const resetFormAddBook = () => {
  formBook.addEventListener('reset', () => {
    document.getElementById('id').value = '';
  });
};

const getFormValue = () => {
  const formValues = document.querySelectorAll('.form-value');
  const formData = {};
  for (const input of formValues) {
    let val;
    if (input.type === 'checkbox') {
      val = input.checked;
    } else if (input.id === 'year') {
      val = parseInt(input.value);
    } else if (input.id === 'id') {
      val = input.value.length === 0 ? +new Date() : input.value;
    } else {
      val = input.value;
    }

    formData[input.id] = val;
  }

  return formData;
};

const submitFormAddBook = () => {
  formBook.addEventListener('submit', (event) => {
    event.preventDefault();

    const statusSave = document.getElementById('id').value.length === 0 ? 'save' : 'edit';

    DATA.saveData(getFormValue(), statusSave);
  });
};

const showUpdateBook = () => {
  const updateBooks = document.querySelectorAll('.btn-update');

  for (const book of updateBooks) {
    book.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const bookId = book.id.split('-');
      const id = bookId[0];

      const books = DATA.getData();

      let arrData;
      books.map((data) => {
        if (data.id === parseInt(id)) {
          arrData = data;
        }
      });

      Utils.toggleShowItem('box-form-input', true);

      const formValues = document.querySelectorAll('.form-value');
      for (const input of formValues) {
        if (input.type === 'checkbox') {
          input.checked = arrData[input.id];
        } else {
          input.value = arrData[input.id];
        }
      }
    });
  }
};

const okFavoriteBook = (id) => {
  const books = DATA.getData();

  let arrId;
  books.map((data, index) => {
    if (data.id === parseInt(id)) {
      arrId = index;
    }
  });

  const favStatus = books[arrId].isfavorite;

  books[arrId].isfavorite = !favStatus;

  localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(books));

  loadDataStorage('all');

  Utils.toggleToast('success', favStatus ? 'Remove Favorite Book Succesfully' : 'Set New Favorite Book');
};

const okCompleteBook = (id) => {
  const books = DATA.getData();

  let arrId;
  books.map((data, index) => {
    if (data.id === parseInt(id)) {
      arrId = index;
    }
  });

  const comStatus = books[arrId].iscomplete;

  books[arrId].iscomplete = !comStatus;

  localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(books));

  loadDataStorage('all');

  Utils.toggleToast('success', comStatus ? 'The Book Has Moved to UnRead Shelf Succesfully' : 'The Book Has Moved to HasRead Shelf Succesfully');
};

const okDeleteBook = (id) => {
  const books = DATA.getData();
  const ndata = books.length;

  if (ndata === 1) {
    localStorage.removeItem(DATA.STORAGE_KEY);
    location.reload();
  } else {
    let arrId;
    books.map((data, index) => {
      if (data.id === parseInt(id)) {
        arrId = index;
      }
    });

    books.splice(arrId, 1);

    localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(books));

    loadDataStorage('all');
  }

  Utils.toggleToast('success', 'Data Has Deleted Succesfully');
};

const agreeConfirm = () => {
  const btnConfirm = document.querySelectorAll('.btn-ok-confirm');
  for (const btn of btnConfirm) {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const confirmData = btn.id.split('-');
      const id = confirmData[0];
      const type = confirmData[1];

      Utils.toggleShowItem('boxmodal', false);

      if (type === 'delete') {
        okDeleteBook(id);
      } else if (type === 'complete') {
        okCompleteBook(id);
      } else if (type === 'favorite') {
        okFavoriteBook(id);
      } else if (type === 'addnewdata') {
        Utils.focusInput('title');
      }
    });
  }
};

const cancelConfirm = () => {
  const btnCancel = document.querySelectorAll('.btn-no-confirm');
  for (const btn of btnCancel) {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const confirmData = btn.id.split('-');
      const type = confirmData[1];

      if (type === 'addnewdata') {
        Utils.toggleShowItem('box-form-input', false);
      }
      Utils.toggleShowItem('boxmodal', false);
    });
  }
};

const openModalDialog = (info, type, id) => {
  Utils.toggleShowItem('boxmodal', true);
  document.querySelector('#boxmodal').innerHTML = makeDialog(info, type, id);

  cancelConfirm();

  agreeConfirm();
};

const deleteBook = () => {
  const deleteBooks = document.querySelectorAll('.btn-delete');

  for (const book of deleteBooks) {
    book.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const bookId = book.id.split('-');
      const id = bookId[0];
      const txinfo = 'Do You Want to Delete This Book From All The Book Shelf ?';

      openModalDialog(txinfo, 'delete', id);
    });
  }
};

const completeBook = () => {
  const completeBooks = document.querySelectorAll('.btn-complete');

  for (const book of completeBooks) {
    book.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const bookId = book.id.split('-');
      const id = bookId[0];
      const comStatus = bookId[1] === 'unread';
      const txinfo = 'Do You Want to Remove This Book From Has Read Book Shelf ?';

      if (comStatus) {
        openModalDialog(txinfo, 'complete', id);
      } else {
        okCompleteBook(id);
      }
    });
  }
};

const favoriteBook = () => {
  const favBooks = document.querySelectorAll('.btn-favorite');

  for (const book of favBooks) {
    book.addEventListener('click', (event) => {
      event.stopPropagation();
      event.preventDefault();

      const bookId = book.id.split('-');
      const id = bookId[0];
      const favStatus = bookId[1] === 'unlike';
      const txinfo = 'Do You Want to Remove This Book From Your Favorite ?';

      if (favStatus) {
        openModalDialog(txinfo, 'favorite', id);
      } else {
        okFavoriteBook(id);
      }
    });
  }
};

const showBookGroupBtn = () => {
  const covers = document.querySelectorAll('.wrap-book');

  for (const cover of covers) {
    cover.addEventListener('mouseover', () => {
      Utils.toggleShowItem(`${cover.id}-wrap`, true);
    });

    cover.addEventListener('mouseout', () => {
      Utils.toggleShowItem(`${cover.id}-wrap`, false);
    });

    cover.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        Utils.toggleShowItem(`${cover.id}-wrap`, true);
      }
    });
  }

  favoriteBook();

  completeBook();

  deleteBook();

  showUpdateBook();
};

const makeBook = (book) => {
  const id = book.id.toString();
  const index = parseInt(id.charAt(id.length - 1));
  const bookColor = [
    'green',
    'tomato',
    'lightseagreen',
    'orange',
    'plum',
    'pink',
    'lightblue',
    'wheat',
    'maroon',
    'dodgerblue',
  ];

  const imgFav = book.isfavorite ? 'unlike' : 'like';
  const imgCom = book.iscomplete ? 'unread' : 'read';

  return `<div class="wrap-book" id="${book.id}" style="background-color: ${bookColor[index]}" tabindex="0">
            <div class="book-edge"></div>
            <div class="book-cover">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
            </div>
            <div class="btn-book-wrapper" id="${book.id}-wrap">
                <div class="btn-book-group">
                    <button class="btn-book btn-favorite" id="${book.id}-${imgFav}">
                        <img class="img-btn-book" src="assets/icons/${imgFav}.png" title="${imgFav} This Book" alt="${imgFav}"/>
                    </button>
                    <button class="btn-book btn-complete" id="${book.id}-${imgCom}">
                        <img class="img-btn-book" src="assets/icons/${imgCom}.png" title="${imgCom} This Book" alt="${imgCom}"/>
                    </button>
                    
                    <button class="btn-book btn-update" id="${book.id}-update">
                        <img class="img-btn-book" src="assets/icons/edit.png" title="Edit This Book" alt="edit"/>
                    </button>
                    <button class="btn-book btn-delete" id="${book.id}-delete">
                        <img class="img-btn-book" src="assets/icons/delete.png" title="Delete This Book" alt="delete"/>
                    </button>
                </div>
            </div>
          </div>`;
};

const searchBook = () => {
  const textSearch = document.querySelector('#txsearch');
  textSearch.addEventListener('input', () => {
    const txsrc = textSearch.value;

    if (txsrc.length > 3 && txsrc.length % 2 === 0) {
      const books = DATA.getData();
      const foundBooks = [];
      for (const book of books) {
        if (book.title.toLowerCase().includes(txsrc.toLowerCase())
          || book.author.toLowerCase().includes(txsrc.toLowerCase())
          || book.year.toString().includes(txsrc.toLowerCase())
        ) {
          foundBooks.push(book);
        }
      }

      loadDataStorage('search', foundBooks);
    } else if (txsrc.length === 0) {
      loadDataStorage('all');
    }
  });
};

const loadDataStorage = (type, data = []) => {
  let books = null;
  if (type === 'all') {
    books = DATA.getData();
  } else {
    books = data;
  }

  if (books === null) {
    Utils.toggleToast('error', 'Book not found');
  } else if (books.length === 0) {
    Utils.toggleToast('error', 'Book not found');
  } else {
    let htmlFavoriteShelf = '';
    let htmlHasReadShelf = '';
    let htmlUnReadShelf = '';

    for (const book of books) {
      if (book.isfavorite) {
        htmlFavoriteShelf += makeBook(book);
      } else if (book.iscomplete) {
        htmlHasReadShelf += makeBook(book);
      } else {
        htmlUnReadShelf += makeBook(book);
      }
    }

    document.getElementById('favorite-shelf').innerHTML = htmlFavoriteShelf;
    document.getElementById('unread-shelf').innerHTML = htmlUnReadShelf;
    document.getElementById('hasread-shelf').innerHTML = htmlHasReadShelf;

    showBookGroupBtn();

    Utils.toggleToast('info', `${books.length} Books have found`);
  }
};

const DOM = {
  searchBook,
  openFormAddBook,
  closeFormAddBook,
  submitFormAddBook,
  resetFormAddBook,
  loadDataStorage,
  openModalDialog,
};

export default DOM;
