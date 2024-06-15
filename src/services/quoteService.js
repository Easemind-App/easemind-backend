const db = require('../utils/db')

const getQuoteBySentiment = async (sentiment) => {
  try {
    const predefinedLimit = 40

    const randomIndex = Math.floor(Math.random() * predefinedLimit)

    const quoteDoc = await db
      .collection('quotes')
      .doc(sentiment)
      .collection('quotes')
      .doc(randomIndex.toString())
      .get()

    if (!quoteDoc.exists) {
      return null
    }

    return quoteDoc.data().text
  } catch (error) {
    console.error('Error fetching quote by sentiment:', error)
  }
}

module.exports = { getQuoteBySentiment }
