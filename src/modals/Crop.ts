export default class Crop {
  id : string
  commonName : string
  scientificName : string
  category : string
  season : string
  image : string | null
  constructor(id : string, commonName : string, scientificName : string, category : string, season : string, image : string | null) {
    this.id = id
    this.commonName = commonName
    this.scientificName = scientificName
    this.category = category
    this.season = season
    this.image = image
  }
}