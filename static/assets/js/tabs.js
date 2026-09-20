function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val[0] !== " ");
}

function prependHttps(url) {
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
}

function isScramjetEnabled() {
  return store.get("proxy") === "sj";
}

async function encodeProxyUrl(url) {
  if (isScramjetEnabled()) {
    if (window.__ready) await window.__ready;
    if (window.__urls?.encodeUrl) return window.__urls.encodeUrl(url);
  }
  return `/uv/${__uv$config.encodeUrl ? __uv$config.encodeUrl(url) : window.encode.xor(url)}`;
}

function encodeProxyUrlSync(url) {
  if (isScramjetEnabled() && window.__urls?.encodeUrl) return window.__urls.encodeUrl(url);
  return `/uv/${__uv$config.encodeUrl ? __uv$config.encodeUrl(url) : window.encode.xor(url)}`;
}

window.__mkurl = encodeProxyUrlSync;

const ZERO_WIDTH = ["​", "‌", "‍", "⁠", "﻿"];
const ZERO_WIDTH_RE = /​|‌|‍|‎|‏|⁠|﻿/g;
let addressValue = "";
let addressEditing = false;

function addrInput() {
  return document.getElementById("input");
}

function stripZeroWidth(text) {
  return text.replace(ZERO_WIDTH_RE, "");
}

function laceZeroWidth(url) {
  const points = Array.from(url);
  let out = "";
  for (let i = 0; i < points.length; i++) {
    out += points[i];
    if (i < points.length - 1) out += ZERO_WIDTH[Math.floor(Math.random() * ZERO_WIDTH.length)];
  }
  return out;
}

function renderAddress() {
  const input = addrInput();
  if (!input) return;
  if (!addressValue) input.value = "";
  else input.value = addressEditing ? addressValue : laceZeroWidth(addressValue);
}

function setAddress(url) {
  addressValue = url || "";
  renderAddress();
}

function setupAddressBar() {
  const input = addrInput();
  if (!input) return;
  input.addEventListener("focus", () => {
    addressEditing = true;
    renderAddress();
    input.select();
  });
  input.addEventListener("blur", () => {
    addressEditing = false;
    renderAddress();
  });

  input.addEventListener("copy", event => {
    try {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      if (start == null || end == null || start === end) return;
      const selected = input.value.slice(start, end);
      const cleaned = stripZeroWidth(selected);
      if (cleaned === selected) return;
      if (event.clipboardData && typeof event.clipboardData.setData === "function") {
        event.clipboardData.setData("text/plain", cleaned);
        event.preventDefault();
      }
    } catch {}
  });
  input.addEventListener("paste", event => {
    try {
      const pasted = event.clipboardData ? event.clipboardData.getData("text/plain") : null;
      if (pasted == null) return;
      const cleaned = stripZeroWidth(pasted);
      if (cleaned === pasted) return;
      event.preventDefault();
      insertCleanText(input, cleaned);
    } catch {}
  });
  renderAddress();
}

function insertCleanText(input, text) {
  if (typeof input.setRangeText === "function") {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.setRangeText(text, start, end, "end");
  } else {
    input.value += text;
  }
}

function updateAddressBar() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (!activeIframe) return;

  let currentUrl;
  try {
    if (activeIframe.contentWindow.document.readyState !== "complete") return;
    currentUrl = activeIframe.contentWindow.document.location.href;
  } catch {
    return;
  }

  const input = document.getElementById("input");
  if (!input) return;

  if (currentUrl.includes("/uv/scramjet/")) {
    if (window.__urls?.decodeUrl) {
      setAddress(window.__urls.decodeUrl(currentUrl));
    } else {
      setAddress(currentUrl);
    }
  } else if (currentUrl.includes("/uv/")) {
    const path = currentUrl.replace(window.location.origin, "").replace("/uv/", "");
    setAddress(__uv$config.decodeUrl ? __uv$config.decodeUrl(path) : window.decode.xor(path));
  } else {
    setAddress(currentUrl.replace(window.location.origin, ""));
  }
}

function reload() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (activeIframe) {
    activeIframe.contentWindow.location.reload();
    updateAddressBar();
  } else {
    console.error("No active iframe found");
  }
}

function popoutTab() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (!activeIframe) {
    console.error("No active iframe found");
    return;
  }

  const newWindow = window.open("about:blank", "_blank");
  if (!newWindow) return;

  const cloakName = store.get("name") || "My Drive - Google Drive";
  const cloakIcon = store.get("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

  newWindow.document.title = laceZeroWidth(cloakName);

  const link = newWindow.document.createElement("link");
  link.rel = "icon";
  link.href = encodeURI(cloakIcon);
  newWindow.document.head.appendChild(link);

  const newIframe = newWindow.document.createElement("iframe");
  const style = newIframe.style;
  style.position = "fixed";
  style.top = style.bottom = style.left = style.right = 0;
  style.border = style.outline = "none";
  style.width = style.height = "100%";
  newIframe.src = activeIframe.src;

  newWindow.document.body.appendChild(newIframe);
}

function toggleDevTools() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (!activeIframe) {
    console.error("No active iframe found");
    return;
  }

  const iframeWindow = activeIframe.contentWindow;
  if (!iframeWindow) {
    console.error("No content window found for the active iframe");
    return;
  }

  if (iframeWindow.eruda) {
    if (iframeWindow.eruda._isInit) {
      iframeWindow.eruda.destroy();
    } else {
      console.error("Eruda is not initialized in the active iframe");
    }
    return;
  }

  const iframeDocument = activeIframe.contentDocument;
  if (!iframeDocument) {
    console.error("No content document found for the active iframe");
    return;
  }

  const script = iframeDocument.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/eruda";
  script.onload = () => {
    if (!iframeWindow.eruda) {
      console.error("Failed to load Eruda in the active iframe");
      return;
    }
    iframeWindow.eruda.init();
    iframeWindow.eruda.show();
  };
  iframeDocument.head.appendChild(script);
}

function toggleFullscreen() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (!activeIframe) {
    console.error("No active iframe found");
    return;
  }

  if (activeIframe.contentDocument.fullscreenElement) {
    activeIframe.contentDocument.exitFullscreen();
  } else {
    activeIframe.contentDocument.documentElement.requestFullscreen();
  }
}

function goHome() {
  window.location.href = "./";
}

function goBack() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (activeIframe) {
    activeIframe.contentWindow.history.back();
    updateAddressBar();
  } else {
    console.error("No active iframe found");
  }
}

function goForward() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (activeIframe) {
    activeIframe.contentWindow.history.forward();
    updateAddressBar();
  } else {
    console.error("No active iframe found");
  }
}

window.addEventListener("load", () => {
  navigator.serviceWorker.register("../sw.js", { scope: "/uv/" }).catch(err => console.error("[SW] registration failed:", err));

  const form = document.getElementById("fv");
  const input = document.getElementById("input");

  setupAddressBar();

  if (form && input) {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const formValue = stripZeroWidth(input.value).trim();
      const engine = store.get("engine") || "https://search.brave.com/search?q=";
      const url = isUrl(formValue) ? prependHttps(formValue) : `${engine}${formValue}`;
      await navigateActiveTab(url);
      input.blur();
    });
  }

  async function navigateActiveTab(url) {
    if (window.__settled) await window.__settled();
    const proxyUrl = await encodeProxyUrl(url);
    sessionStorage.setItem("GoUrl", proxyUrl);
    const iframeContainer = document.getElementById("frame-container");
    const activeIframe = Array.from(iframeContainer.querySelectorAll("iframe")).find(f => f.classList.contains("active"));
    if (!activeIframe) {
      console.error("No active iframe found");
      return;
    }
    activeIframe.src = proxyUrl;
    activeIframe.dataset.tabUrl = url;
    setAddress(url);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("fullscreen-button")?.addEventListener("click", toggleFullscreen);
  document.getElementById("home-page")?.addEventListener("click", goHome);

  const tabToggleBtn = document.getElementById("tabs-button");
  const tabSideNav = document.getElementById("right-side-nav");
  tabToggleBtn?.addEventListener("click", () => {
    const activeIframe = document.querySelector("#frame-container iframe.active");
    if (!activeIframe) return;

    const hiding = tabSideNav.style.display !== "none";
    tabSideNav.style.display = hiding ? "none" : "";
    activeIframe.style.top = hiding ? "5%" : "10%";
    activeIframe.style.height = hiding ? "95%" : "90%";

    const icon = tabToggleBtn.querySelector("i");
    icon.classList.toggle("fa-magnifying-glass-minus", !hiding);
    icon.classList.toggle("fa-magnifying-glass-plus", hiding);
  });

  const addTabButton = document.getElementById("add-tab");
  const tabList = document.getElementById("tab-list");
  const iframeContainer = document.getElementById("frame-container");
  let tabCounter = 1;

  addTabButton.addEventListener("click", createNewTab);

  function resolveStoredUrl(value) {
    if (!value) return null;
    return value.startsWith("/") ? window.location.origin + value : value;
  }

  function setAllInactive() {
    for (const tab of tabList.querySelectorAll("li")) tab.classList.remove("active");
    for (const frame of iframeContainer.querySelectorAll("iframe")) frame.classList.remove("active");
  }

  function openInNewTab(destination) {
    const proxyUrl = destination.startsWith("/") || destination.startsWith(window.location.origin) ? destination : window.__mkurl ? window.__mkurl(destination) : `/uv/${__uv$config.encodeUrl(destination)}`;
    sessionStorage.setItem("URL", proxyUrl);
    createNewTab();
  }

  function handleTopNavigation(event) {
    const isSubmit = event.type === "submit";
    const source = isSubmit ? event.target : event.target?.closest?.("a[target], area[target]");
    if (source?.target?.toLowerCase() !== "_top") return;

    let destination;
    if (isSubmit) {
      if ((source.method || "get").toLowerCase() !== "get") {
        source.target = "_self";
        return;
      }
      const action = new URL(source.action, source.ownerDocument.baseURI);
      action.search = new URLSearchParams(new FormData(source)).toString();
      destination = action.href;
    } else {
      destination = source.href;
    }
    if (!destination) return;

    event.preventDefault();
    openInNewTab(destination);
  }

  function createNewTab() {
    const newTab = document.createElement("li");
    const tabTitle = document.createElement("span");
    const newIframe = document.createElement("iframe");

    newIframe.sandbox = "allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-modals allow-orientation-lock allow-presentation allow-storage-access-by-user-activation";

    tabTitle.textContent = laceZeroWidth(`New Tab ${tabCounter}`);
    tabTitle.className = "t";
    newTab.dataset.tabId = tabCounter;
    newTab.addEventListener("click", switchTab);
    newTab.setAttribute("draggable", true);

    const closeButton = document.createElement("button");
    closeButton.classList.add("close-tab");
    closeButton.innerHTML = "&#10005;";
    closeButton.addEventListener("click", closeTab);

    newTab.appendChild(tabTitle);
    newTab.appendChild(closeButton);
    tabList.appendChild(newTab);

    setAllInactive();
    newTab.classList.add("active");

    newIframe.dataset.tabId = tabCounter;
    newIframe.classList.add("active");

    newIframe.addEventListener("load", () => {
      try {
        const title = newIframe.contentDocument?.title;
        tabTitle.textContent = laceZeroWidth(title && title.length > 1 ? title : "Tab");

        newIframe.contentWindow.open = url => {
          const proxyUrl = window.__mkurl ? window.__mkurl(url) : `/uv/${__uv$config.encodeUrl(url)}`;
          sessionStorage.setItem("URL", proxyUrl);
          createNewTab();
          return null;
        };

        const formProto = newIframe.contentWindow.HTMLFormElement.prototype;
        for (const method of ["submit", "requestSubmit"]) {
          const original = formProto[method];
          formProto[method] = function (...args) {
            if (this.target?.toLowerCase() === "_top") this.target = "_self";
            return original.apply(this, args);
          };
        }

        const doc = newIframe.contentDocument;
        doc.addEventListener("click", handleTopNavigation, true);
        doc.addEventListener("submit", handleTopNavigation, true);
      } catch {}
      updateAddressBar();
    });

    const goUrl = sessionStorage.getItem("GoUrl");
    const storedUrl = sessionStorage.getItem("URL");

    let src;
    if (tabCounter === 1) {
      src = goUrl ? (goUrl.includes("/gh-games/") ? window.location.origin + goUrl : resolveStoredUrl(goUrl)) : "/";
    } else if (storedUrl) {
      src = resolveStoredUrl(storedUrl);
      sessionStorage.removeItem("URL");
    } else if (goUrl) {
      src = goUrl.includes("/gh-games/") ? window.location.origin + goUrl : resolveStoredUrl(goUrl);
    } else {
      src = "/";
    }

    iframeContainer.appendChild(newIframe);

    if (window.__settled) {
      window.__settled().then(() => {
        newIframe.src = src;
      });
    } else {
      newIframe.src = src;
    }
    tabCounter += 1;
  }

  function closeTab(event) {
    event.stopPropagation();
    const tabId = event.target.closest("li").dataset.tabId;
    const tabToRemove = tabList.querySelector(`[data-tab-id='${tabId}']`);
    const iframeToRemove = iframeContainer.querySelector(`[data-tab-id='${tabId}']`);

    if (!tabToRemove || !iframeToRemove) return;

    tabToRemove.remove();
    iframeToRemove.remove();

    const remainingTabs = Array.from(tabList.querySelectorAll("li"));
    if (remainingTabs.length === 0) {
      tabCounter = 0;
      setAddress("");
      return;
    }

    const nextTab = remainingTabs[0];
    const nextIframe = iframeContainer.querySelector(`[data-tab-id='${nextTab.dataset.tabId}']`);
    setAllInactive();
    nextTab.classList.add("active");
    if (nextIframe) nextIframe.classList.add("active");
  }

  function switchTab(event) {
    const tabId = event.target.closest("li").dataset.tabId;
    setAllInactive();

    const selectedTab = tabList.querySelector(`[data-tab-id='${tabId}']`);
    const selectedIframe = iframeContainer.querySelector(`[data-tab-id='${tabId}']`);

    if (selectedTab) {
      selectedTab.classList.add("active");
    } else {
      console.error("No selected tab found with ID:", tabId);
    }

    if (selectedIframe) {
      selectedIframe.classList.add("active");
      updateAddressBar();
    } else {
      console.error("No selected iframe found with ID:", tabId);
    }
  }

  let dragTab = null;

  tabList.addEventListener("dragstart", event => {
    dragTab = event.target;
  });
  tabList.addEventListener("dragover", event => {
    event.preventDefault();
    const targetTab = event.target;
    if (targetTab.tagName === "LI" && targetTab !== dragTab) {
      const children = Array.from(tabList.children);
      const targetIndex = children.indexOf(targetTab);
      const dragIndex = children.indexOf(dragTab);
      tabList.insertBefore(dragTab, targetIndex < dragIndex ? targetTab : targetTab.nextSibling);
    }
  });
  tabList.addEventListener("dragend", () => {
    dragTab = null;
  });

  createNewTab();
});

if (navigator.userAgent.includes("Chrome")) {
  window.addEventListener("resize", () => {
    navigator.keyboard.lock(["Escape"]);
  });
}
