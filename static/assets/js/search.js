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

const form = document.getElementById("fv");
const input = document.getElementById("input");

if (form && input && !isTabsPage()) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    try {
      // isInTabMode is declared in main.js
      if (isInTabMode) await navigate(input.value, "");
      else await navigate(input.value, "/tabs");
    } catch {
      await navigate(input.value, "/tabs");
    }
  });
}

function isScramjet(proxyOverride) {
  const choice = proxyOverride ?? localStorage.getItem("proxy");
  return choice === "sj";
}

async function encodeUrl(url, proxyOverride) {
  if (isScramjet(proxyOverride)) {
    if (window.scramjetReady) {
      await window.scramjetReady;
    }
    if (window.scramjet?.encodeUrl) {
      return window.scramjet.encodeUrl(url);
    }
  }

  return `/uv/${__uv$config.encodeUrl ? __uv$config.encodeUrl(url) : window.encode.xor(url)}`;
}

async function navigate(value, path, proxyOverride) {
  await waitForServiceWorker();

  let url = value.trim();
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://search.brave.com/search?q=";

  if (!isValidUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  const proxyChoice = proxyOverride ?? localStorage.getItem("proxy");
  const proxyUrl = await encodeUrl(url, proxyChoice);
  sessionStorage.setItem("GoUrl", proxyUrl);

  if (path) {
    location.href = path;
  } else {
    window.location.href = proxyUrl;
  }
}

function go(value, proxyOverride) {
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
  const BAREMUX = "/baremux/";
  const EPOXY = "/epoxy/index.mjs";
  const LIBCURL = "/libcurl/index.mjs";

  function getWispUrl() {
    const custom = localStorage.getItem("wisp-url")?.trim();
    if (custom && /^wss?:\/\//i.test(custom)) return custom;
    const protocol = location.protocol === "https:" ? "wss" : "ws";
    return `${protocol}://${location.host}/wisp/`;
  }

  // libcurl-transport 2.0.5 and bare-mux 2.1.9 disagree on header shape: bare-mux passes request
  // headers as an object but libcurl wants [key, value] pairs, and libcurl returns response
  // headers as pairs but bare-mux wants an object (repeats kept as arrays so set-cookie survives).
  // This subclass converts both directions. setManualTransport takes source text, so it's a string.
  const LIBCURL_COMPAT = `
    const { default: BareTransport } = await import("${LIBCURL}");
    const pairsToObject = headers => {
      if (!headers || typeof headers !== "object" || typeof headers[Symbol.iterator] !== "function") return headers;
      const object = {};
      for (const [name, value] of headers) {
        const key = String(name).toLowerCase();
        object[key] = key in object ? [].concat(object[key], value) : value;
      }
      return object;
    };
    class LibcurlCompat extends BareTransport {
      async request(remote, method, body, headers, signal) {
        const pairs = headers?.[Symbol.iterator] ? headers : Object.entries(headers || {});
        const response = await super.request(remote, method, body, pairs, signal);
        response.headers = pairsToObject(response.headers);
        return response;
      }
    }
    return [LibcurlCompat, "${LIBCURL} (compat)"];
  `;

  async function init() {
    const [{ BareMuxConnection }, { ScramjetController }] = await Promise.all([import(`${BAREMUX}index.mjs`), window.$scramjetLoadController()]);

    const scramjet = new ScramjetController(self.__scramjet$config);
    await scramjet.init();

    const wisp = getWispUrl();
    const connection = new BareMuxConnection(`${BAREMUX}worker.js`);
    if (localStorage.getItem("is-sj-transport") === "libcurl") {
      await connection.setManualTransport(LIBCURL_COMPAT, [{ wisp }]);
    } else {
      await connection.setTransport(EPOXY, [{ wisp }]);
    }

    window.scramjet = {
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

  window.scramjetReady = domReady.then(boot);
})();
