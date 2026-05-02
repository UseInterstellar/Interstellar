window.addEventListener("load", () => {
  navigator.serviceWorker.register("../sw.js", {
    scope: "/uv/",
  });
});

const form = document.getElementById("fv");
const input = document.getElementById("input");

if (form && input) {
  form.addEventListener("submit", async event => {
    event.preventDefault();
    try {
      // isInTabMode is declared in main.js
      if (isInTabMode) await processUrl(input.value, "");
      else await processUrl(input.value, "/tabs");
    } catch {
      await processUrl(input.value, "/tabs");
    }
  });
}
function useScramjetPxy(proxyOverride) {
  const p = proxyOverride ?? localStorage.getItem("pchoice");
  return p === "sj";
}

async function getPxyUrl(url, proxyOverride) {
  if (useScramjetPxy(proxyOverride)) {
    if (window.__isSjReady) {
      await window.__isSjReady;
    }
    if (window.__isSj?.encodeUrl) {
      return window.__isSj.encodeUrl(url);
    }
  }

  return `/uv/${__uv$config.encodeUrl(url)}`;
}

async function processUrl(value, path, proxyOverride) {
  let url = value.trim();
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://search.brave.com/search?q=";

  if (!isUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  const pchoice = proxyOverride ?? localStorage.getItem("pchoice");
  const pxyUrl = await getPxyUrl(url, pchoice);
  sessionStorage.setItem("GoUrl", pxyUrl);

  if (pchoice === "dy") {
    window.location.href = `/uv/dynamic/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    location.href = path;
  } else {
    window.location.href = pxyUrl;
  }
}

function go(value, proxyOverride) {
  processUrl(value, "/tabs", proxyOverride);
}

function blank(value, proxyOverride) {
  processUrl(value, "", proxyOverride);
}

function now(value, proxyOverride) {
  processUrl(value, "", proxyOverride);
}

function dy(value) {
  processUrl(value, `/uv/dynamic/${__uv$config.encodeUrl(value)}`, "dy");
}

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
    return true;
  }
  return false;
}
