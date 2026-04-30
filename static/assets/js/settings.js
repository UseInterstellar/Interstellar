document.addEventListener("DOMContentLoaded", () => {

  const adTypeElement = document.getElementById("adType");
  if (adTypeElement) {
    adTypeElement.addEventListener("change", function () {
      localStorage.setItem("ads", this.value === "default" ? "on" : this.value);
    });
    const storedAd = localStorage.getItem("ads");
    adTypeElement.value = storedAd === "popups" || storedAd === "off" ? storedAd : "default";
  }

  const pChangeElement = document.getElementById("pChange");
  if (pChangeElement) {
    pChangeElement.addEventListener("change", function () {
      localStorage.setItem("pchoice", this.value);
    });
    pChangeElement.value = localStorage.getItem("pchoice") || "sj";
  }


  const eventKeyInput = document.getElementById("eventKeyInput");
  const linkInput = document.getElementById("linkInput");

  let eventKey = JSON.parse(localStorage.getItem("eventKey")) || ["Ctrl", "E"];
  let eventKeyRaw = localStorage.getItem("eventKeyRaw") || "Ctrl,E";
  let pLink = localStorage.getItem("pLink") || "https://classroom.google.com/";

  eventKeyInput.value = eventKeyRaw;
  linkInput.value = pLink;

  eventKeyInput.addEventListener("input", () => {
    eventKey = eventKeyInput.value.split(",");
  });
  linkInput.addEventListener("input", () => {
    pLink = linkInput.value;
  });

  const cloakDropdown = document.getElementById("cloak-dropdown");

  const sortedOptions = Array.from(cloakDropdown.getElementsByTagName("option"))
    .sort((a, b) => a.textContent.localeCompare(b.textContent));
  while (cloakDropdown.firstChild) cloakDropdown.removeChild(cloakDropdown.firstChild);
  for (const option of sortedOptions) cloakDropdown.appendChild(option);

  cloakDropdown.value = localStorage.getItem("selectedOption") || "Classroom";
  cloakDropdown.addEventListener("change", () => handleDropdownChange(cloakDropdown));

  document.getElementById("cloak-save-btn").addEventListener("click", () => {
    saveCustomCloak();
    redirectToMainDomain();
  });
  document.getElementById("cloak-reset-btn").addEventListener("click", () => {
    resetCustomCloak();
    redirectToMainDomain();
  });

  document.getElementById("custom-cloak-name").value = localStorage.getItem("CustomName") || "";
  document.getElementById("custom-cloak-icon").value = localStorage.getItem("CustomIcon") || "";

  if (localStorage.getItem("ab") === "true") {
    document.getElementById("ab-settings-switch").checked = true;
  }

  document.getElementById("save-button").addEventListener("click", () => {
    const imageURL = document.getElementById("background-input").value.trim();
    if (imageURL) {
      localStorage.setItem("backgroundImage", imageURL);
      document.body.style.backgroundImage = `url('${imageURL}')`;
      document.getElementById("background-input").value = "";
    }
  });

  document.getElementById("reset-button").addEventListener("click", () => {
    localStorage.removeItem("backgroundImage");
    document.body.style.backgroundImage = "";
    window.location.reload();
  });

  document.getElementById("engine").addEventListener("change", function () {
    changeEngine(this);
  });
  document.getElementById("engine-save-btn").addEventListener("click", saveCustomEngine);

  const savedEngineName = localStorage.getItem("enginename");
  if (savedEngineName) document.getElementById("engine").value = savedEngineName;

  const particlesSwitch = document.getElementById("2");
  particlesSwitch.checked = localStorage.getItem("particles") === "true";
  particlesSwitch.addEventListener("change", event => {
    localStorage.setItem("particles", event.currentTarget.checked ? "true" : "false");
  });

  const themeDropdown = document.getElementById("theme-dropdown");
  themeDropdown.addEventListener("change", function () {
    themeChange(this);
  });

});

function saveEventKey() {
  const eventKeyInput = document.getElementById("eventKeyInput");
  const linkInput = document.getElementById("linkInput");
  const eventKey = eventKeyInput.value.split(",");
  const eventKeyRaw = eventKeyInput.value;
  const pLink = linkInput.value;
  localStorage.setItem("eventKey", JSON.stringify(eventKey));
  localStorage.setItem("eventKeyRaw", eventKeyRaw);
  localStorage.setItem("pLink", pLink);
  // biome-ignore lint: idk
  window.location = window.location;
}


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
  Classroom: { name: "Home", icon: "/assets/media/favicon/classroom.png" },
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
  const preset = cloakOptions[selectedValue];

  localStorage.removeItem("CustomName");
  localStorage.removeItem("CustomIcon");
  localStorage.setItem("selectedOption", selectedValue);

  if (preset) {
    localStorage.setItem("name", preset.name);
    localStorage.setItem("icon", preset.icon);
    document.getElementById("t").textContent = preset.name;
    document.getElementById("tab-favicon").setAttribute("href", preset.icon);
  }

  redirectToMainDomain();
}

function saveCustomCloak() {
  const nameVal = document.getElementById("custom-cloak-name").value.trim();
  const iconVal = document.getElementById("custom-cloak-icon").value.trim();
  if (nameVal) {
    localStorage.setItem("CustomName", nameVal);
    localStorage.setItem("name", nameVal);
  }
  if (iconVal) {
    localStorage.setItem("CustomIcon", iconVal);
    localStorage.setItem("icon", iconVal);
  }
}

function resetCustomCloak() {
  localStorage.removeItem("CustomName");
  localStorage.removeItem("CustomIcon");
  document.getElementById("custom-cloak-name").value = "";
  document.getElementById("custom-cloak-icon").value = "";
}

function redirectToMainDomain() {
  const target = window.location.origin + window.location.pathname;
  if (window !== top) {
    try { top.location.href = target; }
    catch { try { parent.location.href = target; } catch { window.location.href = target; } }
  } else {
    window.location.href = target;
  }
}

const themeMap = {
  catppuccinMocha: "/assets/css/themes/catppuccin/mocha.css",
  catppuccinMacchiato: "/assets/css/themes/catppuccin/macchiato.css",
  catppuccinFrappe: "/assets/css/themes/catppuccin/frappe.css",
  catppuccinLatte: "/assets/css/themes/catppuccin/latte.css",
  Inverted: "/assets/css/themes/colors/inverted.css",
  sky: "/assets/css/themes/colors/sky.css",
};

function themeChange(selectElement) {
  const value = selectElement.value;
  if (value === "d") {
    localStorage.removeItem("theme");
  } else {
    localStorage.setItem("theme", value);
  }
  window.location.reload();
}

function AB() {
  let inFrame;
  try { inFrame = window !== top; }
  catch { inFrame = true; }

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

  const name = localStorage.getItem("name") || "My Drive - Google Drive";
  const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";
  const panicLink = localStorage.getItem("pLink") || getRandomURL();

  const doc = popup.document;
  const iframe = doc.createElement("iframe");
  const link = doc.createElement("link");
  const script = doc.createElement("script");

  doc.title = name;
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
  const ab = localStorage.getItem("ab");
  localStorage.setItem("ab", ab === "true" ? "false" : "true");
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
  localStorage.setItem("engine", engineUrls[selected]);
  localStorage.setItem("enginename", selected);
}

function saveCustomEngine() {
  const customEngine = document.getElementById("engine-form").value.trim();
  if (customEngine) {
    localStorage.setItem("engine", customEngine);
    localStorage.setItem("enginename", "Custom");
  } else {
    alert("Please enter a custom search engine value.");
  }
}

function exportSaveData() {
  const cookies = Object.fromEntries(
    document.cookie.split("; ").filter(Boolean).map(c => c.split("="))
  );
  const localStorageData = Object.fromEntries(
    Object.keys(localStorage)
      .filter(k => Object.hasOwn(localStorage, k))
      .map(k => [k, localStorage.getItem(k)])
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
            document.cookie = `${key}=${value}; path=/`;
          });
        }
        if (data.localStorage) {
          Object.entries(data.localStorage).forEach(([key, value]) => {
            localStorage.setItem(key, value);
          });
          if (typeof window.resolveProxyPchoice === "function") {
            window.resolveProxyPchoice();
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
    "https://kahoot.it", "https://classroom.google.com", "https://drive.google.com",
    "https://google.com", "https://docs.google.com", "https://slides.google.com",
    "https://www.nasa.gov", "https://blooket.com", "https://clever.com",
    "https://edpuzzle.com", "https://khanacademy.org", "https://wikipedia.org",
    "https://dictionary.com",
  ];
  return urls[Math.floor(Math.random() * urls.length)];
}