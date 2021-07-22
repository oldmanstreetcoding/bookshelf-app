/* eslint-disable linebreak-style */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('hero-search').focus();

  const btnAddBook = document.getElementById('btn-add-book');
  const boxInput = document.getElementById('box-modal');

  btnAddBook.addEventListener('click', () => {
    boxInput.style.display = 'block';
  });
});
