const db = require('../db')
const fs = require('fs')
const path = require('path')

const uploadQuotes = async (parentDocId, sentiment, filePath) => {
  const parentDocRef = db.collection('quotes').doc(parentDocId)
  const subcollectionRef = parentDocRef.collection('quotes')
  const quotesData = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  const batch = db.batch()
  quotesData.quotes.forEach((quote) => {
    const quoteRef = subcollectionRef.doc(quote.id.toString())
    batch.set(quoteRef, quote)
  })

  await batch.commit()
  console.log(`Quotes for sentiment '${sentiment}' uploaded successfully.`)
}

const main = async () => {
  try {
    const sentiments = [
      {
        id: 'stressed',
        sentiment: 'stressed',
        filePath: path.join(__dirname, './json/stressed.json'),
      },
      {
        id: 'slightlyStressed',
        sentiment: 'slightly_stressed',
        filePath: path.join(__dirname, './json/slightlyStressed.json'),
      },
      {
        id: 'okay',
        sentiment: 'okay',
        filePath: path.join(__dirname, './json/okay.json'),
      },
    ]

    // Batch add subcollection documents
    for (const item of sentiments) {
      await uploadQuotes(item.id, item.sentiment, item.filePath)
    }
  } catch (error) {
    console.error('Error uploading quotes:', error)
  }
}

main()
