import { axiosInstance } from '../axiosInstance';

export const updateShippingOrdersStatusRequest = (status, activeStep, order) =>
  axiosInstance().post('/api/master/update-shipping-orders', {
    status,
    activeStep,
    order,
  });

export const shippingOrderWrapperStepRequest = order =>
  axiosInstance().post('/api/master/shipping-orders-wrapped-step', { order });

export const notifySellerRequest = (order, status) =>
  axiosInstance().post('/api/master/shipping-orders-notify', { order, status });
