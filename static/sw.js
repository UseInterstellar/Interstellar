importScripts("/dy/config.js?v=10")
importScripts("/dy/worker.js?v=10")
importScripts("/assets/-/bundle.js?v=1")
importScripts("/assets/-/config.js?v=1")
importScripts(__uv$config.sw || "/assets/-/sw.js?v=1")

const uv = new UVServiceWorker()
const dynamic = new Dynamic()

let userKey = new URL(location).searchParams.get("userkey")
self.dynamic = dynamic

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async function () {
      if (await dynamic.route(event)) {
        return await dynamic.fetch(event)
      }

      if (event.request.url.startsWith(location.origin + "/a/")) {
        return await uv.fetch(event)
      }

      return await fetch(event.request)
    })()
  )
})
