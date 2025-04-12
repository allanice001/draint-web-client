import { Rules } from '../constants/permissions';

export class Permissions {
  permission = '';

  planName = '';

  static create(data) {
    return new Permissions(data);
  }

  set plan(name) {
    this.planName = name;
  }

  constructor(data) {
    this.permission = data.permission;
    this.planName = data?.planName || 'None';
  }

  hasAccess(type) {
    if (this.permission === 'master') return true;
    return Rules[this.planName]?.has(type);
  }
}
