import http from "node:http"
import path from "node:path"
import { createBareServer } from "@tomphttp/bare-server-node"
import cors from "cors"
import express from "express"
import basicAuth from "express-basic-auth"
import cookieParser from "cookie-parser"
import mime from "mime"
import fetch from "node-fetch"
import config from "./config.js"
import { setupMasqr } from "./Masqr.js"

const __dirname = process.cwd()
const server = http.createServer()
const app = express()
const bareServer = createBareServer("/ov/")
const PORT = process.env.PORT || 8080
const cache = new Map()
const CACHE_TTL = 30 * 24 * 60 * 60 * 1000 // Cache for 30 Days

if (process.env.config === "true" && config.challenge) {
  console.log(`Password protection is enabled. Usernames are: ${Object.keys(config.users)}`)
  console.log(`Passwords are: ${Object.values(config.users)}`)
  app.use(basicAuth({ users: config.users, challenge: true }))
}

app.get("/e/*", async (req, res, next) => {
  if (cache.has(req.path)) {
    const { data, contentType, timestamp } = cache.get(req.path)
    if (Date.now() - timestamp > CACHE_TTL) {
      cache.delete(req.path)
    } else {
      res.writeHead(200, { "Content-Type": contentType })
      return res.end(data)
    }
  }

  try {
    const baseUrls = {
      "/e/1/": "https://raw.githubusercontent.com/v-5x/x/fixy/",
      "/e/2/": "https://raw.githubusercontent.com/ypxa/y/main/",
      "/e/3/": "https://raw.githubusercontent.com/ypxa/w/master/",
    }

    let reqTarget
    for (const [prefix, baseUrl] of Object.entries(baseUrls)) {
      if (req.path.startsWith(prefix)) {
        reqTarget = baseUrl + req.path.slice(prefix.length)
        break
      }
    }

    if (!reqTarget) {
      return next()
    }

    const asset = await fetch(reqTarget)
    if (asset.status !== 200) {
      return next()
    }

    const data = Buffer.from(await asset.arrayBuffer())
    const ext = path.extname(reqTarget)
    const no = [".unityweb"]
    const contentType = no.includes(ext) ? "application/octet-stream" : mime.getType(ext)

    cache.set(req.path, { data, contentType, timestamp: Date.now() })
    res.writeHead(200, { "Content-Type": contentType })
    res.end(data)
  } catch (error) {
    console.error(error)
    res.setHeader("Content-Type", "text/html")
    res.status(500).send("Error fetching the asset")
  }
})

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.MASQR === "true") {
  setupMasqr(app)
}

app.use(express.static(path.join(__dirname, "static")))
app.use("/ov", cors({ origin: true }))

const routes = [
  { path: "/as", file: "apps.html" },
  { path: "/gm", file: "games.html" },
  { path: "/st", file: "settings.html" },
  { path: "/ta", file: "tabs.html" },
  { path: "/ts", file: "tools.html" },
  { path: "/", file: "index.html" },
  { path: "/tos", file: "tos.html" },
]

routes.forEach((route) => {
  app.get(route.path, (req, res) => {
    res.sendFile(path.join(__dirname, "static", route.file))
  })
})

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "static", "404.html"))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).sendFile(path.join(__dirname, "static", "404.html"))
})

server.on("request", (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res)
  } else {
    app(req, res)
  }
})

server.on("upgrade", (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
})

server.on("listening", () => {
  console.log(`Running at http://localhost:${PORT}`)
})

server.listen({ port: PORT })
