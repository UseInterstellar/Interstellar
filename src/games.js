import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import mime from "mime";

// Game asset stores mirrored from GitHub. Requests to /gh-games/<n>/... are proxied to the
// matching raw.githubusercontent base so the client never talks to github.com directly.
const ghGamesBases = {
  "/gh-games/1/": "https://raw.githubusercontent.com/qrs/x/fixy/",
  "/gh-games/2/": "https://raw.githubusercontent.com/3v1/V5-Assets/main/",
  "/gh-games/3/": "https://raw.githubusercontent.com/3v1/V5-Retro/master/",
  "/gh-games/4/": "https://raw.githubusercontent.com/xbubbo/V6-Assets/main/",
};
const noMimeExts = new Set([".unityweb"]);

export const ghGamesProxies = () => ({ ...ghGamesBases });

export function mountGhGames(app, bases = ghGamesBases) {
  app.get("/gh-games/:path(*)", async (req, res, next) => {
    try {
      const reqPath = "/gh-games/" + req.params.path;
      let reqTarget;
      for (const [prefix, baseUrl] of Object.entries(bases)) {
        if (reqPath.startsWith(prefix)) {
          reqTarget = baseUrl + reqPath.slice(prefix.length);
          break;
        }
      }
      if (!reqTarget) return next();

      const upstreamHeaders = {};
      if (req.headers["if-none-match"]) {
        upstreamHeaders["If-None-Match"] = req.headers["if-none-match"];
      }

      const asset = await fetch(reqTarget, { headers: upstreamHeaders });

      if (asset.status === 304) return res.sendStatus(304);
      if (!asset.ok || !asset.body) {
        await asset.body?.cancel();
        return next();
      }

      const ext = path.extname(reqTarget);
      const contentType = noMimeExts.has(ext) ? "application/octet-stream" : mime.getType(ext);

      const etag = asset.headers.get("etag");
      const lastModified = asset.headers.get("last-modified");

      res.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
        ...(etag && { ETag: etag }),
        ...(lastModified && { "Last-Modified": lastModified }),
      });
      await pipeline(Readable.fromWeb(asset.body), res);
    } catch (error) {
      if (error?.code !== "ERR_STREAM_PREMATURE_CLOSE") console.error("Error fetching asset:", error);
      if (res.headersSent) {
        res.destroy();
        return;
      }
      res.status(500).type("text/html").send("Error fetching the asset");
    }
  });
}
