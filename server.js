'use strict'

const Hapi = require('@hapi/hapi')
const userRoutes = require('./src/routes/userRoutes')
const journalRoutes = require('./src/routes/journalRoutes')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true, // Enable CORS if needed
      payload: {
        parse: true, // Enable automatic payload parsing
        allow: 'application/json', // Only allow JSON payloads
      },
    },
  })

  // Add all routes
  userRoutes.forEach((route) => server.route(route))
  journalRoutes.forEach((route) => server.route(route))

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
