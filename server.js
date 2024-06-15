'use strict'

const Hapi = require('@hapi/hapi')
const HapiAuthJwt2 = require('hapi-auth-jwt2')
const userRoutes = require('./src/routes/userRoutes')
const journalRoutes = require('./src/routes/journalRoutes')
const { getUserById } = require('./src/services/userService')

const validate = async (decoded, request, h) => {
  const user = await getUserById(decoded.userId)
  if (user) {
    return { isValid: true, userId: user.userId }
  } else {
    return { isValid: false }
  }
}

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true,
      payload: {
        parse: true,
        allow: 'application/json',
      },
    },
  })

  // Register the JWT plugin
  await server.register(HapiAuthJwt2)

  // Define JWT strategy
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.JWT_SECRET, //
    validate,
    verifyOptions: { algorithms: ['HS256'] },
  })

  server.auth.default('jwt')

  // Routes
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
