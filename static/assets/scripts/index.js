const form = document.getElementById('fs')
const input = document.getElementById('is')

if (form && input) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault()
    processUrl(input.value, '/&')
  })
}

function registerServiceWorker() {
  return window.navigator.serviceWorker.register('./sw.js', {
    scope: __uv$config.prefix,
  })
}

function processUrl(value, path) {
  registerServiceWorker().then(() => {
    let url = value.trim()
    if (!isUrl(url)) url = 'https://www.google.com/search?q=' + url
    else if (!(url.startsWith('https://') || url.startsWith('http://'))) url = 'https://' + url

    sessionStorage.setItem('GoUrl', __uv$config.encodeUrl(url))

    if (path) {
      location.href = path
    } else {
      window.location.href = __uv$config.prefix + __uv$config.encodeUrl(url)
    }
  })
}

function go(value) {
  processUrl(value, '/&')
}

function now(value) {
  processUrl(value, '/e')
}

function blank(value) {
  processUrl(value)
}

function isUrl(val = '') {
  if (/^http(s?):\/\//.test(val) || (val.includes('.') && val.substr(0, 1) !== ' ')) return true
  return false
}
