import { axiosInstance } from 'dataLayer/axiosInstance';

function catalogListRequest(params) {
  return axiosInstance().get('/api/master/catalog-list', { params });
}

export default catalogListRequest;
