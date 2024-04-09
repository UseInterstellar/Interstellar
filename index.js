import express from 'express'
import fs from 'node:fs'
import basicAuth from 'express-basic-auth'
import cookieParser from 'cookie-parser'
import http from 'node:http'
import process from 'node:process'
import { createBareServer } from '@tomphttp/bare-server-node'
import path from 'node:path'
import cors from 'cors'
import config from './config.js'
const __dirname = process.cwd()
const server = http.createServer()
const app = express(server)
const bareServer = createBareServer('/o/')
const PORT = process.env.PORT || 8080

const LICENSE_SERVER_URL = process.env.LICENSE_SERVER_URL
const whiteListedDomains = ['gointerstellar.app']
// todo: make fake site
const failureFile = fs.readFileSync('Checkfailed.html', 'utf8')
const placeholder = fs.readFileSync('placeholder.svg', 'utf8')

if (config.challenge) {
  console.log('Password protection is enabled. Usernames are: ' + Object.keys(config.users))
  console.log('Passwords are: ' + Object.values(config.users))

  app.use(
    basicAuth({
      users: config.users,
      challenge: true,
    })
  )
}
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(express.static(path.join(__dirname, 'static')))
// Congratulations! Masqr failed to validate, this is either your first visit or you're a FRAUD
async function MasqFail(req, res) {
  if (!req.headers.host) {
    // no bitch still using HTTP/1.0 go away
    return
  }
  const unsafeSuffix = req.headers.host + '.html'
  let safeSuffix = path.normalize(unsafeSuffix).replace(/^(\.\.(\/|\\|$))+/, '')
  let safeJoin = path.join(process.cwd() + '/Masqrd', safeSuffix)
  try {
    await fs.promises.access(safeJoin) // man do I wish this was an if-then instead of a "exception on fail"
    const failureFileLocal = await fs.promises.readFile(safeJoin, 'utf8')
    res.setHeader('Content-Type', 'text/html')
    res.send(failureFileLocal)
    return
  } catch (e) {
    res.setHeader('Content-Type', 'text/html')
    res.send(failureFile)
    return
  }
}
if (config.routes !== false) {
  const routes = [
    { path: '/~', file: 'apps.html' },
    { path: '/-', file: 'games.html' },
    { path: '/!', file: 'settings.html' },
    { path: '/0', file: 'tabs.html' },
    { path: '/1', file: 'go.html' },
    { path: '/', file: 'index.html' },
  ]

  routes.forEach((route) => {
    app.get(route.path, (req, res) => {
      res.sendFile(path.join(__dirname, 'static', route.file))
    })
  })
}

if (config.local !== false) {
  app.get('/e/*', (req, res, next) => {
    const baseUrls = [
      'https://raw.githubusercontent.com/v-5x/x/fixy',
      'https://raw.githubusercontent.com/ypxa/y/main',
      'https://raw.githubusercontent.com/ypxa/w/master',
    ]
    fetchData(req, res, next, baseUrls)
  })
}

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
    console.error('Error fetching:', error)
    next(error)
  }
}
if (process.env.MASQR === 'true') {
  app.use(cookieParser())
  app.use(async (req, res, next) => {
    if (req.headers.host && whiteListedDomains.includes(req.headers.host)) {
      next()
      return
    }
    if (req.url.includes('placeholder.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml')
      res.send(placeholder)
      return
    }
    if (req.url.includes('/o/')) {
      next()
      return
    }

    const authheader = req.headers.authorization
    if (req.cookies['authcheck']) {
      next()
      return
    }

    if (req.cookies['refreshcheck'] != 'true') {
      res.cookie('refreshcheck', 'true', { maxAge: 10000 }) // 10s refresh check
      MasqFail(req, res)
      return
    }
    if (!authheader) {
      res.setHeader('WWW-Authenticate', 'Basic')
      res.status(401)
      MasqFail(req, res)
      return
    }
    const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':')
    const pass = auth[1]
    const licenseCheck = (await (await fetch(LICENSE_SERVER_URL + pass + '&host=' + req.headers.host)).json())['status']
    console.log(LICENSE_SERVER_URL + pass + '&host=' + req.headers.host + ' returned ' + licenseCheck)
    if (licenseCheck == 'License valid') {
      res.cookie('authcheck', 'true', { expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) })
      res.send(`<script> window.location.href = window.location.href </script>`)
      return
    }

    MasqFail(req, res)
    return
  })
}
server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res)
  } else {
    app(req, res)
  }
})

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
})

server.on('listening', () => {
  console.log(`Running at http://localhost:${PORT}`)
})

server.listen({
  port: PORT,
})
