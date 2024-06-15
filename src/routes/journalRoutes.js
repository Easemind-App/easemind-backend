const journalController = require('../controllers/journalController')

module.exports = [
  {
    method: 'GET',
    path: '/{userId}/journals',
    options: {
      auth: 'jwt',
      handler: journalController.getUserJournals,
    },
  },
  {
    method: 'POST',
    path: '/{userId}/journals/create',
    options: {
      auth: 'jwt',
      handler: journalController.addJournalEntry,
    },
  },
  {
    method: 'PUT',
    path: '/{userId}/journals/edit/{journalId}',
    options: {
      auth: 'jwt',
      handler: journalController.updateJournalEntry,
    },
  },
  {
    method: 'DELETE',
    path: '/{userId}/journals/delete/{journalId}',
    options: {
      auth: 'jwt',
      handler: journalController.deleteJournalEntry,
    },
  },
]
