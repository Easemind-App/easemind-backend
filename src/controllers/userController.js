const userService = require('../services/userService')
const Joi = require('@hapi/joi')
const { generateToken } = require('../utils/jsonWebToken')
const { joiError } = require('../utils/errors')
// const fsDate = require('../utils/fsDate')

const authorizeUser = async (req, res) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  })

  const { error, value } = schema.validate(req.payload)
  if (error) {
    return res.response(error.details).code(400)
  }

  try {
    const user = await userService.authorizeUser(value)
    console.log(user)
    const token = generateToken(user)
    return res
      .response({
        message: 'User logged in successfully!',
        token,
      })
      .code(200)
  } catch (err) {
    return res.response(err.message).code(500)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.auth.credentials.userId)

    if (!user) {
      return res.response({ message: 'User not found' }).code(400)
    }

    const { email, userDetails, userName } = user
    if (!userDetails) {
      return res.response({ message: 'User details not found' }).code(400)
    }

    let { age, gender } = userDetails
    // age = fsDate(age)

    return res.response({ userName, email, age, gender }).code(200)
  } catch (err) {
    console.log(err.message)
    return res.response(err.message).code(500)
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    return res.response(users).code(200)
  } catch (err) {
    return res.response(err.message).code(500)
  }
}

const updateUser = async (req, res) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(30).optional().allow(null),
    age: Joi.string().optional().allow(null),
    gender: Joi.string().valid('L', 'P').optional().allow(null),
  })

  const { error, value } = schema.validate(req.payload)

  if (error) {
    const errorMessage = joiError(error)
    return res
      .response({
        status: 'error',
        message: errorMessage,
      })
      .code(400)
  }

  try {
    const user = await userService.updateUser(
      req.auth.credentials.userId,
      value
    )

    return res.response(user).code(200)
  } catch (err) {
    return res.response({ status: 'error', message: err.message }).code(400)
  }
}

module.exports = {
  authorizeUser,
  getUserById,
  getAllUsers,
  updateUser,
}
