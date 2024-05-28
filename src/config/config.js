module.exports = {
  port: process.env.PORT || 3000,
  firestoreConfig: {
    projectId: process.env.FIRESTORE_PROJECT_ID,
    clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
    privateKey: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
}
