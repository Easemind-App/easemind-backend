const journalController = require('../controllers/journalController')

module.exports = [
  {
    method: 'GET',
    path: '/{userId}/journals',
    handler: journalController.getUserJournals,
  },
  {
    method: 'POST',
    path: '/{userId}/journals/create',
    handler: journalController.addJournalEntry,
  },
  {
    method: 'PUT',
    path: '/{userId}/journals/edit/{journalId}',
    handler: journalController.updateJournalEntry,
  },
  {
    method: 'DELETE',
    path: '/{userId}/journals/delete/{journalId}',
    handler: journalController.deleteJournalEntry,
  },
]
