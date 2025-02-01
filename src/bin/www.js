import http from 'http'
import { initApp, app, env } from '../app.js'

import { PORT } from '../config/index.js'

async function init() {
  initApp()

  // Create HTTP server
  const server = http.createServer(app)

  function _onError(error) {
    if (error.syscall !== 'listen') {
      throw error
    }

    const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`

    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`)
        process.exit(1)
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`)
        process.exit(1)
      default:
        throw error
    }
  }

  function _onListening() {
    const address = server.address()
    const bind =
      typeof address === 'string' ? `pipe ${address}` : `${address.port}`

    console.info(`\tPort: ${bind}`)
    console.info(`\tEnvironment: ${env}`)

    console.info(`\tStart date: ${new Date().toUTCString()} \n`)
  }

  server.listen(PORT)
  server.on('error', _onError)
  server.on('listening', _onListening)
}

export default init().catch(console.error)
