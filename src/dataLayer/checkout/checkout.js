import { axiosInstance } from 'dataLayer/axiosInstance';

export function prepareOrder(orderData) {
  return axiosInstance().post('/api/checkout/prepare-order', orderData);
}

export function sendCheckout(data) {
  return axiosInstance().post('/api/checkout/send-checkout', data);
}

export function deleteOrders(data) {
  return axiosInstance().delete('/api/checkout/order', { data });
}

export const checkOrderOnAvailability = params => {
  return axiosInstance().get('/api/checkout/check-order-on-availability', {
    params: { ...params },
  });
};

export const checkIsActiveOffer = params => {
  return axiosInstance().get('/api/checkout/check-is-active-offer', {
    params: { ...params },
  });
};

export const checkIsOfferInOrder = params => {
  return axiosInstance().get('/api/checkout/check-is-offer-in-order', {
    params: { ...params },
  });
};
