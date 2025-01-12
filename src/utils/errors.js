// errors.js
class CustomError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  }
}

class NotFoundError extends CustomError {
  constructor(message = 'Resource not found') {
    super(message, 404)
  }
}

class BadRequestError extends CustomError {
  constructor(message = 'Bad request') {
    super(message, 400)
  }
}

class InternalServerError extends CustomError {
  constructor(message = 'Internal server error') {
    super(message, 500)
  }
}

const joiError = (error) => {
  const simplifiedMessage = error.details
    .map((detail) => {
      const attributeName = detail.path.join('.')
      return `Missing or invalid ${attributeName} attribute`
    })
    .join(', ')
  return simplifiedMessage
}

module.exports = {
  CustomError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
  joiError,
}
