const isGamesPage = window.location.pathname === "/games";
const isAppsPage = window.location.pathname === "/apps";

function getStorageKey(baseKey) {
  if (isGamesPage) return `G${baseKey}`;
  if (isAppsPage) return `A${baseKey}`;
  return baseKey;
}

// Kept out of the settings blob: these grow with whatever the user adds and are only read on
// the page that owns them.
function getFromStorage(baseKey) {
  return store.getRaw(getStorageKey(baseKey));
}

function setInStorage(baseKey, value) {
  store.setRaw(getStorageKey(baseKey), value);
}

const ZERO_WIDTH = ["​", "‌", "‍", "⁠", "﻿"];
const ZERO_WIDTH_RE = /​|‌|‍|‎|‏|⁠|﻿/g;

function stripZeroWidth(text) {
  return text.replace(ZERO_WIDTH_RE, "");
}

function createSpanElements(text) {
  const points = Array.from(text);
  return points.map((char, index) => {
    const span = document.createElement("span");
    span.textContent = index < points.length - 1 ? char + ZERO_WIDTH[Math.floor(Math.random() * ZERO_WIDTH.length)] : char;
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

  saveRecentApp(app);
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
  } else {
    openUrl(selectedUrl, proxy);
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

function getAppKey(app) {
  return stripZeroWidth(app.name).trim().toLowerCase();
}

function getFavoriteApps() {
  try {
    return JSON.parse(getFromStorage("favorites") || "[]");
  } catch {
    return [];
  }
}

function toggleFavorite(app) {
  const key = getAppKey(app);
  const favorites = getFavoriteApps();
  const next = favorites.includes(key) ? favorites.filter(favorite => favorite !== key) : [key, ...favorites];
  setInStorage("favorites", JSON.stringify(next));
  const card = document.querySelector(`.column[data-app-key="${CSS.escape(key)}"]`);
  if (card) updateFavoriteButton(card, next.includes(key));
  updateFavoritesCount();
}

function updateFavoriteButton(card, isFavorite) {
  const button = card.querySelector(".favorite-button");
  if (!button) return;
  button.classList.toggle("is-favorite", isFavorite);
  button.setAttribute("aria-pressed", String(isFavorite));
  const action = isFavorite ? "Remove from favorites" : "Add to favorites";
  button.title = action;
  button.setAttribute("aria-label", `${action}: ${stripZeroWidth(card.querySelector("p").textContent)}`);
}

function getRecentApps() {
  try {
    return JSON.parse(getFromStorage("recent") || "[]");
  } catch {
    return [];
  }
}

function saveRecentApp(app) {
  const key = getAppKey(app);
  const recent = getRecentApps().filter(item => item.key !== key);
  recent.unshift({ key, name: stripZeroWidth(app.name), image: app.image || "", kind: isGamesPage ? "games" : "apps", openedAt: Date.now() });
  setInStorage("recent", JSON.stringify(recent.slice(0, 20)));
}

let activeView = "all";

function updateFavoritesCount() {
  const count = document.getElementById("favorites-count");
  if (count) count.textContent = getFavoriteApps().length ? `(${getFavoriteApps().length})` : "";
}

function togglePin(appIndex) {
  const pins = getPinnedApps();

  const pinIndex = pins.indexOf(appIndex);
  const isCurrentlyPinned = pinIndex !== -1;

  if (isCurrentlyPinned) {
    pins.splice(pinIndex, 1);
  } else {
    pins.push(appIndex);
  }

  savePinnedApps(pins);
  const pinButton = document.querySelector(`.column[data-app-index="${appIndex}"] .pin-button`);
  if (pinButton) updatePinButton(pinButton, !isCurrentlyPinned);

  const card = document.querySelector(`.column[data-app-index="${appIndex}"]`);
  if (card) {
    const pinnedContainer = document.querySelector(".pinned");
    const nonPinnedContainer = document.querySelector(".apps");
    if (isCurrentlyPinned) {
      const unpinnedCards = Array.from(nonPinnedContainer.getElementsByClassName("column"));
      const cardName = stripZeroWidth(card.getElementsByTagName("p")[0].textContent).toLowerCase();
      const insertBefore = unpinnedCards.find(c => stripZeroWidth(c.getElementsByTagName("p")[0].textContent).toLowerCase() > cardName);
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
  button.className = "pin-button";
  button.appendChild(pinIcon);
  button.onclick = () => togglePin(appIndex);
  updatePinButton(button, getPinnedApps().includes(appIndex));

  return button;
}

function updatePinButton(button, isPinned) {
  button.classList.toggle("is-pinned", isPinned);
  button.setAttribute("aria-pressed", String(isPinned));
  button.title = isPinned ? "Remove from pinned" : "Pin to top";
  button.setAttribute("aria-label", button.title);
}

function renderAppCard(app, appIndex, isCustom = false) {
  const columnDiv = document.createElement("div");
  columnDiv.classList.add("column");

  const categories = isCustom ? "all" : (app.categories || []).join(" ");
  columnDiv.setAttribute("data-category", categories);
  columnDiv.setAttribute("data-app-index", appIndex);
  columnDiv.dataset.appKey = getAppKey(app);

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
    app.say = app.say || "This app is currently experiencing some issues, it may not work for you.";
  }

  link.appendChild(image);
  link.appendChild(paragraph);
  columnDiv.appendChild(link);

  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "favorite-button";
  favorite.textContent = "★";
  favorite.setAttribute("aria-label", `Add ${stripZeroWidth(app.name)} to favorites`);
  favorite.addEventListener("click", event => {
    event.stopPropagation();
    toggleFavorite(app);
  });
  columnDiv.appendChild(favorite);
  updateFavoriteButton(columnDiv, getFavoriteApps().includes(getAppKey(app)));

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

// Replaced at build time with the per-build key. [0] is identity, so dev serves the plain
// dataset and the production payload arrives as an encoded string instead of an array.
const CATALOGUE_KEY = [0];

function decodeCatalogue(payload) {
  const binary = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index++) bytes[index] = binary.charCodeAt(index) ^ CATALOGUE_KEY[index % CATALOGUE_KEY.length];
  return JSON.parse(new TextDecoder().decode(bytes));
}

function loadAppsFromJson() {
  const jsonPath = getJsonPath();

  fetch(jsonPath)
    .then(response => response.json())
    .then(data => (typeof data === "string" ? decodeCatalogue(data) : data))
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
      applyFilters();
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
  const favorites = new Set(getFavoriteApps());
  const recent = new Set(getRecentApps().map(app => app.key));

  Array.from(document.getElementsByClassName("column")).forEach(card => {
    const appName = stripZeroWidth(card.getElementsByTagName("p")[0].textContent).toLowerCase();
    const categories = card.getAttribute("data-category").split(" ");

    const matchesSearch = !searchTerm || appName.includes(searchTerm);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.some(cat => categories.includes(cat));
    const matchesView = activeView === "all" || (activeView === "favorites" ? favorites.has(card.dataset.appKey) : recent.has(card.dataset.appKey));

    card.style.display = matchesSearch && matchesCategory && matchesView ? "block" : "none";
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
  updateFavoritesCount();
  const homeSearch = store.get("homeCatalogSearch");
  if (homeSearch) {
    document.getElementById("search").value = homeSearch;
    store.remove("homeCatalogSearch");
  }
  document.querySelectorAll(".catalogue-filter").forEach(button => {
    button.addEventListener("click", () => {
      activeView = button.dataset.view;
      document.querySelectorAll(".catalogue-filter").forEach(filter => {
        filter.classList.toggle("active", filter === button);
      });
      applyFilters();
    });
  });
  document.addEventListener("keydown", event => {
    if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      document.getElementById("search")?.focus();
    }
    if (event.key === "Escape" && document.activeElement?.id === "search") {
      document.activeElement.value = "";
      applyFilters();
      document.activeElement.blur();
    }
  });
});
