const isGamesPage = window.location.pathname === "/games";
const isAppsPage = window.location.pathname === "/apps";

function getStorageKey(baseKey) {
  if (isGamesPage) return `G${baseKey}`;
  if (isAppsPage) return `A${baseKey}`;
  return baseKey;
}

function getFromStorage(baseKey) {
  return localStorage.getItem(getStorageKey(baseKey));
}

function setInStorage(baseKey, value) {
  localStorage.setItem(getStorageKey(baseKey), value);
}

function createSpanElements(text) {
  return text.split("").map(char => {
    const span = document.createElement("span");
    span.textContent = char;
    return span;
  });
}

function saveUrlToSession(url) {
  sessionStorage.setItem("GoUrl", url);
}

function handleAppClick(app) {
  if (app.say) {
    alert(app.say);
  }

  let selectedUrl = app.link;
  if (app.links && app.links.length > 1) {
    selectedUrl = promptUserForLink(app.links);
    if (!selectedUrl) return false;
  }

  const proxy = app.proxy;

  // isInTabMode is declared in main.js
  if (app.local) {
    saveUrlToSession(selectedUrl);
    window.location.href = isInTabMode ? selectedUrl : "tabs";
  } else if (app.local2) {
    saveUrlToSession(selectedUrl);
    window.location.href = selectedUrl;
  } else if (app.blank) {
    blank(selectedUrl, proxy);
  } else if (app.now) {
    blank(selectedUrl, proxy);
    if (isInTabMode) window.location.href = selectedUrl;
  } else if (app.custom) {
    createCustomApp();
  } else if (app.dy) {
    useDynamic(selectedUrl);
  } else {
    go(selectedUrl, proxy);
    if (isInTabMode) blank(selectedUrl, proxy);
  }

  return false;
}

function promptUserForLink(links) {
  const options = links.map((link, index) => `${index + 1}: ${link.name}`).join("\n");

  const choice = prompt(`Select a link by entering the corresponding number:\n${options}`);
  const selectedIndex = parseInt(choice, 10) - 1;

  if (Number.isNaN(selectedIndex) || selectedIndex < 0 || selectedIndex >= links.length) {
    alert("Invalid selection. Please try again.");
    return null;
  }

  return links[selectedIndex].url;
}

function saveCustomApp(customApp) {
  let apps = getFromStorage("custom");

  if (!apps) {
    apps = {};
  } else {
    apps = JSON.parse(apps);
  }

  const key = `custom${Object.keys(apps).length + 1}`;
  apps[key] = customApp;

  setInStorage("custom", JSON.stringify(apps));
}

function promptRequired(message) {
  while (true) {
    const value = prompt(message);
    if (value === null) return null;
    if (value.trim() !== "") return value.trim();
    alert("This field is required. Please enter a value.");
  }
}

function createCustomApp() {
  const title = promptRequired("Enter title for the app:");
  if (!title) return;

  const link = promptRequired("Enter link for the app:");
  if (!link) return;
  const customApp = {
    name: `[Custom] ${title}`,
    link: link,
    image: "/assets/media/icons/custom.webp",
    custom: false,
  };

  saveCustomApp(customApp);

  const card = renderAppCard(customApp, 0, true);
  const pinnedContainer = document.querySelector(".pinned");
  pinnedContainer.appendChild(card);
}

function getPinnedApps() {
  const pins = getFromStorage("pinned") || "";
  return pins ? pins.split(",").map(Number) : [];
}

function savePinnedApps(pins) {
  setInStorage("pinned", pins.join(","));
}

function togglePin(appIndex) {
  let pins = getPinnedApps();

  const pinIndex = pins.indexOf(appIndex);
  const isCurrentlyPinned = pinIndex !== -1;

  if (isCurrentlyPinned) {
    pins.splice(pinIndex, 1);
  } else {
    pins.push(appIndex);
  }

  savePinnedApps(pins);

  const card = document.querySelector(`.column[data-app-index="${appIndex}"]`);
  if (card) {
    const pinnedContainer = document.querySelector(".pinned");
    const nonPinnedContainer = document.querySelector(".apps");
    if (isCurrentlyPinned) {
      const unpinnedCards = Array.from(nonPinnedContainer.getElementsByClassName("column"));
      const cardName = card.getElementsByTagName("p")[0].textContent.toLowerCase();
      const insertBefore = unpinnedCards.find(c => c.getElementsByTagName("p")[0].textContent.toLowerCase() > cardName);
      nonPinnedContainer.insertBefore(card, insertBefore ?? null);
    } else {
      pinnedContainer.appendChild(card);
    }
  }
}

function isAppPinned(appIndex, pinnedList) {
  return pinnedList.includes(appIndex);
}

function createPinButton(appIndex) {
  const pinIcon = document.createElement("i");
  pinIcon.classList.add("fa", "fa-map-pin");
  pinIcon.ariaHidden = true;

  const button = document.createElement("button");
  button.appendChild(pinIcon);
  button.style.cssText = `
    float: right;
    cursor: pointer;
    background-color: rgb(45,45,45);
    border-radius: 50%;
    border-color: transparent;
    color: white;
    top: -200px;
    position: relative;
  `;
  button.onclick = () => togglePin(appIndex);
  button.title = "Pin";

  return button;
}

function renderAppCard(app, appIndex, isCustom = false) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");

  const categories = isCustom ? "all" : (app.categories || []).join(" ");
  columnDiv.setAttribute("data-category", categories);
  columnDiv.setAttribute("data-app-index", appIndex);

  const link = document.createElement("a");
  link.onclick = () => handleAppClick(app);

  const image = document.createElement("img");
  image.width = 145;
  image.height = 145;
  image.loading = "lazy";

  if (app.image) {
    image.src = app.image;
  } else {
    image.style.display = "none";
  }

  const paragraph = document.createElement("p");
  for (const span of createSpanElements(app.name)) {
    paragraph.appendChild(span);
  }

  if (app.error) {
    paragraph.style.color = "red";
    app.say = app.say || "This app is currently not working.";
  } else if (app.load) {
    paragraph.style.color = "yellow";
    app.say = app.say || "This app may experience excessive loading times.";
  } else if (app.partial) {
    paragraph.style.color = "yellow";
    app.say = app.say || "This app is currently experiencing some issues, it may not work for you. (Dynamic doesn't work in about:blank)";
  }

  link.appendChild(image);
  link.appendChild(paragraph);
  columnDiv.appendChild(link);

  if (appIndex !== 0 && appIndex !== 1) {
    columnDiv.appendChild(createPinButton(appIndex));
  }

  return columnDiv;
}

function getJsonPath() {
  if (isGamesPage) return "/assets/json/games.min.json";
  if (isAppsPage) return "/assets/json/apps.min.json";
  return "/assets/json/apps.min.json";
}

function applyAppFlags(app) {
  if (app.categories?.includes("local")) {
    app.local = true;
  }

  if (app.link && (app.link.includes("now.gg") || app.link.includes("nowgg.me"))) {
    if (app.partial === null || app.partial === undefined) {
      app.partial = true;
      app.say = "Now.gg is currently not working for some users.";
    }
  }

  if (app.link?.includes("nowgg.nl")) {
    if (app.error === null || app.error === undefined) {
      app.error = true;
      app.say = "NowGG.nl is currently down.";
    }
  }
}

function loadAppsFromJson() {
  const jsonPath = getJsonPath();

  fetch(jsonPath)
    .then(response => response.json())
    .then(appsList => {
      const nonPinnedContainer = document.querySelector(".apps");
      const pinnedContainer = document.querySelector(".pinned");
      const pinnedList = getPinnedApps();

      const appsContainer = document.getElementById("apps-container");
      if (appsContainer) {
        appsContainer.appendChild(pinnedContainer);
        appsContainer.appendChild(nonPinnedContainer);
      }

      const specialCards = appsList.splice(0, 2);

      appsList.sort((a, b) => {
        if (a.name.startsWith("[Custom]")) return -1;
        if (b.name.startsWith("[Custom]")) return 1;
        return a.name.localeCompare(b.name);
      });

      appsList.unshift(...specialCards);

      let appIndex = 0;

      appsList.forEach(app => {
        applyAppFlags(app);

        const card = renderAppCard(app, appIndex);

        if (appIndex === 0 || appIndex === 1) {
          pinnedContainer.appendChild(card);
        } else if (pinnedList != null && isAppPinned(appIndex, pinnedList)) {
          pinnedContainer.appendChild(card);
        } else {
          nonPinnedContainer.appendChild(card);
        }

        appIndex++;
      });

      loadCustomAppsInline();
    })
    .catch(error => {
      console.error("Error fetching app data:", error);
    });
}

function loadCustomAppsInline() {
  const storedApps = getFromStorage("custom");

  if (storedApps) {
    const apps = JSON.parse(storedApps);

    const pinnedContainer = document.querySelector(".pinned");
    Object.values(apps).forEach(app => {
      const card = renderAppCard(app, 0, true);
      pinnedContainer.appendChild(card);
    });
  }
}

function applyFilters() {
  const searchTerm = (document.getElementById("search")?.value ?? "").toLowerCase();
  const selectedCategories = Array.from(document.querySelectorAll("#category option:checked")).map(option => option.value);

  Array.from(document.getElementsByClassName("column")).forEach(card => {
    const appName = card.getElementsByTagName("p")[0].textContent.toLowerCase();
    const categories = card.getAttribute("data-category").split(" ");

    const matchesSearch = !searchTerm || appName.includes(searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => categories.includes(cat));

    card.style.display = matchesSearch && matchesCategory ? "block" : "none";
  });
}

function filterByCategory() {
  applyFilters();
}

function filterBySearchTerm() {
  applyFilters();
}

window.category = filterByCategory;
window.bar = filterBySearchTerm;

document.addEventListener("DOMContentLoaded", () => {
  loadAppsFromJson();
});