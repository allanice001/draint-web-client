import { axiosInstance } from 'dataLayer/axiosInstance';

function catalogArtworkRequest(params) {
  return axiosInstance().get('/api/master/artworks', { params });
}

export default catalogArtworkRequest;
