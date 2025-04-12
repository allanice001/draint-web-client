import { axiosInstance } from 'dataLayer/axiosInstance';

export const getArtistAccountDataRequest = id =>
  axiosInstance().get('/api/master/artists/settings', { params: { id } });

export const updateArtistAccountDataRequest = data =>
  axiosInstance().put('/api/master/artists/settings', data);

export const updateArtistRatingRequest = (id, rating) =>
  axiosInstance().put('/api/master/artists/rating', { id, rating });

export const getArtistImageObjectsRequest = id =>
  axiosInstance().get(`/api/master/artists/${id}/prepare-card-img/`);
