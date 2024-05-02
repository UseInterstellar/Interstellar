importScripts("/libcurl/index.js?v=1")
importScripts("/dy/config.js?v=10")
importScripts("/dy/worker.js?v=10")
importScripts("/assets/y/bundle.js?v=12")
importScripts("/assets/y/config.js?v=12")
importScripts(__uv$config.sw || "/assets/y/sw.js?v=12")

const uv = new UVServiceWorker()
const dynamic = new Dynamic()

self.dynamic = dynamic

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      if (await dynamic.route(event)) {
        return await dynamic.fetch(event)
      }

      if (event.request.url.startsWith(`${location.origin}/a/`)) {
        return await uv.fetch(event)
      }

      return await fetch(event.request)
    })()
  )
})
