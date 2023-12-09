importScripts("/contact/bundle.js");
importScripts("/contact/config.js");
importScripts("/contact/sw.js");

const sw = new UVServiceWorker();
let userKey = new URL(location).searchParams.get('userkey');

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));
