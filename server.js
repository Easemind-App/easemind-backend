'use strict'

const Hapi = require('@hapi/hapi')
const Jwt = require('jsonwebtoken')
const HapiAuthJwt2 = require('hapi-auth-jwt2')
const userRoutes = require('./src/routes/userRoutes')
const journalRoutes = require('./src/routes/journalRoutes')
const { getUserById } = require('./src/services/userService')

const validate = async (decoded, request, h) => {
  const user = await getUserById(decoded.userId)
  if (user) {
    return { isValid: true, credentials: user }
  } else {
    return { isValid: false }
  }
}

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

  // Register the JWT plugin
  await server.register(HapiAuthJwt2)

  // Define JWT strategy
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET, // Your secret key
    validate, // Add your validation function here
    verifyOptions: { algorithms: ['HS256'] }, // Specify the algorithms you wish to use
  })

  server.auth.default('jwt')

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
