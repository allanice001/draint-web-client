import { Artwork } from './artwork';
import { Offer } from './offer';
import { fillShipment, getValue } from './helpers';
import moment from 'moment';
import { setPickUpDay } from '../services/pickup-service';

export class PayoutOrder {
  id = '';

  artwork = {};

  delivered = '';

  paid = '';

  price = 0;

  created_at = '';

  dateFormat = '';

  verification = '';

  shipment = {};

  offer = {};

  trackerNumber = '';

  fee = 0;

  vat = 0;

  fixedVAT = 0;

  totalPrice = '';

  isCanMakePayout = false;

  static create(data) {
    const artwork = data.artwork ? Artwork.create(data.artwork) : {};
    const offer = data.offer ? Offer.create(data.offer) : {};

    return new PayoutOrder({ ...data, artwork, offer });
  }

  constructor(data) {
    this.id = data.id;
    this.artwork = data.artwork;
    this.offer = data.offer;
    this.paid = getValue(data.paid);
    this.certificated = getValue(data.certificated);
    this.wrapped = getValue(data.wrapped);
    this.pickupScheduled = getValue(data.pickup_scheduled);
    this.delivered = getValue(data.delivered);
    this.created_at = getValue(data.created_at);
    this.updated_at = getValue(data.updated_at);
    this.is_completed = data.is_completed;
    this.dateFormat = getValue(data.dateFormat, 'DD.MM.YYYY');
    this.price = getValue(data.price, 0, parseFloat);
    this.shipment = fillShipment(data);
    this.shipping_cost = getValue(data.shipping_cost, 0, parseFloat);
    this.verification = getValue(data.verification);
    this.totalPrice = Number(this.price + this.shipping_cost).toFixed(2);
    this.isCanMakePayout = data.isCanMakePayout;
    this.shipmentAccept = data.is_accepted;
    this.trackerNumber = this.shipmentAccept ? `${data.tracker_id}` : '';
    this.fee = getValue(data.fee, 0, parseFloat);
    this.vat = getValue(data.commissionsVAT, 0, parseFloat);
    this.fixedVAT = getValue(data.fixedVAT, 0, parseFloat);
    this.owner = {
      ...data.from_account,
      location: data.to_location,
    };

    this.buyer = {
      ...data.to_account,
      location: data.from_location,
    };

    this.courierArrival = this.shipmentAccept
      ? setPickUpDay(this.pickupScheduled)
      : '';
  }

  get paidFormatDate() {
    return this.paid ? moment(this.paid).format(this.dateFormat) : '';
  }

  get certificatedFormatDate() {
    return this.certificated
      ? moment(this.certificated).format(this.dateFormat)
      : '';
  }

  get wrappedFormatDate() {
    return this.wrapped ? moment(this.wrapped).format(this.dateFormat) : '';
  }

  get pickupScheduledFormatDate() {
    return this.pickupScheduled
      ? moment(this.pickupScheduled).format(this.dateFormat)
      : '';
  }

  get courierArrivalFormatDate() {
    return this.courierArrival
      ? moment(this.courierArrival)
          .utc()
          .format(this.dateFormat)
      : '';
  }

  get deliveredFormatDate() {
    return this.delivered ? moment(this.delivered).format(this.dateFormat) : '';
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

  get paidAtFormatDate() {
    return this.paid ? moment(this.paid).format(this.dateFormat) : '';
  }
}
