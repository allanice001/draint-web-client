import { axiosInstance } from 'dataLayer/axiosInstance';

export function getCartItems(cartId, artworkBuyer) {
  return axiosInstance(15000).get(`/api/checkout/get-cart/${cartId}`, {
    params: { artworkBuyer },
  });
}

export function deleteCartItem(cartId, artworkId, buyerId, sellerId) {
  return axiosInstance().delete('/api/checkout/remove-artwork', {
    data: {
      cartId,
      artworkId,
      buyerId,
      sellerId,
    },
  });
}

export const checkUnfinishedOrders = (items, accountId, cartId) => {
  return axiosInstance(15000).post(`/api/checkout/check-unfinished-orders`, {
    items,
    accountId,
    cartId,
  });
};

export function addToCartRequest(artworkId, profileId, cartId) {
  return axiosInstance().post('/api/checkout/add-to-cart', {
    data: {
      artwork_id: artworkId,
      profile_id: profileId,
      cartId: cartId,
    },
  });
}
