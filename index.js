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

 // Define routes
 const routes = [
  { path: "/", file: "index.html" },
  { path: "/photography", file: "photography.html" },
  { path: "/nature", file: "play.html" },
  { path: "/ocean", file: "ocean.html" },
  { path: "/forest", file: "forest.html" },
  { path: "/go", file: "go.html" },
  { path: "/settings", file: "settings.html" },
  { path: "/donate", file: "donate.html" },
  { path: "/404", file: "404.html" },
];

// Define routes using the routes array
routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "static", route.file));
  });
});

// Catch-all route
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
