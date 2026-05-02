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
      if (isInTabMode) await navigate(input.value, "");
      else await navigate(input.value, "/tabs");
    } catch {
      await navigate(input.value, "/tabs");
    }
  });
}

function isScramjet(proxyOverride) {
  const choice = proxyOverride ?? localStorage.getItem("pchoice");
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

  return `/uv/${__uv$config.encodeUrl(url)}`;
}

async function navigate(value, path, proxyOverride) {
  let url = value.trim();
  const engine = localStorage.getItem("engine");
  const searchUrl = engine ? engine : "https://search.brave.com/search?q=";

  if (!isValidUrl(url)) {
    url = searchUrl + url;
  } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    url = `https://${url}`;
  }

  const pchoice = proxyOverride ?? localStorage.getItem("pchoice");
  const proxyUrl = await encodeUrl(url, pchoice);
  sessionStorage.setItem("GoUrl", proxyUrl);

  if (pchoice === "dy") {
    window.location.href = `/uv/dynamic/${__uv$config.encodeUrl(url)}`;
  } else if (path) {
    location.href = path;
  } else {
    window.location.href = proxyUrl;
  }
}

// Open link in the tabs page
function go(value, proxyOverride) {
  navigate(value, "/tabs", proxyOverride);
}

// Open link in about:blank
function blank(value, proxyOverride) {
  navigate(value, "", proxyOverride);
}

function useDynamic(value) {
  navigate(value, `/uv/dynamic/${__uv$config.encodeUrl(value)}`, "dy");
}

function isValidUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val[0] !== " ");
}