const userService = require('../services/userService')
const Joi = require('@hapi/joi')

const createUser = async (req, res) => {
  const schema = Joi.object({
    userName: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  })

  const { error, value } = schema.validate(req.payload)
  if (error) {
    return res.response(error.details).code(400)
  }

  try {
    const user = await userService.createUser(value)
    console.log(user)
    return res
      .response({
        message: 'User logged in successfully!',
        data: {
          email: user.email,
          userDetails: user.userDetails,
        },
      })
      .code(201)
  } catch (err) {
    return res.response(err.message).code(500)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id)
    if (!user) {
      return res.response({ message: 'User not found' }).code(404)
    }
    return res.response(user).code(200)
  } catch (err) {
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

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
}
