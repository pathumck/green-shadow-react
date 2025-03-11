export default class FieldCrop {
  fieldId: string
  cropId: string | undefined

  constructor(fieldId: string, cropId: string | undefined) {
    this.fieldId = fieldId
    this.cropId = cropId
  }
}
 