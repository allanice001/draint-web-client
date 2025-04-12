import { axiosInstance } from 'dataLayer/axiosInstance';

export function getArtistArtworksRequest(param) {
  return axiosInstance().get(
    `/api/artist/artwork/username/${param}?cartHash=${localStorage.cartId}`
  );
}

export function getGalleryArtworksRequest(
  userName,
  page = 1,
  pageSize = 6,
  accountId
) {
  return axiosInstance().get(`/api/artist/artwork/gallery/`, {
    params: {
      userName,
      page,
      pageSize,
      accountId,
      cartHash: localStorage.cartId,
    },
  });
}
