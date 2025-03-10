export default class Field {
  id : string
  name : string
  location : string
  size : number
  imageOne :  string | null
  imageTwo : string | null

  constructor(id : string, name : string, location : string, size : number, imageOne : string | null, imageTwo : string | null) {
    this.id = id
    this.name = name
    this.location = location
    this.size = size
    this.imageOne = imageOne
    this.imageTwo = imageTwo
  }
}