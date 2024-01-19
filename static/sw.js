/*global UVServiceWorker,__uv$config*/
importScripts('/m/bundle.js');
importScripts('/m/config.js');
importScripts(__uv$config.sw || '/m/sw.js');

const sw = new UVServiceWorker();

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)));
