// Ads
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("ad") === null || localStorage.getItem("ad") === "default") {
    localStorage.setItem("ad", "on")
  }

  var advDiv = document.getElementById("adv")
  if (advDiv && localStorage.getItem("ad") === "on") {
    var script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "//oysterscoldtiny.com/1c/c3/8a/1cc38a6899fdf8ba4dfe779bcc54627b.js"
    advDiv.appendChild(script)
    console.log("Script inserted inside the adv div.")
  } else if (advDiv && localStorage.getItem("ad") === "off") {
    advDiv.remove()
    console.log("The adv div has been removed.")
  }
})
// Dynamic & Ads
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dy") === null || localStorage.getItem("ad") === "auto") {
    localStorage.setItem("dy", "false")
  }
})
// Clear Cache
function Clear() {
  document.cookie.split("; ").forEach(function (cookie) {
    var cookieName = cookie.split("=")[0]
    document.cookie = cookieName + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
  })

  localStorage.clear()
  sessionStorage.clear()

  if (caches && caches.keys) {
    caches
      .keys()
      .then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            return caches.delete(cacheName)
          })
        )
      })
      .then(function () {
        console.log("Cache storage cleared successfully.")
      })
      .catch(function (error) {
        console.error("Failed to clear cache storage:", error)
      })
  }
}

if (localStorage.getItem("cache") !== "true") {
  Clear()
  localStorage.setItem("cache", "true")
}

document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("dy") === null || localStorage.getItem("ad") === "auto") {
    localStorage.setItem("dy", "false")
  }
})

// Nav
var nav = document.querySelector(".fixed-nav-bar")

if (nav) {
  var html = `
    <div class="fixed-nav-bar-container">
      <a class="icon" href="/./"><img alt="nav" id="INImg" src="/assets/media/favicon/main.png"/></a>
    </div>
    <div class="fixed-nav-bar-right">
      <a class="navbar-link" href="/./gm"><i class="fa-solid fa-gamepad navbar-icon"></i><an>Ga</an><an>mes</an></a>
      <a class="navbar-link" href="/./as"><i class="fa-solid fa-phone navbar-icon"></i><an>Ap</an><an>ps</an></a>
      <a class="navbar-link" href="/./ta"><i class="fa-solid fa-laptop navbar-icon"></i><an>Ta</an><an>bs</an></a>
      <a class="navbar-link" href="/./st"><i class="fa-solid fa-gear navbar-icon settings-icon"></i><an>Set</an><an>tings</an></a>
    </div>`
  nav.innerHTML = html
}

// Themes
var themeid = localStorage.getItem("theme")
themeEle = document.createElement("link")
themeEle.rel = "stylesheet"
if (themeid == "catppuccinMocha") {
  themeEle.href = "/assets/styles/themes/catppuccin/mocha.css?v=1"
}
if (themeid == "catppuccinMacchiato") {
  themeEle.href = "/assets/styles/themes/catppuccin/macchiato.css?v=1"
}
if (themeid == "catppuccinFrappe") {
  themeEle.href = "/assets/styles/themes/catppuccin/frappe.css?v=1"
}
if (themeid == "catppuccinLatte") {
  themeEle.href = "/assets/styles/themes/catppuccin/latte.css?v=1"
}
document.body.appendChild(themeEle)
// Tab Cloaker
document.addEventListener("DOMContentLoaded", function (event) {
  const icon = document.getElementById("tab-favicon")
  const name = document.getElementById("tab-title")
  const selectedValue = localStorage.getItem("selectedOption")

  function setCloak(nameValue, iconUrl) {
    // Check for custom values in local storage
    const customName = localStorage.getItem("CustomName")
    const customIcon = localStorage.getItem("CustomIcon")

    // If custom values exist, use them. Otherwise, use the provided values.
    if (customName) {
      nameValue = customName
    }
    if (customIcon) {
      iconUrl = customIcon
    }

    if (iconUrl) {
      icon.setAttribute("href", iconUrl)
      localStorage.setItem("icon", iconUrl)
    }
    if (nameValue) {
      name.textContent = nameValue
      localStorage.setItem("name", nameValue)
    }
  }

  const options = {
    Google: { name: "Google", icon: "/assets/media/favicon/google.png" },
    Drive: { name: "My Drive - Google Drive", icon: "/assets/media/favicon/drive.png" },
    Classroom: { name: "Home", icon: "/assets/media/favicon/classroom.png" },
    Schoology: { name: "Home | Schoology", icon: "/assets/media/favicon/schoology.png" },
    Gmail: { name: "Gmail", icon: "/assets/media/favicon/gmail.png" },
    Clever: { name: "Clever | Portal", icon: "/assets/media/favicon/clever.png" },
    Khan: { name: "Dashboard | Khan Academy", icon: "/assets/media/favicon/khan.png" },
    Campus: { name: "Infinite Campus", icon: "/assets/media/favicon/campus.png" },
    IXL: { name: "IXL | Dashboard", icon: "/assets/media/favicon/ixl.png" },
    Canvas: { name: "Dashboard", icon: "/assets/media/favicon/canvas.png" },
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
    "NoRedInk Home": { name: "Student Home | NoRedInk", icon: "/assets/media/favicon/noredink.webp" },
    "Newsela Binder": { name: "Newsela | Binder", icon: "/assets/media/favicon/newsela.png" },
    "Newsela Assignments": { name: "Newsela | Assignments", icon: "/assets/media/favicon/newsela.png" },
    "Newsela Home": { name: "Newsela | Instructional Content Platform", icon: "/assets/media/favicon/newsela.png" },
    "PowerSchool Sign In": { name: "Student and Parent Sign In", icon: "/assets/media/favicon/powerschool.png" },
    "PowerSchool Grades and Attendance": {
      name: "Grades and Attendance",
      icon: "/assets/media/favicon/powerschool.png",
    },
    "PowerSchool Teacher Comments": { name: "Teacher Comments", icon: "/assets/media/favicon/powerschool.png" },
    "PowerSchool Standards Grades": { name: "Standards Grades", icon: "/assets/media/favicon/powerschool.png" },
    "PowerSchool Attendance": { name: "Attendance", icon: "/assets/media/favicon/powerschool.png" },
    Nearpod: { name: "Nearpod", icon: "/assets/media/favicon/nearpod.png" },
    StudentVUE: { name: "StudentVUE", icon: "/assets/media/favicon/studentvue.ico" },
    "Quizlet Home": {
      name: "Flashcards, learning tools and textbook solutions | Quizlet",
      icon: "/assets/media/favicon/quizlet.webp",
    },
    "Google Forms Locked Mode": { name: "Start your quiz", icon: "/assets/media/favicon/googleforms.png" },
    DeltaMath: { name: "DeltaMath", icon: "/assets/media/favicon/deltamath.png" },
    Kami: { name: "Kami", icon: "/assets/media/favicon/kami.png" },
    "GoGuardian Admin Restricted": { name: "Restricted", icon: "/assets/media/favicon/goguardian-lock.png" },
    "GoGuardian Teacher Block": { name: "Uh oh!", icon: "/assets/media/favicon/goguardian.png" },
    "World History Encyclopedia": {
      name: "World History Encyclopedia",
      icon: "/assets/media/favicon/worldhistoryencyclopedia.png",
    },
    "Big Ideas Math Assignment Player": { name: "Assignment Player", icon: "/assets/media/favicon/bim.ico" },
    "Big Ideas Math": { name: "Big Ideas Math", icon: "/assets/media/favicon/bim.ico" },
  }

  if (options[selectedValue]) {
    setCloak(options[selectedValue].name, options[selectedValue].icon)
  }
})
// Key
document.addEventListener("DOMContentLoaded", function () {
  const eventKey = JSON.parse(localStorage.getItem("eventKey")) || ["Ctrl", "E"]
  const pLink = localStorage.getItem("pLink") || "https://classroom.google.com/"
  let pressedKeys = []

  document.addEventListener("keydown", function (event) {
    pressedKeys.push(event.key)
    if (pressedKeys.length > eventKey.length) {
      pressedKeys.shift()
    }
    if (eventKey.every((key, index) => key === pressedKeys[index])) {
      window.location.href = pLink
      pressedKeys = []
    }
  })
})
// Background Image
document.addEventListener("DOMContentLoaded", function () {
  var savedBackgroundImage = localStorage.getItem("backgroundImage")
  if (savedBackgroundImage) {
    document.body.style.backgroundImage = "url('" + savedBackgroundImage + "')"
  }
})
