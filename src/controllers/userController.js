const userService = require('../services/userService')
const Joi = require('@hapi/joi')

const createUser = async (request, h) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  })

  const { error, value } = schema.validate(request.payload)
  if (error) {
    return h.response(error.details).code(400)
  }

  try {
    const user = await userService.createUser(value)
    return h.response(user).code(201)
  } catch (err) {
    return h.response(err.message).code(500)
  }
}

const getUserById = async (request, h) => {
  try {
    const user = await userService.getUserById(request.params.id)
    if (!user) {
      return h.response({ message: 'User not found' }).code(404)
    }
    return h.response(user).code(200)
  } catch (err) {
    return h.response(err.message).code(500)
  }
}

const getAllUsers = async (request, h) => {
  try {
    const users = await userService.getAllUsers()
    return h.response(users).code(200)
  } catch (err) {
    return h.response(err.message).code(500)
  }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
}
