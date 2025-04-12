import { axiosInstance } from 'dataLayer/axiosInstance';

function addToCatalogRequest(params) {
  return axiosInstance().post('/api/master/addToCatalog', params);
}

export default addToCatalogRequest;
