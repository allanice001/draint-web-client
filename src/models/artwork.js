import { getPrice, getValue } from './helpers';
import { Artist } from './artist';
import { ArtworkPurchase } from './artwork-purchase';
import moment from 'moment';

export class Artwork {
  id = '';

  small_image = '';

  primary_image = '';

  title = '';

  price = 0;

  prevPrice = 0;

  height = 0;

  weight = 0;

  width = 0;

  thickness = 0;

  mediums = [];

  surfaces = [];

  medium = [];

  surface = [];

  styles = [];

  artist = {};

  owner = {};

  completed = '';

  dateFormat = '';

  purchase_history = [];

  above_original_price = 0;

  avg_price_increase = 0;

  isOwnerCanEditArtwork = false;

  static create(data) {
    // Prevent displaying empty artwork card
    if (
      typeof data.small_image === 'undefined' &&
      typeof data.primary_image === 'undefined'
    ) {
      return;
    }

    const artist = data.profile ? Artist.create(data.profile) : {};
    const owner = data.owner ? Artist.create(data.owner) : {};
    const purchase_history = data.artworks_purchase_history
      ? data.artworks_purchase_history.map(ArtworkPurchase.create)
      : [];

    return new Artwork({ ...data, artist, owner, purchase_history });
  }

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.small_image = data.small_image;
    this.primary_image = data.primary_image;
    this.price = getPrice(data);
    this.prevPrice = getPrice(data);
    this.avg_price_increase = data.avg_price_increase
      ? Number.parseFloat(data.avg_price_increase)
      : 0;
    this.weight = getValue(data.weight, 0);
    this.width = getValue(data.width, 0);
    this.height = getValue(data.height, 0);
    this.thickness = getValue(data.thickness, 0);
    this.mediums = getValue(data.mediums, []);
    this.surfaces = getValue(data.surfaces, []);
    this.medium = getValue(data.medium, 0);
    this.surface = getValue(data.surface, 0);
    this.styles = getValue(data.styles, []);
    this.artist = data.artist;
    this.owner = data.owner;
    this.purchase_history = data.purchase_history;
    this.completed = data.completed;
    this.dateFormat = getValue(data.dateFormat, 'MM / YYYY');
    this.isOwnerCanEditArtwork = data.isOwnerCanEditArtwork;
  }

  get src() {
    return this.small_image || this.primary_image;
  }

  get mediumList() {
    return this.mediums.map(_ => _.medium).join(', ');
  }

  get surfaceList() {
    return this.surfaces.map(_ => _.surface).join(', ');
  }

  get styleList() {
    return this.styles.map(_ => _.style).join(', ');
  }

  get mediumOnSurface() {
    return this.medium && this.surface
      ? `${this.medium} on ${this.surface}`
      : '';
  }

  get mediumAndSurface() {
    return this.artwork_medium && this.artwork_surface
      ? ` ${this.artwork_medium} on ${this.artwork_surface}`
      : '';
  }

  get artwork_medium() {
    return this.mediums.map(_ => _.medium).slice(0, 1);
  }

  get artwork_surface() {
    return this.surfaces.map(_ => _.surface).slice(0, 1);
  }

  get size() {
    return this.width && this.height
      ? `${this.width}x${this.height}cm`
      : "Size isn't specified";
  }

  get completedFormatDate() {
    return this.completed
      ? moment(new Date(+this.completed)).format(this.dateFormat)
      : '';
  }
}
