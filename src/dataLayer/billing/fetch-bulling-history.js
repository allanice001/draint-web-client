import { axiosInstance } from 'dataLayer/axiosInstance';

export const fetchBillingHistory = params => {
  return axiosInstance().get('/api/billing/history', { params });
};

export const fetchBillingTimeLine = params => {
  return axiosInstance().get('/api/billing/history-timeline', { params });
};

export const fetchBillingMethod = params => {
  return axiosInstance(20000).get('/api/billing/get-stripe-payment-info', {
    params,
  });
};

export const changeDefaultPMRequest = params => {
  return axiosInstance(20000).post(
    '/api/billing/change-default-payment-method',
    params
  );
};
