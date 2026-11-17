# Building from source

Building cores is a 3-step process:
1. [Setup](#step-1-setup-only-do-this-step-once) (you only need to do this once)
* [Setup WSL2 if on windows](#setup-wsl2-if-on-windows)
* [Setup git](#setup-git)
* [Setup emscripten](#setup-emscripten)
    * [Patch emscripten](#patch-emscripten)

2. [Build the core](#step-2-building-the-core) (repeat as needed)
* [Clone the core](#clone-the-core) from GitHub if you haven't already
    * [Patch the core](#patch-the-core) if needed
* [Set emscripten env vars](#set-emscripten-environment-variables-1) in your shell
* [Build the core](#build-the-core) (will output a `.bc` file that will be used later)

3. [Link core(s) with RetroArch](#step-3-link-cores-with-retroarch)
* [Clone RetroArch](#clone-retroarch) from GitHub if you haven't already
    * [Patch RetroArch](#patch-retroarch)
* [Set emscripten env vars](#set-emscripten-environment-variables-2) in your shell
* [Copy the `.bc` files](#copy-the-bc-files) from earlier into the RetroArch repo
    * [Important note](#important-note)
* [Build RetroArch](#build-retroarch) (this links the core(s))
* [Copy the `.js` and `.wasm` files](#copy-the-js-and-wasm-files) into the core directory in the webretro repo

[General reference](#general-reference)
* [Set emscripten environment variables](#set-emscripten-environment-variables)
* [Developer commands](#developer-commands)
* [Core reference](#core-reference)

## Step 1: Setup (Only do this step once)

### Setup WSL2 if on windows

You need to set up WSL2 if on windows, otherwise proceed to the next step. I use Debian 11 on WSL2.  
Follow the instructions [here](https://docs.microsoft.com/windows/wsl/install) to install WSL2.

Please note that any further terminal use in these instructions will need to use the bash shell. On windows, simply go to a command prompt or powershell and type `bash`

### Setup git

Follow the instructions [here](https://git-scm.com/download/linux) to install git.  
Or on Debian or Ubuntu, simply type `sudo apt install git`

### Setup emscripten

Ensure Python 3 is installed first.  
On Debian or Ubuntu, simply type `sudo apt install python3`

Follow the instructions [here](https://emscripten.org/docs/getting_started/downloads.html#installation-instructions-using-the-emsdk-recommended) to install the emsdk.  
!!!!! DO NOT USE EMSDK TO INSTALL EMSCRIPTEN YET !!!!!  
Or run these commands to install emsdk:
```
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
```

Now use emsdk to install emscripten (version: 2.0.15):
```
./emsdk install 2.0.15
./emsdk activate 2.0.15
```

#### Patch emscripten

Emscripten's `library_webgl.js` needs patching due to [issue 4214](https://github.com/emscripten-core/emscripten/issues/4214). Without the patch some pretty strange graphics bugs can happen on 3D cores.  
In the future I may work on a faster fix like the one mentioned [here](https://github.com/emscripten-core/emscripten/issues/4214#issuecomment-297382439).

1. CD into the emsdk directory
2. Download [`emscripten.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/emscripten.patch) and place it in the base directory of the emsdk repository
3. Run this command:
```
patch -u -p0 -i emscripten.patch
```

## Step 2: Building the core

### Clone the core

(Only do this step once)

Go to the [core reference](#core-reference) section and find the core that you want to build. If it is not listed, find it on GitHub and skip the checkout and patch step.

##### If the core is listed in [core reference](#core-reference)

Clone the repository and checkout to the specific commit that I built with:
```
git clone -n <REPOSITORY>
cd <REPOSITORY DIR>
git checkout <COMMIT SHA>
```


Cloning and checking out Nestopia as an example:
```
git clone -n https://github.com/libretro/nestopia
cd nestopia
git checkout a9e197f2583ef4f36e9e77d930a677e63a2c2f62
```

##### If the core is *not* listed in [core reference](#core-reference)

Just clone the repository:
```
git clone <REPOSITORY>
```

Cloning Nestopia as an example:
```
git clone https://github.com/libretro/nestopia
```

#### Patch the core

(Only do this step once)

If you found the core in [core reference](#core-reference) AND it has a listed patch file, follow these instructions to apply the patch. Otherwise, skip this step.

1. CD into the core directory
2. Download the provided patch file and place it in the base directory of the cloned core repository
3. Run this command:
```
git apply <PATCHFILE>
```

Patching Mupen64Plus-Next as an example:
```
git apply mupen64plus_next.patch
```

### Set emscripten environment variables (1)

See [set emscripten environment variables](#set-emscripten-environment-variables)

### Build the core

1. CD into the core directory
2. Locate the makefile, it's usually called `Makefile.libretro` or just `Makefile`. Sometimes it is in subdirectories, look for ones with "libretro" in the name.
3. CD into the directory where the makefile is (or don't CD if the makefile is at the base directory of the core repository)  
4. Run this command:
```
emmake make -f <MAKEFILE> platform="emscripten"
```
Wait for the core to finish building. It may take up to a hour depending on the speed of your computer and the size of the core.  
After the build is finished, you will be left with a `.bc` file. Save it for the next step.

Here are some examples:

Nestopia:
```
cd libretro
emmake make -f Makefile platform="emscripten"
```

Mupen64Plus-Next:
```
emmake make -f Makefile platform="emscripten"
```

Genesis Plus GX:
```
emmake make -f Makefile.libretro platform="emscripten"
```

## Step 3: Link core(s) with RetroArch

### Clone RetroArch

(Only do this step once)

Clone the repository and checkout to the specific commit that I built with:
```
git clone -n https://github.com/libretro/RetroArch
cd RetroArch
git checkout 1f3fa0a35b0b572204911b9845391df62ab22b96
```

#### Patch RetroArch

(Only do this step once)

1. CD into the RetroArch directory
2. Download [`retroarch.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/retroarch.patch) and place it in the base directory of the RetroArch repository
3. Run this command:
```
git apply retroarch.patch
```

### Set emscripten environment variables (2)

See [set emscripten environment variables](#set-emscripten-environment-variables)

### Copy the bc files

Copy the `.bc` file(s) from earlier into the `dist-scripts` subdirectory of the RetroArch repository. You can link multiple cores at once with some exceptions: (see note)

#### Important note

it's important to note that cores that use different linker settings will need to be linked *in separate groups*, these include
* GLES3 (as opposed to GLES2) (`mupen64plus_next`, `parallel_n64`, `mednafen_psx_hw`) (compile + link time)
* different amounts of memory (`mupen64plus_next`, `mednafen_psx(_hw)`) (link time)
* Pthreads (`melonds` if built with thread support) (compile + link time)
* Asyncify (`mupen64plus_next`, `parallel_n64`) (link time)

### Build RetroArch

1. CD into `RetroArch/dist-scripts`
2. Run this command:
```
emmake ./dist-cores.sh emscripten
```
Wait for the build and linking to complete. The build usually takes around 5 minutes and linking can take up to 2 minutes per core.

### Copy the js and wasm files

The built `.js` and `.wasm` files will be in the `pkg/emscripten` subdirectory of the RetroArch repository.  
Copy them into the `cores` directory of your webretro instance. You are done!

## General reference

### Set emscripten environment variables

In order to use commands such as `emmake`, you first need to use the environment variables script provided with emsdk.  
You need to call it with source, which is simply a period (`.`) in bash.

The command should look something like this (replace the path with the actual path to the script):
```
. path/to/emsdk/emsdk_env.sh
```

### Developer commands

#### Create a normal patch

```
diff -u original.file modified.file > patch.patch
```
may have to edit the file to change the file path

#### Create a git patch

If there are untracked files:
```
git add .
git diff --cached > patch.patch
git reset .
```

Otherwise:
```
git diff > patch.patch
```

#### Check local commit

```
git rev-parse HEAD
```

### Core reference

#### a5200

GitHub: [`https://github.com/libretro/a5200`](https://github.com/libretro/a5200)  
Commit: `46035d00a5fb7ffd3a63172c2d0a8c6b6ae7efc1`  
Patch file: [`a5200.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/a5200.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Beetle NeoPop

GitHub: [`https://github.com/libretro/beetle-ngp-libretro`](https://github.com/libretro/beetle-ngp-libretro)  
Commit: `d4b1a533a4ee2b600771bca21b270c4c27e7440b`  
Patch file: [`mednafen_ngp.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/mednafen_ngp.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Beetle PSX HW

GitHub: [`https://github.com/libretro/beetle-psx-libretro`](https://github.com/libretro/beetle-psx-libretro)  
Commit: `f3dedf5372d6ca2b994268fecedd97e65cf86396`  
Patch file: [`mednafen_psx_hw.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/mednafen_psx_hw.patch)  
Makefile path: `./Makefile`  
Extra notes: see pull [#856](https://github.com/libretro/beetle-psx-libretro/pull/856). For building without HW, don't apply the patch.

#### Beetle VB

GitHub: [`https://github.com/libretro/beetle-vb-libretro`](https://github.com/libretro/beetle-vb-libretro)  
Commit: `0b9ea3882e187bc1fe0daf3d258fde660798ed7e`  
Patch file: [`mednafen_vb.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/mednafen_vb.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Beetle WonderSwan

GitHub: [`https://github.com/libretro/beetle-wswan-libretro`](https://github.com/libretro/beetle-wswan-libretro)  
Commit: `16d96f64a32cbe1fa89c40b142298dbd007f2f4d`  
Patch file: [`mednafen_wswan.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/mednafen_wswan.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### FreeChaF

GitHub: [`https://github.com/libretro/FreeChaF`](https://github.com/libretro/FreeChaF)  
Commit: `1030d5e64078767480cccef4c7e5539db4be31b9`  
Patch file: [`freechaf.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/freechaf.patch)  
Makefile path: `./Makefile`  
Extra notes: FreeChaF has submodules, run this command after cloning/checkout: `git submodule update --init`

#### FreeIntv

GitHub: [`https://github.com/libretro/FreeIntv`](https://github.com/libretro/FreeIntv)  
Commit: `295dd3c9e4b2d4f652f6a6a904afbe90a8187068`  
Patch file: [`freeintv.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/freeintv.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Gearcoleco

GitHub: [`https://github.com/drhelius/Gearcoleco`](https://github.com/drhelius/Gearcoleco)  
Commit: `b1dac72f99dca329620cfbc72909bc90dff1837f`  
Patch file: [`gearcoleco.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/gearcoleco.patch)  
Makefile path: `./platforms/libretro/Makefile`  
Extra notes: 

#### Genesis Plus GX

GitHub: [`https://github.com/libretro/Genesis-Plus-GX`](https://github.com/libretro/Genesis-Plus-GX)  
Commit: `643163443db96ca89d1826422a414da3768b4641`  
Patch file: [`genesis_plus_gx.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/genesis_plus_gx.patch)  
Makefile path: `./Makefile.libretro`  
Extra notes: 

#### Handy

GitHub: [`https://github.com/libretro/libretro-handy`](https://github.com/libretro/libretro-handy)  
Commit: `517bb2d02909271836604c01c8f09a79ad605297`  
Patch file: [`handy.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/handy.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### melonDS

GitHub: [`https://github.com/libretro/melonds`](https://github.com/libretro/melonds)  
Commit: `490a66a5834e23304addc9b16a2f95da6db9f061`  
Patch file: [`melonds.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/melonds.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### mGBA

GitHub: [`https://github.com/libretro/mgba`](https://github.com/libretro/mgba)  
Commit: `5d48e0744059ebf38a4e937b256ffd5df4e0d103`  
Patch file: none  
Makefile path: `./Makefile.libretro`  
Extra notes: 

#### Mupen64Plus-Next

GitHub: [`https://github.com/libretro/mupen64plus-libretro-nx`](https://github.com/libretro/mupen64plus-libretro-nx)  
Commit: `6e9dcd2cd9d23d3e79eaf2349bf7e9f25ad45bf1`  
Patch file: [`mupen64plus_next.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/mupen64plus_next.patch)  
Makefile path: `./Makefile`  
Extra notes: Some of the patch was made by [ToadKing](https://github.com/ToadKing) in [this commit](https://github.com/libretro/mupen64plus-libretro-nx/commit/5d52c665937dec7f3db41b71f77f85768ea697d0) ([original commit](https://github.com/ToadKing/mupen64plus-libretro-nx/commit/9ed943928135d5cd7eb291332a8fe3b8c38e1476)).

#### NeoCD

GitHub: [`https://github.com/libretro/neocd_libretro`](https://github.com/libretro/neocd_libretro)  
Commit: `b7d96e794f2dfa500cba46c78cbc3c28349cfd05`  
Patch file: [`neocd.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/neocd.patch)  
Makefile path: `./Makefile`  
Extra notes: Patch adds necessary LZMA deps to statically linked build

#### Nestopia UE

GitHub: [`https://github.com/libretro/nestopia`](https://github.com/libretro/nestopia)  
Commit: `a9e197f2583ef4f36e9e77d930a677e63a2c2f62`  
Patch file: [`nestopia.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/nestopia.patch)  
Makefile path: `./libretro/Makefile`  
Extra notes: 

#### O2EM

GitHub: [`https://github.com/libretro/libretro-o2em`](https://github.com/libretro/libretro-o2em)  
Commit: `641f06d67d192a0677ec861fcb731d3ce8da0f87`  
Patch file: [`o2em.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/o2em.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Opera

GitHub: [`https://github.com/libretro/opera-libretro`](https://github.com/libretro/opera-libretro)  
Commit: `5b382f8f24a645b171c4bb2220e7f7c5462671ce`  
Patch file: [`opera.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/opera.patch)  
Makefile path: `./Makefile`  
Extra notes: Patch fixes wrong symbol type in `libretro-common/file`

#### ParaLLEl N64

GitHub: [`https://github.com/libretro/parallel-n64`](https://github.com/libretro/parallel-n64)  
Commit: `b804ab1a199d6ff1f8fef4aa7dfcf663990e430b`  
Patch file: [`parallel_n64.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/parallel_n64.patch)  
Makefile path: `./Makefile`  
Extra notes: Patch adds ToadKing's libco support

#### ProSystem

GitHub: [`https://github.com/libretro/prosystem-libretro`](https://github.com/libretro/prosystem-libretro)  
Commit: `fbf62c3dacaac694f7ec26cf9be10a51b27271e7`  
Patch file: [`prosystem.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/prosystem.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Snes9x

GitHub: [`https://github.com/libretro/snes9x`](https://github.com/libretro/snes9x)  
Commit: `ae16176a18fa2a7d642be5d66dbe1926d9d08e90`  
Patch file: [`snes9x.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/snes9x.patch)  
Makefile path: `./libretro/Makefile`  
Extra notes: 

#### Stella 2014

GitHub: [`https://github.com/libretro/stella2014-libretro`](https://github.com/libretro/stella2014-libretro)  
Commit: `1351a4fe2ca6b1f3a66c7db0df2ec268ab002d41`  
Patch file: [`stella2014.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/stella2014.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Vecx

GitHub: [`https://github.com/libretro/libretro-vecx`](https://github.com/libretro/libretro-vecx)  
Commit: `141af284202c86ed0d4ce9030c76954a144287cf`  
Patch file: [`vecx.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/vecx.patch)  
Makefile path: `./Makefile.libretro`  
Extra notes: 

#### Virtual Jaguar

GitHub: [`https://github.com/libretro/virtualjaguar-libretro`](https://github.com/libretro/virtualjaguar-libretro)  
Commit: `263c979be4ca757c43fb525bd6f0887998e57041`  
Patch file: [`virtualjaguar.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/virtualjaguar.patch)  
Makefile path: `./Makefile`  
Extra notes: 

#### Yabause

GitHub: [`https://github.com/libretro/yabause`](https://github.com/libretro/yabause)  
Commit: `c7e02721eddb3de0ec7ae0d61e9e3afa5f586a62`  
Patch file: [`yabause.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/yabause.patch)  
Makefile path: `./yabause/src/libretro/Makefile`  
Extra notes: 

---

#### Template

GitHub: [`https://github.com/`](https://github.com/)  
Commit: `SHA1`  
Patch file: [`patch.patch`](https://raw.githubusercontent.com/BinBashBanana/webretro/master/source/patches/cores/patch.patch)  
Makefile path: `./Makefile`  
Extra notes: 
