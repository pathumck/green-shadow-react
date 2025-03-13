export default class Vehicle {
  id: string;
  number: string;
  category: string;
  fuelType: string;
  remarks: string;
  status: string;
  staffId: string;

  constructor(
    id: string,
    number: string,
    category: string,
    fuelType: string,
    remarks: string,
    status: string,
    staffId: string
  ) {
    this.id = id;
    this.number = number;
    this.category = category;
    this.fuelType = fuelType;
    this.remarks = remarks;
    this.status = status;
    this.staffId = staffId;
  }
}
