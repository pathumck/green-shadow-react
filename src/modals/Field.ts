export default class Field {
  _id : string
  name : string
  location : string
  size : string
  imageOne :  File | null
  imageTwo : File | null

  constructor(_id : string, name : string, location : string, size : string, imageOne : File | null, imageTwo : File | null) {
    this._id = _id
    this.name = name
    this.location = location
    this.size = size
    this.imageOne = imageOne
    this.imageTwo = imageTwo
  }
}