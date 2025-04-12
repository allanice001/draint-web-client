export class Blog {
  uuid = '';
  title = '';
  content = '';
  first_name = '';
  last_name = '';
  username = '';
  primary_image = '';
  created_at = '';

  static create(data) {
    return new Blog(data);
  }

  constructor(data) {
    this.uuid = data.uuid;
    this.title = data.title;
    this.content = data.content;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.username = data.username;
    this.primary_image = data.primary_image;
    this.created_at = data.created_at;
  }
}
