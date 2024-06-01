const db = require('../utils/db')
const { User, UserDetails } = require('../models/userModel')

const createUser = async (userData) => {
  const usersColl = db.collection('users')
  const user = new User(userData.userName, userData.email, 1) //Constructor of User
  const userDetails = new UserDetails(null, null) //Constructor of UserDetails

  const checkUser = await usersColl.where('email', '==', userData.email).get()

  if (checkUser.empty) {
    const usersRef = await usersColl.add(
      JSON.parse(JSON.stringify(userDetails))
    ) // User doesn't exist, create a new document

    await usersRef
      .collection('userDetails')
      .add(JSON.parse(JSON.stringify(user))) // Initialize userDetails with null values
  }

  return { user, userDetails } // User exists, send user data
}

const getUserById = async (id) => {
  const userRef = db.collection('users').doc(id)
  const userDoc = await userRef.get()
  if (!userDoc.exists) {
    throw new Error('User not found')
  }
  return userDoc.data()
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
  getUserById,
  getAllUsers,
}
