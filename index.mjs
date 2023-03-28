import createBareServer from '@tomphttp/bare-server-node';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import serveStatic from 'serve-static';
import * as dotenv from 'dotenv'
import path from "node:path";
import express from "express";
import connect from "connect";

dotenv.config()
const httpServer = createServer();


// Run the Bare server in the /bare/ namespace. This will prevent conflicts between the static files and the bare server.
const bareServer = createBareServer('/bare/', {
	logErrors: false,
	localAddress: undefined,
	maintainer: {
		email: 'tomphttp@sys32.dev',
		website: 'https://github.com/tomphttp/',
	},
});

const serve = serveStatic(
	fileURLToPath(new URL('./public/', import.meta.url)),
	{
		fallthrough: false,
	}
);


app.use("/uv", serveStatic(uvPath));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/web", (req, res) => {
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

app.get("/404", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "404.html"));
});

app.get("*", (req, res) => {
  res.redirect("/404");
});

httpServer.on('request', (req, res) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeRequest(req, res);
	} else {
		serve(req, res, (err) => {
			res.writeHead(err?.statusCode || 500, {
				'Content-Type': 'text/plain',
			});
			res.end(err?.stack);
		});
	}
});

httpServer.on('upgrade', (req, socket, head) => {
	if (bareServer.shouldRoute(req)) {
		bareServer.routeUpgrade(req, socket, head);
	} else {
		socket.end();
	}
});

httpServer.on('listening', () => {
	console.log('Interstellar running on port 8080');
});

httpServer.listen({
	port: process.env.PORT,
});