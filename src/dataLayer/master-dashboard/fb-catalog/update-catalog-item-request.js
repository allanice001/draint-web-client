import { axiosInstance } from 'dataLayer/axiosInstance';

function updateCatalogItemRequest(form) {
  return axiosInstance().post('/api/master/update-catalog-item', form);
}

export default updateCatalogItemRequest;
