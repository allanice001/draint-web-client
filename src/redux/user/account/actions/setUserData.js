import {
  SET_USER_ACCOUNT,
  SET_USER_ACCOUNT_IS_ACTIVE,
  SET_USER_DATA_SUCCESS,
  SET_USER_PROF_STATUS,
} from 'constants/redux/user';
import { setCartHashStorage, setUserStorage } from 'services/storage-service';

import { ACCOUNT_ACTIVATED } from 'constants/singin-up';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import { Permissions } from 'models/user-permission';
import axios from 'dataLayer/axiosInstance';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getSubscribedArtistFull } from 'redux/dashboard/actions/gallaryActions';
import { getWatchlistFull } from 'redux/dashboard/actions/watchlistActions';
import history from 'routers/history';

export const setUserData = user => dispatch => {
  delete axios.defaults.headers.Authorization;

  setUserStorage(user);
  setCartHashStorage(user);

  if (user?.token) {
    axios.defaults.headers = {
      Authorization: `Bearer ${user.token}`,
    };
  }

  dispatch(setUserDataSuccess(user));
  dispatch(setUserCartCounter(user.cartHash));
  user.id && dispatch(getWatchlistFull());
  dispatch(getSubscribedArtistFull());
  window.Echo.emit('getCartItemsCount', { id: user.cartHash });
};

export const setUserDataSuccess = payload => ({
  type: SET_USER_DATA_SUCCESS,
  payload: {
    ...payload,
    permissions: Permissions.create(payload),
  },
});

export const setUserCurrentSubscription = payload => ({
  type: SET_USER_DATA_SUCCESS,
  payload: {
    subscription: payload.subscription,
    planName: payload.planName,
    planId: payload.planId,
    planPeriod: payload.planPeriod,
    cancelSubscriptionDate: payload.cancelSubscriptionDate,
  },
});

export const setUserCartCounter = cartId => dispatch => {
  if (cartId) {
    axios
      .get(`/api/checkout/get-cart-counter/${cartId}`)
      .then(res => {
        dispatch({
          type: SET_USER_DATA_SUCCESS,
          payload: { cartCounter: res.data.counter },
        });
      })
      .catch(e => console.log(e));
  } else {
    dispatch({
      type: SET_USER_DATA_SUCCESS,
      payload: { cartCounter: 0 },
    });
  }
};

export function setUserCartHash(cartHash) {
  return dispatch => {
    dispatch({
      type: SET_USER_DATA_SUCCESS,
      payload: { cartHash },
    });
  };
}

export const setUserProfStatus = payload => ({
  type: SET_USER_PROF_STATUS,
  payload,
});

export const setUserAccount = payload => ({
  type: SET_USER_ACCOUNT,
  payload,
});

export const setUserAccountIsActive = payload => ({
  type: SET_USER_ACCOUNT_IS_ACTIVE,
  payload,
});

export const activateUserAccount = () => (dispatch, getState) => {
  const {
    user: { account },
  } = getState();

  if (account.is_activated) return;

  return axios
    .put('/api/account/activate')
    .then(() => {
      dispatch(setUserAccountIsActive(true));
      dispatch(displayMessage(ACCOUNT_ACTIVATED));

      history.push(PROFILE_GALLERY);
    })
    .catch(error => dispatch(displayMessage(error.message, 'error')));
};
