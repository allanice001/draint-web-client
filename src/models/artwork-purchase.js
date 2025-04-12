export class ArtworkPurchase {
  artwork_id = '';

  price = 0;

  created_at = '';

  static create(data) {
    return new ArtworkPurchase(data);
  }

  constructor(data) {
    this.artwork_id = data.artwork_id;
    this.price = data.price ? Number.parseFloat(data.price) : 0;
    this.created_at = data.created_at;
  }
}
