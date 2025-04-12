import {
  axiosInstance,
  getPrivateAxiosInstance,
} from 'dataLayer/axiosInstance';
import getGeolocation from 'services/geolocation-service';

export async function getAccount(token) {
  const geolocation = await getGeolocation();
  const axios = getPrivateAxiosInstance(token);

  return axios.get('api/dashboard/account', {
    params: { ...geolocation },
  });
}

export function getAccountLocation(token) {
  const axios = getPrivateAxiosInstance(token);
  return axios.get('/api/account/location');
}

export function createAccount(data) {
  return axiosInstance().post('/api/account/', data);
}

export function userSignIn(data) {
  data['cartId'] = localStorage.cartId || null;
  return axiosInstance().post('/api/user/auth', data);
}

export function userSignUp(data) {
  return axiosInstance().post('/api/user/auth', data);
}

export function signInAfterSubscription(checkoutId) {
  const cartId = localStorage.cartId || null;
  return axiosInstance().post('/api/user/auth/subscription', {
    checkoutId,
    cartId,
  });
}

export function signInAfterKlarnaSubscription(accountId) {
  const cartId = localStorage.cartId || null;
  return axiosInstance().post('/api/user/auth/subscription/klarna', {
    accountId,
    cartId,
  });
}

export function updateUserAddress(data) {
  return axiosInstance().put('/api/account/user/address-info', data);
}

export function updateUserAddressRequest(addressData, profileId) {
  return axiosInstance().post('/api/account/update-user-location', {
    addressData,
    profileId,
  });
}

export function signInByMailToken(token) {
  const cartId = localStorage.cartId || null;
  return axiosInstance().post('/api/user/auth/mail-token', { token, cartId });
}

export function updateWelcomeModalStatus(account_id, type) {
  return axiosInstance().put('/api/user/modal', { account_id, type });
}

export function isUserNameFree(userName) {
  return axiosInstance().get('/api/user/is-user-name-free', {
    params: { userName },
  });
}

export function isUserEmailFree(email, token) {
  return axiosInstance().get('/api/user/is-user-email-free', {
    params: { email, token },
  });
}

export function getGeolocationByCoords(params) {
  return axiosInstance().get('/get-location-by-coords', { params });
}

export function getUserCurrentSubscriptionPlan(accountId) {
  return axiosInstance().get('/api/user/get-current-subscription', {
    params: { accountId },
  });
}

export function resetPasswordEmailRequest(email) {
  return axiosInstance().post(`/api/user/resetpassword`, email);
}

export function resetPasswordRequest(token, values) {
  return axiosInstance().post(`/api/user/password/reset`, {
    token,
    password: values.password,
  });
}
