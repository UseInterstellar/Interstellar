import { createBareServer } from "@tomphttp/bare-server-node";
import express from "express";
import { createServer } from "node:http";
import { join } from "node:path";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import * as dotenv from "dotenv";
dotenv.config();

const bare = createBareServer("/bare/");
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/photography", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "search.html"));
});

app.get("/nature", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "play.html"));
});

app.get("/forest", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "widgetbot.html"));
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

app.get("/ocean", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "apps.html"));
});

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "404.html"));
});

app.get("/*", (req, res) => {
  res.redirect("/404");
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

let port = parseInt(process.env.PORT || "");

if (isNaN(port)) port = 8080;

server.on("listening", () => {
    console.log(`Interstellar running at http://localhost:${process.env.PORT}`);
  });

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

function shutdown() {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close();
  bare.close();
  process.exit(0);
}

server.listen({
    port: process.env.PORT,
  });