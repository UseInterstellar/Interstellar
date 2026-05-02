// Theme is applied immediately, to prevent flashing on page load
(() => {
  const themeid = localStorage.getItem("theme");
  const themes = {
    catppuccinMocha: "/assets/css/themes/catppuccin/mocha.css",
    catppuccinMacchiato: "/assets/css/themes/catppuccin/macchiato.css",
    catppuccinFrappe: "/assets/css/themes/catppuccin/frappe.css",
    catppuccinLatte: "/assets/css/themes/catppuccin/latte.css",
    Inverted: "/assets/css/themes/colors/inverted.css",
    sky: "/assets/css/themes/colors/sky.css",
  };

  if (themes[themeid]) {
    const themeLink = document.createElement("link");
    themeLink.rel = "stylesheet";
    themeLink.href = themes[themeid];
    document.head.appendChild(themeLink);
  } else {
    const customThemeCss = localStorage.getItem(`theme-${themeid}`);
    if (customThemeCss) {
      const customThemeStyle = document.createElement("style");
      customThemeStyle.textContent = customThemeCss;
      document.head.appendChild(customThemeStyle);
    }
  }
})();

let isInTabMode;

try {
  isInTabMode = window.top.location.pathname === "/tabs";
} catch {
  try {
    isInTabMode = window.parent.location.pathname === "/tabs";
  } catch {
    isInTabMode = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const blockedHostnames = ["gointerstellar.app"];

  if (!blockedHostnames.includes(window.location.hostname)) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = `(()=>{const k="p",d=15e4,s=()=>{let t=localStorage.getItem(k);return !t||Date.now()-t>d},m=()=>localStorage.setItem(k,Date.now());function h(){if(!s())return;window.open("https://undercoverhiking.com/cn4ai6dv?key=4d729d45e2fde8ef6d2caccfe564d6be","_blank");m();document.removeEventListener("click",h)}s()&&document.addEventListener("click",h,{once:1})})();`;
    document.body.appendChild(script);
  }

  const nav = document.querySelector(".nav-bar");

  if (nav) {
    const themeId = localStorage.getItem("theme");
    let LogoUrl = "/assets/media/favicon/main.png";
    if (themeId === "Inverted") {
      LogoUrl = "/assets/media/favicon/main-inverted.png";
    }
    const html = `
      <div id="icon-container">
        <a class="icon" href="/./"><img alt="nav" id="INImg" src="${LogoUrl}"/></a>
      </div>
      <div class="nav-bar-right">
        <a class="navbar-link" href="/./games"><i class="fa-solid fa-gamepad navbar-icon"></i><an>&#71;&#97;</an><an>&#109;&#101;&#115;</an></a>
        <a class="navbar-link" href="/./apps"><i class="fa-solid fa-phone navbar-icon"></i><an>&#65;&#112;</an><an>&#112;&#115;</an></a>
        ${isInTabMode ? "" : '<a class="navbar-link" href="/./tabs"><i class="fa-solid fa-laptop navbar-icon"></i><an>&#84;&#97;</an><an>&#98;&#115;</an></a>'}
        <a class="navbar-link" href="/./settings"><i class="fa-solid fa-gear navbar-icon settings-icon"></i><an>&#83;&#101;&#116;</an><an>&#116;&#105;&#110;&#103;</an></a>
      </div>`;
    nav.innerHTML = html;
  }

  // Favicon and Name Logic
  const icon = document.getElementById("tab-favicon");
  const title = document.getElementById("t");
  const cloakName = localStorage.getItem("CustomName") || localStorage.getItem("name");
  const cloakIcon = localStorage.getItem("CustomIcon") || localStorage.getItem("icon");
  if (cloakName) title.textContent = cloakName;
  if (cloakIcon) icon.setAttribute("href", cloakIcon);

  // Event Key Logic
  const eventKey = JSON.parse(localStorage.getItem("eventKey")) || ["`"];
  const pLink = localStorage.getItem("pLink") || "https://classroom.google.com/";
  let pressedKeys = [];

  document.addEventListener("keydown", event => {
    pressedKeys.push(event.key);
    const recentKeys = pressedKeys.slice(-eventKey.length);
    if (recentKeys.length === eventKey.length && eventKey.every((key, i) => key === recentKeys[i])) {
      window.location.href = pLink;
      pressedKeys = [];
    }
  });

  // Background Image Logic
  const savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = `url('${savedBackgroundImage}')`;
  }
});
