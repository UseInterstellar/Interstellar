let inFrame = false;
let windowOpened = false;

try {
  inFrame = window !== window.top;
} catch (e) {
  inFrame = true;
}

if (!inFrame && !navigator.userAgent.includes("Firefox") && !windowOpened) {
  const name = localStorage.getItem("name") || "My Drive - Google Drive";
  const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_32dp.png";

  const newWindow = window.open(location.href, "_blank");

  if (!newWindow) {
    alert("Allow popups and redirects to hide this from showing up in your history.");
  } else {
    const doc = newWindow.document;
    const iframe = doc.createElement("iframe");
    const style = iframe.style;
    const link = doc.createElement("link");

    doc.title = name;
    link.rel = "icon";
    link.href = icon;

    iframe.src = location.href;
    style.position = "fixed";
    style.top = style.bottom = style.left = style.right = 0;
    style.border = style.outline = "none";
    style.width = style.height = "100%";

    doc.head.appendChild(link);
    doc.body.appendChild(iframe);

    windowOpened = true;
  }
}
