export default class Equipment {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  constructor(
    id: string,
    name: string,
    brand: string,
    model: string,
    category: string
  ) {
    this.id = id;
    this.name = name;
    this.brand = brand;
    this.model = model;
    this.category = category;
  }
}
