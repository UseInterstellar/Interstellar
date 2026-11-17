# webretro
[RetroArch](https://github.com/libretro) ported to WebAssembly with [emscripten](https://emscripten.org/)!

[**Official Instance**](https://binbashbanana.github.io/webretro/)

### Latest version: v6.5

These cores are included pre-built with the repository (ROMs **NOT** included):
* a5200 (Atari 5200)
* Beetle NeoPop (Neo-Geo Pocket)
* Beetle PSX HW (PlayStation)
* Beetle VB (Virtual Boy)
* Beetle WonderSwan (WonderSwan)
* FreeChaF (Fairchild Channel F)
* FreeIntv (Intellivision)
* Gearcoleco (ColecoVision)
* Genesis Plus GX (Sega Systems)
* Handy (Atari Lynx)
* melonDS (Nintendo DS)
* mGBA (GB/GBC/GBA)
* Mupen64Plus-Next (Nintendo 64)
* NeoCD (Neo-Geo CD)
* Nestopia UE (NES)
* O2EM (Odyssey 2)
* Opera (3DO)
* ParaLLEl N64 (Nintendo 64)
* ProSystem (Atari 7800)
* Snes9x (SNES)
* Stella 2014 (Atari 2600)
* Vecx (Vectrex)
* Virtual Jaguar (Atari Jaguar)
* Yabause (Sega Saturn)

## Table of contents
* [Top](#webretro)
* [Table of contents](#table-of-contents)
* [Features](#features)
* [How to use](#how-to-use)
* [Embedding](#embedding)
* [Todo / Planned features](#todo-planned-features)
* [Building from source](#building-from-source)
* [Notes](#notes)
* [Acknowledgements](#acknowledgements)

## Features

* The user can upload their ROM directly, or using Google Drive/Dropbox/OneDrive.
* Importing/Exporting of save states and SRAM is supported.
* States and SRAM are saved to indexedDB per ROM name. (SRAM autosaves every 5 minutes by default)
* ROMs can be inside of zip files (The ROM file name is used in this case, instead of the zip file name).
* Users can take screenshots, and download them individually, or all at once.
* Users can recover saves or states from roms that were lost or renamed.
* Cheat codes are supported.
* A curated collection of shaders can be used (CRT shaders, ScaleFX, ScaleHQ, xBRZ, various interpolation shaders)
* SMAS brick fix should automatically be softpatched to SMAS ROMs.
* The keybinds are remapped so that all the inputs should be supported by a normal keyboard, but can be changed by the user. The default keybinds can be changed on line 12 of `assets/base.js`.
* Installable PWA with support for the new [file handler API](https://developer.chrome.com/blog/new-in-chrome-102/#file-handlers).

## How to use

The asset bundle will be fetched from GitHub using jsdelivr by default. You can change this option on line 10 and 11 of `assets/base.js` (example alternate value: `"./"`).

Query string options:
* `core` - specify the libretro core *library* to use, i.e. `genesis_plus_gx`, `mgba`, `mupen64plus_next`, `nestopia`, `snes9x`, etc. `autodetect` can also be used, which attempts to find the correct core for the ROM (slower to load because the core is loaded after the ROM) (if not specified, the user will be shown a list of the default cores).
* `system` - same as above, but will attempt to detect the core based on the specified system, i.e. `gba`, `genesis`, `nes`, `nintendo 64`, `snes`, etc. If both `core` and `system` are specified, `core` will override `system`.
* `rom` - will attempt to fetch a ROM from the `./roms/` directory on the server, or an absolute url (including protocol), e.g. `mario3.nes` (if not specified, the user will be prompted to upload a ROM).
* `nobundle` - skips the bundle fetch.
* `console` - opens the console window on load.
* `noautorefocus` - prevents embedded webretro from automatically refocusing the frame.
* `forcestartbutton` - always show the start button (only if `rom` is also specified).

Example OK query uris:
* `?core=snes9x&rom=dkc.smc&nobundle&console`
* `?core=mgba&rom=https://example.com/marioadvance3.zip`
* `?core=autodetect&rom=supermarioworld.sfc`
* `?core=autodetect&nobundle`
* `?core=genesis_plus_gx`
* `?`

## Embedding

You can easily embed webretro on your site by using the api provided in `embed/embed.js`. You can see an example of it [here](https://binbashbanana.github.io/webretro/embed/embed-example.html).

How to use: `webretroEmbed(domNodeToAppendTo, webretroPath, queries)` (returns the new iframe node that it creates)
* `domNodeToAppendTo` - the element that you want webretro to load into.
* `webretroPath` - the path to the index of the webretro instance.
* `queries` - object containing the query string options shown above.

## Todo / Planned features

Mostly long-term:

* more cores
* mobile support
* dynamic linking
* netplay

## Building from source

[Instructions](./source#readme)

## Notes

libretro emscripten support tracker: [spreadsheet](https://docs.google.com/spreadsheets/d/13Lse1ipcUIBb8drVyIl6NKNliW5fFXyfkpJnxb2h1SE)

* Mupen64Plus-Next would sometimes encounter a stack overflow error on some games. The stack size has been increased to mitigate this, but it can still happen on some games if left running for long enough. The root cause of the stack overflow has not yet been found. It is still recommended to use this core rather than ParaLLEl N64, because this core has the better renderer. If the issue is too much of a problem, use ParaLLEl N64 instead.
* Stella (latest) immediately exits on content load for some reason. Stella 2014 is used instead.

## Acknowledgements

Extra thanks to [ToadKing](https://github.com/ToadKing) for the initial port of RetroArch to emscripten, including rweb drivers as well as libco support.
