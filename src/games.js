import path from "node:path";
import rateLimit from "express-rate-limit";
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

const ghGamesLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: "Too many requests, please try again later.",
});

export function mountGhGames(app) {
  app.get("/gh-games/:path(*)", ghGamesLimiter, async (req, res, next) => {
    try {
      const reqPath = "/gh-games/" + req.params.path;
      let reqTarget;
      for (const [prefix, baseUrl] of Object.entries(ghGamesBases)) {
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
      if (!asset.ok) return next();

      const data = Buffer.from(await asset.arrayBuffer());
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
      res.end(data);
    } catch (error) {
      console.error("Error fetching asset:", error);
      res.status(500).type("text/html").send("Error fetching the asset");
    }
  });
}
