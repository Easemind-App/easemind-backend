const userController = require('../controllers/userController')

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: userController.createUser,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: userController.getUserById,
  },
  {
    method: 'GET',
    path: '/users',
    handler: userController.getAllUsers,
  },
]
