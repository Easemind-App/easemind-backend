const journalController = require('../controllers/journalController')

server.route([
  {
    method: 'POST',
    path: '/users/{userId}/journals',
    handler: journalController.addJournalEntryController,
  },
  {
    method: 'GET',
    path: '/users/{userId}/journals',
    handler: journalController.getUserJournalsController,
  },
  {
    method: 'PUT',
    path: '/users/{userId}/journals/{journalId}',
    handler: journalController.updateJournalEntryController,
  },
  {
    method: 'DELETE',
    path: '/users/{userId}/journals/{journalId}',
    handler: journalController.deleteJournalEntryController,
  },
])
