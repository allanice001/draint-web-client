import { getValue } from './helpers';

export class Account {
  id = '';

  first_name = '';

  last_name = '';

  static create(data) {
    return new Account(data);
  }

  constructor(data) {
    this.id = data.id;
    this.first_name = getValue(data.first_name);
    this.last_name = getValue(data.last_name);
  }

  get fullName() {
    return `${this.first_name} ${this.last_name}`.trim();
  }
}
