import { Account } from './account';
import { Artwork } from './artwork';
import { getValue } from './helpers';
import moment from 'moment';

export class Offer {
  id = '';

  artwork = {};

  from_account = {};

  price = '';

  verification = '';

  created_at = '';

  updated_at = '';

  dateFormat = '';

  isCheckout = false;

  static create(data) {
    const artwork = data.artwork ? Artwork.create(data.artwork) : {};
    const from_account = data.from_account
      ? Account.create(data.from_account)
      : {};

    return new Offer({ ...data, artwork, from_account });
  }

  constructor(data) {
    this.id = data.id;
    this.artwork = data.artwork;
    this.from_account = data.from_account;
    this.to_account = data.to_account;
    this.created_at = getValue(data.created_at);
    this.updated_at = getValue(data.updated_at);
    this.dateFormat = getValue(data.dateFormat, 'DD.MM.YYYY');
    this.price = getValue(data.price, 0, parseFloat);
    this.verification = getValue(data.verification, null);
    this.sellerOfferPrice = getValue(data.seller_offer_price, 0, parseFloat);
    this.isCheckout = data.order?.is_checkout;
    this.isSellerOfferedLast =
      new Date(data.updated_at) < new Date(data.seller_offer_price_updated_at);
  }

  get createdAtFormatDate() {
    return this.created_at
      ? moment(this.created_at).format(this.dateFormat)
      : '';
  }

  get updatedAtFormatDate() {
    return this.updated_at
      ? moment(this.updated_at).format(this.dateFormat)
      : '';
  }
}
