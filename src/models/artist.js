import { DEFAULT, NAME, USERNAME } from 'constants/profile-settings';
import { ArtistService } from 'services/artist-service';

const artistService = new ArtistService();

export class Artist {
  id = '';

  accountId = '';

  first_name = '';

  last_name = '';

  username = '';

  small_avatar = '';

  featured_background_url = '';

  avatar_url = '';

  description = '';

  locations = {};

  artworks = [];

  isArtist = false;

  isUsername = DEFAULT;

  static create(data) {
    return new Artist(data);
  }

  constructor(data) {
    this.id = data.id;
    this.accountId = data.account_id;
    this.first_name = data.first_name || '';
    this.last_name = data.last_name || '';
    this.username = data.username;
    this.small_avatar = data.small_avatar;
    this.featured_background_url = data.featured_background_url;
    this.avatar_url = data.avatar_url;
    this.description = data.description;
    this.locations = data.locations || {};
    this.artworks = data.artworks;
    this.isArtist = data.is_artist;
    this.isUsername = data.is_username;
  }

  get fullName() {
    const default_name =
      `${this.first_name} ${this.last_name}`.trim() || this.username;

    if (this.isUsername === NAME)
      return `${this.first_name} ${this.last_name}`.trim();

    if (this.isUsername === USERNAME) return this.username;

    return default_name;
  }

  get avatar() {
    return artistService.filterArtistAvatar(
      this.small_avatar || this.featured_background_url || this.avatar_url
    );
  }

  get locationCountry() {
    return this.locations.country;
  }
}
