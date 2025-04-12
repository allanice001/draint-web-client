import { axiosInstance } from 'dataLayer/axiosInstance';

function recoverArtworkRequest(data) {
  return axiosInstance().put('/api/artwork/recover', data);
}

export default recoverArtworkRequest;
