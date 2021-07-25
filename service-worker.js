/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'bookpwa-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/index.html',
  '/style/style.css',
  '/script/utils.js',
  '/script/index.js',
  '/script/dom.js',
  '/script/data.js',
  '/script/ceksw.js',
  '/script/component/app-brand.js',
  '/script/component/app-footer.js',
  '/script/component/app-hero.js',
  '/script/component/app-modal.js',
  '/script/component/app-notify.js',
  '/script/component/app-search.js',
  '/script/component/index.js',
  '/assets/icons/delete.png',
  '/assets/icons/edit.png',
  '/assets/icons/icon-apple.png',
  '/assets/icons/like.png',
  '/assets/icons/logo32.png',
  '/assets/icons/logo64.png',
  '/assets/icons/logo128.png',
  '/assets/icons/logo256.png',
  '/assets/icons/logo512.png',
  '/assets/icons/plus.png',
  '/assets/icons/read.png',
  '/assets/icons/unlike.png',
  '/assets/icons/unread.png',
  '/assets/images/owner.jpg',
  '/assets/images/shelf_glass.png',
  '/assets/images/shelf_wood.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then((response) => {
        if (response) {
          return response;
        }

        console.log(
          'ServiceWorker: Memuat aset dari server: ',
          event.request.url,
        );
        return fetch(event.request);
      }),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cacheName) => {
        if (cacheName != CACHE_NAME) {
          console.log(`ServiceWorker: cache ${cacheName} dihapus`);
          return caches.delete(cacheName);
        }
      }),
    )),
  );
});
