import { STORAGE_CART, STORAGE_USER } from 'constants/storage-keys';

export const setUserStorage = user =>
  setStorageValue(
    STORAGE_USER,
    JSON.stringify({
      token: user.token,
      cartHash: user.cartHash,
      newToken: true,
    })
  );

export const setCartHashStorage = user => {
  const currentHash = getStorageItem(STORAGE_CART);

  if (user.is_artist) {
    return setStorageValue(STORAGE_CART, null);
  }

  if (user.cartHash) {
    return setStorageValue(STORAGE_CART, user.cartHash);
  }

  return setStorageValue(STORAGE_CART, currentHash);
};

export const getStorageItem = storageKey => localStorage.getItem(storageKey);

export const parseStorage = storageKey => {
  const storageData = getStorageItem(storageKey);

  if (storageData) {
    return JSON.parse(storageData);
  }
};

export const setStorageValue = (storageKey, storageValue) =>
  localStorage.setItem(storageKey, storageValue);
