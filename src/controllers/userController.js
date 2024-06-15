const userService = require('../services/userService')
const Joi = require('@hapi/joi')
const { generateToken } = require('../utils/jsonWebToken')

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
    const token = generateToken(user)

    return res
      .response({
        message: 'User logged in successfully!',
        token,
        payload: {
          email: user.email,
        },
      })
      .code(200)
  } catch (err) {
    return res.response(err.message).code(500)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)

    if (!user) {
      return res.response({ message: 'User not found' }).code(400)
    }

    const { email, isActive, userDetails, userName } = user
    if (!userDetails) {
      return res.response({ message: 'User details not found' }).code(400)
    }

    const { dateOfBirth, gender } = userDetails

    return res.response({ userName, email, dateOfBirth, gender }).code(200)
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
    userName: Joi.string().min(3).max(30).required(),
    dateOfBirth: Joi.date().required(),
    gender: Joi.string().valid('L', 'P').required(),
  })

  const { error, value } = schema.validate(req.payload)
  if (error) {
    return res.response(error.details).code(400)
  }

  try {
    const user = await userService.updateUser(req.params.id, value)
    return res.response(user).code(200)
  } catch (err) {
    return res.response(err.message).code(500)
  }
}

module.exports = {
  authorizeUser,
  getUserById,
  getAllUsers,
  updateUser,
}
