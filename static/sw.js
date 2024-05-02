importScripts("/libcurl/index.js=0")
importScripts("/dy/config.js?v=10")
importScripts("/dy/worker.js?v=10")
importScripts("/m/bundle.js?v=10")
importScripts("/m/config.js?v=10")
importScripts(__uv$config.sw || "/m/sw.js?v=10")

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
