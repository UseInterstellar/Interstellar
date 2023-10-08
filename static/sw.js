importScripts("/h/mathematics.js");
importScripts("/h/geography.js");
importScripts("/h/english.js");

const sw = new UVServiceWorker();
let userKey = new URL(location).searchParams.get('userkey');

self.addEventListener("fetch", (event) => event.respondWith(sw.fetch(event)));