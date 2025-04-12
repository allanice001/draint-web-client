import { axiosInstance } from 'dataLayer/axiosInstance';

const getOutComingSaleOfferRequest = (outComingPage, outComingCount) =>
  axiosInstance().get('/api/sales-dashboard/out-coming-offers', {
    params: { outComingPage, outComingCount },
  });

export default getOutComingSaleOfferRequest;
