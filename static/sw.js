importScripts('/m/bundle.js')
importScripts('/m/config.js')
importScripts('/m/sw.js')

const sw = new UVServiceWorker()
let userKey = new URL(location).searchParams.get('userkey')

self.addEventListener('fetch', (event) => event.respondWith(sw.fetch(event)))
