import { PENDING, UNVERIFIED, VERIFIED } from 'constants/statuses';
import { axiosInstance } from 'dataLayer/axiosInstance';

const getURL = status => {
  switch (status) {
    case VERIFIED:
      return '/api/master/artworks';
    case UNVERIFIED:
      return '/api/master/artworks/unverify';
    case PENDING:
      return '/api/master/artworks/pending';
    default:
      return;
  }
};

export const updateArtworkVerificationRequest = (status, artworkId, artistId) =>
  axiosInstance().post(getURL(status), { id: artworkId, artistId });
