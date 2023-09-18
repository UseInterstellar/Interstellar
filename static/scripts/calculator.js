document.addEventListener('DOMContentLoaded', () => {
  const appsList = [
    {
      name: "! Request A Game [UPDATED]",
      link: "https://forms.gle/94fJ9yAXQCgaXTrz6",
      image: "/images/icons/request.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Bullet Force Multiplayer",
      link: "https://www.crazygames.com/game/bullet-force-multiplayer",
      image: "/images/icons/BFM.png",
      categories: ['all,', '2P'],
      error: false
    },
    {
      name: "Crazy Games",
      link: "https://www.crazygames.com/",
      image: "/images/icons/crazy.png",
      categories: ['all,', 'emu,', '2P,', 'sports,', 'flash' ],
      error: false
    },
    {
      name: "Cubes 2048",
      link: "https://www.crazygames.com/game/cubes-2048-io",
      image: "/images/icons/C2048.jpg",
      categories: ['all,', '2P'],
      error: false
    },
              {
      name: "DOOM",
      link: "https://archive.org/details/doom-play",
      image: "/images/icons/DOOM.jpg",
      categories: ['all,', 'emu'],
      error: false
    },
    {
      name: "FNAF 2",
      link: "https://sussygamedeveloper.github.io/FNAF2/",
      image: "/images/icons/FNAF2.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "FNAF 3",
      link: "https://sussygamedeveloper.github.io/fnaf3/",
      image: "/images/icons/FNAF3.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "FNAF Web",
      link: "https://wellsousaaa.github.io/Five-Nights-at-Freddys-Web/",
      image: "/images/icons/FNAFWeb.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "GBA Emulator",
      link: "https://ds.44670.org/gba/",
      image: "/images/icons/gba.jpg",
      categories: ['all,', 'emu'],
      error: false
    },
    {
      name: "Itch.io",
      link: "https://itch.io",
      image: "/images/icons/itch.png",
      categories: ['all,', 'emu,', '2P'],
      error: false
    },
            {
      name: "N-Gon",
      link: "https://landgreen.github.io/sidescroller/",
      image: "/images/icons/NGON.png",
      categories: ['all'],
      error: false
    },
    {
      name: "Nintendo DS Emulator",
      link: "https://ds.44670.org/",
      image: "/images/icons/ds.png",
      categories: ['all,', 'emu'],
      error: false
    },
        {
      name: "Nintendo 64 Emulator",
      link: "https://www.neilb.net/n64wasm/",
      image: "/images/icons/N64.png",
      categories: ['all,', 'emu'],
      error: false
    },
        {
      name: "Playstation 2 Emulator",
      link: "https://ds.44670.org/",
      image: "/images/icons/PS2.webp",
      categories: ['all,', 'emu'],
      error: false
    },
    {
      name: "Run 3",
      link: "https://www.coolmathgames.com/0-run-3/play",
      image: "/images/icons/run3.png",
      categories: ['all,', 'flash'],
      error: false
    },
    {
      name: "Subway Surfers: San Francisco ",
      link: "https://raw.githack.com/3kh0/3kh0-assets/main/subway-surfers/index.html",
      image: "/images/icons/SF.webp",
      categories: ['all,', 'emu'],
      error: false
    },
                  {
      name: "Super Mario Bros",
      link: "http://topoi.pooq.com/hendrik/notmine/FullScreenMario/mario.html",
      image: "/images/icons/SMB.jpg",
      categories: ['all,', 'emu'],
      error: false
    },
    {
      name: "Survivor.io",
      link: "https://html5.gamedistribution.com/rvvASMiM/f1c451e586c04b4c8cba01b0c50d9090/index.html",
      image: "/images/icons/SVI.png",
      categories: ['all,', 'emu'],
      error: false
    },
          {
      name: "Web Retro",
      link: "https://binbashbanana.github.io/webretro/",
      image: "/images/icons/webretro.png",
      categories: ['all,', 'emu'],
      error: false
    },
    {
      name: "Slope",
      link: "https://watchdocumentaries.com/wp-content/uploads/games/slope/",
      image: "/images/icons/slope.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Fortnite",
      link: "https://play.geforcenow.com/mall/#/deeplink?game-id=46bfab06-d864-465d-9e56-2d9e45cdee0a",
      image: "/images/icons/fortnite.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Bomb Party",
      link: "https://jklm.fun",
      image: "/images/icons/BP.png",
      categories: ['all,', '2P'],
      error: false
    },
  {
    name: "1",
    link: "https://hgentry.github.io/1/",
    image: "/images/icons/1.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "1v1.LOL",
    link: "https://1v1.lol",
    image: "/images/icons/1v1-lol.webp",
    categories: ['all,', '2P'],
    error: false
  },
  {
    name: "2D Rocket League",
    link: "https://v6p9d9t4.ssl.hwcdn.net/html/3325334/index.html",
    image: "/images/icons/2D-Rocket-League.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "3D Dino Game",
    link: "https://lagged.com/api/play2/t-rex-3d2/",
    image: "/images/icons/trex-run-3D.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "60 Sec. Burger Run",
    link: "https://www.coolmathgames.com/0-60-second-burger-run/play",
    image: "/images/icons/60-second-burger-run.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "8 Ball Pool",
    link: "https://8ball-pool.io",
    image: "/images/icons/8ball.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "A Dark Room",
    link: "https://adarkroom.doublespeakgames.com",
    image: "/images/icons/ADR.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Ace Attorney",
    link: "https://f.kbhgames.com/r/gba/?r=ace-attorney",
    image: "/images/icons/aa.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "AC - Wild World",
    link: "https://static.arcadespot.com/retroemulator.php?system=nds&game=2017/10/animal-crossing-wild-world1.zip",
    image: "/images/icons/acww.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Adventure Capitalist",
    link: "https://than1089.github.io/adventure-capitalist/",
    image: "/images/icons/adventure-capitalist.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Agar.io",
    link: "https://agar.io",
    image: "/images/icons/agario.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Among Us (Scratch)",
    link: "https://turbowarp.org/523967150/fullscreen",
    image: "/images/icons/scratch-among-us.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Apex Legends",
    link: "https://play.geforcenow.com/games?game-id=cb2b1b5f-54ba-45fd-9839-96bbfe1376cd&lang=en_US&asset-id=01_c6efce00-e91e-402a-8b72-f4971f89c528",
    image: "/images/icons/apex.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Basket Random",
    link: "https://html5.gamedistribution.com/rvvASMiM/bf1268dccb5d43e7970bb3edaa54afc8/index.html",
    image: "/images/icons/br.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Basketball Stars",
    link: "https://html5.gamedistribution.com/69d78d071f704fa183d75b4114ae40ec/",
    image: "/images/icons/basketball-stars.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Basketball Bros",
    link: "https://www.basketbros.io/",
    image: "/images/icons/basket-bros.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Basketball Legends",
    link: "https://www.basketballlegends.fun/gamedata/basketball-legends-2020",
    image: "/images/icons/basketball-legends.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Biggie Cheese Fight",
    link: "https://scratch.mit.edu/projects/163771748/fullscreen",
    image: "/images/icons/biggiecheese.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Bitlife",
    link: "https://xlegends.github.io/bitlife/",
    image: "/images/icons/bitlife.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "BTD 4",
    link: "https://en.gameslol.net/data/bloons-td-4/index.html",
    image: "/images/icons/btd4.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "BuildNow.GG",
    link: "https://games.crazygames.com/en_US/buildnow-gg/index.html",
    image: "/images/icons/build-now.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Cat Ninja",
    link: "https://4iapq88o5f3gc1dij3it0mp5jojnm3jr-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%252Fcat-ninja.xml",
    image: "/images/icons/cat-ninja.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Candy Box",
    link: "https://candybox2.net",
    image: "/images/icons/candybox.webp",
    categories: ["all"],
    error: false
  },
    {
      name: "Celeste PICO-8",
      link: "https://exok.com/minigames/celeste.html",
      image: "/images/icons/celeste.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Clicker Heros",
      link: "https://www.clickerheroes.com/play.html",
      image: "/images/icons/clickerheros.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Chess.com (Fixed)",
      link: "https://chess.com",
      image: "/images/icons/chess.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Cluster Rush",
      link: "https://interstellarnetwork.github.io/Interstellar-Assets/Cluster-Rush/",
      image: "/images/icons/cluster-rush.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Cookie Clicker",
      link: "https://orteil.dashnet.org/cookieclicker/",
      image: "/images/icons/cookieclicker.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Crossy Road",
      link: "https://5dd2e1e3-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/169dc11d-e718-4b36-9e60-d5ed5bc07a31/index.html",
      image: "/images/icons/cr.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Deepest Sword",
      link: "https://v6p9d9t4.ssl.hwcdn.net/html/4017918/index.html",
      image: "/images/icons/deepest-sword.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Diep.io",
      link: "https://diep.io/",
      image: "/images/icons/diep.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Doge Miner 1",
      link: "https://dogeminer.se/",
      image: "/images/icons/doge-miner-1.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Doom 1",
      link: "https://browncha023.github.io/GBA/launcher.html#dm",
      image: "/images/icons/doom1.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Doom 2",
      link: "https://browncha023.github.io/GBA/launcher.html#dm2",
      image: "/images/icons/doom2.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Dreader",
      link: "https://donitz.itch.io/dreader",
      image: "/images/icons/dreader.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Drift Boss",
      link: "https://watchdocumentaries.com/wp-content/uploads/games/drift-boss/",
      image: "/images/icons/db.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Drift Hunters",
      link: "https://webglmath.github.io/drift-hunters/",
      image: "/images/icons/drift-hunters.webp",
      categories: ["all"],
      say: "This game may take a while to load, but it is working."
    },
    {
      name: "Drive Mad",
      link: "https://raw.githack.com/3kh0/3kh0-assets/main/drive-mad/index.html",
      image: "/images/icons/dm.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Eaglercraft 1.8",
      link: "http://raw.githack.com/3kh0/3kh0-assets/main/minecraft-18/index.html",
      image: "/images/icons/mc.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Fallout 2",
      link: "https://jonasz-o.itch.io/fallout2remake3d",
      image: "/images/icons/fallout2.gif",
      categories: ["all"],
      error: false
    },
    {
      name: "FNAF 2 (Scratch)",
      link: "https://scratch.mit.edu/projects/469219637/embed/",
      image: "/images/icons/fnaf2.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "Friday Night Funkin'",
      link: "https://w8.snokido.com/games/html5/friday-night-funkin/0281/index.html",
      image: "/images/icons/fnf.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "FNF - Lofi Mod",
      link: "https://fnf.kdata1.com/lofi-funkin/2/",
      image: "/images/icons/lofi.webp",
      categories: ["all"],
      error: false
    },
    {
      name: "FNF VS. Snorlax",
      link: "https://fnf.kdata1.com/snorlax/1/",
      image: "/images/icons/snorlax.webp",
      categories: ["all"],
      error: false
    },
      {
        name: "JustFall.LOL",
        link: "https://justfall.lol",
        image: "/images/icons/just-fall-lol.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Kirby Mirror (GBA)",
        link: "https://www.retrogames.onl/gba/kirby-mirror-gba.html",
        image: "/images/icons/kirby.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Krunker",
        link: "https://krunker.io",
        image: "/images/icons/krunker.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "G-Switch",
        link: "https://5dd24442-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/4f2c69b4-3edc-4cd7-a078-efd3d1ea9fb5/index.html",
        image: "/images/icons/gswitch.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "G-Switch 2",
        link: "https://5dd27095-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/e0e70ee4-fdd4-4de8-931d-fde7d1cb408b/index.html",
        image: "/images/icons/gswitch2.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "G-Switch 3",
        link: "https://5dd2b395-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/120fdec6-7eeb-470f-a43c-9bcdace0dacb/index.html",
        image: "/images/icons/gswitch3.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Golden Eye 007",
        link: "https://f.kbhgames.com/r/n64/game.php?file=007-golden-eye.zip",
        image: "/images/icons/golden-eye-007.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "GBA Games 2",
        link: "https://cattn.github.io/gba/",
        image: "/images/icons/gba.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Geforce NOW",
        link: "https://play.geforcenow.com",
        image: "/images/icons/apps/geforce-now.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Haunted School 1",
        link: "https://games.crazygames.com/en_US/haunted-school---horror-game/index.html",
        image: "/images/icons/na.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Helixteus 3",
        link: "https://hole-io.com/",
        image: "/images/icons/helixteus.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Hole.IO",
        link: "https://hole-io.com/",
        image: "/images/icons/hole.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Idle Breakout",
        link: "https://interstellarnetwork.github.io/Interstellar-Assets/play/idle-breakout/index.html",
        image: "/images/icons/idle.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Isleward",
        link: "https://play.isleward.com",
        image: "/images/icons/isleward.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Interactive Buddy",
        link: "https://f.silvergames.com/ruffle/player.php?id=204",
        image: "/images/icons/interactive-buddy.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Jacksmith",
        link: "https://www.coolmathgames.com/0-jacksmith/play",
        image: "/images/icons/jacksmith.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Learn To Fly Idle",
        link: "https://www.gameslol.net/data/waflash/index.php?g=635",
        image: "/images/icons/ltf_idle.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Lordz.io",
        link: "https://lordz.io/",
        image: "/images/icons/lordz.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Masked IO",
        link: "https://unblocked-games.s3.amazonaws.com/games/masked-io/index.html",
        image: "/images/icons/masked-forces.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Mario Kart 64",
        link: "https://static.arcadespot.com/retroemulator.php?system=n64&game=2017/06/mario-kart-64.zip",
        image: "/images/icons/mario-kart-64.webp",
        categories: ["all"],
        error: false
      },
      {
        name: "Mobs Inc",
        link: "https://overboy.itch.io/mobs-inc",
        image: "/images/icons/mobsinc.webp",
        categories: ["all"],
        error: false
      },  
      {
        name: "Monkey Mart",
        link: "https://html5.gamemonetize.co/ugi7ftbv2kgodcq7vful9u9v34wein5z/",
        image: "/images/icons/mm.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "MooMoo.io",
        link: "https:/moomoo.io",
        image: "/images/icons/moo.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Mortal Kombat 4",
        link: "https://f.kbhgames.com/r/n64/game.php?file=Mortal-Kombat-4-U.zip",
        image: "/images/icons/na.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Mr.Mine",
        link: "https://www.coolmathgames.com/0-mr-mine/play",
        image: "/images/icons/mrmine.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Moto X3M",
        link: "https://html5.gamedistribution.com/rvvASMiM/5b0abd4c0faa4f5eb190a9a16d5a1b4c/index.html",
        image: "/images/icons/mx3m.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "MX3M: Pool Party",
        link: "https://h0jokl1egt0fd4oc8qv3j0tltl9jbqhn-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://649025137-174029463385024710.preview.editmysite.com/uploads/b/139890129-767696982876512205/files/mx3mpp.xml",
        image: "/images/icons/mx3m.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "MX3M: Spooky Land",
        link: "https://html5.gamedistribution.com/rvvASMiM/b8a342904608470a9f3382337aca3558/index.html",
        image: "/images/icons/mx3m-spooky.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "MX3M: Winter",
        link: "https://www-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://sites.google.com/site/s017q3e/moto-x3m-4-winter.xml",
        image: "/images/icons/mx3m-winter.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Saul Run",
        link: "https://complex-ify.itch.io/saul-goodman",
        image: "/images/icons/saulrun.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "NG Space Company",
        link: "https://interstellarnetwork.github.io/interstellar-assets/play/ng-space-company/frontend/dist/index.html",
        image: "/images/icons/ng.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Ninja Cat Exploit",
        link: "https://html5.gamedistribution.com/rvvASMiM/903ba9346b9d437e9c7e81d672cead44/index.html",
        image: "/images/icons/ninja-cat.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "OvO",
        link: "https://8rlfg0ch3417et18dp8lvps6uo7c3b2c-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://427396048-642845047394716217.preview.editmysite.com/uploads/b/139890129-761103484729797659/files/ovo.xml",
        image: "/images/icons/ovo.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Online Racing Game!",
        link: "https://jchabin.github.io/cars/",
        image: "/images/icons/OR.png",
        categories: ['all'],
        error: false
      },
      {
        name: "Online Soccer M.",
        link: "https://www.onlinesoccermanager.com/",
        image: "/images/icons/osm.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Papa's Bakeria",
        link: "https://f.silvergames.com/emu/waffle/?id=5458",
        image: "/images/icons/bakeria.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Papa's Cupcakeria",
        link: "https://f.silvergames.com/emu/waffle/?id=3246",
        image: "/images/icons/cupcakeria.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Papa Louie 1",
        link: "https://f.silvergames.com/ruffle/player.php?id=1373",
        image: "/images/icons/louie1.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Papa Louie 2",
        link: "https://f.silvergames.com/emu/waffle/?id=3042",
        image: "/images/icons/louie2.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Papa Louie 3",
        link: "https://f.silvergames.com/emu/waffle/?id=4693",
        image: "/images/icons/papa-louie-3.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Papa's Pizzeria",
        link: "https://f.silvergames.com/ruffle/player.php?id=1360",
        image: "/images/icons/pizzeria.webp",
        categories: ['all'],
        error: false
      },
      {
        name: "Paper Mario 64",
        link: "https://f.kbhgames.com/r/n64/game.php?file=Paper%20Mario%20(USA).zip",
        image: "/images/icons/paper-mario-64.webp",
        categories: ['all'],
        error: false
      },    
      {
    name: "Paper Mario 64",
    link: "https://f.kbhgames.com/r/n64/game.php?file=Paper%20Mario%20(USA).zip",
    image: "/images/icons/paper-mario-64.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Paper.io",
    link: "https://paper-io.com/",
    image: "/images/icons/paperio.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Pixel Shooter",
    link: "https://94bfktj403i6m18as4vkvtreqd0ohci4-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://274019683-173520394482650759.preview.editmysite.com/uploads/b/139890129-131715539788281629/files/ps.xml",
    image: "/images/icons/pixel-shooter.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Pizza Tower",
    link: "https://gamaverse.com/c/f/g/pizza-tower-1678640389/index.html",
    image: "/images/icons/pizza-tower.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Pokemon Heart Gold",
    link: "https://static.arcadespot.com/retroemulator.php?system=nds&game=2017/10/pokemon-heartgold-version1.zip",
    image: "/images/icons/heartgold.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Pokemon Showdown",
    link: "https://play.pokemonshowdown.com",
    image: "/images/icons/showdown.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "PM: Light Platinum",
    link: "https://browncha023.github.io/GBA/launcher.html#pokemonlp",
    image: "/images/icons/lp.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Precision Client",
    link: "http://raw.githack.com/3kh0/3kh0-assets/main/precision-client/index.html",
    image: "/images/icons/precision.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Rainbow Six Siege",
    link: "https://play.geforcenow.com/games?game-id=1dd07d47-6601-42f7-80e9-e4d8db08ea1b&lang=en_US&asset-id=01_44417-48c3d8e642e2",
    image: "/images/icons/r6.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Red Ball 1",
    link: "https://www.algebrashelper.com/redball",
    image: "/images/icons/redball1.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Red Ball 2",
    link: "https://www.algebrashelper.com/redball-2",
    image: "/images/icons/redball2.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Red Ball 4",
    link: "https://www.algebrashelper.com/redball-4",
    image: "/images/icons/redball4.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Red Ball 4 Vol. 2",
    link: "https://www.algebrashelper.com/read-ball-4v2",
    image: "/images/icons/redball4vol2.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Red Ball 4 Vol. 3",
    link: "https://www.algebrashelper.com/red-ball-4v3",
    image: "/images/icons/redball4vol3.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Retro Arch",
    link: "https://binbashbanana.github.io/webretro/",
    image: "/images/icons/retroarch.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Riddle School 2 [FIXED]",
    link: "https://f.silvergames.com/ruffle/player.php?id=8564",
    image: "/images/icons/rs1.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Rocket Pult",
    link: "https://v6p9d9t4.ssl.hwcdn.net/html/565140/index.html",
    image: "/images/icons/rocketpult.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Rooftop Snipers",
    link: "https://html5.gamedistribution.com/rvvASMiM/c3a70ae98547407a92ebedca8b79fdfa/index.html",
    image: "/images/icons/rooftop.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Sand Spiel",
    link: "https://sandspiel.club/",
    image: "/images/icons/sand.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Sandboxels",
    link: "https://v6p9d9t4.ssl.hwcdn.net/html/5808591/index.html",
    image: "/images/icons/sandboxels.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Shapez.IO",
    link: "https://shapez.io",
    image: "/images/icons/shapezio.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Shell Shockers",
    link: "https://shellshock.io/",
    image: "/images/icons/shell-shockers.webp",
    categories: ['all'],
    error: false
  },
  {
    name: "Slither Io",
    link: "http://slither.io/",
    image: "/images/icons/slither.webp",
    categories: ['all'],
    error: false
  },
    {
      name: "Smash Bros 64",
      link: "https://emulatorgames.online/games/n64/super-smash-bros",
      image: "/images/icons/super-smash-bros-64.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Smash Karts",
      link: "https://smashkarts.io/",
      image: "/images/icons/smashkarts.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Snowball.io",
      link: "https://games.crazygames.com/en_US/snowball-io/index.html",
      image: "/images/icons/snowball.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Space Plan",
      link: "http://jhollands.co.uk/spaceplan/",
      image: "/images/icons/spaceplan.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Stumble Guys",
      link: "https://www.stumbleguys.com/play",
      image: "/images/icons/stumble-guys.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Stumble Guys Clone",
      link: "https://stumble-guys.io/stumble-guys.embed",
      image: "/images/icons/stumble-guys.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Sugar Sugar HTML5",
      link: "https://66564262-37c6-4095-a731-535342e4bbe4.poki-gdn.com/5bd6e8c6-381d-4de5-9823-96662d29afaf/index.html",
      image: "/images/icons/sugarsugar.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Super Mario 63",
      link: "https://www.numuki.com/gameframe/super-mario-63",
      image: "/images/icons/sm63.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Super Mario 64",
      link: "https://f.kbhgames.com/r/n64/game.php?file=32112_super-mario-64-usa.zip",
      image: "/images/icons/sm64.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Super Smash Flash",
      link: "https://f.kbhgames.com/RS/game.php?r=//f.kbhgames.com/2018/swf/smashflash.swf&w=1521&h=753",
      image: "/images/icons/ssf1.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Supply Chain Idle",
      link: "http://chat.kongregate.com/gamez/0027/1653/live/index.html?kongregate_game_version=1554392772",
      image: "/images/icons/na.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Taming.io",
      link: "https://taming.io/",
      image: "/images/icons/tamingio.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Tanuki Sunset",
      link: "https://watchdocumentaries.com/wp-content/uploads/games/tanuki-sunset",
      image: "/images/icons/tanuki.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "The Simpsons",
      link: "https://static.arcadespot.com/retroemulator.php?system=nds&game=2017/11/the-simpsons-game.zip",
      image: "/images/icons/the-simpsons-game.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Temple Run 2",
      link: "https://watchdocumentaries.com/wp-content/uploads/games/temple-run-2/",
      image: "/images/icons/temple-run-2.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Twitch Tetris",
      link: "https://www.rossipotti.de/ausgabe28/tetris/controls.html",
      image: "/images/icons/na.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Vex 5",
      link: "https://raw.githack.com/3kh0/3kh0-assets/main/vex5/index.html",
      image: "/images/icons/vex5.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Vex 7",
      link: "https://interstellarnetwork.github.io/interstellar-assets/play/vex7/index.html",
      image: "/images/icons/vex7.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Voxiom.io",
      link: "https://voxiom.io/",
      image: "/images/icons/voxiom.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Zombs.io",
      link: "https://zombs.io/",
      image: "/images/icons/zombs-io.webp",
      categories: ['all'],
      error: false
    },
    {
      name: "Zombs Royale",
      link: "https://zombsroyale.io",
      image: "/images/icons/zombs-royale.webp",
      categories: ['all,', '2P'],
      error: false
    },
    {
    name: "GBA Games",
    link: "https://real-sgs.vercel.app/Tools/GBA-Emulator",
    image: "/images/icons/gba.webp",
    categories: ["all"],
    error: false
    },
    {
      name: "Retro Bowl",
      link: "/calendar/retro-bowl/index.html",
      image: "/images/icons/retro.webp",
      categories: ["all,", 'sports'],
      local: "true",
      },
  ];
  
  appsList.sort((a, b) => a.name.localeCompare(b.name));
  
  const nonPinnedApps = document.querySelector('.container-apps');
  const pinnedApps = document.querySelector('.pinned-apps');
  var pinList = localStorage.getItem("pinnedGames");
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
    btn.onclick = function () {
      setPin(pinNum);
    };
    btn.title="Pin";

    const link = document.createElement('a');

    if (app.local) {
      link.onclick = function() {
        if (typeof app.say !== 'undefined') {
          alert(app.say);
        }
        window.location.href = app.link;
        return false;
      };
    } else if (app.blank) {
      link.onclick = function() {
        if (typeof app.say !== 'undefined') {
          alert(app.say);
        }
        blank(app.link);
        return false;
      };
    } else {
      link.onclick = function() {
        if (typeof app.say !== 'undefined') {
          alert(app.say);
        }
        go(app.link);
        return false;
      };
    }

    const image = document.createElement('img');
    image.width = 145;
    image.height = 145;
    image.src = app.image;

    const paragraph = document.createElement('p');
    paragraph.textContent = app.name;
    if (app.error) {
      paragraph.style.color = 'red';
    }

    link.appendChild(image);
    link.appendChild(paragraph);
    columnDiv.appendChild(link);
    if(appInd != 0) {
      columnDiv.appendChild(btn);
    }

    if(pinList!=null && appInd != 0) {
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
  appsContainer.appendChild(pinnedApps);
  appsContainer.appendChild(nonPinnedApps);
});
function setPin(index) {
  pins = localStorage.getItem("pinnedGames");
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
    pins.push(index);
  }
  localStorage.setItem("pinnedGames", pins);
  location.reload();
}
function pinContains(i,p) {
  if(p=="") {return false;}
  for(var x = 0; x < p.length; x++) {if(p[x]===i) {
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
