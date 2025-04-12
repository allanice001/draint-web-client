import axios from 'dataLayer/axiosInstance';

export const prepareOfferOrder = offerOrderData =>
  axios.post('/api/checkout/prepare-offer-order', offerOrderData);
