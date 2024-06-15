const journalController = require('../controllers/journalController')

module.exports = [
  {
    method: 'GET',
    path: '/journals',
    options: {
      auth: 'jwt',
      handler: journalController.getUserJournals,
    },
  },
  {
    method: 'POST',
    path: '/journals/create',
    options: {
      auth: 'jwt',
      handler: journalController.addJournalEntry,
    },
  },
  // {
  //   method: 'PUT',
  //   path: '/{userId}/journals/edit/{journalId}',
  //   options: {
  //     auth: 'jwt',
  //     handler: journalController.updateJournalEntry,
  //   },
  // },
  {
    method: 'DELETE',
    path: '/journals/delete/{journalId}',
    options: {
      auth: 'jwt',
      handler: journalController.deleteJournalEntry,
    },
  },
]
