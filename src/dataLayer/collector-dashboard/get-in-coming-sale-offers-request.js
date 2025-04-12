import { axiosInstance } from 'dataLayer/axiosInstance';

const getInComingSaleOffersRequest = (inComingPage, inComingCount) =>
  axiosInstance().get('/api/sales-dashboard/in-coming-offers', {
    params: { inComingPage, inComingCount },
  });

export default getInComingSaleOffersRequest;
