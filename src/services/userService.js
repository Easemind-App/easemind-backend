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

const getUserById = async (id) => {
  const userRef = db.collection('users').doc(id)
  const userDoc = await userRef.get()

  const userData = userDoc.data()

  if (!userDoc.exists || !userData.isActive) {
    throw new Error('User not found')
  }

  return userData
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

const updateUser = async (id, userData) => {
  const userRef = db.collection('users').doc(id)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    throw new Error('User not found')
  }

  await userRef.update({
    'userDetails.dateOfBirth': userData.dateOfBirth,
    'userDetails.gender': userData.gender,
  })

  return { message: 'User updated successfully' }
}

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
}
