window.addEventListener("load", () => {
  navigator.serviceWorker.register("../sw.js?v=22", {
    scope: "/a/",
  })
})

if (document.getElementById("add-tab")) {
  window.addEventListener("load", () => {
    const form = document.getElementById("fs")
    const input = document.getElementById("is")

    if (form && input) {
      form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const formValue = input.value.trim()
        const url = isUrl(formValue) ? prependHttps(formValue) : "https://www.google.com/search?q=" + formValue
        processUrl(url)
      })
    }

    function processUrl(url) {
      sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url))
      const iframeContainer = document.getElementById("iframe-container")
      const activeIframe = Array.from(iframeContainer.querySelectorAll("iframe")).find((iframe) =>
        iframe.classList.contains("active")
      )

      activeIframe.src = "/a/" + __uv$config.encodeUrl(url)
      activeIframe.dataset.tabUrl = url
      input.value = url
      console.log(activeIframe.dataset.tabUrl)
    }

    function isUrl(val = "") {
      if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
        return true
      }
      return false
    }

    function prependHttps(url) {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "https://" + url
      }
      return url
    }
  })
} else {
  const form = document.getElementById("fs")
  const input = document.getElementById("is")

  if (form && input) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault()
      processUrl(input.value, "/ta")
    })
  }

  function processUrl(value, path) {
    let url = value.trim()
    const engine = localStorage.getItem("engine")
    const searchUrl = engine ? engine : "https://www.google.com/search?q="

    if (!isUrl(url)) {
      url = searchUrl + url
    } else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      url = "https://" + url
    }

    sessionStorage.setItem("GoUrl", __uv$config.encodeUrl(url))
    const dy = localStorage.getItem("dy")

    if (dy === "true") {
      window.location.href = "/a/q/" + __uv$config.encodeUrl(url)
    } else {
      if (path) {
        location.href = path
      } else {
        window.location.href = "/a/" + __uv$config.encodeUrl(url)
      }
    }
  }

  function go(value) {
    processUrl(value, "/ta")
  }

  function blank(value) {
    processUrl(value)
  }

  function dy(value) {
    processUrl(value, "/a/q/" + __uv$config.encodeUrl(value))
  }

  function isUrl(val = "") {
    if (/^http(s?):\/\//.test(val) || (val.includes(".") && val.substr(0, 1) !== " ")) {
      return true
    }
    return false
  }
}
