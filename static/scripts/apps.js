document.addEventListener('DOMContentLoaded', () => {
  const appsList = [
    {
      name: "Amazon",
      link: "https://amazon.com/",
      image: "/images/icons/apps/amazon.png",
      categories: ["all", "media"]
    },
    {
      name: "Chess.com",
      link: "https://chess.com",
      image: "/images/icons/chess.png",
      categories: ["all", "games"]
    },
    {
      name: "Cool Math Games",
      link: "https://coolmathgames.com",
      image: "/images/icons/apps/coolmath.png",
      categories: ["all", "games"]
    },
    {
      name: "Discord",
      link: "https://discord.com",
      image: "/images/icons/apps/discord.jpg",
      categories: ["all", "social"]
    },
    {
      name: "ESPN",
      link: "https://www.espn.com/watch/",
      image: "/images/icons/apps/espn.webp",
      categories: ["all", "media"]
    },
    {
      name: "Fifa Rosters",
      link: "https://fifarosters.com/",
      image: "/images/icons/fifa.png",
      categories: ["all", "media"]
    },
    {
      name: "Firefox Web Browser",
      link: "https://replit.com/@cooleddie001/Firefox-Legacy?v=1",
      image: "/images/icons/apps/firefox.png",
      categories: ["all", "media"]
    },
    {
      name: "Flix HQ",
      link: "https://flixhq.to",
      image: "/images/icons/apps/flixhq.png",
      categories: ["all", "media"]
    },
    {
      name: "Geforce NOW",
      link: "https://play.geforcenow.com",
      image: "/images/icons/apps/geforce-now.png",
      categories: ["all", "stream", "cloud"]
    },
    {
      name: "Github",
      link: "https://github.com",
      image: "/images/icons/apps/github.png",
      categories: ["all", "media"]
    },
    {
      name: "Google",
      link: "https://google.com",
      image: "/images/icons/apps/google.png",
      categories: ["all", "media"]
    },
    {
      name: "HBO MAX",
      link: "https://www.hbomax.com/",
      image: "/images/icons/apps/hbo.webp",
      categories: ["all", "stream"]
    },
    {
      name: "Messenger",
      link: "https://messenger.com/",
      image: "/images/icons/apps/messenger.png",
      categories: ["all", "social"]
    },
    {
      name: "Now.GG - Astroid",
      link: "https://nowgg.wtf",
      image: "/images/icons/now-gg.webp",
      categories: ["all", "game"]
    },
    {
      name: "Paramount Plus",
      link: "https://paramountplus.com",
      image: "/images/icons/apps/paramount.png",
      categories: ["all", "stream"]
    },
    {
      name: "Pinterest",
      link: "https://pinterest.com",
      image: "/images/icons/apps/pinterest.png",
      categories: ["all", "media"]
    },
    {
      name: "Pixlr",
      link: "https://pixlr.com/",
      image: "/images/icons/pix.png",
      categories: ["all", "media"]
    },
    {
      name: "Poki",
      link: "https://poki.com",
      image: "/images/icons/apps/poki.png",
      categories: ["all","game"]
    },
    {
      name: "Soundcloud",
      link: "https://soundcloud.com",
      image: "/images/icons/apps/soundcloud.jpg",
      categories: ["all", "media"]
    },
    {
      name: "Spotify",
      link: "https://open.spotify.com",
      image: "/images/icons/apps/spotify.png",
      categories: ["all", "media"]
    },
    {
      name: "Telegram",
      link: "https://web.telegram.org/",
      image: "/images/icons/apps/telegram.png",
      categories: ["all", "soc"]
    },
    {
      name: "Tiktok",
      link: "https://tiktok.com",
      image: "/images/icons/apps/tiktok.png",
      categories: ["all", "soc", "media"]
    },
    {
      name: "Tumblr",
      link: "https://tumblr.com/",
      image: "/images/icons/apps/tumblr.png",
      categories: ["all", "soc"]
    },
    {
      name: "Twitch",
      link: "https://twitch.tv",
      image: "/images/icons/apps/twitch-tv.png",
      categories: ["all", "stream", "media"]
    },
    {
      name: "Twitter",
      link: "https://twitter.com",
      image: "/images/icons/apps/twitter.png",
      categories: ["all", "soc", "media"]
    },
    {
      name: "VS Code",
      link: "https://vscode.dev",
      image: "/images/icons/apps/vscode.png",
      categories: ["all", "tool"]
    },
    {
      name: "Y8 Games",
      link: "https://y8.com/",
      image: "/images/icons/apps/y8.png",
      categories: ["all", "game"]
    },
    {
      name: "YouTube",
      link: "https://youtube.com",
      image: "/images/icons/apps/yt.png",
      categories: ["all", "soc", "stream", "media"]
    },
    {
      name: "Whatsapp",
      link: "https://web.whatsapp.com/",
      image: "/images/icons/apps/whatsapp.png",
      categories: ["all", "message", "soc"]
    }
  ];
  const nonPinnedApps = document.querySelector('.container-apps');
  const pinnedApps = document.querySelector('.pinned-apps');
  var pinList = localStorage.getItem("pinnedApps");
  try{
  pinList=pinList.split(",").map(Number)
  } catch {}
  var appInd = 0;
  appsList.forEach(app => {
    let pinNum = appInd
    const columnDiv = document.createElement('div');
    columnDiv.classList.add('column');
    columnDiv.setAttribute('data-category', app.categories.join(' '));

    const pinIcon = document.createElement('i');
    pinIcon.classList.add("fa");
    pinIcon.classList.add("fa-map-pin");
    pinIcon.ariaHidden = true;

    const btn = document.createElement('button');
    btn.appendChild(pinIcon);
    btn.style.float = "right";
    btn.style.backgroundColor="rgb(45,45,45)";
    btn.style.borderRadius="50%";
    btn.style.borderColor="transparent";
    btn.style.color="white";
    btn.style.top="-200px";
    btn.style.position="relative";
    btn.classList.add("innerContent");
    btn.onclick = function () {
      setPin(pinNum);
    };
    btn.title="Pin";

    const link = document.createElement('a');
    link.setAttribute('onclick', `go('${app.link}')`);
    const image = document.createElement('img');
    image.width = 145;
    image.height = 145;
    image.src = app.image;
    const paragraph = document.createElement('p');
    paragraph.textContent = app.name;
    link.appendChild(image);
    link.appendChild(paragraph);
    columnDiv.appendChild(link);
    columnDiv.appendChild(btn);

    if(pinList!=null) {
      if(pinContains(appInd,pinList)) {
        pinnedApps.appendChild(columnDiv);
      }
      else {
        nonPinnedApps.appendChild(columnDiv);
      }
    }
    else {
      nonPinnedApps.appendChild(columnDiv);
    }
    appInd++;
  });
});
function setPin(index) {
  pins = localStorage.getItem("pinnedApps");
  if(pins == null) {
    pins = [];
  }
  if(pins == "") {
    pins = [];
  }
  else {
    pins = pins.split(",").map(Number);
  }
  if(pinContains(index,pins)) {
    let remove = pins.indexOf(index);

    pins.splice(remove, 1);

  }
  else {
    pins.push(index+1);
  }
  localStorage.setItem("pinnedApps", pins);
  location.reload();
}
function pinContains(i,p) {
  if(p=="") {return false;}
  for(var x = 0; x < p.length; x++) {if(p[x]-1===i) {
    return true;
  }}
  return false;
}

function showImages() {
  var selectedCategories = Array.from(document.querySelectorAll("#category option:checked")).map(option => option.value);
  var games = document.getElementsByClassName("column");

  for (var i = 0; i < games.length; i++) {
    var game = games[i];
    var categories = game.getAttribute("data-category").split(" ");

    if (selectedCategories.length === 0 || selectedCategories.some(category => categories.includes(category))) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

function search_game() {
  var input = document.getElementById("searchbarbottom");
  var filter = input.value.toLowerCase();
  var games = document.getElementsByClassName("column");

  for (var i = 0; i < games.length; i++) {
    var game = games[i];
    var name = game.getElementsByTagName("p")[0].textContent.toLowerCase();

    if (name.includes(filter)) {
      game.style.display = "block";
    } else {
      game.style.display = "none";
    }
  }
}

