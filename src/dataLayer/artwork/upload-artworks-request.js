import { axiosInstance } from 'dataLayer/axiosInstance';

const uploadArtworksRequest = (artworkId, params) => {
  return axiosInstance().put(
    `/api/artwork/update/artwork-images/${artworkId}`,
    params
  );
};

export default uploadArtworksRequest;
