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

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/search", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "web.html"));
});

app.get("/play", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "play.html"));
});

app.get("/apps", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "apps.html"));
});

app.get("/math", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "math.html"));
});

app.get("/chat", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "chat.html"));
});

app.get("/go", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "go.html"));
});

app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "settings.html"));
});

app.get("/donate", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "donate.html"));
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

