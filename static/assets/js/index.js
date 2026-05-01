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
function useScramjetPxy() {
  const p = localStorage.getItem("pchoice");
  return p === "sj";
}

async function getPxyUrl(url) {
  if (useScramjetPxy()) {
    if (window.__isSjReady) {
      await window.__isSjReady;
    }
    if (window.__isSj?.encodeUrl) {
      return window.__isSj.encodeUrl(url);
    }
  }

  return `/uv/${__uv$config.encodeUrl(url)}`;
}

async function processUrl(value, path) {
  let url = value.trim();
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://search.brave.com/search?q=";

  if (!isUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  const pxyUrl = await getPxyUrl(url);
  sessionStorage.setItem("GoUrl", pxyUrl);
  const pchoice = localStorage.getItem("pchoice");

  if (pchoice === "dy") {
    window.location.href = `/uv/dynamic/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    location.href = path;
  } else {
    window.location.href = pxyUrl;
  }
}

function go(value) {
  processUrl(value, "/tabs");
}

function blank(value) {
  processUrl(value, "");
}

function now(value) {
  processUrl(value, "");
}

function dy(value) {
  processUrl(value, `/uv/dynamic/${__uv$config.encodeUrl(value)}`);
}

function isUrl(val = "") {
  if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
    return true;
  }
  return false;
}
