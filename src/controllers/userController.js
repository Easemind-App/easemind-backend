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
    return res
      .response({
        email: user.email,
        message: 'User logged in successfully!',
      })
      .code(201)
  } catch (err) {
    return res.response(err.message).code(500)
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.response({ message: 'User not found' }).code(400);
    }

    const { email, isActive, userDetails, userName } = user;
    if (!userDetails) {
      return res.response({ message: 'User details not found' }).code(400);
    }

    const { dateOfBirth, gender } = userDetails;

    return res.response({ userName, email, dateOfBirth, gender }).code(200);
  } catch (err) {
    return res.response(err.message).code(500);
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
  });

  const { error, value } = schema.validate(req.payload);
  if (error) {
    return res.response(error.details).code(400);
  }

  try {
    const user = await userService.updateUser(req.params.id, value);
    return res.response(user).code(200);
  } catch (err) {
    return res.response(err.message).code(500);
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
}
