const admin = require('firebase-admin')
const config = require('../config/config')

const initializeFirestore = () => {
  admin.initializeApp({
    credential: admin.credential.cert(config.firestoreConfig),
  })

  const db = admin.firestore()
  console.log('Firestore connected successfully')
  return db
}

module.exports = initializeFirestore
