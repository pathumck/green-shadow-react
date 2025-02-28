export default class Log {
  id: number;
  userId: string;
  date: string;
  fieldId: string;
  cropId: string;
  description: string;
  status: string;
  image: string;

  constructor(id: number, userId: string, date: string, fieldId: string, cropId: string, description: string, status: string, image: string) {
    this.id = id;
    this.userId = userId;
    this.date = date;
    this.fieldId = fieldId;
    this.cropId = cropId;
    this.description = description;
    this.status = status;
    this.image = image;
  }
}