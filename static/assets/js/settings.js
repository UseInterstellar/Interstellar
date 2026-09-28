document.addEventListener("DOMContentLoaded", () => {
  const adTypeElement = document.getElementById("adType");
  if (adTypeElement) {
    adTypeElement.addEventListener("change", function () {
      store.set("ads", this.value === "default" ? "on" : this.value);
    });
    const storedAd = store.get("ads");
    adTypeElement.value = storedAd === "popups" || storedAd === "off" ? storedAd : "default";
  }

  const sjOnly = Array.from(document.querySelectorAll("[data-sj-only]"));
  const uvOnly = Array.from(document.querySelectorAll("[data-uv-only]"));
  function syncProxyCards(proxy) {
    for (const el of sjOnly) el.style.display = proxy === "sj" ? "" : "none";
    for (const el of uvOnly) el.style.display = proxy === "sj" ? "none" : "";
  }

  const pChangeElement = document.getElementById("pChange");
  if (pChangeElement) {
    pChangeElement.addEventListener("change", function () {
      store.set("proxy", this.value);
      syncProxyCards(this.value);
    });
    pChangeElement.value = store.get("proxy") || "sj";
  }

  const transportElement = document.getElementById("transport-dropdown");
  if (transportElement) {
    transportElement.value = store.get("transport") === "libcurl" ? "libcurl" : "epoxy";
    transportElement.addEventListener("change", function () {
      store.set("transport", this.value);
      window.location.reload();
    });
  }

  syncProxyCards(store.get("proxy") || "sj");

  const wispInput = document.getElementById("wisp-input");
  const wispSaveBtn = document.getElementById("wisp-save-btn");
  if (wispInput && wispSaveBtn) {
    wispInput.value = store.get("wisp-url") || "";
    wispSaveBtn.addEventListener("click", () => {
      const val = wispInput.value.trim();
      if (val === "") {
        store.remove("wisp-url");
      } else if (/^wss?:\/\//i.test(val)) {
        store.set("wisp-url", val);
      } else {
        alert("Enter a valid Wisp URL starting with ws:// or wss://");
        return;
      }
      window.location.reload();
    });
  }

  const eventKeyInput = document.getElementById("eventKeyInput");
  const linkInput = document.getElementById("linkInput");
  const panicLinkDropdown = document.getElementById("panic-link-dropdown");
  const panicLinkCustomRow = document.getElementById("panic-link-custom-row");

  eventKeyInput.value = store.get("eventKeyRaw") || "`";

  function commitOnEnter(input, save) {
    input.addEventListener("change", save);
    input.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      save();
      input.blur();
    });
  }

  commitOnEnter(eventKeyInput, () => {
    const raw = eventKeyInput.value;
    store.set("eventKey", JSON.stringify(raw.split(",")));
    store.set("eventKeyRaw", raw);
  });


  const panicPresets = Array.from(panicLinkDropdown.options)
    .map(option => option.value)
    .filter(value => value !== "default" && value !== "custom");
  const storedPanicLink = store.get("pLink") || "";

  if (!storedPanicLink) panicLinkDropdown.value = "default";
  else if (panicPresets.includes(storedPanicLink)) panicLinkDropdown.value = storedPanicLink;
  else {
    panicLinkDropdown.value = "custom";
    linkInput.value = storedPanicLink;
  }

  function syncPanicLinkRow() {
    panicLinkCustomRow.style.display = panicLinkDropdown.value === "custom" ? "" : "none";
  }

  panicLinkDropdown.addEventListener("change", () => {
    const choice = panicLinkDropdown.value;
    syncPanicLinkRow();
    if (choice === "default") store.remove("pLink");
    else if (choice === "custom") savePanicLink();
    else store.set("pLink", choice);
  });

  function savePanicLink() {
    const value = linkInput.value.trim();
    if (value) store.set("pLink", value);
    else store.remove("pLink");
  }

  commitOnEnter(linkInput, savePanicLink);
  syncPanicLinkRow();


  const cloakDropdown = document.getElementById("cloak-dropdown");
  const customCloakRow = document.getElementById("custom-cloak-row");
  const customCloakName = document.getElementById("custom-cloak-name");
  const customCloakIcon = document.getElementById("custom-cloak-icon");

  function syncCustomCloakRow() {
    customCloakRow.style.display = cloakDropdown.value === "custom" ? "" : "none";
  }

  cloakDropdown.value = store.get("selectedOption") || "Thesaurus";
  cloakDropdown.addEventListener("change", () => handleDropdownChange(cloakDropdown));

  customCloakName.value = store.get("CustomName") || "";
  customCloakIcon.value = store.get("CustomIcon") || "";
  customCloakName.addEventListener("change", applyCustomCloak);
  customCloakIcon.addEventListener("change", applyCustomCloak);
  syncCustomCloakRow();

  if (store.get("ab") === "true") {
    document.getElementById("ab-settings-switch").checked = true;
  }

  const themeDropdown = document.getElementById("theme-dropdown");
  themeDropdown.value = store.get("theme") || "d";
  themeDropdown.addEventListener("change", function () {
    themeChange(this);
  });


  const bgDropdown = document.getElementById("background-dropdown");
  const gradientRow = document.getElementById("gradient-style-row");
  const gradientDropdown = document.getElementById("gradient-dropdown");
  const bgImageDropdown = document.getElementById("background-image-dropdown");
  const bgCustomRow = document.getElementById("background-custom-row");
  const bgInput = document.getElementById("background-input");

  const savedBg = store.get("backgroundImage");
  const legacyCustom = store.get("backgroundMode") === "custom";
  const savedBgMode = legacyCustom ? "default" : store.get("backgroundMode") || "default";
  const savedImageMode = legacyCustom || store.get("backgroundImageMode") === "custom" ? "custom" : "default";

  bgDropdown.value = savedBgMode;
  gradientDropdown.value = store.get("gradientStyle") || "linear";
  bgImageDropdown.value = savedImageMode;
  if (savedImageMode === "custom") bgInput.value = savedBg && savedBg !== "none" ? savedBg : "";

  function applyBackground() {
    const mode = bgDropdown.value;
    gradientRow.style.display = mode === "gradient" ? "" : "none";

    if (mode === "gradient") {
      document.body.dataset.background = "gradient";
      document.body.dataset.gradient = gradientDropdown.value;
    } else if (mode === "none") {
      document.body.dataset.background = "solid";
      delete document.body.dataset.gradient;
    } else {
      delete document.body.dataset.background;
      delete document.body.dataset.gradient;
    }
  }

  function applyBackgroundImage() {
    const custom = bgImageDropdown.value === "custom";
    bgCustomRow.style.display = custom ? "" : "none";
    const url = custom ? bgInput.value.trim() : "";
    document.body.style.backgroundImage = url ? `url('${url}')` : "";
  }

  bgDropdown.addEventListener("change", () => {
    store.set("backgroundMode", bgDropdown.value);
    applyBackground();
  });

  gradientDropdown.addEventListener("change", () => {
    store.set("gradientStyle", gradientDropdown.value);
    applyBackground();
  });

  bgImageDropdown.addEventListener("change", () => {
    const custom = bgImageDropdown.value === "custom";
    store.set("backgroundImageMode", bgImageDropdown.value);
    if (!custom) store.remove("backgroundImage");
    applyBackgroundImage();
  });

  document.getElementById("save-button").addEventListener("click", () => {
    const url = bgInput.value.trim();
    if (!url) return;
    store.set("backgroundImage", url);
    store.set("backgroundImageMode", "custom");
    applyBackgroundImage();
  });

  applyBackground();
  applyBackgroundImage();

  const particlesDropdown = document.getElementById("particles-dropdown");
  particlesDropdown.value = store.get("particles") === "true" ? "on" : "off";
  particlesDropdown.addEventListener("change", function () {
    store.set("particles", this.value === "on" ? "true" : "false");
  });

  const pointerDropdown = document.getElementById("pointer-dropdown");
  pointerDropdown.value = store.get("pointer") || "default";
  pointerDropdown.addEventListener("change", function () {
    const val = this.value;
    if (val === "default") {
      store.remove("pointer");
    } else {
      store.set("pointer", val);
    }
    window.location.reload();
  });

  document.getElementById("engine").addEventListener("change", function () {
    changeEngine(this);
  });
  document.getElementById("engine-save-btn").addEventListener("click", saveCustomEngine);

  const savedEngineName = store.get("enginename");
  if (savedEngineName) document.getElementById("engine").value = savedEngineName;
});

const cloakOptions = {
  Google: { name: "Google", icon: "/assets/media/favicon/google.png" },
  "Savvas Realize": { name: "Savvas Realize", icon: "/assets/media/favicon/savvas-realize.png" },
  SmartPass: { name: "SmartPass", icon: "/assets/media/favicon/smartpass.png" },
  "World Book Online - Super Home": { name: "Super Home Page", icon: "/assets/media/favicon/wbo.ico" },
  "World Book Online - Student": { name: "WBO Student | Home Page", icon: "/assets/media/favicon/wbo.ico" },
  "World Book Online - Timelines": { name: "Timelines - Home Page", icon: "/assets/media/favicon/wbo.ico" },
  Naviance: { name: "Naviance Student", icon: "/assets/media/favicon/naviance.png" },
  "PBS Learning Media": { name: "PBS LearningMedia | Teaching Resources For Students And Teachers", icon: "/assets/media/favicon/pbslearningmedia.ico" },
  "PBS Learning Media Student Home": { name: "Student Homepage | PBS LearningMedia", icon: "/assets/media/favicon/pbslearningmedia.ico" },
  Drive: { name: "My Drive - Google Drive", icon: "/assets/media/favicon/drive.png" },
  Classroom: { name: "Нome", icon: "/assets/media/favicon/classroom.png" },
  Schoology: { name: "Home | Schoology", icon: "/assets/media/favicon/schoology.png" },
  Gmail: { name: "Gmail", icon: "/assets/media/favicon/gmail.png" },
  Clever: { name: "Clever | Portal", icon: "/assets/media/favicon/clever.png" },
  Khan: { name: "Dashboard | Khan Academy", icon: "/assets/media/favicon/khan.png" },
  Dictionary: { name: "Dictionary.com | Meanings & Definitions of English Words", icon: "/assets/media/favicon/dictionary.png" },
  Thesaurus: { name: "Synonyms and Antonyms of Words | Thesaurus.com", icon: "/assets/media/favicon/thesaurus.png" },
  Campus: { name: "Infinite Campus", icon: "/assets/media/favicon/campus.png" },
  IXL: { name: "IXL | Dashboard", icon: "/assets/media/favicon/ixl.png" },
  Canvas: { name: "Dashboard", icon: "/assets/media/favicon/canvas.png" },
  CodeHS: { name: "Sandbox | CodeHS", icon: "/assets/media/favicon/codehs.png" },
  LinkIt: { name: "Test Taker", icon: "/assets/media/favicon/linkit.ico" },
  Edpuzzle: { name: "Edpuzzle", icon: "/assets/media/favicon/edpuzzle.png" },
  "i-Ready Math": { name: "Math To Do, i-Ready", icon: "/assets/media/favicon/i-ready.ico" },
  "i-Ready Reading": { name: "Reading To Do, i-Ready", icon: "/assets/media/favicon/i-ready.ico" },
  "ClassLink Login": { name: "Login", icon: "/assets/media/favicon/classlink-login.png" },
  "Google Meet": { name: "Google Meet", icon: "/assets/media/favicon/google-meet.png" },
  "Google Docs": { name: "Google Docs", icon: "/assets/media/favicon/google-docs.ico" },
  "Google Slides": { name: "Google Slides", icon: "/assets/media/favicon/google-slides.ico" },
  Wikipedia: { name: "Wikipedia", icon: "/assets/media/favicon/wikipedia.png" },
  Britannica: { name: "Encyclopedia Britannica | Britannica", icon: "/assets/media/favicon/britannica.png" },
  Ducksters: { name: "Ducksters", icon: "/assets/media/favicon/ducksters.png" },
  Minga: { name: "Minga – Creating Amazing Schools", icon: "/assets/media/favicon/minga.png" },
  "i-Ready Learning Games": { name: "Learning Games, i-Ready", icon: "/assets/media/favicon/i-ready.ico" },
  "NoRedInk Home": { name: "Student Home | NoRedInk", icon: "/assets/media/favicon/noredink.png" },
  Desmos: { name: "Desmos | Graphing Calculator", icon: "/assets/media/favicon/desmos.ico" },
  "Newsela Binder": { name: "Newsela | Binder", icon: "/assets/media/favicon/newsela.png" },
  "Newsela Assignments": { name: "Newsela | Assignments", icon: "/assets/media/favicon/newsela.png" },
  "Newsela Home": { name: "Newsela | Instructional Content Platform", icon: "/assets/media/favicon/newsela.png" },
  "PowerSchool Sign In": { name: "Student and Parent Sign In", icon: "/assets/media/favicon/powerschool.png" },
  "PowerSchool Grades and Attendance": { name: "Grades and Attendance", icon: "/assets/media/favicon/powerschool.png" },
  "PowerSchool Teacher Comments": { name: "Teacher Comments", icon: "/assets/media/favicon/powerschool.png" },
  "PowerSchool Standards Grades": { name: "Standards Grades", icon: "/assets/media/favicon/powerschool.png" },
  "PowerSchool Attendance": { name: "Attendance", icon: "/assets/media/favicon/powerschool.png" },
  Nearpod: { name: "Nearpod", icon: "/assets/media/favicon/nearpod.png" },
  StudentVUE: { name: "StudentVUE", icon: "/assets/media/favicon/studentvue.ico" },
  "Quizlet Home": { name: "Flashcards, learning tools and textbook solutions | Quizlet", icon: "/assets/media/favicon/quizlet.webp" },
  "Google Forms Locked Mode": { name: "Start your quiz", icon: "/assets/media/favicon/googleforms.png" },
  DeltaMath: { name: "DeltaMath", icon: "/assets/media/favicon/deltamath.png" },
  Kami: { name: "Kami", icon: "/assets/media/favicon/kami.png" },
  "GoGuardian Admin Restricted": { name: "Restricted", icon: "/assets/media/favicon/goguardian-lock.png" },
  "GoGuardian Teacher Block": { name: "Uh oh!", icon: "/assets/media/favicon/goguardian.png" },
  "World History Encyclopedia": { name: "World History Encyclopedia", icon: "/assets/media/favicon/worldhistoryencyclopedia.png" },
  "Big Ideas Math Assignment Player": { name: "Assignment Player", icon: "/assets/media/favicon/bim.ico" },
  "Big Ideas Math": { name: "Big Ideas Math", icon: "/assets/media/favicon/bim.ico" },
};

function handleDropdownChange(selectElement) {
  const selectedValue = selectElement.value;
  const customRow = document.getElementById("custom-cloak-row");


  if (selectedValue === "custom") {
    store.set("selectedOption", "custom");
    customRow.style.display = "";
    applyCustomCloak();
    return;
  }

  const preset = cloakOptions[selectedValue];

  store.remove("CustomName");
  store.remove("CustomIcon");
  store.set("selectedOption", selectedValue);
  customRow.style.display = "none";

  if (preset) {
    store.set("name", preset.name);
    store.set("icon", preset.icon);
    document.getElementById("page-title").textContent = (window.laceTitle || (s => s))(preset.name);
    document.getElementById("tab-favicon").setAttribute("href", preset.icon);
  }

  if (window !== top) redirectToMainDomain();
}


function safeCloakIcon(raw) {
  try {
    const parsed = new URL(raw);
    return ["https:", "http:", "data:"].includes(parsed.protocol) ? parsed.href : null;
  } catch {
    return raw.includes(":") ? null : raw;
  }
}

function applyCustomCloak() {
  const nameVal = document.getElementById("custom-cloak-name").value.trim();
  const iconVal = document.getElementById("custom-cloak-icon").value.trim();

  if (nameVal) {
    store.set("CustomName", nameVal);
    document.getElementById("page-title").textContent = (window.laceTitle || (s => s))(nameVal);
  } else {
    store.remove("CustomName");
  }

  const safeIcon = iconVal ? safeCloakIcon(iconVal) : null;
  if (safeIcon) {
    store.set("CustomIcon", iconVal);
    document.getElementById("tab-favicon").setAttribute("href", safeIcon);
  } else if (!iconVal) {
    store.remove("CustomIcon");
  }
}

function redirectToMainDomain() {
  const target = window.location.origin + window.location.pathname;
  if (window !== top) {
    try {
      top.location.href = target;
    } catch {
      try {
        parent.location.href = target;
      } catch {
        window.location.href = target;
      }
    }
  } else {
    window.location.href = target;
  }
}

function themeChange(selectElement) {
  const value = selectElement.value;
  if (value === "d") {
    store.remove("theme");
  } else {
    store.set("theme", value);
  }
  window.location.reload();
}

function openAboutBlank() {
  let inFrame;
  try {
    inFrame = window !== top;
  } catch {
    inFrame = true;
  }

  if (inFrame) {
    alert("Please open the settings page directly (not inside a frame) to use the AB popup.");
    return;
  }
  if (navigator.userAgent.includes("Firefox")) {
    alert("AB cloak is not supported in Firefox.");
    return;
  }

  const popup = open("about:blank", "_blank");
  if (!popup || popup.closed) {
    alert("Window blocked. Please allow popups for this site.");
    return;
  }

  const name = store.get("name") || "My Drive - Google Drive";
  const icon = store.get("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";
  const panicLink = store.get("pLink") || getRandomURL();

  const doc = popup.document;
  const iframe = doc.createElement("iframe");
  const link = doc.createElement("link");
  const script = doc.createElement("script");

  doc.title = (window.laceTitle || (s => s))(name);
  link.rel = "icon";
  link.href = icon;

  iframe.src = location.href;
  const style = iframe.style;
  style.position = "fixed";
  style.top = style.bottom = style.left = style.right = 0;
  style.border = style.outline = "none";
  style.width = style.height = "100%";

  script.textContent = `
    window.onbeforeunload = function (event) {
      const message = 'Leave Site?';
      (event || window.event).returnValue = message;
      return message;
    };
  `;

  doc.head.appendChild(link);
  doc.head.appendChild(script);
  doc.body.appendChild(iframe);

  location.replace(panicLink);
}

function toggleAB() {
  const ab = store.get("ab");
  store.set("ab", ab === "true" ? "false" : "true");
}

function changeEngine(dropdown) {
  const engineUrls = {
    Brave: "https://search.brave.com/search?q=",
    Google: "https://www.google.com/search?q=",
    Bing: "https://www.bing.com/search?q=",
    Qwant: "https://www.qwant.com/?q=",
    Startpage: "https://www.startpage.com/search?q=",
    SearchEncrypt: "https://www.searchencrypt.com/search/?q=",
    Ecosia: "https://www.ecosia.org/search?q=",
  };
  const selected = dropdown.value;
  store.set("engine", engineUrls[selected]);
  store.set("enginename", selected);
}

function saveCustomEngine() {
  const customEngine = document.getElementById("engine-form").value.trim();
  if (customEngine) {
    store.set("engine", customEngine);
    store.set("enginename", "Custom");
  } else {
    alert("Please enter a custom search engine value.");
  }
}

function exportSaveData() {
  const cookies = Object.fromEntries(
    document.cookie
      .split("; ")
      .filter(Boolean)
      .map(c => c.split("=")),
  );
  const localStorageData = Object.fromEntries(
    Object.keys(localStorage)
      .filter(k => Object.hasOwn(localStorage, k))
      .map(k => [k, localStorage.getItem(k)]),
  );
  const blob = new Blob([JSON.stringify({ cookies, localStorage: localStorageData }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "save_data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importSaveData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = event => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.cookies) {
          Object.entries(data.cookies).forEach(([key, value]) => {
            // biome-ignore lint/suspicious/noDocumentCookie: legacy cookie restore; CookieStore API lacks broad enough support for this use case
            document.cookie = `${key}=${value}; path=/`;
          });
        }
        if (data.localStorage) {
          Object.entries(data.localStorage).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          store.reload();
          if (typeof window.resolveProxyChoice === "function") {
            window.resolveProxyChoice();
          }
        }
        alert("Your save data has been imported. Please test it out.");
        alert("If you find any issues then report it in GitHub or the Interstellar Discord.");
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function getRandomURL() {
  const urls = [
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
  return urls[Math.floor(Math.random() * urls.length)];
}
