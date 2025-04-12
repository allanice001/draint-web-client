import { axiosInstance } from 'dataLayer/axiosInstance';

export const updateArtworkPriceRequest = params =>
  axiosInstance().post('/api/artwork/update/price', { ...params });

export const getCollectorGalleryRequest = (page = 1, pageSize = 6) =>
  axiosInstance().get('/api/artist/artwork', {
    params: { page, pageSize, cartHash: localStorage.cartId },
  });

export const getSubscribedArtistRequest = (page = 1, pageSize = 6) =>
  axiosInstance().get('/api/personal-subscriptions', {
    params: { page, pageSize },
  });

export const getSubscribedArtistFullRequest = () =>
  axiosInstance().get('/api/personal-subscriptions/all');

export const unsubscribeOfArtistRequest = (id) =>
  axiosInstance().delete(`/api/personal-subscriptions/unsubscribe/${id}`);
