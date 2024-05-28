'use strict'

const Hapi = require('@hapi/hapi')
const config = require('./src/config/config')
const userRoutes = require('./src/routes/userRoutes')

const init = async () => {
  const server = Hapi.server({
    port: config.port,
    host: 'localhost',
  })

  // Register routes
  server.route(userRoutes)

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
