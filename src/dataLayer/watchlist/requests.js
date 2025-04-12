import { axiosInstance } from 'dataLayer/axiosInstance';

export const getWatchlistFullRequest = accountId =>
  axiosInstance().post('/api/watchlist/full', {
    accountId,
  });

export const getWatchlistAllRequest = (accountId, cartHash, params) =>
  axiosInstance().post(
    '/api/watchlist/all',
    {
      accountId,
      cartHash,
    },
    { params: params }
  );

export const addToWatchlistRequest = (accountId, artworkId) =>
  axiosInstance().post('/api/watchlist/add', {
    accountId,
    artworkId,
  });

export const deleteFromWatchlistRequest = (accountId, artworkId) =>
  axiosInstance().delete('/api/watchlist/artwork', {
    params: {
      accountId,
      artworkId,
    },
  });
