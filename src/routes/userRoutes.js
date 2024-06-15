const userController = require('../controllers/userController')

module.exports = [
  {
    method: 'POST',
    path: '/auth',
    options: {
      auth: false, // This route likely authenticates the user, so it doesn't require prior authentication
      handler: userController.authorizeUser,
    },
  },
  {
    method: 'GET',
    path: '/profile/{id}',
    options: {
      auth: 'jwt', // Require JWT authentication to access a user's profile
      handler: userController.getUserById,
    },
  },
  {
    method: 'GET',
    path: '/test/getUsers',
    options: {
      auth: 'jwt', // Require JWT authentication to get all users, if this should be restricted
      handler: userController.getAllUsers,
    },
  },
  {
    method: 'PUT',
    path: '/profile/edit/{id}',
    options: {
      auth: 'jwt', // Require JWT authentication to edit a user's profile
      handler: userController.updateUser,
    },
  },
]
