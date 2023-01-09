"use strict";

var games = {
    "007":"007 - Everything Or Nothing",
    "advancewars":"Advance Wars",
    "advancewars2":"Advance Wars 2",
    "aladdin":"Aladdin",
    "alienhominid":"Alien Hominid",
    "atari":"Atari Anniversary Advance",
    "bomberman_max2blue":"Bomberman Max 2 - Blue Advance",
    "bomberman_tournament":"Bomberman Tournament",
    "bubblebobble":"Bubble Bobble",
    "cbha":"Crash Bandicoot - The Huge Adventure",
    "cbprr":"Crash Bandicoot - Purple Riptos Rampage",
    "cb2":"Crash Bandicoot 2 - N-Tranced",
    "cnk":"Crash Nitro Kart",
    "cfpt":"Connect 4/Perfection/Trouble",
    "croket1":"Croket! - Yume no Banker Survival!",
    "croket2":"Croket! 2 - Yami no Bank to Banqueen",
    "croket3":"Croket! 3 - Granu Oukoku no Nazo",
    "croket4":"Croket! 4 - Bank no Mori no Mamorigami",
    "digimon_racing":"Digimon Racing",
    "dbz_supersonic":"Dragon Ball Z - Supersonic Warriors",
    "dmpl":"Dr. Mario+Puzzle League",
    "dnd":"Dungeons And Dragons - Eye Of The Beholder",
    "dna":"Duke Nukem Advance",
    "dkkos":"DK - King Of Swing",
    "dkc":"Donkey Kong Country",
    "dkc2":"Donkey Kong Country 2",
    "dkc3":"Donkey Kong Country 3",
    "dm":"Doom",
    "dm2":"Doom 2",
    "drilldozer":"Drill Dozer",
    "earthwormjim":"Earthworm Jim",
    "earthwormjim2":"Earthworm Jim 2",
    "ffeud":"Family Feud",
    "fan4":"Fantastic 4",
    "fan4fo":"Fantastic 4 - Flame On",
    "fifa4":"FIFA Football 2004",
    "fifa5":"FIFA Football 2005",
    "fifa6":"FIFA 06",
    "fifawc6":"FIFA World Cup 2006",
    "fifa7":"FIFA 2007",
    "ff1and2":"Final Fantasy 1 & 2 Advance",
    "ff4S":"Final Fantasy IV Advance (Sound Restoration Mod)",
    "ff6":"Final Fantasy VI Advance",
    "final_fantasy_tactics":"Final Fantasy Tactics Advance",
    "fire_emblem":"Fire Emblem",
    "fr3":"Ford Racing 3",
    "frogger1":"Frogger Advance - The Great Quest",
    "frogger2":"Frogger's Adventures - Temple of the Frog",
    "frogger3":"Frogger's Adventures 2 - The Lost Wand",
    "fzero_gp":"F-Zero - GP Legend",
    "fzero_max":"F-Zero - Maximum Velocity",
    "gamewatch4":"Game & Watch Gallery 4",
    "goldensun":"Golden Sun",
    "gta":"Grand Theft Auto Advance",
    "gunstar_super_heroes":"Gunstar Super Heroes",
    "hamtaro_heartbreak":"Hamtaro - Ham-Ham Heartbreak",
    "hmfmt":"Harvest Moon - Friends Of Mineral Town",
    "hmmfmt":"Harvest Moon - More Friends Of Mineral Town",
    "iridion":"Iridion 3D",
    "jca":"Jackie Chan Adventures - Legend Of The Dark Hand",
    "jbn":"James Bond 007 - Nightfire",
    "jlifa":"Justice League - Injustice For All",
    "jlc":"Justice League Chronicles",
    "jlhth":"Justice League Heros - The Flash",
    "jp3dna":"Jurassic Park III - DNA Factor",
    "jp3ia":"Jurassic Park III - Island Attack",
    "jp3pb":"Jurassic Park III - Park Builder",
    "puyopop":"Puyo Pop",
    "khcom":"Kingdom Hearts - Chain Of Memories",
    "kirbymirror":"Kirby & The Amazing Mirror",
    "kirbynightmare":"Kirby: Nightmare in Dreamland",
    "lb":"Lego Bionicle",
    "li2":"Lego Island 2",
    "lr2":"Lego Racers 2",
    "lsw":"Lego Star Wars",
    "lotrtta":"Lord Of The Rings: The Third Age",
    "lotr2":"Lord Of The Rings: The Two Towers",
    "lotr3":"Lord Of The Rings: The Return Of The King",
    "mariokart":"Mario Kart: Super Circuit",
    "marioland":"The Mario Land Collection",
    "marioparty":"Mario Party Advance",
    "mariopinball":"Mario Pinball Land",
    "mvsdk":"Mario V.S. Donkey Kong",
    "megamanbass":"Megaman & Bass",
    "megaman_battle1":"Megaman Battle Network 1",
    "megaman_battle2":"Megaman Battle Network 2",
    "megaman_battle3_blue":"Megaman Battle Network 3 Blue",
    "megaman_battle4_blue":"Megaman Battle Network 4 Blue Moon",
    "megaman_battle4_red":"Megaman Battle Network 4 Red Sun",
    "megaman_battle5":"Megaman Battle Network 5 Team Protoman",
    "megaman_battle6":"Megaman Battle Network 6 Cybeast Falzar",
    "megaman_zero1":"Megaman Zero",
    "megaman_zero2":"Megaman Zero 2",
    "megaman_zero3":"Megaman Zero 3",
    "megaman_zero4":"Megaman Zero 4",
    "metalslug":"Metal Slug Advance",
    "metroid_fusion":"Metroid Fusion",
    "mzm":"Metroid Zero Mission",
    "momotarou_dentetsu":"Momotarou Dentetsu G Gold Deck wo Tsukure!",
    "monopoly":"Monopoly",
    "monster_force":"Monster Force",
    "mortal_kombat":"Mortal Kombat Advance",
    "m3":"Mother 3",
    "nbaj":"NBA Jam 2002",
    "nesgh1":"NES Greatest Hits 1",
    "nfsu":"Need For Speed - Underground",
    "nfsu2":"Need For Speed - Underground 2",
    "onepiece":"One Piece",
    "pmc":"Pacman Collection",
    "pmpa":"Pacman Pinball Advance",
    "pacman_world":"Pacman World",
    "pacman_world2":"Pacman World 2",
    "pokemonemerald":"Pokemon Emerald",
    "pokemonek":"Pokemon Emerald (Kaizo Mod)",
    "eprp":"Pokemon Emerald (Party Randomizer Plus Mod)",
    "pokemonflorasky":"Pokemon Flora Sky (Emerald Mod)",
    "pokemongb":"The Pokemon Collection",
    "pokemongreen":"Pokemon Leaf Green",
    "mysteryred":"Pokemon Mystery Dungeon Red",
    "pokemonruby":"Pokemon Ruby",
    "pokemonsapphire":"Pokemon Sapphire",
    "pokemonred":"Pokemon Fire Red",
    "pokemonlp":"Pokemon Light Platinum (Ruby Mod)",
    "gaia":"Pokemon Gaia (Fire Red Mod)",
    "gba_video_pokemon_1":"Pokemon Video Pak 1",
    "gba_video_pokemon_2":"Pokemon Video Pak 2",
    "gba_video_pokemon_3":"Pokemon Video Pak 3",
    "gba_video_pokemon_4":"Pokemon Video Pak 4",
    "pprs":"Pokemon Pinball - Ruby & Sapphire",
    "prs":"Pokemon Rocket Strike (Fire Red Mod)",
    "pokewb":"Pokemon Water Blue (Fire Red Mod)",
    "ppf":"Puyo Pop Fever",
    "rsrs":"Rainbow Six - Rouge Spear",
    "r3hh":"Rayman 3 - Hoodlum Havoc",
    "ra":"Rayman Advance",
    "rtpl":"Rivera - The Promised Land",
    "sag":"Sega Arcade Gallery",
    "sc":"Sim City 2000",
    "sonic_advance":"Sonic Advance",
    "sonic_advance2":"Sonic Advance 2",
    "sonic_advance3":"Sonic Advance 3",
    "sonicbattle":"Sonic Battle",
    "sthg":"Sonic The Hedgehog - Genesis",
    "supermonkeyballjr":"Super Monkey Ball Jr",
    "superstar":"Mario & Luigi: Superstar Saga",
    "supermarioadvance":"Super Mario Advance",
    "supermarioadvance2":"Super Mario Advance 2",
    "supermarioadvance3":"Super Mario Advance 3",
    "supermarioadvance4":"Super Mario Advance 4",
    "sma4+":"Super Mario Advance 4 (Wii U Version)",
    "simpsons":"The Simpsons: Road Rage",
    "sonicpinball":"Sonic Pinball",
    "super_street_fighter_2_turbo_revival":"Super Street Fighter II: Turbo Revival",
    "super_street_fighter_3_alpha":"Super Street Fighter III: Alpha",
    "tales_of_phantasia":"Tales of Phantasia",
    "tak2_staff_of_dreams":"Tak 2: The Staff of Dreams",
    "tetris_worlds":"Tetris Worlds",
    "lyp":"The Game Of Life/Yahtzee/Payday",
    "tmnt":"Teenage Mutant Ninja Turtles",   
    "sims_bustin_out":"The Sims: Bustin' Out",
    "sims2":"The Sims 2",
    "thas":"Tony Hawk's American Sk8land",
    "thps2":"Tony Hawk's Pro Skater 2",
    "thps3":"Tony Hawk's Pro Skater 3",
    "thps4":"Tony Hawk's Pro Skater 4",
    "tggtc":"Top Gear GT Championship",
    "tgr":"Top Gear Rally",
    "spyro_adventure":"Spyro Adventure",
    "spyro_ice":"Spyro: Season of Ice",
    "spyro_flame":"Spyro 2: Season of Flame",
    "turok_evolution":"Turok Evolution",
    "ty2":"Ty the Tasmanian Tiger 2 - Bush Rescue",
    "ty3":"Ty the Tasmanian Tiger 3 - Night of the Quinkan",
    "unsb":"Uno+Skip-Bo",
    "warioland4":"Wario Land 4",
    "wario_ware":"Wario Ware Inc",
    "ynfa":"Yggdra Union - We'll Never Fight Alone",
    "zelda_past":"The Legend of Zelda: A Link to the Past",
    "zelda_minish":"The Legend of Zelda: The Minish Cap"
};
var Iodine = null;
var Blitter = null;
var Mixer = null;
var MixerInput = null;
var timerID = null;
window.onload = function () {
    if (!games[location.hash.substr(1)]) {
        alert("Invalid game request!");
        return;
    }
    //Initialize Iodine:
    Iodine = new GameBoyAdvanceEmulator();
    //Initialize the graphics:
    registerBlitterHandler();
    //Initialize the audio:
    registerAudioHandler();
    //Register the save handler callbacks:
    registerSaveHandlers();
    //Hook the GUI controls.
    registerGUIEvents();
    //Enable Sound:
    Iodine.enableAudio();
    //Download the BIOS:
    downloadBIOS();
}
function downloadBIOS() {
    downloadFile("Binaries/gba_bios.bin", registerBIOS);
}
function registerBIOS() {
    processDownload(this, attachBIOS);
    downloadROM(location.hash.substr(1));
}
function downloadROM(gamename) {
    Iodine.pause();
    showTempString("Downloading \"" + games[gamename] + ".\"");
    downloadFile("Binaries/" + gamename + ".gba", registerROM);
}
function registerROM() {
    clearTempString();
    processDownload(this, attachROM);
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
        Iodine.disableAudio();
    }
    Iodine.play();
}
function registerBlitterHandler() {
    Blitter = new GlueCodeGfx();
    Blitter.attachCanvas(document.getElementById("emulator_target"));
    Blitter.setSmoothScaling(false);
    Iodine.attachGraphicsFrameHandler(function (buffer) {Blitter.copyBuffer(buffer);});
}
function registerAudioHandler() {
    Mixer = new GlueCodeMixer();
    MixerInput = new GlueCodeMixerInput(Mixer);
    Iodine.attachAudioHandler(MixerInput);
}
function registerGUIEvents() {
    addEvent("keydown", document, keyDown);
    addEvent("keyup", document, keyUpPreprocess);
    addEvent("unload", window, ExportSave);
    Iodine.attachSpeedHandler(function (speed) {
        document.title = games[location.hash.substr(1)] + " - " + speed;
    });
}
function lowerVolume() {
    Iodine.incrementVolume(-0.04);
}
function raiseVolume() {
    Iodine.incrementVolume(0.04);
}
function writeRedTemporaryText(textString) {
    if (timerID) {
        clearTimeout(timerID);
    }
    showTempString(textString);
    timerID = setTimeout(clearTempString, 5000);
}
function showTempString(textString) {
    document.getElementById("tempMessage").style.display = "block";
    document.getElementById("tempMessage").textContent = textString;
}
function clearTempString() {
    document.getElementById("tempMessage").style.display = "none";
}
//Some wrappers and extensions for non-DOM3 browsers:
function addEvent(sEvent, oElement, fListener) {
    try {    
        oElement.addEventListener(sEvent, fListener, false);
    }
    catch (error) {
        oElement.attachEvent("on" + sEvent, fListener);    //Pity for IE.
    }
}
function removeEvent(sEvent, oElement, fListener) {
    try {    
        oElement.removeEventListener(sEvent, fListener, false);
    }
    catch (error) {
        oElement.detachEvent("on" + sEvent, fListener);    //Pity for IE.
    }
}
