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
  if (wispInput) {
    wispInput.value = store.get("wisp-url") || "";
    wispInput.addEventListener("keydown", event => {
      if (event.key !== "Enter") return;
      event.preventDefault();
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

  const backgroundOptions = Object.entries(window.BACKGROUND_LIBRARY).map(([key, option]) => ({ key, ...option }));
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
    const url = mode === "custom" ? bgInput.value.trim() : mode === "all" ? backgroundUrlFor(store.get("backgroundKey")) : "";
    bgCustomRow.style.display = bgCustomRow.dataset.open === "true" ? "" : "none";
    if (url) {
      document.body.dataset.customBackground = "true";
      document.body.style.setProperty("--custom-background-image", `url('${url}')`);
    } else {
      delete document.body.dataset.customBackground;
      document.body.style.removeProperty("--custom-background-image");
    }
    for (const option of bgGallery.querySelectorAll(".bg-option")) {
      option.classList.toggle("active", mode === "all" && option.dataset.key === store.get("backgroundKey"));
    }
  }

  function renderBackgroundOptions() {
    const nextCount = Math.min(renderedBackgroundCount + initialBackgroundCount, backgroundOptions.length);
    for (const option of backgroundOptions.slice(renderedBackgroundCount, nextCount)) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "bg-option";
      button.dataset.key = option.key;
      button.setAttribute("aria-label", "Use " + option.label + " background");

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
        if (store.get("backgroundImageMode") === "all" && store.get("backgroundKey") === option.key) {
          store.remove("backgroundKey");
          store.set("backgroundImageMode", "none");
        } else {
          store.set("backgroundKey", option.key);
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
    store.remove("backgroundKey");
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
  const shimmerPatterns = ["grid", "wiggle", "wiggle-grid", "starfield", "twist", "displace", "shimmer", "organic", "shimmer-aurora", "morph", "meteors"];
  const savedParticleMode = savedParticles;
  const particlesCustomToggle = document.getElementById("particles-custom-toggle");
  const particlesCustomPanel = document.getElementById("particles-custom-panel");
  const particlesCustomFields = document.getElementById("particles-custom-fields");
  const particleControlSets = {
    grid: [
      ["gap", "Gap", 4, 80, 1, 32],
      ["size", "Size", 0.5, 8, 0.1, 3.5],
      ["speed", "Speed", 0, 100, 1, 49],
      ["opacity", "Opacity", 0, 1, 0.05, 1],
    ],
    wiggle: [
      ["count", "Count", 50, 800, 1, 400],
      ["sizeRange", "Size range", 0.1, 4, 0.1, 0.85],
      ["speed", "Speed", 0.05, 3, 0.05, 0.6],
      ["twinkle", "Twinkle", 0.1, 8, 0.1, 3.45],
      ["drift", "Drift", 0, 60, 1, 28],
      ["opacity", "Opacity", 0, 1, 0.05, 1],
    ],
    starfield: [
      ["count", "Count", 50, 800, 1, 300],
      ["seed", "Seed", 0, 99999, 1, 12345],
      ["size", "Size", 0.1, 4, 0.1, 1],
      ["duration", "Duration", 100, 10000, 50, 4200],
      ["faded", "Faded", 0, 1, 0.05, 0.03],
      ["opacity", "Opacity", 0, 1, 0.05, 1],
    ],
    twist: [
      ["gap", "Gap", 4, 50, 1, 13],
      ["size", "Size", 0.2, 5, 0.1, 1.5],
      ["peak", "Peak", 0, 2, 0.05, 1],
      ["zoom", "Zoom", 1, 120, 1, 60],
      ["twist", "Twist", 0.25, 5, 0.05, 1.5],
      ["arms", "Arms", 1, 8, 1, 2],
      ["spin", "Spin", 0, 2, 0.05, 0.42],
      ["drift", "Drift", 0, 500, 5, 270],
      ["width", "Width", 0.5, 12, 0.5, 6],
      ["floor", "Floor", 0, 1, 0.05, 0],
      ["opacity", "Opacity", 0, 1, 0.05, 1],
    ],
    displace: [
      ["count", "Count", 50, 600, 1, 260],
      ["emission", "Emission", 1, 60, 1, 20],
      ["size", "Size", 0.1, 8, 0.1, 3.3],
      ["speed", "Speed", 1, 120, 1, 50],
      ["lifetime", "Lifetime", 1, 30, 0.5, 11],
      ["drift", "Drift", 0, 40, 1, 10],
      ["forceRadius", "Force radius", 20, 300, 5, 120],
      ["force", "Force", 0, 1000, 10, 470],
      ["friction", "Friction", 0.5, 0.99, 0.01, 0.92],
      ["opacity", "Opacity", 0, 1, 0.05, 1],
    ],
    shimmer: [
      ["spacing", "Spacing", 4, 60, 1, 22],
      ["size", "Size", 0.5, 8, 0.1, 3.5],
      ["speed", "Speed", 0, 6, 0.05, 2.6],
      ["waveX", "Wave X", 0, 1, 0.01, 0.25],
      ["waveY", "Wave Y", 0, 1, 0.01, 0.21],
      ["base", "Base", 0, 1, 0.01, 0.2],
      ["intensity", "Intensity", 0, 6, 0.05, 3.4],
      ["opacity", "Opacity", 0, 1, 0.05, 1],
    ],
    organic: null,
    "shimmer-aurora": null,
    morph: null,
    meteors: [
      ["count", "Count", 1, 12, 1, 3],
      ["angle", "Angle", -180, 180, 1, 20],
      ["speed", "Speed", 50, 1200, 10, 500],
      ["lifespan", "Lifespan", 0.05, 1, 0.05, 0.7],
      ["fadeSpeed", "Fade out speed", 0.02, 1, 0.02, 0.2],
      ["length", "Length", 20, 500, 5, 240],
      ["width", "Width", 0.5, 8, 0.5, 2],
      ["delay", "Delay", 0, 20, 0.5, 5],
    ],
  };
  const fieldControls = [
    ["speed", "Speed", 0, 3, 0.05, 1],
    ["brightness", "Brightness", 0, 2, 0.05, 1],
    ["dotSize", "Dot size", 0.1, 4, 0.05, 1],
    ["density", "Density", 0.25, 3, 0.05, 1],
    ["scale", "Scale", 0.25, 4, 0.05, 1],
    ["vignette", "Vignette", 0, 2, 0.05, 1],
    ["opacity", "Opacity", 0, 1, 0.05, 1],
  ];
  particleControlSets.organic = fieldControls;
  particleControlSets["shimmer-aurora"] = fieldControls;
  particleControlSets.morph = fieldControls;
  particlesDropdown.value = savedParticleMode === "false" ? "off" : ["smoke", ...shimmerPatterns].includes(savedParticleMode) ? savedParticleMode : "on";
  particlesDropdown.addEventListener("change", function () {
    const mode = this.value === "off" ? "false" : this.value;
    store.set("particles", mode);
    if (shimmerPatterns.includes(mode)) {
      store.set("shimmerPattern", mode);
      renderParticleControls(mode);
    } else {
      particlesCustomPanel.style.display = "none";
    }
  });
  function renderParticleControls(mode) {
    particlesCustomFields.replaceChildren();
    const controls = particleControlSets[mode];
    if (!controls) {
      particlesCustomPanel.style.display = "none";
      return;
    }
    for (const [key, label, min, max, step, fallback] of controls) {
      const id = `particle-${mode}-${key}`.replace(/[^a-z0-9-]/gi, "-");
      const storageKey = `particle_${mode}_${key}`;
      const rawValue = store.get(storageKey);
      const storedValue = Number(rawValue);
      const value = rawValue !== undefined && rawValue !== null && rawValue !== "" && Number.isFinite(storedValue) ? storedValue : fallback;
      const labelElement = document.createElement("label");
      labelElement.htmlFor = id;
      labelElement.textContent = label + " ";
      const output = document.createElement("output");
      output.id = `${id}-value`;
      output.textContent = value;
      labelElement.appendChild(output);
      const input = document.createElement("input");
      input.id = id;
      input.type = "range";
      input.min = min;
      input.max = max;
      input.step = step;
      input.value = value;
      input.addEventListener("input", () => {
        const nextValue = Number(input.value);
        output.textContent = input.value;
        store.set(storageKey, input.value);
        window.updateShimmeringDots?.({ [key]: nextValue });
      });
      particlesCustomFields.append(labelElement, input);
    }
    particlesCustomPanel.style.display = "";
  }
  const initialParticleMode = shimmerPatterns.includes(savedParticleMode) ? savedParticleMode : "grid";
  renderParticleControls(initialParticleMode);
  particlesCustomPanel.style.display = shimmerPatterns.includes(savedParticleMode) && store.get("shimmerControlsOpen") === "true" ? "" : "none";
  particlesCustomToggle.addEventListener("click", () => {
    const open = particlesCustomPanel.style.display !== "none";
    particlesCustomPanel.style.display = open ? "none" : "";
    store.set("shimmerControlsOpen", open ? "false" : "true");
  });

  const tabsLayoutDropdown = document.getElementById("tabs-layout-dropdown");
  tabsLayoutDropdown.value = store.get("tabsLayout") === "vertical" ? "vertical" : "horizontal";
  tabsLayoutDropdown.addEventListener("change", () => store.set("tabsLayout", tabsLayoutDropdown.value));

  const pointerTrailDropdown = document.getElementById("pointer-trail-dropdown");
  const pointerCustomDropdown = document.getElementById("pointer-custom-dropdown");
  const pointerIdleMotion = document.getElementById("pointer-idle-motion");
  const pointerClickEffectDropdown = document.getElementById("pointer-click-effect-dropdown");
  const legacyPointer = store.get("pointer");
  const trailPointers = [
    "rainbow-trail",
    "rainbow-stars",
    "white-orbs",
    "blue-orbs-trail",
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
  ];
  const customPointers = ["blue-orbs-cursor", "the-sims", "magnetic-cursor", "spring-cursor", "inverted-cursor", "spotlight-cursor", "spring-squash"];
  const savedTrail = store.get("pointerTrail");
  const savedCustom = store.get("pointerCustom");
  const trailValue = trailPointers.includes(savedTrail) ? savedTrail : savedCustom === "blue-orbs" ? "blue-orbs-trail" : trailPointers.includes(legacyPointer) ? legacyPointer : "default";
  const customValue = customPointers.includes(savedCustom) ? savedCustom : savedCustom === "blue-orbs" ? "blue-orbs-cursor" : customPointers.includes(legacyPointer) ? legacyPointer : "default";

  pointerTrailDropdown.value = trailValue;
  pointerCustomDropdown.value = customValue;
  pointerIdleMotion.checked = store.get("pointerIdleMotion") === "true";

  const clickEffectByPointer = {
    "rainbow-trail": "rainbow-trail",
    "white-orbs": "white-orbs",
    "blue-orbs-cursor": "blue-orbs-cursor",
    "the-sims": "the-sims",
    afterglow: "afterglow",
    "magnetic-trail": "magnetic-trail",
    "magnetic-cursor": "magnetic-cursor",
    "color-trail": "color-trail",
    "falling-stars": "falling-stars",
  };
  pointerClickEffectDropdown.value = store.get("pointerClickEffect") || clickEffectByPointer[customValue] || clickEffectByPointer[trailValue] || "none";

  function savePointerSetting(key, value) {
    if ((value === "default" || value === "false") && key !== "pointerClickEffect") {
      store.remove(key);
    } else {
      store.set(key, value);
    }
    store.remove("pointer");
    window.applyCursorEffects?.();
  }

  pointerTrailDropdown.addEventListener("change", function () {
    const effect = clickEffectByPointer[this.value] || clickEffectByPointer[store.get("pointerCustom")] || "none";
    store.set("pointerClickEffect", effect);
    savePointerSetting("pointerTrail", this.value);
  });
  pointerCustomDropdown.addEventListener("change", function () {
    const effect = clickEffectByPointer[this.value] || clickEffectByPointer[store.get("pointerTrail")] || "none";
    store.set("pointerClickEffect", effect);
    savePointerSetting("pointerCustom", this.value);
  });
  pointerIdleMotion.addEventListener("change", function () {
    savePointerSetting("pointerIdleMotion", this.checked ? "true" : "false");
  });
  pointerClickEffectDropdown.addEventListener("change", function () {
    savePointerSetting("pointerClickEffect", this.value);
  });

  document.getElementById("engine").addEventListener("change", function () {
    changeEngine(this);
  });
  const engineForm = document.getElementById("engine-form");
  engineForm.addEventListener("keydown", event => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    saveCustomEngine();
  });

  const savedEngineName = store.get("enginename");
  if (savedEngineName) document.getElementById("engine").value = savedEngineName;
  if (savedEngineName === "Custom") engineForm.value = store.get("engine") || "";
  document.getElementById("engine-custom-row").style.display = document.getElementById("engine").value === "Custom" ? "" : "none";
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

  if (window !== top && !isOwnShell()) redirectToMainDomain();
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

function isOwnShell() {
  try {
    return top.document.body?.dataset.shell === "true";
  } catch {
    return false;
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

  (window.top ?? window).location.replace(panicLink);
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
  document.getElementById("engine-custom-row").style.display = selected === "Custom" ? "" : "none";
  if (selected === "Custom") {
    store.set("enginename", "Custom");
    return;
  }
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
