import axios from 'dataLayer/axiosInstanceMaster';

export const updateManualOrderRequest = (orderId, formValues, page) =>
  axios.post('/api/master/update-manual-shipping-order', {
    orderId,
    formValues,
    page,
  });

export const finalizeManualOrderRequest = (order, page) =>
  axios.post('/api/master/finalize-manual-shipping-order', {
    order,
    page,
  });
