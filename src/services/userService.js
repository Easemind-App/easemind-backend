const db = require('../utils/db')
const { User, UserDetails } = require('../models/userModel')

const createUser = async (userData) => {
  const usersColl = db.collection('users')

  const userDetails = new UserDetails(null, null) // Initiate userDetails with null

  const user = new User(userData.userName, userData.email, 1, userDetails)

  const checkUser = await usersColl.where('email', '==', userData.email).get()

  if (checkUser.empty) {
    await usersColl.add(JSON.parse(JSON.stringify(user)))
  }

  return user
}

const getAllUsers = async () => {
  const usersRef = db.collection('users')
  const snapshot = await usersRef.get()
  const users = []
  snapshot.forEach((doc) => {
    users.push(doc.data())
  })
  return users
}

module.exports = {
  createUser,
  getAllUsers,
}
