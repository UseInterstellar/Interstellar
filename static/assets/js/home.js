let inFrame;

try {
  inFrame = window !== top;
} catch (e) {
  inFrame = true;
}
if (!store.get("ab")) store.set("ab", true);
if (!inFrame && !navigator.userAgent.includes("Firefox") && store.get("ab") === "true") {
  const popup = open("about:blank", "_blank");
  if (popup && !popup.closed) {
    const doc = popup.document;
    const iframe = doc.createElement("iframe");
    const style = iframe.style;
    const link = doc.createElement("link");
    const script = doc.createElement("script");

    const name = store.get("name") || "My Drive - Google Drive";
    const icon = store.get("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

    doc.title = (window.laceTitle || (s => s))(name);
    link.rel = "icon";
    link.href = icon;

    iframe.src = location.href;
    style.position = "fixed";
    style.top = style.bottom = style.left = style.right = 0;
    style.border = style.outline = "none";
    style.width = style.height = "100%";

    script.textContent = `
      window.onbeforeunload = function (event) {
        const confirmationMessage = 'Leave Site?';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      };
    `;

    doc.head.appendChild(link);
    doc.head.appendChild(script);
    doc.body.appendChild(iframe);

    const pLink = store.get("pLink") || getRandomUrl();
    location.replace(pLink);
  }
}

const SplashT = ["Welcome to Sklite", "Search the web", "Your apps and games, all in one place", "Thanks for using Sklite"];

let SplashI = Math.floor(Math.random() * SplashT.length);
const SplashE = document.getElementById("splash");

const laceSplash = window.laceTitle ? s => window.laceTitle(s, false) : s => s;
function paintSplash() {
  SplashE.innerText = laceSplash(SplashT[SplashI]);
}

function cycleSplash() {
  SplashI = (SplashI + 1) % SplashT.length;
  paintSplash();
  SplashE.style.animation = "none";
  void SplashE.offsetWidth;
  SplashE.style.animation = "";
}

paintSplash();
SplashE.addEventListener("click", cycleSplash);

function getRandomUrl() {
  const randomUrls = [
    "https://kahoot.it",
    "https://classroom.google.com",
    "https://drive.google.com",
    "https://google.com",
    "https://docs.google.com",
    "https://slides.google.com",
    "https://www.nasa.gov",
    "https://blooket.com",
    "https://clever.com",
    "https://edpuzzle.com",
    "https://khanacademy.org",
    "https://wikipedia.org",
    "https://dictionary.com",
  ];
  return randomUrls[randRange(0, randomUrls.length)];
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

(function buildHeading() {
  const heading = document.querySelector("h1.title");
  if (!heading) return;
  heading.textContent = "Sklite";
})();

document.addEventListener("DOMContentLoaded", () => {
  for (const shortcut of document.querySelectorAll("[data-home-link]")) {
    const navLink = document.querySelector(`.navbar-link[data-nav="${shortcut.dataset.homeLink}"]`);
    if (navLink) shortcut.href = navLink.href;
  }

  const recentItems = [];
  for (const [storageKey, kind] of [
    ["Arecent", "apps"],
    ["Grecent", "games"],
  ]) {
    try {
      const entries = JSON.parse(store.getRaw(storageKey) || "[]");
      recentItems.push(...entries.map(entry => ({ ...entry, kind })));
    } catch {}
  }
  recentItems.sort((a, b) => (b.openedAt ?? 0) - (a.openedAt ?? 0));
  const recentContainer = document.getElementById("home-recent");
  if (!recentContainer || recentItems.length === 0) return;
  recentContainer.replaceChildren();
  for (const item of recentItems.slice(0, 6)) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "recent-app";
    if (item.image) {
      const image = document.createElement("img");
      image.src = item.image;
      image.alt = "";
      image.loading = "lazy";
      button.append(image);
    }
    const name = document.createElement("span");
    name.textContent = item.name;
    button.append(name);
    button.addEventListener("click", () => {
      store.set("homeCatalogSearch", item.name);
      const navLink = document.querySelector(`.navbar-link[data-nav="${item.kind === "games" ? "Games" : "Apps"}"]`);
      if (navLink) window.location.href = navLink.href;
    });
    recentContainer.append(button);
  }
});
