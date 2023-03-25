import createBareServer from "@tomphttp/bare-server-node";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer as createHttpsServer } from "node:https";
import { createServer as createHttpServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { hostname } from "node:os";

import serveStatic from "serve-static";
import connect from "connect";

// The following message MAY NOT be removed
console.log(
  "Incognito\nThis program comes with ABSOLUTELY NO WARRANTY.\nThis is free software, and you are welcome to redistribute it\nunder the terms of the GNU General Public License as published by\nthe Free Software Foundation, either version 3 of the License, or\n(at your option) any later version.\n\nYou should have received a copy of the GNU General Public License\nalong with this program. If not, see <https://www.gnu.org/licenses/>.\n"
);

const app = express(server);
const bare = createBareServer("/bare/");
const __dirname = process.cwd();
var server,
  PORT = process.env.PORT;
const ssl = existsSync("../ssl/key.pem") && existsSync("../ssl/cert.pem");
if (ssl) {
  server = createHttpsServer({
    key: readFileSync("../ssl/key.pem"),
    cert: readFileSync("../ssl/cert.pem"),
  });
  PORT = PORT || 443;
} else {
  server = createHttpServer();
  PORT = PORT || 8080;
}

app.use((req, res, next) => {
  if (bare.shouldRoute(req)) bare.routeRequest(req, res);
  else next();
});

app.use(serveStatic(fileURLToPath(new URL("../static/", import.meta.url))));

app.use("/uv", serveStatic(uvPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/web", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "web.html"));
});

app.get("/play", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "play.html"));
});

app.get("/apps", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "apps.html"));
});

app.get("/math", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "math.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "chat.html"));
});

app.get("/go", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "go.html"));
});

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "settings.html"));
});

app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "donate.html"));
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "404.html"));
});

app.get("*", (req, res) => {
  res.redirect("/404");
});

server.on("request", app);
server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req, socket, head)) bare.routeUpgrade(req, socket, head);
  else socket.end();
});

server.on("listening", () => {
  const addr = server.address();

  console.log(`Server running on port ${addr.port}`);
  console.log("");
  console.log("You can now view it in your browser.");
  /* Code for listing IPS from website-aio */
  console.log(
    `Local: http${ssl ? "s" : ""}://${
      addr.family === "IPv6" ? `[${addr.address}]` : addr.address
    }${addr.port === 80 || (ssl && addr.port === 443) ? "" : ":" + addr.port}`
  );
  console.log(
    `Local: http${ssl ? "s" : ""}://localhost${
      addr.port === 80 || (ssl && addr.port === 443) ? "" : ":" + addr.port
    }`
  );
  try {
    console.log(
      `On Your Network: http${ssl ? "s" : ""}://${hostname()}${
        addr.port === 80 || (ssl && addr.port === 443) ? "" : ":" + addr.port
      }`
    );
  } catch (err) {
    /* Can't find LAN interface */
  }
  if (process.env.REPL_SLUG && process.env.REPL_OWNER)
    console.log(
      `Replit: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`
    );
});

server.listen({ port: PORT });
