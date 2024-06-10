const authController = require('../controllers/authController')

module.exports = [
  {
    method: 'POST',
    path: '/auth',
    handler: authController.createUser,
  },
  {
    method: 'GET',
    path: '/profile/{id}',
    handler: userController.getUserById,
  },
  {
    method: 'GET',
    path: '/test/getUsers',
    handler: authController.getAllUsers,
  },
  {
    method: 'PUT',
    path: '/profile/edit/{id}',
    handler: userController.updateUser,
  },
]
