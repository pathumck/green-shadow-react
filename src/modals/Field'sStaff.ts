export default class FieldStaff {
  fieldId: string
  staffId: string | undefined
  constructor(fieldId: string, staffId: string | undefined) {
    this.fieldId = fieldId
    this.staffId = staffId
  }
}