importScripts("/assets/ultraviolet/uv.bundle.js");
importScripts("/assets/ultraviolet/uv.config.js");
importScripts(__uv$config.sw || "/assets/ultraviolet/uv.sw.js");
importScripts("/assets/scramjet/scramjet.all.js");
const { ScramjetServiceWorker } = $scramjetLoadWorker();

const uv = new UVServiceWorker();
const sj = new ScramjetServiceWorker();

sj.addEventListener("handleResponse", event => {
  const kind = event.rawResponse.rawHeaders?.["x-interstellar-block"];
  if (!kind) return;
  if (["document", "iframe"].includes(event.destination)) {
    const page = kind === "not-found" ? "/not-found.html" : "/block.html";
    event.status = 302;
    event.responseHeaders = { location: `${page}#${encodeURIComponent(`|${event.url.href}`)}` };
  } else {
    event.status = 500;
    event.responseHeaders = {};
  }
  event.statusText = "";
  event.responseBody = null;
});

const userKey = new URL(location).searchParams.get("userkey");

function notifyWispFailure() {
  self.clients.matchAll({ type: "window" }).then(clients => {
    for (const client of clients) client.postMessage({ type: "wisp-failed" });
  });
}

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
        try {
          return await sj.fetch(event);
        } catch (error) {
          const text = String(error?.message ?? error);
          if (/WebSocketConnectFailed|WsImplSocketClosed|websocket/i.test(text) && !text.includes("WispCloseReason")) notifyWispFailure();
          throw error;
        }
      }

      if (event.request.url.startsWith(`${location.origin}/uv/`)) {
        return await uv.fetch(event);
      }

      return await fetch(event.request);
    })(),
  );
});
