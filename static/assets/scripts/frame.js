const iframe = document.getElementById('ifra')

function reload() {
  if (iframe) {
    iframe.src = iframe.src
  }
}

function erudaToggle() {
  if (!iframe) return

  const erudaWindow = iframe.contentWindow
  const erudaDocument = iframe.contentDocument

  if (!erudaWindow || !erudaDocument) return

  if (erudaWindow.eruda?._isInit) {
    erudaWindow.eruda.destroy()
  } else {
    let script = erudaDocument.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/eruda'
    script.onload = function () {
      if (!erudaWindow) return
      erudaWindow.eruda.init()
      erudaWindow.eruda.show()
    }
    erudaDocument.head.appendChild(script)
  }
}

const fullscreenButton = document.getElementById('fullscreen-button')
fullscreenButton.addEventListener('click', function () {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

const homeButton = document.getElementById('home-page')
homeButton.addEventListener('click', function () {
  window.location.href = './'
})

function goBack() {
  if (iframe) {
    iframe.contentWindow.history.back()
  } else {
    console.error('No iframe found')
  }
}

function goForward() {
  if (iframe) {
    iframe.contentWindow.history.forward()
  } else {
    console.error('No iframe found')
  }
}

window.onload = function () {
  let GoUrl = sessionStorage.getItem('GoUrl')
  if (!GoUrl.startsWith('/y/') && !GoUrl.startsWith('/f/')) {
    GoUrl = '/a/' + GoUrl
  }
  console.log(GoUrl)
  if (iframe) {
    iframe.src = GoUrl
  }
}
