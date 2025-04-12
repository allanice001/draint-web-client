import axios from 'dataLayer/axiosInstanceMaster';

export const getShippingOrdersRequest = (page, type) =>
  axios.get('/api/master/shipping-orders', { params: { page, type } });
