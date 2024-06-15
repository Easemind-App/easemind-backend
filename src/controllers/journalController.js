const journalService = require('../services/journalService')
const Joi = require('@hapi/joi')

const addJournalEntry = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    journalData: Joi.object({
      journalDate: Joi.string().required(),
      age: Joi.number().integer().min(0).required(),
      gender: Joi.string().required(),
      bmi: Joi.string().required(),
      faceDetection: Joi.string().required(),
      thoughtSentiment: Joi.string().required(),
      thoughts: Joi.string().required(),
    }).required(),
  })
  console.log(req.params)
  console.log(req.payload.journalData)
  const { error, value } = schema.validate({
    userId: req.params.userId,
    journalData: req.payload.journalData,
  })

  if (error) {
    return res.response(error.details).code(400)
  }

  try {
    await journalService.addJournalEntry(value.userId, value.journalData)
    return res
      .response({
        message: 'Journal entry added successfully',
      })
      .code(201)
  } catch (err) {
    return res
      .response({
        status: 'error',
        message: err.message,
      })
      .code(err.statusCode || 500)
  }
}

const getUserJournals = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
  })

  console.log(req)
  const { error, value } = schema.validate({ userId: req.params.userId })

  if (error) {
    return res.response(error.details).code(400)
  }

  try {
    const journals = await journalService.getUserJournals(value.userId)
    return res.response({ journals }).code(200)
  } catch (err) {
    return res.response({ message: err.message }).code(500)
  }
}

const updateJournalEntry = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    journalId: Joi.string().required(),
    journalData: Joi.object().required(), // Can include specific fields to validate if needed
  })

  const { error, value } = schema.validate({
    userId: req.params.userId,
    journalId: req.params.journalId,
    journalData: req.payload.journalData,
  })

  if (error) {
    return res.response(error.details).code(400)
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
    return res.response({ message: err.message }).code(500)
  }
}

const deleteJournalEntry = async (req, res) => {
  const schema = Joi.object({
    userId: Joi.string().required(),
    journalId: Joi.string().required(),
  })

  const { error, value } = schema.validate({
    userId: req.params.userId,
    journalId: req.params.journalId,
  })

  if (error) {
    return res.response(error.details).code(400)
  }

  try {
    await journalService.deleteJournalEntry(value.userId, value.journalId)
    return res
      .response({ message: 'Journal entry deactivated successfully' })
      .code(200)
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
