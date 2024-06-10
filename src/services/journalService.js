const db = require('../utils/db')
const Journal = require('../models/journalModel')

const addJournalEntry = async (userId, journalData) => {
  const journalRef = db.collection('users').doc(userId).collection('journals')
  const journal = new Journal(
    journalData.journalDate,
    journalData.age,
    journalData.gender,
    journalData.bmi,
    journalData.faceDetection,
    journalData.thoughtSentiment,
    journalData.thoughts,
    journalData.isActive
  )
  return await journalRef.add(JSON.parse(JSON.stringify(journal)))
}

const getUserJournals = async (userId) => {
  const journals = []
  const journalRef = db
    .collection('users')
    .doc(userId)
    .collection('journals')
    .where('isActive', '==', true)
  const snapshot = await journalRef.get()

  snapshot.forEach((doc) => {
    journals.push({ id: doc.id, ...doc.data() })
  })

  return journals
}

const updateJournalEntry = async (userId, journalId, journalData) => {
  const journalDocRef = db
    .collection('users')
    .doc(userId)
    .collection('journals')
    .doc(journalId)
  return await journalDocRef.update(journalData)
}

const deleteJournalEntry = async (userId, journalId) => {
  const journalDocRef = db
    .collection('users')
    .doc(userId)
    .collection('journals')
    .doc(journalId)
  return await journalDocRef.update({ isActive: false })
}

module.exports = {
  addJournalEntry,
  getUserJournals,
  updateJournalEntry,
  deleteJournalEntry,
}
