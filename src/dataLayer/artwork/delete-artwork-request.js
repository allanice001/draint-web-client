import { axiosInstance } from 'dataLayer/axiosInstance';

function deleteArtworkRequest(data) {
  return axiosInstance().delete('/api/artwork/delete', { data });
}

export default deleteArtworkRequest;
