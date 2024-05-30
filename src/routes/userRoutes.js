const userController = require('../controllers/userController')

module.exports = [
  {
    method: 'POST',
    path: '/auth',
    handler: userController.createUser,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userController.getUserById,
  },
  {
    method: 'GET',
    path: '/test/getUsers',
    handler: userController.getAllUsers,
  },
]
