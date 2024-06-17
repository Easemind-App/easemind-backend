const db = require('../utils/db')
const { User, UserDetails } = require('../models/userModel')

const authorizeUser = async (userData) => {
  const usersColl = db.collection('users')

  const userDetails = new UserDetails(null, null)

  const user = new User(userData.userName, userData.email, true, userDetails)

  const checkUser = await usersColl
    .where('email', '==', userData.email)
    .where('isActive', '==', true)
    .get()

  if (checkUser.empty) {
    // If no active user is found, create a new one
    const newUserRef = await usersColl.add(JSON.parse(JSON.stringify(user)))
    const newUser = await newUserRef.get()
    return { ...newUser.data(), userId: newUser.id } // Include the user's Firestore document ID
  } else {
    // Active user exists, return the existing user data
    const existingUser = checkUser.docs[0].data()
    return { ...existingUser, userId: checkUser.docs[0].id }
  }
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

const updateUser = async (id, userData) => {
  const userRef = db.collection('users').doc(id)
  const userDoc = await userRef.get()

  if (!userDoc.exists) {
    throw new Error('User not found')
  }

  let updateData = {}

  if (userData.userName !== null) {
    updateData.userName = userData.userName
  }

  if (userData.dateOfBirth !== null) {
    updateData['userDetails.dateOfBirth'] = userData.dateOfBirth
  }

  if (userData.gender !== null) {
    updateData['userDetails.gender'] = userData.gender
  }

  if (Object.keys(updateData).length === 0) {
    return { message: 'User updated successfully' }
  }

  await userRef.update(updateData)

  return { message: 'User updated successfully' }
}

module.exports = {
  authorizeUser,
  getUserById,
  getAllUsers,
  updateUser,
}
