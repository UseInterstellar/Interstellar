import express from 'express';
import basicAuth from 'express-basic-auth';
import http from 'http';
import { createBareServer } from '@tomphttp/bare-server-node';
import path from 'path';
import cors from 'cors';
import fetch from 'node-fetch'; // Import 'fetch' for making HTTP requests
import config from './config.js';

const __dirname = process.cwd();
const app = express();
const server = http.createServer(app);
const bareServer = createBareServer('/o/');
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

// Basic Authentication
if (config.challenge) {
  console.log('Password protection is enabled. Usernames are: ' + Object.keys(config.users));
  console.log('Passwords are: ' + Object.values(config.users));

  app.use(
    basicAuth({
      users: config.users,
      challenge: true,
    })
  );
}

// Define routes
const routes = [
  { path: '/ap', file: 'apps.html' },
  { path: '/g', file: 'games.html' },
  { path: '/s', file: 'settings.html' },
  { path: '/t', file: 'tabs.html' },
  { path: '/p', file: 'go.html' },
  { path: '/', file: 'index.html' },
  { path: '/tos', file: 'tos.html' },
];

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, 'static', route.file));
  });
});

// Handle local routes
if (config.local !== false) {
  app.get('/e/*', (req, res, next) => {
    const baseUrls = [
      'https://raw.githubusercontent.com/v-5x/x/fixy',
      'https://raw.githubusercontent.com/ypxa/y/main',
      'https://raw.githubusercontent.com/ypxa/w/master',
    ];
    fetchData(req, res, next, baseUrls);
  });
}

// Fetch data from multiple URLs
const fetchData = async (req, res, next, baseUrls) => {
  try {
    const reqTarget = baseUrls.map((baseUrl) => `${baseUrl}/${req.params[0]}`);
    let data = null;
    let asset;

    for (const target of reqTarget) {
      asset = await fetch(target);
      if (asset.ok) {
        data = await asset.buffer(); 
        break;
      }
    }

    if (data) {
      res.end(data);
    } else {
      next();
    }
  } catch (error) {
    console.error('Error fetching:', error);
    next(error);
  }
};

// Handle HTTP requests and upgrades
server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head);
  } else {
    socket.end();
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
