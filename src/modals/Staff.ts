export default class Staff {
  id : string
  registerDate : string
  firstName : string
  lastName : string
  birthDay : string
  gender : string
  phone : string
  email : string
  address : string
  designation : string
  role : string 

  constructor(id : string, registerDate : string, firstName : string, lastName : string, birthDay : string, gender : string, phone : string, email : string, address : string, designation : string, role : string) {
    this.id = id
    this.registerDate = registerDate
    this.firstName = firstName
    this.lastName = lastName
    this.birthDay = birthDay
    this.gender = gender
    this.phone = phone
    this.email = email
    this.address = address
    this.designation = designation
    this.role = role
  }
}