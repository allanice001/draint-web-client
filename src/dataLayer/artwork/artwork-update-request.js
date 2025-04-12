import { axiosInstance } from 'dataLayer/axiosInstance';

function artworkUpdateRequest(formData) {
  return axiosInstance().put('/api/artwork/update', { formData });
}

export default artworkUpdateRequest;
