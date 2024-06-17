function fsDate(timestamp) {
  if (timestamp && timestamp._seconds) {
    let date = new Date(timestamp._seconds * 1000)

    let year = date.getFullYear().toString() // Get the last two digits of the year
    let month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-indexed
    let day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  return null
}

module.exports = fsDate
