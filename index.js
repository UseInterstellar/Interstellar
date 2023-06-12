import express from "express";
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import * as dotenv from "dotenv";
dotenv.config();

const __dirname = process.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "routes")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "index.html"));
});

app.get("/photography", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "search.html"));
});

app.get("/nature", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "play.html"));
});

app.get("/forest", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "widgetbot.html"));
});

app.get("/go", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "go.html"));
});

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "settings.html"));
});

app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "donate.html"));
});

app.get("/ocean", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "apps.html"));
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "routes", "404.html"));
});

app.get("/*", (req, res) => {
  res.redirect("/404");
});

// Bare Server
server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

server.on("listening", () => {
  console.log(`Interstellar running at http://localhost:${process.env.PORT}`);
});

server.listen({
  port: process.env.PORT,
});
