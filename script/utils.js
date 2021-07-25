/* eslint-disable linebreak-style */

// form input focus //
const focusInput = (id) => document.getElementById(id).focus();

// show and hide html element //
const toggleShowItem = (id, status) => {
  document.getElementById(id).style.display = status ? 'block' : 'none';
};

// show and hide app-notify //
const toggleToast = (type, text) => {
  const toast = document.getElementById('toast-message');

  const toastType = {
    success: 'green',
    error: 'tomato',
    info: 'teal',
    warning: 'orange',
  };

  toast.style.backgroundColor = toastType[type];
  toast.innerHTML = text;
  toast.style.opacity = 1;

  setTimeout(() => {
    toast.style.opacity = 0;
  }, 5000);
};

const Utils = {
  focusInput,
  toggleShowItem,
  toggleToast,
};

export default Utils;
