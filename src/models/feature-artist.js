export class Feature {
  id = '';
  username = '';
  title = '';
  url = '';
  description = '';
  is_artist = '';

  static create(data) {
    return new Feature(data);
  }

  constructor(data) {
    this.description = data.description;
    this.id = data.id;
    this.title = data.title;
    this.url = data.url;
    this.username = data.username;
    this.is_artist = data.is_artist;
  }

}
