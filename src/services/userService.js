const User = require('../models/userModel')
const db = require('../utils/db')

const createUser = async (userData) => {
  const usersColl = db.collection('users')
  const user = new User(userData.userName, userData.email, 1) //Constructor of User

  const checkUser = await usersColl.where('email', '==', userData.email).get()

  if (checkUser.empty) {
    await usersColl.add(JSON.parse(JSON.stringify(user))) // User doesn't exist, create a new document
  }

  return user // User exists, send user data
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
  const userRef = db.collection('users').doc(id);
  const userDoc = await userRef.get();

  if (!userDoc.exists) {
    throw new Error('User not found');
  }

  await userRef.update({
    'userDetails.dateOfBirth': userData.dateOfBirth,
    'userDetails.gender': userData.gender
  });

  return { message: 'User updated successfully' };
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
}
