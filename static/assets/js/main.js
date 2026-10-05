// Theme is applied immediately, to prevent flashing on page load
(() => {
  const themes = {
    black: "/assets/css/themes/dark/black.css",
    midnight: "/assets/css/themes/dark/midnight.css",
    tokyo: "/assets/css/themes/dark/tokyo-night.css",
    sky: "/assets/css/themes/dark/sky.css",
    arctic: "/assets/css/themes/dark/arctic.css",
    forest: "/assets/css/themes/dark/forest.css",
    rose: "/assets/css/themes/dark/rose.css",
    retro: "/assets/css/themes/dark/retro.css",
    neon: "/assets/css/themes/dark/neon.css",
    ocean: "/assets/css/themes/dark/deep-ocean.css",
    synthwave: "/assets/css/themes/dark/synthwave.css",
    light: "/assets/css/themes/light/light.css",
    cream: "/assets/css/themes/light/cream.css",
    parchment: "/assets/css/themes/light/parchment.css",
    red: "/assets/css/themes/color/red.css",
    orange: "/assets/css/themes/color/orange.css",
    yellow: "/assets/css/themes/color/yellow.css",
    green: "/assets/css/themes/color/green.css",
    turquoise: "/assets/css/themes/color/turquoise.css",
    blue: "/assets/css/themes/color/blue.css",
    purple: "/assets/css/themes/color/purple.css",
    pink: "/assets/css/themes/color/pink.css",
    pastelRed: "/assets/css/themes/pastel/red.css",
    pastelOrange: "/assets/css/themes/pastel/orange.css",
    pastelYellow: "/assets/css/themes/pastel/yellow.css",
    pastelGreen: "/assets/css/themes/pastel/green.css",
    pastelTurquoise: "/assets/css/themes/pastel/turquoise.css",
    pastelBlue: "/assets/css/themes/pastel/blue.css",
    pastelPurple: "/assets/css/themes/pastel/purple.css",
    pastelPink: "/assets/css/themes/pastel/pink.css",
    mocha: "/assets/css/themes/catppuccin/mocha.css",
    macchiato: "/assets/css/themes/catppuccin/macchiato.css",
    frappe: "/assets/css/themes/catppuccin/frappe.css",
    latte: "/assets/css/themes/catppuccin/latte.css",
  };

  const legacyThemes = {
    d: "default",
    oled: "black",
    oneDark: "midnight",
    tokyoNight: "tokyo",
    nord: "arctic",
    everforest: "forest",
    rosePine: "rose",
    gruvbox: "retro",
    monokai: "neon",
    solarized: "ocean",
    Inverted: "light",
    gruvboxLight: "cream",
    solarizedLight: "parchment",
    colorRed: "red",
    colorOrange: "orange",
    colorYellow: "yellow",
    colorGreen: "green",
    colorTurquoise: "turquoise",
    colorBlue: "blue",
    colorPurple: "purple",
    colorPink: "pink",
    catppuccinMocha: "mocha",
    catppuccinMacchiato: "macchiato",
    catppuccinFrappe: "frappe",
    catppuccinLatte: "latte",
  };

  let themeid = store.get("theme");
  if (Object.hasOwn(legacyThemes, themeid)) {
    themeid = legacyThemes[themeid];
    store.set("theme", themeid);
  }

  function applyTheme(themeId) {
    let themeLink = document.getElementById("active-theme");
    let customThemeStyle = document.getElementById("active-custom-theme");

    if (themes[themeId]) {
      if (!themeLink) {
        themeLink = document.createElement("link");
        themeLink.id = "active-theme";
        themeLink.rel = "stylesheet";
        document.head.appendChild(themeLink);
      }
      themeLink.href = themes[themeId];
      customThemeStyle?.remove();
    } else {
      themeLink?.remove();
      const customThemeCss = store.getRaw(`t${themeId}`);
      if (customThemeCss) {
        if (!customThemeStyle) {
          customThemeStyle = document.createElement("style");
          customThemeStyle.id = "active-custom-theme";
          document.head.appendChild(customThemeStyle);
        }
        customThemeStyle.textContent = customThemeCss;
      } else {
        customThemeStyle?.remove();
      }
    }

    const isPastelTheme = String(themeId).startsWith("pastel");
    const isLightTheme = ["light", "cream", "parchment", "latte"].includes(themeId);
    const navLogo = document.getElementById("nav-logo");
    if (navLogo) {
      navLogo.src = isPastelTheme || !isLightTheme ? "/assets/media/favicon/main.png" : "/assets/media/favicon/main-inverted.png";
    }
  }

  window.applyTheme = applyTheme;
  applyTheme(themeid);

  const PROXY_KEY = "proxy";
  const ALLOWED = ["uv", "sj"];
  const DEFAULT = "sj";

  function initProxy() {
    const current = store.get(PROXY_KEY);
    if (current === null) {
      store.set(PROXY_KEY, DEFAULT);
      return DEFAULT;
    }
    if (ALLOWED.includes(current)) {
      return current;
    }
    store.set(PROXY_KEY, DEFAULT);
    return DEFAULT;
  }

  window.resolveProxyChoice = initProxy;
  window.resolveProxyChoice();
})();

for (const cloakKey of ["name", "CustomName"]) {
  if (store.get(cloakKey) === "Home") store.set(cloakKey, "Нome");
}

// Background library. Stored preferences hold the key, not the path, so the build can randomise asset paths.
window.BACKGROUND_LIBRARY = {
  "v5-wallpaper": { label: "V5 Wallpaper", url: "/assets/media/background/v5-wallpaper.webp" },
  "v5-inverted": { label: "V5 Inverted", url: "/assets/media/background/v5-inverted.webp" },
  "minecraft-aesthetic": { label: "Aesthetic", url: "/assets/media/background/minecraft-aesthetic.webp" },
  "minecraft-ancient-city": { label: "Ancient City", url: "/assets/media/background/minecraft-ancient-city.webp" },
  "minecraft-bees": { label: "Bees", url: "/assets/media/background/minecraft-bees.webp" },
  "minecraft-birch-with-rainbow": { label: "Birch with Rainbow", url: "/assets/media/background/minecraft-birch-with-rainbow.webp" },
  "minecraft-blue-night": { label: "Blue Night", url: "/assets/media/background/minecraft-blue-night.webp" },
  "minecraft-cathedral": { label: "Cathedral", url: "/assets/media/background/minecraft-cathedral.webp" },
  "minecraft-cave-flowers": { label: "Cave Flowers", url: "/assets/media/background/minecraft-cave-flowers.webp" },
  "minecraft-cave-v2": { label: "Cave V2", url: "/assets/media/background/minecraft-cave-v2.webp" },
  "minecraft-cave": { label: "Cave", url: "/assets/media/background/minecraft-cave.webp" },
  "minecraft-cherry-blossom-sunrise": { label: "Cherry Blossom Sunrise", url: "/assets/media/background/minecraft-cherry-blossom-sunrise.webp" },
  "minecraft-cherry-with-sheep": { label: "Cherry with Sheep", url: "/assets/media/background/minecraft-cherry-with-sheep.webp" },
  "minecraft-dappled-forest": { label: "Dappled Forest", url: "/assets/media/background/minecraft-dappled-forest.webp" },
  "minecraft-desert-fog": { label: "Desert Fog", url: "/assets/media/background/minecraft-desert-fog.webp" },
  "minecraft-desert": { label: "Desert", url: "/assets/media/background/minecraft-desert.webp" },
  "minecraft-dock": { label: "Dock", url: "/assets/media/background/minecraft-dock.webp" },
  "minecraft-end": { label: "The End", url: "/assets/media/background/minecraft-end.webp" },
  "minecraft-firefly-bush": { label: "Firefly Bush", url: "/assets/media/background/minecraft-firefly-bush.webp" },
  "minecraft-frozen-ocean": { label: "Frozen Ocean", url: "/assets/media/background/minecraft-frozen-ocean.webp" },
  "minecraft-gloomy": { label: "Gloomy", url: "/assets/media/background/minecraft-gloomy.webp" },
  "minecraft-golden-hour": { label: "Golden Hour", url: "/assets/media/background/minecraft-golden-hour.webp" },
  "minecraft-house": { label: "House", url: "/assets/media/background/minecraft-house.webp" },
  "minecraft-ice-spikes-sunset": { label: "Ice Spikes Sunset", url: "/assets/media/background/minecraft-ice-spikes-sunset.webp" },
  "minecraft-jungle": { label: "Jungle", url: "/assets/media/background/minecraft-jungle.webp" },
  "minecraft-lukewarm-ocean": { label: "Lukewarm Ocean", url: "/assets/media/background/minecraft-lukewarm-ocean.webp" },
  "minecraft-lush-cave-v2": { label: "Lush Cave V2", url: "/assets/media/background/minecraft-lush-cave-v2.webp" },
  "minecraft-lush-cave-v3": { label: "Lush Cave V3", url: "/assets/media/background/minecraft-lush-cave-v3.webp" },
  "minecraft-lush-cave": { label: "Lush Cave", url: "/assets/media/background/minecraft-lush-cave.webp" },
  "minecraft-mangrove-swamp": { label: "Mangrove Swamp", url: "/assets/media/background/minecraft-mangrove-swamp.webp" },
  "minecraft-nether-crimson-forest": { label: "Nether Crimson Forest", url: "/assets/media/background/minecraft-nether-crimson-forest.webp" },
  "minecraft-nether-warped-forest": { label: "Nether Warped Forest", url: "/assets/media/background/minecraft-nether-warped-forest.webp" },
  "minecraft-night-desert-village": { label: "Night Desert Village", url: "/assets/media/background/minecraft-night-desert-village.webp" },
  "minecraft-night-mountain": { label: "Night Mountain", url: "/assets/media/background/minecraft-night-mountain.webp" },
  "minecraft-night-scary": { label: "Night Scary", url: "/assets/media/background/minecraft-night-scary.webp" },
  "minecraft-night": { label: "Night", url: "/assets/media/background/minecraft-night.webp" },
  "minecraft-pale-garden": { label: "Pale Garden", url: "/assets/media/background/minecraft-pale-garden.webp" },
  "minecraft-plains-lake": { label: "Plains Lake", url: "/assets/media/background/minecraft-plains-lake.webp" },
  "minecraft-plains": { label: "Plains", url: "/assets/media/background/minecraft-plains.webp" },
  "minecraft-rainy-plains": { label: "Rainy Plains", url: "/assets/media/background/minecraft-rainy-plains.webp" },
  "minecraft-realistic": { label: "Realistic", url: "/assets/media/background/minecraft-realistic.webp" },
  "minecraft-savannah-shores": { label: "Savannah Shores", url: "/assets/media/background/minecraft-savannah-shores.webp" },
  "minecraft-savannah": { label: "Savannah", url: "/assets/media/background/minecraft-savannah.webp" },
  "minecraft-ships": { label: "Ships", url: "/assets/media/background/minecraft-ships.webp" },
  "minecraft-snowy-mountain-cloudy": { label: "Snowy Mountain Cloudy", url: "/assets/media/background/minecraft-snowy-mountain-cloudy.webp" },
  "minecraft-snowy-mountains": { label: "Snowy Mountains", url: "/assets/media/background/minecraft-snowy-mountains.webp" },
  "minecraft-spruce-forest": { label: "Spruce Forest", url: "/assets/media/background/minecraft-spruce-forest.webp" },
  "minecraft-spruce-realistic": { label: "Realistic Spruce", url: "/assets/media/background/minecraft-spruce-realistic.webp" },
  "minecraft-swamp-green-fog": { label: "Swamp Green Fog", url: "/assets/media/background/minecraft-swamp-green-fog.webp" },
  "minecraft-swamp-sunrise": { label: "Swamp Sunrise", url: "/assets/media/background/minecraft-swamp-sunrise.webp" },
  "minecraft-swamp-sunset": { label: "Swamp Sunset", url: "/assets/media/background/minecraft-swamp-sunset.webp" },
  "minecraft-swamp": { label: "Swamp", url: "/assets/media/background/minecraft-swamp.webp" },
  "minecraft-town-v2": { label: "Town V2", url: "/assets/media/background/minecraft-town-v2.webp" },
  "minecraft-town": { label: "Town", url: "/assets/media/background/minecraft-town.webp" },
  "minecraft-underwater-foggy": { label: "Underwater Foggy", url: "/assets/media/background/minecraft-underwater-foggy.webp" },
  "minecraft-underwater-v2": { label: "Underwater V2", url: "/assets/media/background/minecraft-underwater-v2.webp" },
  "minecraft-underwater": { label: "Underwater", url: "/assets/media/background/minecraft-underwater.webp" },
  "minecraft-village": { label: "Village", url: "/assets/media/background/minecraft-village.webp" },
  "minecraft-wheat-mountain": { label: "Wheat Mountain", url: "/assets/media/background/minecraft-wheat-mountain.webp" },
};

window.backgroundUrlFor = key => (key && window.BACKGROUND_LIBRARY[key]?.url) || "";

function inShell() {
  return document.body?.dataset.shell === "true";
}

function reconstructSafeUrl(raw) {
  if (!raw || typeof raw !== "string") return null;
  try {
    const parsed = new URL(raw);
    const allowed = ["https:", "http:", "data:"];
    if (!allowed.includes(parsed.protocol)) return null;
    return parsed.href;
  } catch {
    if (typeof raw === "string" && !raw.includes(":")) return raw;
    return null;
  }
}

const zeroWidth = ["​", "‌", "‍", "⁠", "﻿"];
function laceTitle(text) {
  const points = Array.from(text || "");
  let out = "";
  for (let i = 0; i < points.length; i++) {
    out += points[i];
    if (i < points.length - 1) out += zeroWidth[Math.floor(Math.random() * zeroWidth.length)];
  }
  return out;
}
window.laceTitle = laceTitle;

const NAV_WRAPPERS = ["span", "x-a", "x-b", "ab-x", "s-p", "n-a", "r-e", "d-l", "q-x"];
const NAV_ZERO_WIDTH = ["​", "‌", "‍", "⁠"];
const NAV_HOMOGLYPHS = { a: "а", c: "с", e: "е", i: "і", k: "к", m: "м", o: "о", p: "р", s: "ѕ", t: "т", x: "х", y: "у" };

function navEntities(text) {
  let out = "";
  for (const ch of text) out += `&#${ch.codePointAt(0)};`;
  return out;
}

function navWrap(inner) {
  const tag = NAV_WRAPPERS[Math.floor(Math.random() * NAV_WRAPPERS.length)];
  return `<${tag}>${inner}</${tag}>`;
}

function obfuscateNav(text) {
  const points = [...text];
  let out = "";
  let first = true;
  for (let i = 0; i < points.length; ) {
    const size = 1 + Math.floor(Math.random() * 2);
    const chunk = points
      .slice(i, i + size)
      .map(ch => {
        const glyph = NAV_HOMOGLYPHS[ch.toLowerCase()];
        return glyph && Math.random() < 0.6 ? glyph : ch;
      })
      .join("");
    i += size;
    if (!first) out += navWrap(navEntities(NAV_ZERO_WIDTH[Math.floor(Math.random() * NAV_ZERO_WIDTH.length)]));
    out += navWrap(navEntities(chunk));
    first = false;
  }
  return out;
}

document.addEventListener("DOMContentLoaded", () => {
  const blockedHostnames = ["gointerstellar.app"];

  if (!blockedHostnames.includes(window.location.hostname)) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = `(()=>{const k="p",d=15e4,s=()=>{let t=localStorage.getItem(k);return !t||Date.now()-t>d},m=()=>localStorage.setItem(k,Date.now());function h(){if(!s())return;window.open("https://undercoverhiking.com/1c/c3/8a/1cc38a6899fdf8ba4dfe779bcc54627b.js","_blank");m();document.removeEventListener("click",h)}s()&&document.addEventListener("click",h,{once:1})})();`;
    document.body.appendChild(script);
  }

  // The AdSense account is tied to gointerstellar.app, so forks and mirrors must not serve
  // it. The tabs page never carried the loader either.
  if (window.location.hostname === "gointerstellar.app" && !document.getElementById("frame-container")) {
    const ads = document.createElement("script");
    ads.async = true;
    ads.crossOrigin = "anonymous";
    ads.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6840529569014734";
    document.head.appendChild(ads);
  }

  const nav = document.querySelector(".nav-bar");

  if (nav) {
    const themeId = store.get("theme");
    const lightThemes = ["light", "cream", "parchment", "latte"];
    const isPastelTheme = String(themeId).startsWith("pastel");
    const isLightTheme = lightThemes.includes(themeId);
    const LogoUrl = isPastelTheme ? "/assets/media/favicon/main.png" : isLightTheme ? "/assets/media/favicon/main-inverted.png" : "/assets/media/favicon/main.png";
    const html = `
      <div id="icon-container">
        <a class="icon" href="/home"><img alt="nav" id="nav-logo" src="${LogoUrl}"/></a>
      </div>
      <div class="nav-bar-right">
        <a class="navbar-link" href="/./games"><i class="fa-solid fa-gamepad navbar-icon"></i>${obfuscateNav("Games")}</a>
        <a class="navbar-link" href="/./apps"><i class="fa-solid fa-phone navbar-icon"></i>${obfuscateNav("Apps")}</a>
        <a class="navbar-link" href="/./settings"><i class="fa-solid fa-gear navbar-icon settings-icon"></i>${obfuscateNav("Settings")}</a>
      </div>`;
    nav.innerHTML = html;
  }

  // Favicon and Name Logic.
  const icon = document.getElementById("tab-favicon");
  const title = document.getElementById("page-title");
  const defaultTitle = title?.textContent ?? "";
  const defaultIcon = icon?.getAttribute("href") ?? "";
  function applyCloak() {
    const cloakName = store.get("CustomName") || store.get("name");
    const cloakIcon = store.get("CustomIcon") || store.get("icon");
    if (title) title.textContent = laceTitle(cloakName || defaultTitle);
    const safeIcon = cloakIcon ? reconstructSafeUrl(cloakIcon) : null;
    if (icon) icon.setAttribute("href", safeIcon || defaultIcon);
  }
  applyCloak();
  if (inShell()) window.addEventListener("storage", applyCloak);

  const DEFAULT_PANIC_KEYS = ["`"];
  const DEFAULT_PANIC_LINK = "https://classroom.google.com/";

  let panicKeysRaw;
  let panicKeys = DEFAULT_PANIC_KEYS;
  function currentPanicKeys() {
    const raw = store.get("eventKey");
    if (raw !== panicKeysRaw) {
      panicKeysRaw = raw;
      let parsed = null;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = null;
      }
      panicKeys = Array.isArray(parsed) && parsed.length ? parsed : DEFAULT_PANIC_KEYS;
    }
    return panicKeys;
  }

  function currentPanicLink() {
    return reconstructSafeUrl(store.get("pLink") || DEFAULT_PANIC_LINK) ?? DEFAULT_PANIC_LINK;
  }

  const panicAnchor = document.createElement("a");
  panicAnchor.style.display = "none";
  document.body.appendChild(panicAnchor);

  let pressedKeys = [];
  document.addEventListener("keydown", event => {
    const keys = currentPanicKeys();
    pressedKeys.push(event.key);
    if (pressedKeys.length > keys.length) pressedKeys = pressedKeys.slice(-keys.length);
    if (pressedKeys.length === keys.length && keys.every((key, i) => key === pressedKeys[i])) {
      panicAnchor.href = currentPanicLink();
      panicAnchor.target = "_top";
      panicAnchor.click();
      pressedKeys = [];
    }
  });

  const savedBackgroundImage = store.get("backgroundImage");
  const isTabsPage = Boolean(document.getElementById("frame-container"));
  const storedMode = store.get("backgroundMode");
  const legacyCustom = storedMode === "custom" || (!storedMode && savedBackgroundImage && savedBackgroundImage !== "none");
  const backgroundMode = legacyCustom ? "default" : storedMode || (savedBackgroundImage === "none" ? "none" : "gradient");
  const storedImageMode = store.get("backgroundImageMode");
  const imageMode = legacyCustom || storedImageMode === "custom" ? "custom" : storedImageMode === "all" ? "all" : "none";
  const backgroundBlur = Math.max(0, Math.min(100, Number(store.get("backgroundBlur")) || 0));
  document.body.style.setProperty("--background-blur", backgroundBlur);

  if (backgroundMode === "gradient") {
    document.body.dataset.background = "gradient";
    document.body.dataset.gradient = store.get("gradientStyle") || "multi";
  } else if (backgroundMode === "none") {
    document.body.dataset.background = "solid";
  }

  const libraryBackground = imageMode === "all" ? backgroundUrlFor(store.get("backgroundKey")) : "";
  if (!isTabsPage && ((imageMode === "custom" && savedBackgroundImage && savedBackgroundImage !== "none") || libraryBackground)) {
    const safeBackground = libraryBackground || reconstructSafeUrl(savedBackgroundImage);
    if (safeBackground) {
      document.body.dataset.customBackground = "true";
      document.body.style.setProperty("--custom-background-image", `url('${safeBackground}')`);
    }
  }

  if (!inShell() && !document.querySelector('script[src="/assets/js/particles.js"]')) {
    const particleScript = document.createElement("script");
    particleScript.src = "/assets/js/particles.js";
    document.head.appendChild(particleScript);
  }

  // Pointer Effects — cursor.js is only loaded when an effect is active
  const CURSOR_EFFECTS = [
    "rainbow-stars",
    "white-orbs",
    "rainbow-trail",
    "blue-orbs-trail",
    "blue-orbs-cursor",
    "the-sims",
    "curly-cursor",
    "rainbow-ribbon",
    "fairy-dust",
    "echo-trail",
    "chasing-cursors",
    "dot-trail",
    "bubble-trail",
    "snowflake-trail",
    "afterglow",
    "magnetic-trail",
    "magnetic-cursor",
    "color-trail",
    "falling-stars",
    "tubes-trail",
    "pixel-cursor",
    "pixel-trail",
    "pixel-reveal",
    "drawing-trail",
    "tidal-trail",
    "fluid-trail",
    "particle-dots",
    "spring-cursor",
    "inverted-cursor",
    "spotlight-cursor",
    "spring-squash",
  ];

  function anyCursorEffectActive() {
    const activePointer = store.get("pointer");
    const activeTrail = store.get("pointerTrail") || (activePointer === "blue-orbs" || store.get("pointerCustom") === "blue-orbs" ? "blue-orbs-trail" : CURSOR_EFFECTS.includes(activePointer) ? activePointer : "default");
    const activeCustom = store.get("pointerCustom") || "default";
    const activeClickEffect = store.get("pointerClickEffect") || "none";
    const idlePointerMotion = store.get("pointerIdleMotion") === "true";
    return CURSOR_EFFECTS.includes(activeTrail) || CURSOR_EFFECTS.includes(activeCustom) || CURSOR_EFFECTS.includes(activeClickEffect) || idlePointerMotion;
  }

  let cursorScriptLoad = null;
  function loadCursorScript() {
    if (inShell()) return Promise.resolve();
    if (!cursorScriptLoad) {
      cursorScriptLoad = new Promise((resolve, reject) => {
        const cursorScript = document.createElement("script");
        cursorScript.src = "/assets/js/cursor.js";
        cursorScript.onload = resolve;
        cursorScript.onerror = reject;
        document.head.appendChild(cursorScript);
      });
    }
    return cursorScriptLoad;
  }

  window.applyCursorEffects = () => {
    if (!anyCursorEffectActive()) {
      window.destroyCursorEffects?.();
      return Promise.resolve();
    }
    return loadCursorScript()
      .then(() => window.refreshCursorEffects())
      .catch(() => {});
  };

  window.applyCursorEffects();
});
