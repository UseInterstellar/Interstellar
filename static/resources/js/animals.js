document.addEventListener('DOMContentLoaded', () => {
  const appsList = [
      {
    name: '2D Rocket League',
    go: 'https://v6p9d9t4.ssl.hwcdn.net/html/3325334/index.html',
    image: '/assets/images/icons/2D-Rocket-League.webp'
  },
  {
    name: '3D Dino Game',
    go: 'https://lagged.com/api/play2/t-rex-3d2/',
    image: '/assets/images/icons/trex-run-3D.webp'
  },
  {
    name: '60 Sec. Burger Run',
    go: 'https://www.coolmathgames.com/0-60-second-burger-run/play',
    image: '/assets/images/icons/60-second-burger-run.webp'
  },
  {
    name: '8 Ball Pool',
    go: 'https://8ball-pool.io',
    image: '/assets/images/icons/8ball.webp'
  },
  {
    name: 'A Dark Room',
    go: 'https://adarkroom.doublespeakgames.com',
    image: '/assets/images/icons/ADR.webp'
  },
  {
    name: 'Ace Attorney',
    go: 'https://f.kbhgames.com/r/gba/?r=ace-attorney',
    image: '/assets/images/icons/aa.webp'
  },
  {
    name: 'AC - Wild World',
    go: 'https://static.arcadespot.com/retroemulator.php?system=nds&amp;game=2017/10/animal-crossing-wild-world1.zip',
    image: '/assets/images/icons/acww.webp'
  },
  {
    name: 'Adventure Capitalist',
    go: 'https://than1089.github.io/adventure-capitalist/',
    image: '/assets/images/icons/adventure-capitalist.webp'
  },
  {
    name: 'Agar.io',
    go: 'https://agar.io',
    image: '/assets/images/icons/agario.webp'
  },
  {
    name: 'Among Us (Scratch)',
    go: 'https://turbowarp.org/523967150/fullscreen',
    image: '/assets/images/icons/scratch-among-us.webp'
  },
  {
    name: 'Basket Random',
    go: 'https://html5.gamedistribution.com/rvvASMiM/bf1268dccb5d43e7970bb3edaa54afc8/index.html',
    image: '/assets/images/icons/br.webp'
  },
  {
    name: 'Basketball Stars',
    go: 'https://html5.gamedistribution.com/69d78d071f704fa183d75b4114ae40ec/',
    image: '/assets/images/icons/basketball-stars.webp'
  },
  {
    name: 'Basketball Bros',
    go: 'https://www.basketbros.io/',
    image: '/assets/images/icons/basket-bros.webp'
  },
  {
    name: 'Basketball Legends',
    go: 'https://www.basketballlegends.fun/gamedata/basketball-legends-2020',
    image: '/assets/images/icons/basketball-legends.webp'
  },
  {
    name: 'Biggie Cheese Fight',
    href: 'hhttps://scratch.mit.edu/projects/163771748/fullscreen',
    image: '/assets/images/icons/biggiecheese.webp'
  },
  {
    name: 'Bitlife',
    go: 'https://xlegends.github.io/bitlife/',
    image: '/assets/images/icons/bitlife.webp'
  },
  {
    name: 'BTD 4',
    go: 'https://en.gameslol.net/data/bloons-td-4/index.html',
    image: '/assets/images/icons/btd4.webp'
  },
  {
    name: 'BuildNow.GG',
    go: 'https://games.crazygames.com/en_US/buildnow-gg/index.html',
    image: '/assets/images/icons/build-now.webp'
  },
  {
    name: 'Cat Ninja',
    go: 'https://4iapq88o5f3gc1dij3it0mp5jojnm3jr-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%252Fcat-ninja.xml',
    image: '/assets/images/icons/cat-ninja.webp'
  },
  {
    name: 'Candy Box',
    go: 'https://candybox2.net',
    image: '/assets/images/icons/candybox.webp'
  },
  {
    name: 'Celeste PICO-8',
    go: 'https://exok.com/minigames/celeste.html',
    image: '/assets/images/icons/celeste.webp'
  },
  {
    name: 'Clicker Heros',
    go: 'https://www.clickerheroes.com/play.html',
    image: '/assets/images/icons/clickerheros.webp'
  },
  {
    name: 'Chess.com (Fixed)',
    go: 'https://chess.com',
    image: '/assets/images/icons/chess.webp'
  },
  {
    name: 'Crossy Road',
    go: 'https://5dd2e1e3-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/169dc11d-e718-4b36-9e60-d5ed5bc07a31/index.html',
    image: '/assets/images/icons/cr.webp'
  },
  {
    name: 'Deepest Sword',
    go: 'https://v6p9d9t4.ssl.hwcdn.net/html/4017918/index.html',
    image: '/assets/images/icons/deepest-sword.webp'
  },
  {
    name: 'Diep.io',
    go: 'https://diep.io/',
    image: '/assets/images/icons/diep.webp'
  },
  {
    name: 'Doge Miner 1',
    go: 'https://dogeminer.se/',
    image: '/assets/images/icons/doge-miner-1.webp'
  },
  {
    name: 'Doom 1',
    go: 'https://browncha023.github.io/GBA/launcher.html#dm',
    image: '/assets/images/icons/doom1.webp'
  },
  {
    name: 'Doom 2',
    go: 'https://browncha023.github.io/GBA/launcher.html#dm2',
    image: '/assets/images/icons/doom2.webp'
  },
  {
    name: 'Dreader',
    go: 'https://donitz.itch.io/dreader',
    image: '/assets/images/icons/dreader.webp'
  },
  {
    name: 'Drive Mad - 3kh0',
    go: 'https://raw.githack.com/3kh0/3kh0-assets/main/drive-mad/index.html',
    image: '/assets/images/icons/dm.webp'
  },
  {
    name: 'Fallout 2',
    go: 'https://jonasz-o.itch.io/fallout2remake3d',
    image: '/assets/images/icons/fallout2.gif'
  },
  {
    name: 'Fifa Soccer',
    go: 'https://now.gg/play/electronic-arts/1353/fifa-soccer',
    image: '/assets/images/icons/fifa.webp'
  },
  {
    name: 'Fortnite',
    go: 'https://play.geforcenow.com/games?game-id=46bfab06-d864-465d-9e56-2d9e45cdee0a&amp;lang=en_US&amp;asset-id=01_15494ab6-efdd-4280-acbc-c740673f17b4',
    image: '/assets/images/icons/fortnite.webp'
  },
  {
    name: 'FNAF 2 (Scratch)',
    go: 'https://scratch.mit.edu/projects/469219637/embed/',
    image: '/assets/images/icons/fnaf2.webp'
  },
  {
    name: 'Friday Night Funkin',
    go: 'https://w8.snokido.com/games/html5/friday-night-funkin/0281/index.html',
    image: '/assets/images/icons/fnf.webp'
  },
  {
    name: 'FNF - Lofi Mod',
    go: 'https://fnf.kdata1.com/lofi-funkin/2/',
    image: '/assets/images/icons/lofi.webp'
  },
  {
    name: 'FNF VS. Snorlax',
    go: 'https://fnf.kdata1.com/snorlax/1/',
    image: '/assets/images/icons/snorlax.webp'
  },
  {
    name: 'JustFall.LOL',
    go: 'https://justfall.lol',
    image: '/assets/images/icons/just-fall-lol.webp'
  },
  {
    name: 'Kirby Mirror (GBA)',
    go: 'https://www.retrogames.onl/gba/kirby-mirror-gba.html',
    image: '/assets/images/icons/kirby.webp'
  },
  {
    name: 'Krunker',
    go: 'https://krunker.io',
    image: '/assets/images/icons/krunker.webp'
  },
  {
    name: 'G-Switch',
    go: 'https://5dd24442-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/4f2c69b4-3edc-4cd7-a078-efd3d1ea9fb5/index.html',
    image: '/assets/images/icons/gswitch.webp'
  },
  {
    name: 'G-Switch 2',
    go: 'https://5dd27095-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/e0e70ee4-fdd4-4de8-931d-fde7d1cb408b/index.html',
    image: '/assets/images/icons/gswitch2.webp'
  },
  {
    name: 'G-Switch 3',
    go: 'https://5dd2b395-015f-11ea-ad56-9cb6d0d995f7.poki-gdn.com/120fdec6-7eeb-470f-a43c-9bcdace0dacb/index.html',
    image: '/assets/images/icons/gswitch3.webp'
  },
  {
    name: 'Golden Eye 007',
    go: 'https://f.kbhgames.com/r/n64/game.php?file=007-golden-eye.zip',
    image: '/assets/images/icons/golden-eye-007.webp'
  },
  {
    name: 'GBA Games',
    go: 'https://browncha023.github.io/GBA/',
    image: '/assets/images/icons/gba.webp'
  },
  {
    name: 'GBA Games 2',
    go: 'https://cattn.github.io/gba/',
    image: '/assets/images/icons/gba.webp'
  },
  {
    name: 'Haunted School 1',
    go: 'https://games.crazygames.com/en_US/haunted-school---horror-game/index.html',
    image: '/assets/images/icons/na.webp'
  },
  {
    name: 'Helixteus 3',
    go: 'https://hole-io.com/',
    image: '/assets/images/icons/helixteus.webp'
  },
  {
    name: 'Hole.IO',
    go: 'https://hole-io.com/',
    image: '/assets/images/icons/hole.webp'
  },
  {
    name: 'Idle Breakout',
    go: 'https://interstellarnetwork.github.io/Interstellar-Assets/play/idle-breakout/index.html',
    image: '/assets/images/icons/idle.webp'
  },
  {
    name: 'Isleward',
    href: 'hhttps://play.isleward.com',
    image: '/assets/images/icons/isleward.webp'
  },
  {
    name: 'Interactive Buddy',
    go: 'https://f.silvergames.com/ruffle/player.php?id=204',
    image: '/assets/images/icons/interactive-buddy.webp'
  },
  {
    name: 'Jacksmith',
    go: 'https://www.coolmathgames.com/0-jacksmith/play',
    image: '/assets/images/icons/jacksmith.webp'
  },
  {
    name: 'Learn To Fly Idle',
    go: 'https://www.gameslol.net/data/waflash/index.php?g=635',
    image: '/assets/images/icons/ltf_idle.webp'
  },
  {
    name: 'Lordz.io',
    go: 'https://lordz.io/',
    image: '/assets/images/icons/lordz.webp'
  },
  {
    name: 'Masked IO',
    go: 'https://unblocked-games.s3.amazonaws.com/games/masked-io/index.html',
    image: '/assets/images/icons/masked-forces.webp'
  },
  {
    name: 'Mario Kart 64',
    go: 'https://static.arcadespot.com/retroemulator.php?system=n64&amp;game=2017/06/mario-kart-64.zip',
    image: '/assets/images/icons/mario-kart-64.webp'
  },
  {
    name: 'Mobs Inc',
    go: 'https://overboy.itch.io/mobs-inc',
    image: '/assets/images/icons/mobsinc.webp'
  },
  {
    name: 'Monkey Mart',
    go: 'https://html5.gamemonetize.co/ugi7ftbv2kgodcq7vful9u9v34wein5z/',
    image: '/assets/images/icons/mm.webp'
  },
  {
    name: 'MooMoo.io',
    href: 'https:/moomoo.io',
    image: '/assets/images/icons/moo.webp'
  },
  {
    name: 'Mortal Kombat 4',
    go: 'https://f.kbhgames.com/r/n64/game.php?file=Mortal-Kombat-4-U.zip',
    image: '/assets/images/icons/na.webp'
  },
  {
    name: 'Mr.Mine',
    go: 'https://www.coolmathgames.com/0-mr-mine/play',
    image: '/assets/images/icons/mrmine.webp'
  },
  {
    name: 'Moto X3M',
    go: 'https://html5.gamedistribution.com/rvvASMiM/5b0abd4c0faa4f5eb190a9a16d5a1b4c/index.html',
    image: '/assets/images/icons/mx3m.webp'
  },
  {
    name: 'MX3M: Pool Party',
    go: 'https://h0jokl1egt0fd4oc8qv3j0tltl9jbqhn-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://649025137-174029463385024710.preview.editmysite.com/uploads/b/139890129-767696982876512205/files/mx3mpp.xml',
    image: '/assets/images/icons/mx3m.webp'
  },
  {
    name: 'MX3M: Spooky Land',
    go: 'https://html5.gamedistribution.com/rvvASMiM/b8a342904608470a9f3382337aca3558/index.html',
    image: '/assets/images/icons/mx3m-spooky.webp'
  },
  {
    name: 'MX3M: Winter',
    go: 'https://www-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://sites.google.com/site/s017q3e/moto-x3m-4-winter.xml',
    image: '/assets/images/icons/mx3m-winter.webp'
  },
  {
    name: 'Saul Run',
    go: 'https://complex-ify.itch.io/saul-goodman',
    image: '/assets/images/icons/saulrun.webp'
  },
  {
    name: 'NG Space Company',
    go: 'https://interstellarnetwork.github.io/interstellar-assets/play/ng-space-company/frontend/dist/index.html',
    image: '/assets/images/icons/ng.webp'
  },
  {
    name: 'Ninja Cat Exploit',
    go: 'https://html5.gamedistribution.com/rvvASMiM/903ba9346b9d437e9c7e81d672cead44/index.html',
    image: '/assets/images/icons/ninja-cat.webp'
  },
  {
    name: 'OvO',
    go: 'https://8rlfg0ch3417et18dp8lvps6uo7c3b2c-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://427396048-642845047394716217.preview.editmysite.com/uploads/b/139890129-761103484729797659/files/ovo.xml',
    image: '/assets/images/icons/ovo.webp'
  },
  {
    name: 'Online Racing Game!',
    go: 'https://jchabin.github.io/cars/',
    image: '/resources/images/android-chrome-512x512.png'
  },
  {
    name: 'Online Soccer M.',
    go: 'https://www.onlinesoccermanager.com/',
    image: '/assets/images/icons/osm.webp'
  },
  {
    name: 'Papas Bakeria',
    go: 'https://f.silvergames.com/emu/waffle/?id=5458',
    image: '/assets/images/icons/bakeria.webp'
  },
  {
    name: 'Papas Cupcakeria',
    go: 'https://f.silvergames.com/emu/waffle/?id=3246',
    image: '/assets/images/icons/cupcakeria.webp'
  },
  {
    name: 'Papa Louie 1',
    go: 'https://f.silvergames.com/ruffle/player.php?id=1373',
    image: '/assets/images/icons/louie1.webp'
  },
  {
    name: 'Papa Louie 2',
    go: 'https://f.silvergames.com/emu/waffle/?id=3042',
    image: '/assets/images/icons/louie2.webp'
  },
  {
    name: 'Papa Louie 3',
    go: 'https://f.silvergames.com/emu/waffle/?id=4693',
    image: '/assets/images/icons/papa-louie-3.webp'
  },
  {
    name: 'Papas Pizzeria',
    go: 'https://f.silvergames.com/ruffle/player.php?id=1360',
    image: '/assets/images/icons/pizzeria.webp'
  },
  {
    name: 'Paper Mario 64',
    go: 'https://f.kbhgames.com/r/n64/game.php?file=Paper%20Mario%20(USA).zip',
    image: '/assets/images/icons/paper-mario-64.webp'
  },
  {
    name: 'Paper.io',
    go: 'https://paper-io.com/',
    image: '/assets/images/icons/paperio.webp'
  },
  {
    name: 'Pixel Shooter',
    go: 'https://94bfktj403i6m18as4vkvtreqd0ohci4-a-sites-opensocial.googleusercontent.com/gadgets/ifr?url=https://274019683-173520394482650759.preview.editmysite.com/uploads/b/139890129-131715539788281629/files/ps.xml',
    image: '/assets/images/icons/pixel-shooter.webp'
  },
  {
    name: 'Pizza Tower',
    go: 'https://gamaverse.com/c/f/g/pizza-tower-1678640389/index.html',
    image: '/assets/images/icons/pizza-tower.webp'
  },
  {
    name: 'Pokemon Heart Gold',
    go: 'https://static.arcadespot.com/retroemulator.php?system=nds&amp;game=2017/10/pokemon-heartgold-version1.zip',
    image: '/assets/images/icons/heartgold.webp'
  },
  {
    name: 'Pokemon Showdown',
    go: 'https://play.pokemonshowdown.com',
    image: '/assets/images/icons/showdown.webp'
  },
  {
    name: 'PM: Light Platinum',
    go: 'https://browncha023.github.io/GBA/launcher.html#pokemonlp',
    image: '/assets/images/icons/lp.webp'
  },
  {
    name: 'Precision Client',
    href: 'http://raw.githack.com/3kh0/3kh0-assets/main/precision-client/index.html',
    image: '/assets/images/icons/precision.webp'
  },
  {
    name: 'Rainbow Six Siege',
    go: 'https://play.geforcenow.com/games?game-id=1dd07d47-6601-42f7-80e9-e4d8db08ea1b&amp;lang=en_US&amp;asset-id=01_44417-48c3d8e642e2',
    image: '/assets/images/icons/r6.webp'
  },
  {
    name: 'Red Ball 1',
    go: 'https://www.algebrashelper.com/redball',
    image: '/assets/images/icons/redball1.webp'
  },
  {
    name: 'Red Ball 2',
    go: 'https://www.algebrashelper.com/redball-2',
    image: '/assets/images/icons/redball2.webp'
  },
  {
    name: 'Red Ball 4',
    go: 'https://www.algebrashelper.com/redball-4',
    image: '/assets/images/icons/redball4.webp'
  },
  {
    name: 'Red Ball 4 Vol. 2',
    go: 'https://www.algebrashelper.com/read-ball-4v2',
    image: '/assets/images/icons/redball4vol2.webp'
  },
  {
    name: 'Red Ball 4 Vol. 3',
    go: 'https://www.algebrashelper.com/red-ball-4v3',
    image: '/assets/images/icons/redball4vol3.webp'
  },
  {
    name: 'Riddle School 2 [FIXED]',
    go: 'https://f.silvergames.com/ruffle/player.php?id=8564',
    image: '/assets/images/icons/rs1.webp'
  },
  {
    name: 'Rocket Pult',
    go: 'https://v6p9d9t4.ssl.hwcdn.net/html/565140/index.html',
    image: '/assets/images/icons/rocketpult.webp'
  },
  {
    name: 'Rooftop Snipers',
    go: 'https://html5.gamedistribution.com/rvvASMiM/c3a70ae98547407a92ebedca8b79fdfa/index.html',
    image: '/assets/images/icons/rooftop.webp'
  },
  {
    name: 'Run 3',
    go: 'https://www.coolmathgames.com/0-run-3/play',
    image: '/assets/images/icons/run3.webp'
  },
  {
    name: 'Sand Spiel',
    go: 'https://sandspiel.club/',
    image: '/assets/images/icons/sand.webp'
  },
  {
    name: 'Sandboxels',
    go: 'https://v6p9d9t4.ssl.hwcdn.net/html/5808591/index.html',
    image: '/assets/images/icons/sandboxels.webp'
  },
  {
    name: 'Shapez.IO',
    go: 'https://shapez.io',
    image: '/assets/images/icons/shapezio.webp'
  },
  {
    name: 'Shell Shockers',
    go: 'https://shellshock.io/',
    image: '/assets/images/icons/shell-shockers.webp'
  },
  {
    name: 'Slither Io',
    href: 'http://slither.io/',
    image: '/assets/images/icons/slither.webp'
  },
  {
    name: 'Slope',
    go: 'https://watchdocumentaries.com/wp-content/uploads/games/slope/',
    image: '/assets/images/icons/slope.webp'
  },
  {
    name: 'Smash Bros 64',
    go: 'https://emulatorgames.online/games/n64/super-smash-bros',
    image: '/assets/images/icons/super-smash-bros-64.webp'
  },
  {
    name: 'Smash Karts',
    go: 'https://smashkarts.io/',
    image: '/assets/images/icons/smashkarts.webp'
  },
  {
    name: 'Snowball.io',
    go: 'https://games.crazygames.com/en_US/snowball-io/index.html',
    image: '/assets/images/icons/snowball.webp'
  },
  {
    name: 'Space',
    go: 'https://cowsssss.github.io/Space/',
    image: '/assets/images/icons/na.webp'
  },
  {
    name: 'Space Plan',
    href: 'http://jhollands.co.uk/spaceplan/',
    image: '/assets/images/icons/spaceplan.webp'
  },
  {
    name: 'Super Mario 63',
    go: 'https://www.numuki.com/gameframe/super-mario-63',
    image: '/assets/images/icons/sm63.webp'
  },
  {
    name: 'Super Mario 64',
    go: 'https://f.kbhgames.com/r/n64/game.php?file=32112_super-mario-64-usa.zip',
    image: '/assets/images/icons/sm64.webp'
  },
  {
    name: 'Super Smash Flash',
    go: 'https://f.kbhgames.com/RS/game.php?r=//f.kbhgames.com/2018/swf/smashflash.swf&amp;w=1521&amp;h=753',
    image: '/assets/images/icons/ssf1.webp'
  },
  {
    name: 'Supply Chain Idle',
    href: 'http://chat.kongregate.com/gamez/0027/1653/live/index.html?kongregate_game_version=1554392772',
    image: '/assets/images/icons/na.webp'
  },
  {
    name: 'Taming.io',
    go: 'https://taming.io/',
    image: '/assets/images/icons/tamingio.webp'
  },
  {
    name: 'Tanuki Sunset',
    go: 'https://watchdocumentaries.com/wp-content/uploads/games/tanuki-sunset',
    image: '/assets/images/icons/tanuki.webp'
  },
  {
    name: 'The Simpsons',
    go: 'https://static.arcadespot.com/retroemulator.php?system=nds&amp;game=2017/11/the-simpsons-game.zip',
    image: '/assets/images/icons/the-simpsons-game.webp'
  },
  {
    name: 'Temple Run 2',
    go: 'https://watchdocumentaries.com/wp-content/uploads/games/temple-run-2/',
    image: '/assets/images/icons/temple-run-2.webp'
  },
  {
    name: 'Tritis',
    go: 'https://leognon.com/tritris/',
    image: '/assets/images/icons/tritis.webp'
  },
  {
    name: 'THs Pro Skater 2',
    go: 'https://browncha023.github.io/GBA/launcher.html#thps2',
    image: '/assets/images/icons/thps2.webp'
  },
  {
    name: 'THs Pro Skater 3',
    go: 'https://browncha023.github.io/GBA/launcher.html#thps3',
    image: '/assets/images/icons/thps3.webp'
  },
  {
    name: 'THs Pro Skater 4',
    go: 'https://browncha023.github.io/GBA/launcher.html#thps4',
    image: '/assets/images/icons/thps4.webp'
  },
  {
    name: 'Twitch Tetris',
    go: 'https://www.rossipotti.de/ausgabe28/tetris/controls.html',
    image: '/assets/images/icons/na.webp'
  },
  {
    name: 'Vex 5',
    go: 'https://raw.githack.com/3kh0/3kh0-assets/main/vex5/index.html',
    image: '/assets/images/icons/vex5.webp'
  },
  {
    name: 'Vex 7',
    go: 'https://interstellarnetwork.github.io/interstellar-assets/play/vex7/index.html',
    image: '/assets/images/icons/vex7.webp'
  },
  {
    name: 'Voxiom.io',
    go: 'https://voxiom.io/',
    image: '/assets/images/icons/voxiom.webp'
  },
  {
    name: 'Zombs Royale',
    go: 'https://zombsroyale.io/',
    image: '/assets/images/icons/zombs-royale.webp'
  },
  {
    name: 'Electric Man 2',
    href: 'games/electric_man_2/index.html',
    image: '/assets/images/icons/electricman-2.webp'
  },
  {
    name: 'Learn To Fly',
    href: 'games/learn-to-fly/index.html',
    image: '/assets/images/icons/learn-to-fly.webp'
  },
  {
    name: 'Learn To Fly 2',
    href: 'games/learn-to-fly-2/index.html',
    image: '/assets/images/icons/learn-to-fly-2.webp'
  },
  {
    name: 'Particle Clicker',
    href: 'games/particle-clicker/index.html',
    image: '/assets/images/icons/pc.webp'
  },
  {
    name: 'QWOP',
    href: 'games/qwop/index.html',
    image: '/assets/images/icons/qwop.webp'
  },
  {
    name: 'Retro Bowl',
    href: 'resources/play/retro-bowl/index.html',
    image: '/assets/images/icons/retro.webp'
  },
  {
    name: 'Stickman Hook',
    href: 'games/stickman-hook/index.html',
    image: '/assets/images/icons/stickman.webp'
  },
  {
    name: 'Unfair Mario',
    href: 'games/unfair-mario/index.html',
    image: '/assets/images/icons/unfair-mario.webp'
  }
  ];
  const appsContainer = document.querySelector('.container-apps');
  appsList.forEach(app => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    const span1Div = document.createElement('div');
    span1Div.classList.add('span1');
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'animals');
    cardDiv.setAttribute('loading', 'lazy');
    cardDiv.style.paddingTop = '5px';
    const link = document.createElement('a');
    link.classList.add('animals');
    link.setAttribute('onclick', `go('${app.go}')`);
    const image = document.createElement('img');
    image.setAttribute('loading', 'lazy');
    image.src = app.image;
    image.style.borderRadius = '25px';
    const paragraph = document.createElement('p3');
    paragraph.textContent = app.name;
    link.appendChild(image);
    cardDiv.appendChild(link);
    cardDiv.appendChild(paragraph);
    span1Div.appendChild(cardDiv);
    rowDiv.appendChild(span1Div);
    appsContainer.appendChild(rowDiv);
  });
});
