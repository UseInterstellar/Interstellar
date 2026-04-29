importScripts("/assets/dynamic/config.js");
importScripts("/assets/dynamic/worker.js");
importScripts("/assets/ultraviolet/bundle.js");
importScripts("/assets/ultraviolet/config.js");
importScripts(__uv$config.sw || "/assets/ultraviolet/sw.js");
importScripts("/assets/scramjet/scramjet.all.js");
const { ScramjetServiceWorker } = $scramjetLoadWorker();

const uv = new UVServiceWorker();
const dynamic = new Dynamic();
const sj = new ScramjetServiceWorker();

const userKey = new URL(location).searchParams.get("userkey");
self.dynamic = dynamic;

self.addEventListener("fetch", event => {
  event.respondWith(
    (async () => {
      await sj.loadConfig();

      if (await sj.route(event)) {
        return await sj.fetch(event);
      }

      if (await dynamic.route(event)) {
        return await dynamic.fetch(event);
      }

      if (event.request.url.startsWith(`${location.origin}/uv/`)) {
        return await uv.fetch(event);
      }

      return await fetch(event.request);
    })(),
  );
});
