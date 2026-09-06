importScripts("/assets/ultraviolet/ultraviolet.bundle.js");
importScripts("/assets/ultraviolet/ultraviolet.config.js");
importScripts(__uv$config.sw || "/assets/ultraviolet/ultraviolet.sw.js");
importScripts("/assets/scramjet/scramjet.all.js");
const { ScramjetServiceWorker } = $scramjetLoadWorker();

const uv = new UVServiceWorker();
const sj = new ScramjetServiceWorker();

const userKey = new URL(location).searchParams.get("userkey");

self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("message", event => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      await sj.loadConfig();

      if (await sj.route(event)) {
        return await sj.fetch(event);
      }

      if (event.request.url.startsWith(`${location.origin}/uv/`)) {
        return await uv.fetch(event);
      }

      return await fetch(event.request);
    })(),
  );
});
