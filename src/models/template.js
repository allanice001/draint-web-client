import { getAttachments } from '../services/templateService/templateService';

export class Template {
  id = '';

  name = '';

  settings = {};

  attachments = [];

  selectedAttachments = [];

  isMultiple = true;

  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.settings = data.settings;
    this.attachments = data.settings?.attachment;
    this.isMultiple = data.settings?.type === 'multiple';
  }

  static create(data) {
    return new Template(data);
  }

  addSelectedAttachments(type, id) {
    if (this.isMultiple) {
      const selected = this.selectedAttachments.filter(
        value => value.id !== id
      );
      if (!selected.length) return this.selectedAttachments.push({ type, id });
      this.selectedAttachments = selected;
    } else {
      this.selectedAttachments = [{ type, id }];
    }
  }

  getAttachments(id) {
    return getAttachments(this.attachments, id);
  }
}
