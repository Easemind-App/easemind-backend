const db = require('../utils/db')
const Journal = require('../models/journalModel')
const { getQuoteBySentiment } = require('./quoteService')
const { BadRequestError } = require('../utils/errors')

const addJournalEntry = async (userId, journalData) => {
  const journalRef = db.collection('users').doc(userId).collection('journals')

  const result = 'yes'
  const quote = await getQuoteBySentiment('happy')
  if (!quote) {
    throw new BadRequestError('Sentiment given is incorrect')
  }

  const journal = new Journal(
    journalData.journalDate,
    journalData.faceDetection,
    journalData.thoughtSentiment,
    journalData.thoughts,
    quote,
    result,
    true
  )

  return await journalRef.add(JSON.parse(JSON.stringify(journal)))
}

const getUserJournals = async (userId) => {
  const journals = []
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Normalize today's date to the beginning of the day

  const journalRef = db
    .collection('users')
    .doc(userId)
    .collection('journals')
    .where('isActive', '==', true)

  const snapshot = await journalRef.get()

  let checkpoint = true // Assume no journal for today initially

  snapshot.forEach((doc) => {
    const journal = { id: doc.id, ...doc.data() }
    journals.push(journal)

    // Parse the journalDate string into a Date object
    const journalDate = new Date(journal.journalDate.replace(/\//g, '-'))
    journalDate.setHours(0, 0, 0, 0) // Normalize journal date to the beginning of the day

    // Check if any journal entry is from today
    if (journalDate.getTime() === today.getTime()) {
      checkpoint = false // Set checkpoint to false if a journal entry from today is found
    }
  })

  return {
    checkpoint, // Include checkpoint in the response
    journals,
  }
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
