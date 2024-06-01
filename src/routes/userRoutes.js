const authController = require('../controllers/authController')

module.exports = [
  {
    method: 'POST',
    path: '/auth',
    handler: authController.createUser,
  },
  // {
  //   method: 'GET',
  //   path: '/users/{id}',
  //   handler: userController.getUserById,
  // },
  {
    method: 'GET',
    path: '/test/getUsers',
    handler: authController.getAllUsers,
  },
]
