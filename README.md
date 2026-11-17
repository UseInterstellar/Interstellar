<div align="center">
    <img src="https://raw.githubusercontent.com/UseInterstellar/Interstellar/main/.github/branding/in.png">
    <p>Serving over 15 million users since 2022.<p>
    <p>Interstellar is a web proxy with a Clean and Sleek UI and easy to use menus. Our goal is to provide the best user experience to everyone.</p>
</div>

![inpreview](https://github.com/UseInterstellar/Interstellar/assets/89202835/2669efed-5186-4932-83c4-725acae60bd2)

> [!IMPORTANT]
> If you fork this project, consider giving it a star in the original repository!

**Join Our [Discord Community](https://discord.gg/interstellar) for support, more links, and an active community!**

## Features

- About:Blank Cloaking
- Tab Cloaking
- Wide collection of apps & games
- Clean, Easy to use UI
- Inspect Element
- Various Themes
- Built-in Tab System
- Fast Speeds

# Architecture

Interstellar is a purely static, browser-only frontend. There is no application server,
no build step, and no server-side Wisp or Bare endpoint: everything under `static/` is
served as-is, and the browser talks to an external Wisp server directly.

- `static/sw.js` is the service worker. It loads Ultraviolet and Scramjet from
  `static/assets/ultraviolet/` and `static/assets/scramjet/` and is registered with the
  `/uv/` scope.
- Ultraviolet (`uv.bundle.js`, `uv.client.js`, `uv.handler.js`, `uv.sw.js`,
  `uv.config.js`) and Scramjet (`scramjet.all.js`, `scramjet.sync.js`,
  `scramjet.wasm.wasm`, `scramjet.config.js`) are served untouched from the public root.
- `static/assets/js/vendor.js` points at the browser builds of BareMux, Epoxy and
  Libcurl in `static/assets/{baremux,epoxy,libcurl}/`.
- `static/assets/js/search.js` creates the `BareMuxConnection` and installs the
  `EpoxyTransport` pointed at the Wisp server configured there.

## Configure the Wisp server

Edit `WISP_URL` near the top of the transport setup in `static/assets/js/search.js`:

```js
const WISP_URL = "wss://YOUR-WISP-URL/wisp/";
```

Every proxy request goes to that URL. It can still be overridden per browser from
Settings → Wisp Server; clearing that field falls back to `WISP_URL`.

## Updating the bundled libraries

The browser libraries are committed under `static/assets/`, copied byte-for-byte from
their npm packages:

```bash
pnpm install
pnpm vendor
```

## Host requirements

Any static file host works. Two things must be configured on the host, not in the code:

- Serve `/sw.js` with `Service-Worker-Allowed: /` so it can control the `/uv/` scope, and
  with `Cache-Control: no-cache`.
- Serve `.mjs` as `text/javascript` and `.wasm` as `application/wasm`.
- Map the clean routes (`/apps`, `/games`, `/settings`, `/tabs`, `/home`) to their
  `.html` files.

`netlify.toml`, `static/_redirects` and `static/_headers` do this for Netlify, which can
deploy the repository with no build command (publish directory: `static`).

## Local preview

Serve the `static/` directory over HTTP. nginx only needs the host requirements above:

```nginx
server {
  listen 3000;
  root /path/to/static;

  types { text/javascript mjs; application/wasm wasm; }

  location = /sw.js {
    add_header Service-Worker-Allowed /;
    add_header Cache-Control no-cache;
  }

  location = / { try_files /home.html =404; }
  location = /play.html { try_files /games.html =404; }
  location / { try_files $uri $uri.html =404; }
  error_page 404 /404.html;
}
```

Any static server works as long as it sends the headers listed above; without
`Service-Worker-Allowed: /` the service worker cannot register.

> [!NOTE]
> The in-page games catalogue links to `/gh-games/...`, which was a server-side proxy in
> earlier versions. A static host has to reproduce those paths with its own rewrites, or
> those entries will 404.

## Report Issues

If you encounter problems, open an issue on GitHub, and we'll address it promptly.

> [!TIP]
> If you're having trouble, don't hesitate to reach out to us on [Discord](https://discord.gg/interstellar) for personalized support.

# Credits

A huge thanks goes out to all of the people who have contributed to Interstellar.

[![Contributors](https://contrib.rocks/image?repo=UseInterstellar/Interstellar)](https://github.com/UseInterstellar/Interstellar/graphs/contributors)
