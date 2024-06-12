class Journal {
  constructor(
    journalDate,
    age,
    gender,
    bmi,
    faceDetection,
    thoughtSentiment,
    thoughts,
    quote,
    isActive
  ) {
    this.journalDate = journalDate
    this.age = age
    this.gender = gender
    this.bmi = bmi
    this.faceDetection = faceDetection
    this.thoughtSentiment = thoughtSentiment
    this.thoughts = thoughts
    this.quote = quote
    this.isActive = isActive
  }
}

module.exports = Journal
