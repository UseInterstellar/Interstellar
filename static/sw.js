importScripts("./uv.bundle.js");
importScripts("./uv.config.js");
importScripts("./uv.sw.js");

const sw = new UVServiceWorker();
let userKey = new URL(location).searchParams.get('userkey');

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));