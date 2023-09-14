importScripts("/h/uv.bundle.js");
importScripts("/h/uv.config.js");
importScripts("/h/uv.sw.js");

const sw = new UVServiceWorker();
let userKey = new URL(location).searchParams.get('userkey');

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));