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
  themeDropdown.value = store.get("theme") || "default";
  themeDropdown.addEventListener("change", function () {
    themeChange(this);
  });

  const bgDropdown = document.getElementById("background-dropdown");
  const gradientRow = document.getElementById("gradient-style-row");
  const gradientDropdown = document.getElementById("gradient-dropdown");
  const bgCustomRow = document.getElementById("background-custom-row");
  const bgInput = document.getElementById("background-input");
  const bgGallery = document.getElementById("background-gallery");
  const bgCustomToggle = document.getElementById("background-custom-toggle");
  const bgRemoveButton = document.getElementById("background-remove-button");
  const bgLoadMore = document.getElementById("background-load-more");
  const bgBlur = document.getElementById("background-blur");
  const bgBlurValue = document.getElementById("background-blur-value");

  const backgroundOptions = [
    { label: "V5 Wallpaper", url: "/assets/media/background/v5-wallpaper.png" },
    { label: "V5 Inverted", url: "/assets/media/background/v5-inverted.png" },
    { label: "Aesthetic", url: "/assets/media/background/minecraft-aesthetic.jpg" },
    { label: "Ancient City", url: "/assets/media/background/minecraft-ancient-city.png" },
    { label: "Bees", url: "/assets/media/background/minecraft-bees.png" },
    { label: "Birch with Rainbow", url: "/assets/media/background/minecraft-birch-with-rainbow.png" },
    { label: "Blue Night", url: "/assets/media/background/minecraft-blue-night.jpg" },
    { label: "Cathedral", url: "/assets/media/background/minecraft-cathedral.png" },
    { label: "Cave Flowers", url: "/assets/media/background/minecraft-cave-flowers.png" },
    { label: "Cave V2", url: "/assets/media/background/minecraft-cave-v2.png" },
    { label: "Cave", url: "/assets/media/background/minecraft-cave.png" },
    { label: "Cherry Blossom Sunrise", url: "/assets/media/background/minecraft-cherry-blossom-sunrise.jpeg" },
    { label: "Cherry with Sheep", url: "/assets/media/background/minecraft-cherry-with-sheep.png" },
    { label: "Dappled Forest", url: "/assets/media/background/minecraft-dappled-forest.jpg" },
    { label: "Desert Fog", url: "/assets/media/background/minecraft-desert-fog.jpeg" },
    { label: "Desert", url: "/assets/media/background/minecraft-desert.png" },
    { label: "Dock", url: "/assets/media/background/minecraft-dock.jpg" },
    { label: "The End", url: "/assets/media/background/minecraft-end.png" },
    { label: "Firefly Bush", url: "/assets/media/background/minecraft-firefly-bush.png" },
    { label: "Frozen Ocean", url: "/assets/media/background/minecraft-frozen-ocean.png" },
    { label: "Gloomy", url: "/assets/media/background/minecraft-gloomy.png" },
    { label: "Golden Hour", url: "/assets/media/background/minecraft-golden-hour.png" },
    { label: "House", url: "/assets/media/background/minecraft-house.jpeg" },
    { label: "Ice Spikes Sunset", url: "/assets/media/background/minecraft-ice-spikes-sunset.png" },
    { label: "Jungle", url: "/assets/media/background/minecraft-jungle.jpeg" },
    { label: "Lukewarm Ocean", url: "/assets/media/background/minecraft-lukewarm-ocean.png" },
    { label: "Lush Cave V2", url: "/assets/media/background/minecraft-lush-cave-v2.png" },
    { label: "Lush Cave V3", url: "/assets/media/background/minecraft-lush-cave-v3.png" },
    { label: "Lush Cave", url: "/assets/media/background/minecraft-lush-cave.jpg" },
    { label: "Mangrove Swamp", url: "/assets/media/background/minecraft-mangrove-swamp.png" },
    { label: "Nether Crimson Forest", url: "/assets/media/background/minecraft-nether-crimson-forest.png" },
    { label: "Nether Warped Forest", url: "/assets/media/background/minecraft-nether-warped-forest.png" },
    { label: "Night Desert Village", url: "/assets/media/background/minecraft-night-desert-village.jpeg" },
    { label: "Night Mountain", url: "/assets/media/background/minecraft-night-mountain.png" },
    { label: "Night Scary", url: "/assets/media/background/minecraft-night-scary.png" },
    { label: "Night", url: "/assets/media/background/minecraft-night.jpeg" },
    { label: "Pale Garden", url: "/assets/media/background/minecraft-pale-garden.jpeg" },
    { label: "Plains Lake", url: "/assets/media/background/minecraft-plains-lake.jpeg" },
    { label: "Plains", url: "/assets/media/background/minecraft-plains.jpg" },
    { label: "Rainy Plains", url: "/assets/media/background/minecraft-rainy-plains.jpeg" },
    { label: "Realistic", url: "/assets/media/background/minecraft-realistic.png" },
    { label: "Savannah Shores", url: "/assets/media/background/minecraft-savannah-shores.png" },
    { label: "Savannah", url: "/assets/media/background/minecraft-savannah.png" },
    { label: "Ships", url: "/assets/media/background/minecraft-ships.png" },
    { label: "Snowy Mountain Cloudy", url: "/assets/media/background/minecraft-snowy-mountain-cloudy.png" },
    { label: "Snowy Mountains", url: "/assets/media/background/minecraft-snowy-mountains.jpg" },
    { label: "Spruce Forest", url: "/assets/media/background/minecraft-spruce-forest.png" },
    { label: "Realistic Spruce", url: "/assets/media/background/minecraft-spruce-realistic.png" },
    { label: "Swamp Green Fog", url: "/assets/media/background/minecraft-swamp-green-fog.png" },
    { label: "Swamp Sunrise", url: "/assets/media/background/minecraft-swamp-sunrise.jpg" },
    { label: "Swamp Sunset", url: "/assets/media/background/minecraft-swamp-sunset.jpeg" },
    { label: "Swamp", url: "/assets/media/background/minecraft-swamp.jpeg" },
    { label: "Town V2", url: "/assets/media/background/minecraft-town-v2.png" },
    { label: "Town", url: "/assets/media/background/minecraft-town.png" },
    { label: "Underwater Foggy", url: "/assets/media/background/minecraft-underwater-foggy.jpeg" },
    { label: "Underwater V2", url: "/assets/media/background/minecraft-underwater-v2.png" },
    { label: "Underwater", url: "/assets/media/background/minecraft-underwater.jpeg" },
    { label: "Village", url: "/assets/media/background/minecraft-village.png" },
    { label: "Wheat Mountain", url: "/assets/media/background/minecraft-wheat-mountain.png" },
  ];
  const initialBackgroundCount = 15;
  let renderedBackgroundCount = 0;

  const savedBg = store.get("backgroundImage");
  const legacyCustom = store.get("backgroundMode") === "custom";
  const savedBgMode = legacyCustom ? "default" : store.get("backgroundMode") || "gradient";
  const storedImageMode = store.get("backgroundImageMode");
  const savedImageMode = legacyCustom || storedImageMode === "custom" ? "custom" : storedImageMode === "all" ? "all" : "none";
  const savedBlur = Math.max(0, Math.min(100, Number(store.get("backgroundBlur")) || 0));

  bgDropdown.value = savedBgMode;
  gradientDropdown.value = store.get("gradientStyle") || "multi";
  bgBlur.value = savedBlur;
  bgBlurValue.value = `${savedBlur}%`;
  bgBlurValue.textContent = `${savedBlur}%`;
  bgCustomRow.dataset.open = savedImageMode === "custom" ? "true" : "false";
  if (savedImageMode === "custom") bgInput.value = savedBg && savedBg !== "none" ? savedBg : "";

  function applyBackgroundImage() {
    const mode = store.get("backgroundImageMode");
    const url = mode === "custom" ? bgInput.value.trim() : mode === "all" ? store.get("backgroundImage") || "" : "";
    bgCustomRow.style.display = bgCustomRow.dataset.open === "true" ? "" : "none";
    if (url) {
      document.body.dataset.customBackground = "true";
      document.body.style.setProperty("--custom-background-image", `url('${url}')`);
    } else {
      delete document.body.dataset.customBackground;
      document.body.style.removeProperty("--custom-background-image");
    }
    for (const option of bgGallery.querySelectorAll(".bg-option")) {
      option.classList.toggle("active", mode === "all" && option.dataset.url === store.get("backgroundImage"));
    }
  }

  function renderBackgroundOptions() {
    const nextCount = Math.min(renderedBackgroundCount + initialBackgroundCount, backgroundOptions.length);
    for (const option of backgroundOptions.slice(renderedBackgroundCount, nextCount)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "bg-option";
      button.dataset.url = option.url;
      button.setAttribute("aria-label", `Use ${option.label} background`);

      const preview = document.createElement("img");
      preview.className = "bg-option-preview";
      preview.src = option.url;
      preview.loading = "lazy";
      preview.alt = "";

      const label = document.createElement("span");
      label.className = "bg-option-label";
      label.textContent = option.label;

      button.append(preview, label);
      button.addEventListener("click", () => {
        bgCustomRow.dataset.open = "false";
        if (store.get("backgroundImageMode") === "all" && store.get("backgroundImage") === option.url) {
          store.remove("backgroundImage");
          store.set("backgroundImageMode", "none");
        } else {
          store.set("backgroundImage", option.url);
          store.set("backgroundImageMode", "all");
        }
        applyBackgroundImage();
      });
      bgGallery.appendChild(button);
    }
    renderedBackgroundCount = nextCount;
    bgLoadMore.style.display = renderedBackgroundCount < backgroundOptions.length ? "" : "none";
  }

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

  bgDropdown.addEventListener("change", () => {
    store.set("backgroundMode", bgDropdown.value);
    applyBackground();
  });

  gradientDropdown.addEventListener("change", () => {
    store.set("gradientStyle", gradientDropdown.value);
    applyBackground();
  });

  bgCustomToggle.addEventListener("click", () => {
    const open = bgCustomRow.dataset.open === "true";
    bgCustomRow.dataset.open = open ? "false" : "true";
    bgCustomRow.style.display = open ? "none" : "";
    if (!open) bgInput.focus();
  });

  bgRemoveButton.addEventListener("click", () => {
    bgCustomRow.dataset.open = "false";
    store.remove("backgroundImage");
    store.set("backgroundImageMode", "none");
    bgInput.value = "";
    applyBackgroundImage();
  });

  bgBlur.addEventListener("input", () => {
    store.set("backgroundBlur", bgBlur.value);
    bgBlurValue.value = `${bgBlur.value}%`;
    bgBlurValue.textContent = `${bgBlur.value}%`;
    document.body.style.setProperty("--background-blur", bgBlur.value);
  });

  document.getElementById("save-button").addEventListener("click", () => {
    const url = bgInput.value.trim();
    if (!url) return;
    store.set("backgroundImage", url);
    store.set("backgroundImageMode", "custom");
    bgCustomRow.dataset.open = "false";
    applyBackgroundImage();
  });

  bgLoadMore.addEventListener("click", renderBackgroundOptions);
  renderBackgroundOptions();
  document.body.style.setProperty("--background-blur", savedBlur);
  applyBackground();
  applyBackgroundImage();

  const particlesDropdown = document.getElementById("particles-dropdown");
  const savedParticles = store.get("particles");
  particlesDropdown.value = savedParticles === "false" ? "off" : savedParticles === "smoke" ? "smoke" : "on";
  particlesDropdown.addEventListener("change", function () {
    store.set("particles", this.value === "off" ? "false" : this.value);
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
  if (value === "default") {
    store.remove("theme");
  } else {
    store.set("theme", value);
  }
  window.applyTheme?.(value);
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
