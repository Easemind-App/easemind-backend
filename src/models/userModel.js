class User {
  constructor(userName, email, isActive) {
    this.userName = userName
    this.email = email
    this.isActive = isActive
  }
}

class UserDetails {
  constructor(dateOfBirth, gender) {
    this.dateOfBirth = dateOfBirth
    this.gender = gender
  }
}

module.exports = { User, UserDetails }
