class Journal {
  constructor(
    journalDate,
    bmi,
    faceDetection,
    thoughtSentiment,
    thoughts,
    quote,
    result,
    isActive
  ) {
    this.journalDate = journalDate
    this.bmi = bmi
    this.faceDetection = faceDetection
    this.thoughtSentiment = thoughtSentiment
    this.thoughts = thoughts
    this.quote = quote
    this.result = result
    this.isActive = isActive
  }
}

module.exports = Journal
