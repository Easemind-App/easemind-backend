const User = require('../models/userModel')
const db = require('../utils/db')()

const createUser = async (userData) => {
  const userRef = db.collection('users').doc()
  const user = new User(
    userRef.id,
    userData.name,
    userData.email,
    userData.password
  )
  await userRef.set(JSON.parse(JSON.stringify(user)))
  return user
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
