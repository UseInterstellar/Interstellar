import express from 'express'
import basicAuth from 'express-basic-auth'
import http from 'node:http'
import { createBareServer } from '@tomphttp/bare-server-node'
import path from 'node:path'
import cors from 'cors'
import config from './config.js'
import NodeCache from 'node-cache'
import compression from 'compression'

const __dirname = process.cwd()
const server = http.createServer()
const assetCache = new NodeCache({ stdTTL: 300 }) // Cache assets for 5 minutes
const app = express(server)
const bareServer = createBareServer('/o/')
const PORT = process.env.PORT || 8080

app.use(compression()) // Enable response compression

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

if (config.routes !== false) {
  const routes = [
    { path: '/ap', file: 'apps.html' },
    { path: '/g', file: 'games.html' },
    { path: '/s', file: 'settings.html' },
    { path: '/t', file: 'tabs.html' },
    { path: '/p', file: 'go.html' },
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
    const assetPath = req.params[0]
    const cachedData = assetCache.get(assetPath)
    if (cachedData) {
      return res.end(Buffer.from(cachedData))
    }
    fetchData(req, res, next, config.baseUrls)
  })
}

const fetchData = async (req, res, next, baseUrls) => {
  const assetPath = req.params[0]
  try {
    const fetchPromises = baseUrls.map((baseUrl) =>
      fetch(`${baseUrl}/${assetPath}`).then((response) => {
        if (!response.ok) throw new Error(`Failed with status ${response.status}`)
        return response.arrayBuffer()
      }),
    )

    const data = await Promise.any(fetchPromises)
    const buffer = Buffer.from(data)
    assetCache.set(assetPath, buffer)
    res.end(buffer)
  } catch (error) {
    console.error('Error fetching asset. All sources failed:', error instanceof AggregateError ? error.errors : error)
    next()
  }
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
