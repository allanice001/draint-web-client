import { datesAreOnSameDay, setDateDay } from '../services/pickup-service';

import { Artwork } from './artwork';
import { DRAINT_RATE } from 'constants/components/checkout/constants';
import { Offer } from './offer';
import convertIsoCountry from 'services/convert-iso-country';
import { fillShipment, getValue } from './helpers';
import moment from 'moment';

export class Order {
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

  courierArrival = '';

  shipmentAccept = '';

  cancelledReason = null;

  orderPayout = {};

  wrappedSteps = [
    {
      id: undefined,
      title: 'Wrapping with glassine paper',
      description: `Wrap the painting in glassine paper or acid-free archival tissue paper. Note that any material that
          comes into contact with the surface of the work should be archival quality. We advise that you avoid
          touching the painting’s surface with bare hands by wearing white cotton gloves or placing acid-free
          tissue paper between the work and your fingers when handling.`,
      photo: '',
      name: '',
      size: '',
      number: 1,
      status: '',
      uploaded: false,
      gifUrl: 'https://media.draintart.gallery/static/wrapped-steps/1.gif',
    },
    {
      id: undefined,
      title: 'Form a triangle pockets',
      description: `Take four (4) 20cm x 20cm square pieces of glassine paper or acid-free tissue paper
          (you may adjust the size of the squares to better fit the size of your work) and fold each in half
          diagonally to create a triangle, then fold in half again to create a triangle pocket. Place one pocket
          onto each corner of the painting.`,
      photo: '',
      name: '',
      size: '',
      number: 2,
      status: '',
      uploaded: false,
      gifUrl: 'https://media.draintart.gallery/static/wrapped-steps/2.gif',
    },
    {
      id: undefined,
      title: 'Fix the pockets by using tape',
      description: `Now it is time to fix the corner protectors you built. (This is not needed if you used cardboard
          corner protectors) Add tape alongside the edge of the pocket so you can fix it on the edges of the canvas.
           Never use tape on the front or packside of your painting to protect the fabric from being ripped if the buyer
          removed the tape with out caution.`,
      photo: '',
      name: '',
      size: '',
      number: 3,
      status: '',
      uploaded: false,
      gifUrl: 'https://media.draintart.gallery/static/wrapped-steps/3.gif',
    },
    {
      id: undefined,
      title: 'Protect your painting against moisture',
      description: `By using plastic materials that wrap around the whole painting, you can prevent moisture.
          Here you can use plastic sheeting, poly wrap, or, best, a plastic bag. If you have, put a salt tap within so
          moisture can be extracted. Make sure the tap will stay fixed throughout the journey and never touches the
          fabric. Finally, seal all edges with tape and again make sure not to use tape on the painting's front side.`,
      photo: '',
      name: '',
      size: '',
      number: 4,
      status: '',
      uploaded: false,
      gifUrl: 'https://media.draintart.gallery/static/wrapped-steps/4.gif',
    },
    {
      id: undefined,
      title: 'Wrapping with bubble wrap',
      description: `This will add a security layer to your packaging and prevent damages caused by any hits from
          outside throughout the journey. Make sure every side and edge is sufficiently covered in bubble wrap.
          Try to use big pieces of the bubble wrap to reduce the amount of tape needed to seal all edges that occur.
          Again, please avoid tape from being used on the front side of your canvas. Also, make sure the wrap does not
          put too much pressure on the canvas.`,
      photo: '',
      name: '',
      size: '',
      number: 5,
      status: '',
      uploaded: false,
      gifUrl: 'https://media.draintart.gallery/static/wrapped-steps/5.gif',
    },
    {
      id: undefined,
      title: 'Build a cardboard crate',
      description: `The outer layer of your packaging consists of a cardboard crate that is of sufficient thickness.
          It is important that the crate has the perfect size to fit your wrapped painting easily but is not too big
          for the painting to move inside the crate. Paintings sold into a country that is not part of your domestic
          countries' tax region will need additional paperwork to be included inside the crate. Make sure the crate
          is completely sealed except for one fin.  Here the courier will put the paperwork inside the crate. This
          happens at your door step. Please be ready to seal the last fin by having a 30 cm long piece of tape ready.`,
      photo: '',
      name: '',
      size: '',
      number: 6,
      status: '',
      uploaded: false,
      gifUrl: 'https://media.draintart.gallery/static/wrapped-steps/6.gif',
    },
  ];

  wrappedPhotos = [];

  overdueOrder = false;

  isManual = false;

  static create(data) {
    const artwork = data.artwork ? Artwork.create(data.artwork) : {};
    const offer = data.offer ? Offer.create(data.offer) : {};

    return new Order({ ...data, artwork, offer });
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
    this.cancelledReason = getValue(data.cancelled_reason);
    this.is_completed = data.is_completed;
    this.dateFormat = getValue(data.dateFormat, 'DD.MM.YYYY');
    this.price = getValue(data.price, 0, parseFloat);
    this.shipment = fillShipment(data);
    this.shipping_cost = getValue(data.shipping_cost, 0, parseFloat);
    this.verification = getValue(data.verification);
    this.totalPrice = Number(this.price + this.shipping_cost).toFixed(2);
    this.shipmentAccept = data.is_accepted;
    this.trackerNumber = this.shipmentAccept ? `${data.tracker_id}` : '';
    this.wrappedPhotos = data.wrapped_photos;
    this.courierArrival = getValue(data.courier_arrival);
    this.orderPayout = data.order_payout;
    this.owner = {
      ...data.from_account,
      location: {
        ...data.to_location,
        country: convertIsoCountry(data.to_location.country, true),
      },
    };
    this.buyer = {
      ...data.to_account,
      location: {
        ...data.from_location,
        country: convertIsoCountry(data.from_location.country, true),
      },
    };
    this.wrappedSteps = this.wrappedSteps.map(steps => {
      data = this.fillUrl(steps.number);
      if (data) {
        return {
          ...steps,
          id: data.id || undefined,
          name: data.name,
          size: data.size,
          photo: data.photo_url,
          status: data.status,
          uploaded: !!data.photo_url,
        };
      }
      return steps;
    });
    // this.courierArrival = this.shipmentAccept ? setPickUpDay(this.pickupScheduled) : '';
    this.overdueOrder = this.checkOverdue(this.shipment);
    this.isManual = this.shipment?.selected_service === DRAINT_RATE;
  }

  fillUrl(step) {
    if (this.wrappedPhotos) {
      const [wrappedPhoto] = this.wrappedPhotos.filter(photos => {
        return Number(photos.step) === step;
      });
      if (wrappedPhoto) {
        return wrappedPhoto;
      }
    }
  }

  checkOverdue(shipment) {
    if (shipment) {
      if (shipment.created_at) {
        const shipmentConfirmDate = shipment.created_at;
        const declineDay = setDateDay(shipmentConfirmDate, 25);
        return datesAreOnSameDay(new Date(), declineDay);
      }
    }
    return shipment;
  }

  get orderVerification() {
    if (this.verification === 'verified') {
      return {
        date: `${this.verification} by seller`,
        status: true,
      };
    }

    if (this.verification === 'declined') {
      return {
        date: this.cancelledReason,
        status: false,
      };
    }

    return '';
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

  get arrivalInfo() {
    if (this.trackerNumber && this.courierArrivalFormatDate) {
      return `${this.trackerNumber} ${this.courierArrivalFormatDate}`;
    }

    return '';
  }
}
