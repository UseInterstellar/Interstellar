let inFrame;

try {
  inFrame = window !== top;
} catch (e) {
  inFrame = true;
}
if (!store.get("ab")) store.set("ab", true);
if (!inFrame && !navigator.userAgent.includes("Firefox") && store.get("ab") === "true") {
  const popup = open("about:blank", "_blank");
  if (popup && !popup.closed) {
    const doc = popup.document;
    const iframe = doc.createElement("iframe");
    const style = iframe.style;
    const link = doc.createElement("link");
    const script = doc.createElement("script");

    const name = store.get("name") || "My Drive - Google Drive";
    const icon = store.get("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

    doc.title = (window.laceTitle || (s => s))(name);
    link.rel = "icon";
    link.href = icon;

    iframe.src = location.href;
    style.position = "fixed";
    style.top = style.bottom = style.left = style.right = 0;
    style.border = style.outline = "none";
    style.width = style.height = "100%";

    script.textContent = `
      window.onbeforeunload = function (event) {
        const confirmationMessage = 'Leave Site?';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      };
    `;

    doc.head.appendChild(link);
    doc.head.appendChild(script);
    doc.body.appendChild(iframe);

    const pLink = store.get("pLink") || getRandomUrl();
    location.replace(pLink);
  }
}

const SplashT = [
  "Over 8 Million Users since 2023",
  "Fastest growing proxy server",
  "Made by xBubbo",
  "Check out discord.gg/interstellar :)",
  "Thanks for using the site",
  "Follow us on Tiktok (@useinterstellar)",
  "Subscribe to us on YouTube (@unblocking)",
  "Subscribe to my Youtube (@xbubbo)",
  "Check out the settings page",
  "Check out our Patreon (https://www.patreon.com/gointerstellar)",
];

let SplashI = Math.floor(Math.random() * SplashT.length);
const SplashE = document.getElementById("splash");

function US() {
  SplashI = (SplashI + 1) % SplashT.length;
  SplashE.innerText = SplashT[SplashI];
  SplashE.style.animation = "none";
  void SplashE.offsetWidth;
  SplashE.style.animation = "";
}

SplashE.innerText = SplashT[SplashI];
SplashE.addEventListener("click", US);

function getRandomUrl() {
  const randomUrls = [
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
  return randomUrls[randRange(0, randomUrls.length)];
}

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
