// if statement hell featuring a stupid amount of functions

// Utility Functions
function Popup() {
  document.querySelector(".settings-container").style.display = "none";
  document.querySelector(".popup").style.display = "block";
}

function ClosePopup() {
  document.querySelector(".settings-container").style.display = "flex";
  document.querySelector(".popup").style.display = "none";
}

function initializeTheme() {
  const themeId = localStorage.getItem("theme") || "d";
  document.querySelector(".td").value = themeId;
}

function handleThemeChange(event) {
  const selectedValue = event.target.value;
  localStorage.setItem("theme", selectedValue);
  window.location.reload();
}

function initializeBackground() {
  const savedBackgroundImage = localStorage.getItem("backgroundImage");
  if (savedBackgroundImage) {
    setBackgroundImage(savedBackgroundImage);
  }
}

function setBackgroundImage(imageUrl) {
  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.querySelector("#background-input").value = imageUrl;
}

function handleFileChange(event) {
  const fileInput = event.target;
  if (fileInput.files?.[0]) {
    const reader = new FileReader();
    reader.onload = e => {
      const imageUrl = e.target.result;
      localStorage.setItem("backgroundImage", imageUrl);
      setBackgroundImage(imageUrl);
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}

function resetBackground() {
  localStorage.removeItem("backgroundImage");
  const defaultBackground = "./assets/media/background/full-main.png";
  setBackgroundImage(defaultBackground);
}

function handleBackgroundSave() {
  const imageUrl = document.querySelector("#background-input").value;
  if (imageUrl.startsWith("https://")) {
    localStorage.setItem("backgroundImage", imageUrl);
    setBackgroundImage(imageUrl);
    document.querySelector("#background-input").value = "";
  } else {
    alert("Please enter a URL starting with 'https://'");
  }
}

// CSS Content Generator
function generateCssContent(themeData) {
  let cssContent = ":root {";
  for (const [key, value] of Object.entries(themeData)) {
    if (value) {
      cssContent += `\n--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value};`;
    }
  }
  cssContent += `
}

::-webkit-scrollbar {
  width: 6px;
  background-color: var(--background-color);
}

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: var(--background-color);
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: var(--primary-text-color);
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--dark-text-color);
}

body {
  font-family: 'Inter', sans-serif;
  text-decoration: none;
  background: var(--background-image);
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

::placeholder {
  color: var(--placeholder-text-color);
  opacity: 1;
}

.main {
  letter-spacing: 0px;
  font-family: 'Inter', sans-serif;
  width: 99%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0%;
  position: absolute;
  z-index: 99;
}`;

  return cssContent;
}

function saveTheme() {
  const themeData = {
    background:
      document.querySelector("#background-input").value ||
      "url('/./assets/media/background/full-main.png')",
    backgroundColor:
      document.querySelector("#background-color-input").value || "#222",
    inputColor: document.querySelector("#input-color-input").value || "#4545459e",
    appCardColor: document.querySelector("#app-card-color-input").value || "#353535",
    settingsCardColor:
      document.querySelector("#settings-card-color-input").value || "#2a2a2a",
    buttonColor: document.querySelector("#button-color-input").value || "#333",
    tabAccentColor:
      document.querySelector("#tab-accent-color-input").value || "#444",
    sliderActiveColor:
      document.querySelector("#slider-active-color-input").value || "#4caf50",
    sliderInactiveColor:
      document.querySelector("#slider-inactive-color-input").value || "#ccc",
    logoColor: document.querySelector("#white-logo").classList.contains("selected")
      ? "white"
      : "black",
    primaryTextColor:
      document.querySelector("#primary-text-color-input").value || "#fff",
    darkTextColor: document.querySelector("#dark-text-color-input").value || "#555",
    placeholderTextColor:
      document.querySelector("#placeholder-text-color-input").value || "#aaa",
  };

  const cssContent = generateCssContent(themeData);
  localStorage.setItem("themeCSS", cssContent);
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeBackground();

  document.querySelector(".td").addEventListener("change", handleThemeChange);

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  document
    .querySelector("#upload-button")
    .addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", handleFileChange);

  document.querySelector("#reset-button").addEventListener("click", resetBackground);

  document.querySelector("#black-button").addEventListener("click", resetBackground);

  document.querySelector("#white-button").addEventListener("click", () => {
    const whiteBackgroundUrl = "./assets/media/background/full-inverted.png";
    localStorage.setItem("backgroundImage", whiteBackgroundUrl);
    setBackgroundImage(whiteBackgroundUrl);
  });

  document
    .querySelector("#save-button")
    .addEventListener("click", handleBackgroundSave);

  document.querySelector("#save-theme").addEventListener("click", saveTheme);
});

function dataUrItoBlob(dataUri) {
  const byteString =
    dataUri.split(",")[0].indexOf("base64") >= 0
      ? atob(dataUri.split(",")[1])
      : unescape(dataUri.split(",")[1]);
  const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
}
// Ads
document.addEventListener("DOMContentLoaded", () => {
  function adChange(selectedValue) {
    if (selectedValue === "default") {
      localStorage.setItem("ads", "on");
    } else if (selectedValue === "popups") {
      localStorage.setItem("ads", "popups");
    } else if (selectedValue === "off") {
      localStorage.setItem("ads", "off");
    }
  }

  const adTypeElement = document.getElementById("adType");

  if (adTypeElement) {
    adTypeElement.addEventListener("change", function () {
      const selectedOption = this.value;
      adChange(selectedOption);
    });

    const storedAd = localStorage.getItem("ads");
    if (storedAd === "on") {
      adTypeElement.value = "default";
    } else if (storedAd === "popups") {
      adTypeElement.value = "popups";
    } else if (storedAd === "off") {
      adTypeElement.value = "off";
    } else {
      adTypeElement.value = "default";
    }
  }
  // Makes the custom icon and name persistent
  const iconElement = document.getElementById("icon");
  const nameElement = document.getElementById("name");
  const customIcon = localStorage.getItem("CustomIcon");
  const customName = localStorage.getItem("CustomName");
  iconElement.value = customIcon;
  nameElement.value = customName;

  if (localStorage.getItem("ab") === "true") {
    document.getElementById("ab-settings-switch").checked = true;
  }
});

// Dyn
document.addEventListener("DOMContentLoaded", () => {
  function pChange(selectedValue) {
    if (selectedValue === "uv") {
      localStorage.setItem("uv", "true");
      localStorage.setItem("dy", "false");
    } else if (selectedValue === "dy") {
      localStorage.setItem("uv", "false");
      localStorage.setItem("dy", "true");
    }
  }

  const pChangeElement = document.getElementById("pChange");

  if (pChangeElement) {
    pChangeElement.addEventListener("change", function () {
      const selectedOption = this.value;
      pChange(selectedOption);
    });

    const storedP = localStorage.getItem("uv");
    if (storedP === "true") {
      pChangeElement.value = "uv";
    } else if (
      localStorage.getItem("dy") === "true" ||
      localStorage.getItem("dy") === "auto"
    ) {
      pChangeElement.value = "dy";
    } else {
      pChangeElement.value = "uv";
    }
  }
});

// Key
let eventKey = localStorage.getItem("eventKey") || "`";
let eventKeyRaw = localStorage.getItem("eventKeyRaw") || "`";
let pLink = localStorage.getItem("pLink") || "https://classroom.google.com/";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("eventKeyInput").value = eventKeyRaw;
  document.getElementById("linkInput").value = pLink;

  const selectedOption = localStorage.getItem("selectedOption");
  if (selectedOption) {
    updateHeadSection(selectedOption);
  }
});

const eventKeyInput = document.getElementById("eventKeyInput");
eventKeyInput.addEventListener("input", () => {
  eventKey = eventKeyInput.value.split(",");
});

const linkInput = document.getElementById("linkInput");
linkInput.addEventListener("input", () => {
  pLink = linkInput.value;
});

function saveEventKey() {
  eventKey = eventKeyInput.value.split(",");
  eventKeyRaw = eventKeyInput.value;
  localStorage.setItem("eventKey", JSON.stringify(eventKey));
  localStorage.setItem("pLink", pLink);
  localStorage.setItem("eventKeyRaw", eventKeyRaw);
}
// Tab Cloaker
const dropdown = document.getElementById("dropdown");
const options = dropdown.getElementsByTagName("option");

const sortedOptions = Array.from(options).sort((a, b) =>
  a.textContent.localeCompare(b.textContent),
);

while (dropdown.firstChild) {
  dropdown.removeChild(dropdown.firstChild);
}

// biome-ignore lint/complexity/noForEach: <explanation>
sortedOptions.forEach(option => {
  dropdown.appendChild(option);
});

function saveIcon() {
  const iconElement = document.getElementById("icon");
  const iconValue = iconElement.value;
  console.log("saveIcon function called with icon value:", iconValue);
  localStorage.setItem("icon", iconValue);
}

function saveName() {
  const nameElement = document.getElementById("name");
  const nameValue = nameElement.value;
  console.log("saveName function called with name value:", nameValue);
  localStorage.setItem("name", nameValue);
}

function CustomIcon() {
  const iconElement = document.getElementById("icon");
  const iconValue = iconElement.value;
  console.log("saveIcon function called with icon value:", iconValue);
  localStorage.setItem("CustomIcon", iconValue);
}

function CustomName() {
  const nameElement = document.getElementById("name");
  const nameValue = nameElement.value;
  console.log("saveName function called with name value:", nameValue);
  localStorage.setItem("CustomName", nameValue);
}
function ResetCustomCloak() {
  localStorage.removeItem("CustomName");
  localStorage.removeItem("CustomIcon");
  document.getElementById("icon").value = "";
  document.getElementById("name").value = "";
}

function redirectToMainDomain() {
  const currentUrl = window.location.href;
  const mainDomainUrl = currentUrl.replace(/\/[^\/]*$/, "");
  if (window !== top) {
    top.location.href = mainDomainUrl + window.location.pathname;
  } else {
    window.location.href = mainDomainUrl + window.location.pathname;
  }
}

document.addEventListener("DOMContentLoaded", event => {
  const icon = document.getElementById("tab-favicon");
  const name = document.getElementById("tab-title");
  const selectedValue = localStorage.getItem("selectedOption") || "Default";
  document.getElementById("dropdown").value = selectedValue;
  updateHeadSection(selectedValue);
});

function handleDropdownChange(selectElement) {
  const selectedValue = selectElement.value;
  localStorage.removeItem("CustomName");
  localStorage.removeItem("CustomIcon");
  localStorage.setItem("selectedOption", selectedValue);
  updateHeadSection(selectedValue);
  redirectToMainDomain(selectedValue);
}

function updateHeadSection(selectedValue) {
  const icon = document.getElementById("tab-favicon");
  const name = document.getElementById("tab-title");
  const customName = localStorage.getItem("CustomName");
  const customIcon = localStorage.getItem("CustomIcon");

  if (customName && customIcon) {
    name.textContent = customName;
    icon.setAttribute("href", customIcon);
    localStorage.setItem("name", customName);
    localStorage.setItem("icon", customIcon);
  }
}
// Particles

const switches = document.getElementById("2");

if (window.localStorage.getItem("particles") !== "") {
  if (window.localStorage.getItem("particles") === "true") {
    switches.checked = true;
  } else {
    switches.checked = false;
  }
}

switches.addEventListener("change", event => {
  if (event.currentTarget.checked) {
    window.localStorage.setItem("particles", "true");
  } else {
    window.localStorage.setItem("particles", "false");
  }
});
// AB Cloak
function AB() {
  let inFrame;

  try {
    inFrame = window !== top;
  } catch (e) {
    inFrame = true;
  }

  if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank");
    if (!popup || popup.closed) {
      alert("Window blocked. Please allow popups for this site.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const style = iframe.style;
      const link = doc.createElement("link");

      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon =
        localStorage.getItem("icon") ||
        "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

      doc.title = name;
      link.rel = "icon";
      link.href = icon;

      iframe.src = location.href;
      style.position = "fixed";
      style.top = style.bottom = style.left = style.right = 0;
      style.border = style.outline = "none";
      style.width = style.height = "100%";

      const pLink = localStorage.getItem(encodeURI("pLink")) || getRandomUrl();
      location.replace(pLink);

      const script = doc.createElement("script");
      script.textContent = `
        window.onbeforeunload = function (event) {
          const confirmationMessage = 'Leave Site?';
          (event || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        };
      `;
      doc.head.appendChild(link);
      doc.body.appendChild(iframe);
      doc.head.appendChild(script);
    }
  }
}

function toggleAb() {
  const ab = localStorage.getItem("ab");
  if (!ab) {
    localStorage.setItem("ab", "true");
  } else if (ab === "true") {
    localStorage.setItem("ab", "false");
  } else {
    localStorage.setItem("ab", "true");
  }
}
// Search Engine
function EngineChange(dropdown) {
  const selectedEngine = dropdown.value;

  const engineUrls = {
    Google: "https://www.google.com/search?q=",
    Bing: "https://www.bing.com/search?q=",
    DuckDuckGo: "https://duckduckgo.com/?q=",
    Qwant: "https://www.qwant.com/?q=",
    Startpage: "https://www.startpage.com/search?q=",
    SearchEncrypt: "https://www.searchencrypt.com/search/?q=",
    Ecosia: "https://www.ecosia.org/search?q=",
  };

  localStorage.setItem("engine", engineUrls[selectedEngine]);
  localStorage.setItem("enginename", selectedEngine);

  dropdown.value = selectedEngine;
}

function SaveEngine() {
  const customEngine = document.getElementById("engine-form").value;
  if (customEngine.trim() !== "") {
    localStorage.setItem("engine", customEngine);
    localStorage.setItem("enginename", "Custom");
  } else {
    alert("Please enter a custom search engine value.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const selectedEngineName = localStorage.getItem("enginename");
  const dropdown = document.getElementById("engine");
  if (selectedEngineName) {
    dropdown.value = selectedEngineName;
  }
});

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
