import { axiosInstance } from 'dataLayer/axiosInstance';

export const getRequestedPayoutsRequest = page =>
  axiosInstance().get('/api/master/payouts-requested', { params: { page } });

export const changePayoutStatusRequest = (requestedPayoutId, status) =>
  axiosInstance().post('/api/master/payouts-requested-update-status', {
    requestedPayoutId,
    status,
  });
