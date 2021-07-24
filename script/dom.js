/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
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

      event.stopPropagation();
      event.preventDefault();
    });
  }
};

const deleteBook = () => {
  const deleteBooks = document.querySelectorAll('.btn-delete');

  for (const book of deleteBooks) {
    book.addEventListener('click', (event) => {
      const bookId = book.id.split('-');
      const id = bookId[0];

      const strconfirm = confirm('Do You Want to Delete This Book From All Book Shelf ?');
      if (strconfirm) {
        const books = DATA.getData();

        let arrId;
        books.map((data, index) => {
          if (data.id === parseInt(id)) {
            arrId = index;
          }
        });

        books.splice(arrId, 1);

        localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(books));

        loadDataStorage();

        Utils.toggleToast('success', 'Data Has Deleted Succesfully');
      }

      event.stopPropagation();
      event.preventDefault();
    });
  }
};

const completeBook = () => {
  const completeBooks = document.querySelectorAll('.btn-complete');

  for (const book of completeBooks) {
    book.addEventListener('click', (event) => {
      const bookId = book.id.split('-');
      const id = bookId[0];
      const comStatus = bookId[1] === 'read1';
      let nextStep = true;

      if (comStatus) {
        const strconfirm = confirm('Do You Want to Remove This Book From Has Read Book Shelf ?');
        if (!strconfirm) {
          nextStep = false;
        }
      }

      if (nextStep) {
        const books = DATA.getData();

        let arrId;
        books.map((data, index) => {
          if (data.id === parseInt(id)) {
            arrId = index;
          }
        });

        books[arrId].iscomplete = !comStatus;

        localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(books));

        loadDataStorage();

        Utils.toggleToast('success', comStatus ? 'Remove HasRead Book Succesfully' : 'Set New HasRead Book');
      }

      event.stopPropagation();
      event.preventDefault();
    });
  }
};

const favoriteBook = () => {
  const favBooks = document.querySelectorAll('.btn-favorite');

  for (const book of favBooks) {
    book.addEventListener('click', (event) => {
      const bookId = book.id.split('-');
      const id = bookId[0];
      const favStatus = bookId[1] === 'love1';
      let nextStep = true;

      if (favStatus) {
        const strconfirm = confirm('Do You Want to Remove This Book From Your Favorite ?');
        if (!strconfirm) {
          nextStep = false;
        }
      }

      if (nextStep) {
        const books = DATA.getData();

        let arrId;
        books.map((data, index) => {
          if (data.id === parseInt(id)) {
            arrId = index;
          }
        });

        books[arrId].isfavorite = !favStatus;

        localStorage.setItem(DATA.STORAGE_KEY, JSON.stringify(books));

        loadDataStorage();

        Utils.toggleToast('success', favStatus ? 'Remove Favorite Book Succesfully' : 'Set New Favorite Book');
      }

      event.stopPropagation();
      event.preventDefault();
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

  const imgFav = book.isfavorite ? 'love1' : 'love2';
  const imgCom = book.iscomplete ? 'read1' : 'read2';

  return `<div class="wrap-book" id="${book.id}" style="background-color: ${bookColor[index]}" tabindex="0">
            <div class="book-edge"></div>
            <div class="book-cover">
                <div class="book-title">${book.title}</div>
                <div class="book-author">${book.author}</div>
            </div>
            <div class="btn-book-wrapper" id="${book.id}-wrap">
                <div class="btn-book-group">
                    <button class="btn-book btn-favorite" id="${book.id}-${imgFav}">
                        <img class="img-btn-book" src="assets/icons/${imgFav}.png"/>
                    </button>
                    <button class="btn-book btn-complete" id="${book.id}-${imgCom}">
                        <img class="img-btn-book" src="assets/icons/${imgCom}.png"/>
                    </button>
                    
                    <button class="btn-book btn-update" id="${book.id}-update">
                        <img class="img-btn-book" src="assets/icons/edit.png"/>
                    </button>
                    <button class="btn-book btn-delete" id="${book.id}-delete">
                        <img class="img-btn-book" src="assets/icons/delete.png"/>
                    </button>
                </div>
            </div>
          </div>`;
};

const loadDataStorage = () => {
  if (DATA.getData() !== null) {
    let htmlFavoriteShelf = '';
    let htmlHasReadShelf = '';
    let htmlUnReadShelf = '';

    for (const book of DATA.getData()) {
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
  }
};

const DOM = {
  openFormAddBook,
  closeFormAddBook,
  submitFormAddBook,
  resetFormAddBook,
  loadDataStorage,
};

export default DOM;
