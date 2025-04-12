export class User {
  id = '';
  first_name = '';
  last_name = '';
  username = '';

  static create(data) {
    return new User(data);
  }

  constructor(data) {
    this.id = data.id;
    this.first_name = data.first_name || '';
    this.last_name = data.last_name || '';
    this.username = data.username;
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`.trim() || this.username;
  }
}
