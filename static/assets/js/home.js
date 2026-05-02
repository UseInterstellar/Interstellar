let inFrame;

try {
  inFrame = window !== top;
} catch (e) {
  inFrame = true;
}
if (!localStorage.getItem("ab")) localStorage.setItem("ab", true);
if (!inFrame && !navigator.userAgent.includes("Firefox") && localStorage.getItem("ab") === "true") {
  const popup = open("about:blank", "_blank");
  setTimeout(() => {
    if (!popup || popup.closed) {
      alert("Please allow popups for this site. Doing so will allow us to open the site in a about:blank tab and preventing this site from showing up in your history. You can turn this off in the site settings.");
    } else {
      const doc = popup.document;
      const iframe = doc.createElement("iframe");
      const style = iframe.style;
      const link = doc.createElement("link");

      const name = localStorage.getItem("name") || "My Drive - Google Drive";
      const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png";

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

      const pLink = localStorage.getItem(encodeURI("pLink")) || getRandomUrl();
      location.replace(pLink);

      const script = doc.createElement("script");
      script.textContent = `
      window.onbeforeunload = function (event) {
        const confirmationMessage = 'Leave Site?';
        (event || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
      };
    `;
      doc.head.appendChild(script);
    }
  }, 2000);
}
// Particles
document.addEventListener("DOMContentLoaded", event => {
  if (window.localStorage.getItem("particles") === "true") {
    const particlesConfig = {
      particles: {
        number: {
          value: 200,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#ffffff",
        },
        shape: {
          type: "star",
          stroke: {
            width: 0,
            color: "#ffffff",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 1,
          random: true,
          anim: {
            enable: true,
            speed: 0.9,
            opacity_min: 0,
            sync: false,
          },
        },
        size: {
          value: 4,
          random: true,
          anim: {
            enable: true,
            speed: 1.1,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          random: true,
          straight: true,
          out_mode: "out",
          bounce: false,
          variations: true,
        },
      },
      interactivity: {
        detect_on: "window",
        events: {
          onhover: {
            enable: false,
          },
          onclick: {
            enable: false,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          push: {
            particles_nb: 30,
          },
        },
      },
      retina_detect: true,
    };
    particlesJS("particles-js", particlesConfig);

    window.addEventListener("click", e => {
      const pJS = window.pJSDom?.[0]?.pJS;
      if (!pJS) return;
      const canvas = pJS.canvas.el;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      for (let i = 0; i < 30; i++) {
        pJS.fn.vendors.destroypJS;
        pJS.fn.modes.pushParticles(1, { pos_x: x, pos_y: y });
      }
    });
  }
});
// Splash texts
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
}

SplashE.innerText = SplashT[SplashI];

SplashE.addEventListener("click", US);
// Random URL
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
