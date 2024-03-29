importScripts('/dy/config.js?v=4')
importScripts('/dy/worker.js?v=4')
importScripts('/m/bundle.js?v=4')
importScripts('/m/config.js?v=4')
importScripts(__uv$config.sw || '/m/sw.js?v=4')

const uv = new UVServiceWorker()
const dynamic = new Dynamic()

let userKey = new URL(location).searchParams.get('userkey')
self.dynamic = dynamic

self.addEventListener('fetch', (event) => {
  event.respondWith(
    (async function () {
      if (await dynamic.route(event)) {
        return await dynamic.fetch(event)
      }

      if (event.request.url.startsWith(location.origin + '/a/')) {
        return await uv.fetch(event)
      }

      return await fetch(event.request)
    })()
  )
})
