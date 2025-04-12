import { axiosInstance } from 'dataLayer/axiosInstance';

function catalogItemRequest(params) {
  return axiosInstance().get(`/api/master/catalog-item`, { params });
}

export default catalogItemRequest;
