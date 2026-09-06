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
    if (window.__isSjReady) {
      await window.__isSjReady;
    }
    if (window.__isSj?.encodeUrl) {
      return window.__isSj.encodeUrl(url);
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
