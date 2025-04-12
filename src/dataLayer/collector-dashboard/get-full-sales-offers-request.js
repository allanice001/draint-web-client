import { axiosInstance } from 'dataLayer/axiosInstance';

const getFullSalesOffersRequest = (outComingPage, inComingPage) =>
  axiosInstance().get('/api/sales-dashboard/full-offers', {
    params: { outComingPage, inComingPage },
  });

export default getFullSalesOffersRequest;
