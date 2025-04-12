import { axiosInstance } from 'dataLayer/axiosInstance';

export function getOrdersRequest(page, limit, role = '') {
  return axiosInstance().get('/api/orders', { params: { page, limit, role } });
}

export function getOffersRequest(profileId) {
  return axiosInstance().get(`/api/orders/collector/${profileId}`);
}

export function checkOrderVerificationRequest(param) {
  return axiosInstance().post('/api/orders/check-verification', param);
}

export function verifyOrderRequest(param) {
  return axiosInstance().post('/api/orders/verify', param);
}

export function verifyOfferRequest(param) {
  return axiosInstance().post('/api/orders/verify-offer', param);
}

export function sellerOfferPriceRequest(price, offerId) {
  return axiosInstance().put('/api/orders/send/offer/seller-price', {
    price,
    offerId,
  });
}

export function buyerOfferPriceRequest(data) {
  return axiosInstance().put('/api/orders/send/offer/price', data);
}

export function confirmOrderPaymentRequest(param) {
  return axiosInstance().post('/api/orders/confirm-payment', param);
}

export function confirmOrderPickUpDateRequest(param) {
  return axiosInstance().post('/api/orders/confirm-pick-up-date', param);
}

export function addOfferToCartRequest(cartData) {
  return axiosInstance().post('/api/checkout/add-offer-to-cart', {
    data: cartData,
  });
}

export function getPackageInfoRequest(order) {
  return axiosInstance().post('/api/shipping/ups-tracking', { order });
}

export function fetchOffersRequest(page, limit) {
  return axiosInstance().get('/api/sales-dashboard/all-offers', {
    params: { page, limit },
  });
}

export function deleteWrappedPhotoRequest(step, orderId) {
  return axiosInstance().post('/api/artwork/delete/photo', {
    step,
    orderId: orderId,
  });
}

export function saveWrappedPhotoRequest(step, mimeType) {
  return axiosInstance().post('/api/artwork/upload/photo', {
    step,
    mimeType: mimeType,
  });
}

export function getPayoutsOrdersRequest(accountId, page, pageSize) {
  return axiosInstance().get('/api/sales-dashboard/payouts-orders', {
    params: { accountId: accountId, page, pageSize },
  });
}

export function sendManualPayoutRequest(payoutRequest) {
  return axiosInstance().post('/api/sales-dashboard/payouts-manual-request', {
    payoutRequest,
  });
}
