export class Review {
  uuid = '';
  name = '';
  points = '';
  message = '';
  country = '';

  static create(data) {
    return new Review(data);
  }

  constructor(data) {
    this.uuid = data.uuid;
    this.name = data.name;
    this.points = data.points;
    this.message = data.message;
    this.country = data.country;
  }
}
