import cluster from "cluster";
import os from "os";
import express from "express";
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import path from "node:path";
import * as dotenv from "dotenv";
dotenv.config();

const __dirname = process.cwd();

// Increase max sockets to 1000
http.globalAgent.maxSockets = 1000;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process running with PID ${process.pid}`);

  // Fork worker processes
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit events
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
    );
    console.log("Forking a new worker...");
    cluster.fork();
  });
} else {
  const server = http.createServer();
  const app = express(server);
  const bareServer = createBareServer("/bare/");

  // Serve static files with caching
  const staticOptions = {
    maxAge: "1d",
    setHeaders: (res, path) => {
      if (path.endsWith(".html")) {
        res.setHeader("Cache-Control", "no-cache");
      } else {
        res.setHeader("Cache-Control", "public, max-age=86400");
      }
    },
  };
  app.use(express.static(path.join(__dirname, "static"), staticOptions));

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
    { path: "/nature", file: "nature.html" },
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

  server.listen({
    port: process.env.PORT,
  });

  console.log(`Worker process running with PID ${process.pid}`);
}
