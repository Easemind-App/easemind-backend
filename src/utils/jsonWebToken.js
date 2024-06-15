const Jwt = require('jsonwebtoken')

const generateToken = (user) => {
  const payload = {
    userId: user.userId,
    email: user.email,
  }

  return Jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h',
  })
}

const refreshToken = (token) => {
  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET)
    const payload = {
      id: decoded.id,
      email: decoded.email,
    }
    return Jwt.sign(payload, process.env.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    })
  } catch (error) {
    console.error('Error refreshing token:', error)
    return null
  }
}

module.exports = { generateToken, refreshToken }
