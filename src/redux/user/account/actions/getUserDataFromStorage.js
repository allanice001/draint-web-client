import { ACCOUNT_DELETED, RECOVERED } from '../../../../constants';
import { STORAGE_SIGN_UP, STORAGE_USER } from 'constants/storage-keys';
import { Permissions } from 'models/user-permission';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { getAccount } from 'dataLayer/user/userData';
import { parseStorage } from 'services/storage-service';
import setErrorStatus from 'redux/general/actions/setErrorStatus';
import setFetchingStatus from 'redux/general/actions/setFetchingStatus';
import setInitialPlanPeriod from 'redux/pricing/thunks/setPlanPeriod';
import setInitialState from 'redux/general/actions/setInitialState';
import { setLoadingState } from 'redux/pricing/actions/pricingActions';
import setLocationData from './setLocationData';
import setSuccessStatus from 'redux/general/actions/setSuccessStatus';
import { setUserData } from './setUserData';

export const getUserDataFromStorage = () => dispatch => {
  window.Echo.emit('getCartItemsCount', { id: localStorage.cartId });
  dispatch(setLoadingState(true));
  const user = parseStorage(STORAGE_USER);
  const signUp = parseStorage(STORAGE_SIGN_UP);

  if (localStorage.recovered) {
    dispatch(displayMessage(localStorage.recovered));
    localStorage.removeItem(RECOVERED);
  }

  if (localStorage.accountDeleted) {
    dispatch(displayMessage(localStorage.accountDeleted));
    localStorage.removeItem(ACCOUNT_DELETED);
  }

  if (user?.token) {
    dispatch(setFetchingStatus());
    return getAccount(user.token)
      .then(value => {
        if (value.data.location) {
          dispatch(setLocationData(value.data.location));
        }

        dispatch(
          setUserData({
            ...user,
            ...value.data.account,
            permissions: new Permissions(value.data.account),
          })
        );
        dispatch(setInitialPlanPeriod(value.data.account.planPeriod));
        dispatch(setInitialState());
        dispatch(setSuccessStatus());
        dispatch(setLoadingState(false));
      })
      .catch(error => dispatch(setErrorStatus(error)));
  }

  if (signUp) {
    return setUserData({ signUp });
  }
};
