const userController = require('../controllers/userController')

module.exports = [
  {
    method: 'POST',
    path: '/auth',
    options: {
      auth: false,
      handler: userController.authorizeUser,
    },
  },
  {
    method: 'GET',
    path: '/profile/{id}',
    options: {
      auth: 'jwt',
      handler: userController.getUserById,
    },
  },
  {
    method: 'GET',
    path: '/test/getUsers',
    options: {
      auth: 'jwt',
      handler: userController.getAllUsers,
    },
  },
  {
    method: 'PUT',
    path: '/profile/edit/{id}',
    options: {
      auth: 'jwt',
      handler: userController.updateUser,
    },
  },
]
