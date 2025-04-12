import axios from 'dataLayer/axiosInstance';

export const prepareOrder = orderData =>
  axios.post('/api/checkout/prepare-order', orderData);
