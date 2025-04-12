import axios from 'dataLayer/axiosInstance';

export const createOfferRequest = formData =>
  axios.put('/api/orders/send/offer', { formData });
