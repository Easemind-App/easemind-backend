require('dotenv').config()

module.exports = {
  firebaseConfig: {
    credential: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  },
}
