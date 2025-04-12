import analyticDataObject from '../data-objects/analyticEvents.json';

export class AnalyticEvent {
  label = '';

  category = '';

  page = '';

  type = '';

  data = {};

  constructor(name, data, page) {
    try {
      this.label = analyticDataObject[name].label || name;
      this.title = analyticDataObject[name].title || this.label;
      this.category = analyticDataObject[name].category;
      this.page = page || window.location.pathname;
      this.name = name || 'PageView';
      this.type = analyticDataObject[name]?.type || '';
      this.eventId = data ? data.eventId : undefined;

      // replace currency (optional), remove eventId
      this.data = data ? { ...data, eventId: undefined } : '';
    } catch {
      return {};
    }
  }

  static create(data) {
    return new AnalyticEvent(data);
  }
}
