importScripts('./uv.bundle.js');
importScripts('./uv.config.js');
importScripts(__uv$config.sw || './uv.sw.js');

const sw = new UVServiceWorker();
self.addEventListener('fetch', event => {
    event.respondWith(sw.fetch(event))
});