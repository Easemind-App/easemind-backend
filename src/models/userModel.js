class User {
  constructor(userName, email, isActive, UserDetails) {
    this.userName = userName
    this.email = email
    this.isActive = isActive
    this.userDetails = UserDetails
  }
}

class UserDetails {
  constructor(age, gender) {
    this.age = age
    this.gender = gender
  }
}

module.exports = { User, UserDetails }
