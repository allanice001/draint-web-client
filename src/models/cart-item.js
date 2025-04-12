import { CartItemDataService } from './dataServices/cartItemDataService';
// import { Artist } from './artist';
import { getValue } from './helpers';
import moment from 'moment';

export class CartItem {
  // Cart item fields
  id = '';

  small_image = '';

  primary_image = '';

  title = '';

  price = 0;

  prevPrice = 0;

  offer_price = 0;

  height = 0;

  weight = 0;

  width = 0;

  thickness = 0;

  mediums = [];

  surfaces = [];

  styles = [];

  owner = {};

  profile = {};

  artist = {};

  completed = '';

  dateFormat = '';

  verification = '';

  totalCost = 0;

  shippingCost = 0;

  selectedRateId = '';

  selectedRate = {};

  rates = [];

  calculatedRate = [];

  lowestRatePrice = '';

  lowestRateCode = '';

  rateError = '';

  shippingId = '';

  isOffer = false;

  pickup = false;

  manualShipping = false;

  selectedAddress = {};

  static create(data) {
    return new CartItem({ ...data });
  }

  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.small_image = data.small_image;
    this.primary_image = data.primary_image;
    this.price = data.price ? Number.parseFloat(data.price) : 0;
    this.prevPrice = data.prev_price ? Number.parseFloat(data.prev_price) : 0;
    this.offer_id = data.offer;
    this.offer_price = data.offer_price
      ? Number.parseFloat(data.offer_price)
      : 0;
    this.weight = getValue(data.weight, 0);
    this.width = getValue(data.width, 0);
    this.height = getValue(data.height, 0);
    this.thickness = getValue(data.thickness, 0);
    this.mediums = getValue(data.mediums, []);
    this.surfaces = getValue(data.surfaces, []);
    this.styles = getValue(data.styles, []);
    this.seller_profile_id = data.seller_profile_id;
    this.verification = data.verification;
    this.isOffer = this.verification === 'verified';
    this.completed = data.completed;
    this.profile = data.owner;
    this.owner = data.owner;
    this.artist = data.profile;
    this.rates = data.rates ? data.rates : [];
    this.rateLoad = true;
    this.selectedRateId = data.rateId
      ? data.rateId
      : this.rates?.length > 0
      ? CartItemDataService.lowestRateId(this.rates)
      : '';
    this.selectedRate = CartItemDataService.rate(
      this.rates,
      this.selectedRateId
    );
    this.shippingId = data.shippingId;
    this.totalCost = Number(
      CartItemDataService.itemTotal(
        this.isOffer,
        this.offer_price,
        this.price,
        this.selectedRate
      )
    );
    this.dateFormat = getValue(data.dateFormat, 'MM / YYYY');
  }

  get completedFormatDate() {
    return this.completed
      ? moment(new Date(+this.completed)).format(this.dateFormat)
      : '';
  }

  /**
   * @param {{ newRates: object }} newRates
   */
  set newRates(newRates) {
    this.rates = newRates.rates;
    this.lowestRatePrice = newRates.lowestRatePrice;
    this.lowestRateCode = newRates.lowestRateCode;
    this.rateError = newRates.rateError;
    this.shippingId = newRates.shippingId;
    this.selectedRateId = newRates.lowestRateCode;
    this.selectedRate = this.lowestRatePrice;
    this.totalCost = Number(
      CartItemDataService.itemTotal(
        this.isOffer,
        this.offer_price,
        this.price,
        this.selectedRate
      )
    );
  }

  /**
   * @param {{ shipConfirm: string }} shipConfirm
   */
  set shipConfirm(shipConfirm) {
    this.calculatedRate = shipConfirm.rates;
    this.rateError = shipConfirm.shipError;
    this.selectedRateId = shipConfirm.rates[0].rateCode;
    this.selectedRate = shipConfirm.rates[0].ratePrice;
    this.shippingId = shipConfirm.shipId;
    this.totalCost = Number(
      CartItemDataService.itemTotal(
        this.isOffer,
        this.offer_price,
        this.price,
        this.selectedRate
      )
    );
  }

  set shipError(shipConfirm) {
    this.rateError = shipConfirm.shipError;
    this.totalCost = Number(
      CartItemDataService.itemTotal(
        this.isOffer,
        this.offer_price,
        this.price,
        this.selectedRate
      )
    );
  }

  set shipConfirmCancel(shipConfirm) {
    this.shippingId = shipConfirm.shippingId;
    this.calculatedRate = [];
    this.selectedRateId = this.rates[0].rateCode;
    this.selectedRate = this.rates[0].ratePrice;
    this.totalCost = Number(
      CartItemDataService.itemTotal(
        this.isOffer,
        this.offer_price,
        this.price,
        this.selectedRate
      )
    );
  }

  set ratesLoadingStatus(status) {
    this.rateLoad = status;
  }

  /**
   * @param {string} rateId
   */
  set newSelectedRate(rateId) {
    this.selectedRateId = rateId;
    this.selectedRate = CartItemDataService.rate(
      this.rates,
      this.selectedRateId
    );
    this.totalCost = Number(
      CartItemDataService.itemTotal(
        this.isOffer,
        this.offer_price,
        this.price,
        this.selectedRate
      )
    );
  }

  /**
   * @param {{Object}} address
   */
  set newSelectedAddress(address) {
    this.selectedAddress = { ...address };
  }
}
