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
    path: '/profile',
    options: {
      auth: 'jwt',
      handler: userController.getUserById,
    },
  },
  // {
  //   method: 'GET',
  //   path: '/test/getUsers',
  //   options: {
  //     auth: 'jwt',
  //     handler: userController.getAllUsers,
  //   },
  // },
  {
    method: 'PUT',
    path: '/profile/edit',
    options: {
      auth: 'jwt',
      handler: userController.updateUser,
    },
  },
]
