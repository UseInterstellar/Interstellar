function splitPayload(url = "") {
  const index = url.search(/[?#]/);
  return index < 0 ? [url, ""] : [url.slice(0, index), url.slice(index)];
}

function xorKeyValue(key) {
  const value = /^\d+$/.test(key) ? Number(key) : parseInt(key, 36);
  return Number.isFinite(value) && value > 1 ? (value % 30) + 2 : 2;
}

const encoder = {
  // biome-ignore format: compact
  xor: { encode: (url, key) => url && encodeURIComponent(url.split("").map((char, index) => (index % xorKeyValue(key) ? String.fromCharCode(char.charCodeAt(0) ^ xorKeyValue(key)) : char)).join("")), decode: (url, key) => { const [value, tail] = splitPayload(url); if (!value) return value; const xorKey = xorKeyValue(key); return decodeURIComponent(value).split("").map((char, index) => (index % xorKey ? String.fromCharCode(char.charCodeAt(0) ^ xorKey) : char)).join("") + tail } },
};

window.encode = {
  xor: encoder.xor.encode,
};

window.decode = {
  xor: encoder.xor.decode,
};

let swReady = false;
let swReadyResolve;
const swReadyPromise = new Promise(resolve => {
  swReadyResolve = resolve;
});

function isTabsPage() {
  return document.body?.id === "no" || Boolean(document.getElementById("frame-container"));
}

window.addEventListener("load", async () => {
  if (isTabsPage()) {
    swReady = true;
    swReadyResolve();
    return;
  }

  if (!("serviceWorker" in navigator)) {
    swReady = true;
    swReadyResolve();
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register("../sw.js", {
      scope: "/uv/",
    });

    if (registration.active) {
      swReady = true;
      swReadyResolve();
      return;
    }

    const worker = registration.installing || registration.waiting;
    if (worker) {
      worker.addEventListener("statechange", function onStateChange() {
        if (this.state === "activated") {
          swReady = true;
          swReadyResolve();
          worker.removeEventListener("statechange", onStateChange);
        }
      });
    } else {
      swReady = true;
      swReadyResolve();
    }
  } catch (err) {
    console.error("[SW] registration failed:", err);
    swReady = true;
    swReadyResolve();
  }
});

async function waitForServiceWorker() {
  if (swReady) return;
  await Promise.race([swReadyPromise, new Promise(resolve => setTimeout(resolve, 4000))]);
}

const form = document.getElementById("search-form");
const input = document.getElementById("input");

if (form && input && !isTabsPage()) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    if (askOwningTabs(input.value)) return;
    try {
      if (isInTabMode) await navigate(input.value, "");
      else await navigate(input.value, "/tabs");
    } catch {
      await navigate(input.value, "/tabs");
    }
  });
}

function isScramjet(proxyOverride) {
  const choice = proxyOverride ?? store.get("proxy");
  return choice === "sj";
}

async function encodeUrl(url, proxyOverride) {
  if (isScramjet(proxyOverride)) {
    if (window.__ready) {
      await window.__ready;
    }
    if (window.__urls?.encodeUrl) {
      return window.__urls.encodeUrl(url);
    }
  }

  return `/uv/${__uv$config.encodeUrl ? __uv$config.encodeUrl(url) : window.encode.xor(url)}`;
}

async function checkBlocked(url) {
  let host;
  try {
    const parsed = new URL(url, window.location.origin);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null;
    host = parsed.hostname;
  } catch {
    return null;
  }
  try {
    const response = await fetch("/filter/verdict", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ host }),
    });
    if (!response.ok) return null;
    const verdict = await response.json();
    return verdict.blocked ? verdict : null;
  } catch {
    return null;
  }
}

function blockPageUrl(url, verdict) {
  return `/block.html#${encodeURIComponent(`${verdict.source}|${url}`)}`;
}

window.blockPages = { check: checkBlocked, pageUrl: blockPageUrl };

async function navigate(value, path, proxyOverride) {
  await waitForServiceWorker();
  if (window.__settled) await window.__settled();

  let url = value.trim();
  const engine = store.get("engine");
  const searchUrl = engine ? engine : "https://search.brave.com/search?q=";

  if (!isValidUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  const verdict = await checkBlocked(url);
  if (verdict) {
    const blockedPage = blockPageUrl(url, verdict);
    if (path) {
      sessionStorage.setItem("GoUrl", blockedPage);
      location.href = path;
    } else {
      location.href = blockedPage;
    }
    return;
  }

  const proxyChoice = proxyOverride ?? store.get("proxy");
  const proxyUrl = await encodeUrl(url, proxyChoice);
  sessionStorage.setItem("GoUrl", proxyUrl);

  if (path || !owningTabsWindow()) {
    location.href = path || "/tabs";
  } else {
    window.location.href = proxyUrl;
  }
}

function openUrl(value, proxyOverride) {
  navigate(value, "/tabs", proxyOverride);
}

// Open link in about:blank
function blank(value, proxyOverride) {
  navigate(value, "", proxyOverride);
}

function isValidUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val[0] !== " ");
}

(() => {
  // Full paths only, never concatenated: the build rewrites whole literals.
  const vendor = self.__deps || {};

  function getWispUrl() {
    const custom = store.get("wisp-url")?.trim();
    if (custom && /^wss?:\/\//i.test(custom)) return custom;
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    return `${protocol}://${location.host}/wisp/`;
  }

  function blockAwareEpoxy(transportPath) {
    return `
      const { default: EpoxyTransport } = await import(${JSON.stringify(transportPath)});
      class BlockAwareEpoxy extends EpoxyTransport {
        async request(...args) {
          try {
            return await super.request(...args);
          } catch (error) {
            const message = String(error?.message ?? error);
            const kind = message.includes("WispCloseReason(ServerStreamBlockedAddress") ? "blocked"
              : message.includes("WispCloseReason(ServerStreamUnreachable") ? "not-found" : null;
            if (!kind) throw error;
            return { status: 451, statusText: "Unavailable For Legal Reasons", headers: { "x-interstellar-block": kind }, body: null };
          }
        }
      }
      return [BlockAwareEpoxy, ${JSON.stringify(transportPath)}];
    `;
  }

  async function ensureTransport(connection, transportPath, options, signature, manualCode) {
    let current = "";
    try {
      current = await connection.getTransport();
    } catch {}

    if (current === transportPath && store.get("transport-signature") === signature) return;

    if (manualCode) await connection.setManualTransport(manualCode, options);
    else await connection.setTransport(transportPath, options);
    store.set("transport-signature", signature);
  }

  async function init() {
    const [{ BareMuxConnection }, { ScramjetController }] = await Promise.all([import(vendor.baremux), window.$scramjetLoadController()]);

    const scramjet = new ScramjetController(self.__scramjet$config);
    await scramjet.init();

    const wisp = getWispUrl();
    const connection = new BareMuxConnection(vendor.baremuxWorker);
    if (store.get("transport") === "libcurl") {
      await ensureTransport(connection, vendor.libcurl, [{ websocket: wisp }], `${vendor.libcurl}|${wisp}`);
    } else {
      await ensureTransport(connection, vendor.epoxy, [{ wisp }], `${vendor.epoxy}|${wisp}|block-aware`, blockAwareEpoxy(vendor.epoxy));
    }

    window.__urls = {
      encodeUrl: url => scramjet.encodeUrl(url),
      decodeUrl: url => scramjet.decodeUrl(url),
    };
  }

  async function boot() {
    if (typeof window.$scramjetLoadController !== "function" || !self.__scramjet$config) return;
    try {
      await init();
    } catch (error) {
      console.error("Scramjet transport failed to start:", error);
    }
  }

  const domReady = document.readyState === "loading" ? new Promise(resolve => document.addEventListener("DOMContentLoaded", resolve, { once: true })) : Promise.resolve();

  window.__ready = domReady.then(boot);
})();

window.__settled = async (timeout = 8000) => {
  if (!window.__ready) return;
  await Promise.race([window.__ready.catch(() => {}), new Promise(resolve => setTimeout(resolve, timeout))]);
};

function owningTabsWindow() {
  try {
    const tabs = window.parent?.document?.getElementById("frame-container");
    return window.frameElement && tabs && window.frameElement.parentElement === tabs ? window.parent : null;
  } catch {
    return null;
  }
}

function askOwningTabs(value) {
  const tabs = owningTabsWindow();
  if (!tabs) return false;
  tabs.postMessage({ type: "interstellar:tabs-navigate", value }, location.origin);
  return true;
}
