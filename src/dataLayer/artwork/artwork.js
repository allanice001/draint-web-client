import axios from 'dataLayer/axiosInstance';

export const getArtworksByUserName = (username, params) => {
  return axios.get(`api/artist/artwork/username/${username}`, { params });
};

export const getArtworksByIdForTemplate = (id, params) => {
  return axios.get(`api/artist/artwork/template/${id}`, { params });
};

export const handleCheckIsCanUploadArtwork = (accountId) => {
  return axios.get(`api/artist/artwork/check-is-can-upload`, { params: { accountId } });
};
