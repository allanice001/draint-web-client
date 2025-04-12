import { Artwork } from 'models/artwork';
import { Offer } from 'models/offer';
import { fillShipment, getValue } from 'models/helpers';
import moment from 'moment';

export class WrappedOrder {
  id = '';

  artwork = {};

  shipped = '';

  delivered = '';

  paid = '';

  price = 0;

  is_completed = false;

  created_at = '';

  dateFormat = '';

  verification = '';

  shipping_cost = 0;

  shipment = {};

  offer = {};

  trackerNumber = '';

  totalPrice = '';

  wrappedPhotos = [];

  stepsData = [
    {
      id: '',
      label: 'Step 1: Wrapping with glassine paper',
      imgPath: '',
      status: '',
      notified: null,
      step: 1,
    },
    {
      id: '',
      label: 'Step 2: Form triangle pockets',
      imgPath: '',
      status: '',
      notified: null,
      step: 2,
    },
    {
      id: '',
      label: 'Step 3: Fix the pockets by using tape',
      imgPath: '',
      status: '',
      notified: null,
      step: 3,
    },
    {
      id: '',
      label: 'Step 4: Protect your painting against moisture',
      imgPath: '',
      status: '',
      notified: null,
      step: 4,
    },
    {
      id: '',
      label: 'Step 5: Wrapping with bubble wrap',
      imgPath: '',
      status: '',
      notified: null,
      step: 5,
    },
    {
      id: '',
      label: 'Step 6: Build a cardboard crate',
      imgPath: '',
      status: '',
      notified: null,
      step: 6,
    },
  ];

  static create(data) {
    const artwork = data.artwork ? Artwork.create(data.artwork) : {};
    const offer = data.offer ? Offer.create(data.offer) : {};

    return new WrappedOrder({ ...data, artwork, offer });
  }

  constructor(data) {
    this.id = data.id;
    this.artwork = data.artwork;
    this.offer = data.offer;
    this.paid = getValue(data.paid);
    this.shipped = getValue(data.shipped);
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
    this.trackerNumber = getValue(data.tracker_id);
    this.totalPrice = Number(this.price + this.shipping_cost).toFixed(2);
    this.wrappedPhotos = data.wrapped_photos;
    this.owner = {
      ...data.from_account,
      location: data.to_location,
    };
    this.buyer = {
      ...data.to_account,
      location: data.from_location,
    };
    this.stepsData = this.stepsData.map(steps => {
      const data = this.fill(steps.step);
      if (data) {
        return {
          ...steps,
          id: data.id,
          imgPath: data.photo_url,
          status: data.status,
          notified: data.notified,
        };
      }
      return steps;
    });
  }

  fill(step) {
    if (this.wrappedPhotos) {
      const [wrappedPhoto] = this.wrappedPhotos.filter(photos => {
        return Number(photos.step) === step;
      });

      if (wrappedPhoto) {
        return wrappedPhoto;
      }
    }
  }

  get paidFormatDate() {
    return this.paid ? moment(this.paid).format(this.dateFormat) : '';
  }

  get shippedFormatDate() {
    return this.shipped ? moment(this.shipped).format(this.dateFormat) : '';
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

  set stepStatus(parameters) {
    this.stepsData = parameters.steps.map(steps => {
      if (steps['id'] === parameters.stepId) {
        steps.status = parameters.status;
      }

      return {
        ...steps,
      };
    });
  }

  set stepNotified(parameters) {
    this.stepsData = parameters.steps.map(steps => {
      steps.notified = parameters.notified;

      return {
        ...steps,
      };
    });
  }
}
