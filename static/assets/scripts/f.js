const iframe = document.getElementById("iframe-container")

if (navigator.userAgent.includes("Chrome")) {
  window.addEventListener("resize", function () {
    navigator.keyboard.lock(["Escape"])
  })
}

// Decode URL
function decodeXor(input) {
  if (!input) return input
  let [str, ...search] = input.split("?")

  return (
    decodeURIComponent(str)
      .split("")
      .map((char, ind) => (ind % 2 ? String.fromCharCode(char.charCodeAt(NaN) ^ 2) : char))
      .join("") + (search.length ? "?" + search.join("?") : "")
  )
}

// Button Variables
const iframeContainer = document.getElementById("iframe-container")
const iframes = Array.from(iframeContainer.querySelectorAll("iframe"))
const activeIframe = document.querySelector("#iframe-container iframe.active")

function Load() {
  const activeIframe = document.querySelector("#iframe-container iframe.active")
  if (activeIframe && document.readyState === "complete") {
    const website = activeIframe.contentWindow.document.location.href

    if (website.includes("/a/")) {
      const websitePath = website.replace(window.location.origin, "").replace("/a/", "")
      const decodedValue = decodeXor(websitePath)
      document.getElementById("is").value = decodedValue
      localStorage.setItem("decoded", decodedValue)
    } else if (website.includes("/a/q/")) {
      const websitePath = website.replace(window.location.origin, "").replace("/a/q/", "")
      const decodedValue = decodeXor(websitePath)
      document.getElementById("is").value = decodedValue
      localStorage.setItem("decoded", decodedValue)
    } else {
      const websitePath = website.replace(window.location.origin, "")
      document.getElementById("is").value = websitePath
      localStorage.setItem("decoded", websitePath)
    }
  }
}

function OnLoad() {
  if (window.loaded) {
    console.log("OnLoad() function already executed. Exiting.")
    return
  }
  window.loaded = true

  let GoUrl = sessionStorage.getItem("GoUrl")
  let dyValue = localStorage.getItem("dy")

  if (!GoUrl) {
    return
  }

  if (!GoUrl.startsWith("/e/")) {
    if (dyValue === "true" || dyValue === "auto") {
      GoUrl = "/a/q/" + GoUrl
    } else {
      GoUrl = "/a/" + GoUrl
    }
  } else {
  }
  console.log(GoUrl)

  const activeIframe = document.querySelector("#iframe-container iframe.active")
  if (!activeIframe) {
    return
  }

  activeIframe.removeAttribute("onload")

  activeIframe.contentWindow.document.location.href = GoUrl
  setTimeout(Load, 1500)
}

// Reload
function reload() {
  const activeIframe = document.querySelector("#iframe-container iframe.active")
  if (activeIframe) {
    activeIframe.src = activeIframe.src
    Load()
  } else {
    console.error("No active iframe found")
  }
}

// Popout
function popout() {
  const activeIframe = document.querySelector("#iframe-container iframe.active")

  if (activeIframe) {
    const newWindow = window.open("about:blank", "_blank")

    if (newWindow) {
      const name = localStorage.getItem("name") || "My Drive - Google Drive"
      const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"

      newWindow.document.title = name

      const link = newWindow.document.createElement("link")
      link.rel = "icon"
      link.href = encodeURI(icon)
      newWindow.document.head.appendChild(link)

      const newIframe = newWindow.document.createElement("iframe")
      const style = newIframe.style
      style.position = "fixed"
      style.top = style.bottom = style.left = style.right = 0
      style.border = style.outline = "none"
      style.width = style.height = "100%"

      newIframe.src = activeIframe.src

      newWindow.document.body.appendChild(newIframe)
    }
  } else {
    console.error("No active iframe found")
  }
}

function erudaToggle() {
  const activeIframe = document.querySelector("#iframe-container iframe.active")
  if (!activeIframe) {
    console.error("No active iframe found")
    return
  }

  const erudaWindow = activeIframe.contentWindow
  if (!erudaWindow) {
    console.error("No content window found for the active iframe")
    return
  }

  if (erudaWindow.eruda) {
    if (erudaWindow.eruda._isInit) {
      erudaWindow.eruda.destroy()
    } else {
      console.error("Eruda is not initialized in the active iframe")
    }
  } else {
    const erudaDocument = activeIframe.contentDocument
    if (!erudaDocument) {
      console.error("No content document found for the active iframe")
      return
    }

    const script = erudaDocument.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/eruda"
    script.onload = function () {
      if (!erudaWindow.eruda) {
        console.error("Failed to load Eruda in the active iframe")
        return
      }
      erudaWindow.eruda.init()
      erudaWindow.eruda.show()
    }
    erudaDocument.head.appendChild(script)
  }
}

// Fullscreen
function FS() {
  const activeIframe = document.querySelector("#iframe-container iframe.active")
  if (activeIframe) {
    if (!activeIframe.contentDocument.fullscreenElement) {
      activeIframe.contentDocument.documentElement.requestFullscreen()
    } else {
      activeIframe.contentDocument.exitFullscreen()
    }
  } else {
    console.error("No active iframe found")
  }
}

const fullscreenButton = document.getElementById("fullscreen-button")
fullscreenButton.addEventListener("click", FS)

// Home
function Home() {
  window.location.href = "./"
}

const homeButton = document.getElementById("home-page")
homeButton.addEventListener("click", Home)

// Back
function goBack() {
  const activeIframe = document.querySelector("#iframe-container iframe.active")
  if (activeIframe) {
    activeIframe.contentWindow.history.back()
    iframe.src = activeIframe.src
    Load()
  } else {
    console.error("No active iframe found")
  }
}

// Forward
function goForward() {
  const activeIframe = document.querySelector("#iframe-container iframe.active")
  if (activeIframe) {
    activeIframe.contentWindow.history.forward()
    iframe.src = activeIframe.src
    Load()
  } else {
    console.error("No active iframe found")
  }
}

// Remove Nav
document.addEventListener("fullscreenchange", function () {
  const isFullscreen = Boolean(document.fullscreenElement)
  document.body.classList.toggle("fullscreen", isFullscreen)
})

document.addEventListener("DOMContentLoaded", function () {
  var navIcon = document.getElementById("nav-icon1")
  var navBar = document.getElementById("right-side-nav")
  var iframe = document.querySelector("iframe")

  navIcon.addEventListener("click", function () {
    var isOpen = navBar.classList.toggle("hidden")
    this.classList.toggle("open")
    iframe.style.top = isOpen ? "5%" : "13%"
  })
})
