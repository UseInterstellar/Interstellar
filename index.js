import http from "node:http"
import path from "node:path"
import fs from "fs"
import { createBareServer } from "@tomphttp/bare-server-node"
import cors from "cors"
import express from "express"
import basicAuth from "express-basic-auth"
import cookieParser from "cookie-parser"
import config from "./config.js"

const LICENSE_SERVER_URL = "https://masqr.gointerstellar.app/validate?license="
const Fail = fs.readFileSync("Failed.html", "utf8")

const __dirname = process.cwd()
const server = http.createServer()
const app = express()
const bareServer = createBareServer("/ov/")
const PORT = process.env.PORT || 8080

if (config.challenge) {
  console.log(`Password protection is enabled. Usernames are: ${Object.keys(config.users)}`)
  console.log(`Passwords are: ${Object.values(config.users)}`)
  app.use(basicAuth({ users: config.users, challenge: true }))
}

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (process.env.MASQR_CHECK === "true") {
  app.use(async (req, res, next) => {
    if (req.url.includes("/ov/")) {
      next()
      return
    }

    const authheader = req.headers.authorization

    if (req.cookies["authcheck"]) {
      next()
      return
    }

    if (req.cookies["refreshcheck"] != "true") {
      res.cookie("refreshcheck", "true", { maxAge: 10000 })
      MasqFail(req, res)
      return
    }

    if (!authheader) {
      res.setHeader("WWW-Authenticate", "Basic")
      res.status(401)
      MasqFail(req, res)
      return
    }

    const auth = Buffer.from(authheader.split(" ")[1], "base64").toString().split(":")
    const pass = auth[1]

    const licenseCheck = (await (await fetch(LICENSE_SERVER_URL + pass + "&host=" + req.headers.host)).json())["status"]
    console.log(LICENSE_SERVER_URL + pass + "&host=" + req.headers.host + " returned " + licenseCheck)
    if (licenseCheck === "License valid") {
      res.cookie("authcheck", "true", { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) })
      res.send(`<script> window.location.href = window.location.href </script>`)
      return
    }

    MasqFail(req, res)
  })

  async function MasqFail(req, res) {
    if (!req.headers.host) {
      return
    }
    const unsafeSuffix = req.headers.host + ".html"
    let safeSuffix = path.normalize(unsafeSuffix).replace(/^(\.\.(\/|\\|$))+/, "")
    let safeJoin = path.join(process.cwd() + "/Masqrd", safeSuffix)
    try {
      await fs.promises.access(safeJoin)
      const FailLocal = await fs.promises.readFile(safeJoin, "utf8")
      res.setHeader("Content-Type", "text/html")
      res.send(FailLocal)
    } catch (e) {
      res.setHeader("Content-Type", "text/html")
      res.send(Fail)
    }
  }
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

app.get("/e/*", (req, res, next) => {
  const baseUrls = [
    "https://raw.githubusercontent.com/v-5x/x/fixy",
    "https://raw.githubusercontent.com/ypxa/y/main",
    "https://raw.githubusercontent.com/ypxa/w/master",
  ]
   fetchData(req, res, next, baseUrls)
})

const fetchData = async (req, res, next, baseUrls) => {
  try {
    const reqTarget = baseUrls.map((baseUrl) => `${baseUrl}/${req.params[0]}`)
    let data
    let asset
    for (const target of reqTarget) {
      asset = await fetch(target)
      if (asset.ok) {
        data = await asset.arrayBuffer()
        break
      }
    }
    if (data) {
      res.end(Buffer.from(data))
    } else {
      next()
    }
  } catch (error) {
    console.error(`Error fetching ${req.url}:`, error)
    next(error)
  }
}

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "static", "404.html"))
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).sendFile(path.join(__dirname, "static", "500.html"))
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
