export default class Equipment {
  id: string;
  name: string;
  type: string;
  status: string;
  staffId: string;
  fieldCode: string;
  constructor(
    id: string,
    name: string,
    type: string,
    status: string,
    staffId: string,
    fieldCode: string
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.status = status;
    this.staffId = staffId;
    this.fieldCode = fieldCode;
  }
}
