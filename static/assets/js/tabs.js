function isUrl(val = "") {
  return /^http(s?):\/\//.test(val) || (val.includes(".") && val[0] !== " ");
}

function prependHttps(url) {
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
}

function isScramjetEnabled() {
  return localStorage.getItem("pchoice") === "sj";
}

async function encodeProxyUrl(url) {
  if (isScramjetEnabled()) {
    if (window.__isSjReady) await window.__isSjReady;
    if (window.__isSj?.encodeUrl) return window.__isSj.encodeUrl(url);
  }
  return `/uv/${__uv$config.encodeUrl(url)}`;
}

function encodeProxyUrlSync(url) {
  if (isScramjetEnabled() && window.__isSj?.encodeUrl) return window.__isSj.encodeUrl(url);
  return `/uv/${__uv$config.encodeUrl(url)}`;
}

window.__encodeProxyUrl = encodeProxyUrlSync;

function decodeUVUrl(input) {
  if (!input) return input;
  const [str, ...search] = input.split("?");
  return (
    decodeURIComponent(str)
      .split("")
      .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char))
      .join("") + (search.length ? `?${search.join("?")}` : "")
  );
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
    if (window.__isSj?.decodeUrl) {
      const decoded = window.__isSj.decodeUrl(currentUrl);
      localStorage.setItem("decoded", decoded);
      input.value = decoded;
    } else {
      input.value = currentUrl;
    }
  } else if (currentUrl.includes("/uv/dynamic/")) {
    const path = currentUrl.replace(window.location.origin, "").replace("/uv/dynamic/", "");
    localStorage.setItem("decoded", path);
    input.value = decodeUVUrl(path);
  } else if (currentUrl.includes("/uv/")) {
    const path = currentUrl.replace(window.location.origin, "").replace("/uv/", "");
    localStorage.setItem("decoded", path);
    input.value = decodeUVUrl(path);
  } else {
    const path = currentUrl.replace(window.location.origin, "");
    input.value = path;
    localStorage.setItem("decoded", path);
  }
}

function reload() {
  const activeIframe = document.querySelector("#frame-container iframe.active");
  if (activeIframe) {
    activeIframe.src = activeIframe.src;
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

  const cloakName = localStorage.getItem("name") || "My Drive - Google Drive";
  const cloakIcon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

  newWindow.document.title = cloakName;

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
  navigator.serviceWorker.register("../sw.js", { scope: "/uv/" });

  const form = document.getElementById("fv");
  const input = document.getElementById("input");

  if (form && input) {
    form.addEventListener("submit", async event => {
      event.preventDefault();
      const formValue = input.value.trim();
      const engine = localStorage.getItem("engine") || "https://search.brave.com/search?q=";
      const url = isUrl(formValue) ? prependHttps(formValue) : `${engine}${formValue}`;
      await navigateActiveTab(url);
    });
  }

  async function navigateActiveTab(url) {
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
    if (input) input.value = url;
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

  function createNewTab() {
    const newTab = document.createElement("li");
    const tabTitle = document.createElement("span");
    const newIframe = document.createElement("iframe");

    newIframe.sandbox = "allow-same-origin allow-scripts allow-forms allow-pointer-lock allow-modals allow-orientation-lock allow-presentation allow-storage-access-by-user-activation";
    // When Top Navigation is not allowed links with the "top" value will be entirely blocked, if we allow Top Navigation it will overwrite the tab, which is obviously not wanted.

    tabTitle.textContent = `New Tab ${tabCounter}`;
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
        tabTitle.textContent = title && title.length > 1 ? title : "Tab";

        newIframe.contentWindow.open = url => {
          const proxyUrl = window.__encodeProxyUrl ? window.__encodeProxyUrl(url) : `/uv/${__uv$config.encodeUrl(url)}`;
          sessionStorage.setItem("URL", proxyUrl);
          createNewTab();
          return null;
        };
      } catch {}
      updateAddressBar();
    });

    const goUrl = sessionStorage.getItem("GoUrl");
    const storedUrl = sessionStorage.getItem("URL");

    if (tabCounter === 1) {
      newIframe.src = goUrl ? (goUrl.includes("/e/") ? window.location.origin + goUrl : resolveStoredUrl(goUrl)) : "/";
    } else {
      if (storedUrl) {
        newIframe.src = resolveStoredUrl(storedUrl);
        sessionStorage.removeItem("URL");
      } else if (goUrl) {
        newIframe.src = goUrl.includes("/e/") ? window.location.origin + goUrl : resolveStoredUrl(goUrl);
      } else {
        newIframe.src = "/";
      }
    }

    iframeContainer.appendChild(newIframe);
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
      const input = document.getElementById("input");
      if (input) input.value = "";
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
