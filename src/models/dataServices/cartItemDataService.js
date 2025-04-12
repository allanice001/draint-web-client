
export class CartItemDataService {
  static selectedRateValue(selectedRate) {
    return selectedRate ? selectedRate.rate : 0;
  }

  static rate(rates, rateId) {
    const rate = rates?.length ? rates.filter(rate => rate.rateCode === rateId)[0] : {};
    return rate.ratePrice;
  }

  static lowestRate(rates) {
    return rates?.length > 1
      ? rates.reduce((prev, curr) => (prev.rate < curr.rate ? prev.rate : curr.rate))
      : rates?.length ? rates[0].rate : 0;
  }

  static lowestRateId(rates) {
    const lowestRate = this.lowestRate(rates);
    return rates.filter(rate => rate.rate === lowestRate)[0].id;
  }

  static itemTotal(isOffer, offer_price, price, rate) {
    const defPrice = isOffer ? offer_price : price;
    return Number(+defPrice + (+rate || 0)).toFixed(2);
  }
}
