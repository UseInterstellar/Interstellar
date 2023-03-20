 let inFrame

try {
    inFrame = window !== top
} catch (e) {
    inFrame = true
}

if (!inFrame && !navigator.userAgent.includes("Firefox")) {
const popup = open("about:blank", "_blank")
if (!popup || popup.closed) {
  alert("Popups are disabled!")
} else {
  const doc = popup.document
  const iframe = doc.createElement("iframe")
  const style = iframe.style
  var link = doc.createElement('link');
  
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = 'http://www.stackoverflow.com/favicon.ico';
  doc.title = "Google"

  iframe.src = location.href
  style.position = "fixed"
  style.top = style.bottom = style.left = style.right = 0
  style.border = style.outline = "none"
  style.width = style.height = "100%"

  doc.body.appendChild(iframe)
  location.replace("https://google.com")
    }
}