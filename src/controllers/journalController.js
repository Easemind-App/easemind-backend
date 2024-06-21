const journalService = require('../services/journalService')
const Joi = require('@hapi/joi')
const { joiError } = require('../utils/errors')

const addJournalEntry = async (req, res) => {
  const schema = Joi.object({
    journalData: Joi.object({
      journalDate: Joi.string().required(),
      faceDetection: Joi.string().required(),
      thoughts: Joi.string().min(3).max(70).required(),
    }).required(),
  })

  const { error, value } = schema.validate({
    journalData: req.payload.journalData,
  })

  if (error) {
    const errorMessage = joiError(error)
    return res
      .response({
        status: 'error',
        message: errorMessage,
      })
      .code(400)
  }

  try {
    await journalService.addJournalEntry(
      req.auth.credentials.userId,
      value.journalData
    )
    return res
      .response({
        message: 'Journal added successfully',
      })
      .code(201)
  } catch (err) {
    return res
      .response({
        status: 'error',
        message: err.message,
      })
      .code(400)
  }
}

const getUserJournals = async (req, res) => {
  try {
    const journals = await journalService.getUserJournals(
      req.auth.credentials.userId
    )
    return res.response({ journals }).code(200)
  } catch (err) {
    return res.response({ message: err.message }).code(500)
  }
}

const updateJournalEntry = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    journalId: Joi.string().required(),
    journalData: Joi.object().required(),
  })

  const { error, value } = schema.validate({
    userId: req.params.userId,
    journalId: req.params.journalId,
    journalData: req.payload.journalData,
  })

  if (error) {
    const errorMessage = joiError(error)
    return res
      .response({
        status: 'error',
        message: errorMessage,
      })
      .code(400)
  }

  try {
    await journalService.updateJournalEntry(
      value.userId,
      value.journalId,
      value.journalData
    )
    return res
      .response({ message: 'Journal entry updated successfully' })
      .code(200)
  } catch (err) {
    return res.response({ status: 'error', message: err.message }).code(500)
  }
}

const deleteJournalEntry = async (req, res) => {
  const schema = Joi.object({
    journalId: Joi.string().required(),
  })

  const { error, value } = schema.validate({
    journalId: req.params.journalId,
  })

  if (error) {
    const errorMessage = joiError(error)
    return res
      .response({
        status: 'error',
        message: errorMessage,
      })
      .code(400)
  }

  try {
    await journalService.deleteJournalEntry(
      req.auth.credentials.userId,
      value.journalId
    )
    return res.response({ message: 'Journal deleted successfully' }).code(200)
  } catch (err) {
    return res.response({ message: err.message }).code(500)
  }
}

module.exports = {
  addJournalEntry,
  getUserJournals,
  updateJournalEntry,
  deleteJournalEntry,
}
