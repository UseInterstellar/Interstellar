importScripts("/assets/-dy/config.js?v=6-17-2024");
importScripts("/assets/-dy/worker.js?v=6-17-2024");
importScripts("/assets/-uv/bundle.js?v=6-17-2024");
importScripts("/assets/-uv/config.js?v=6-17-2024");
importScripts(__uv$config.sw || "/assets/-uv/sw.js?v=6-17-2024");

const uv = new UVServiceWorker();
const dynamic = new Dynamic();

const userKey = new URL(location).searchParams.get("userkey");
self.dynamic = dynamic;

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      if (await dynamic.route(event)) {
        return await dynamic.fetch(event);
      }

      if (event.request.url.startsWith(`${location.origin}/a/`)) {
        return await uv.fetch(event);
      }

      return await fetch(event.request);
    })(),
  );
});
