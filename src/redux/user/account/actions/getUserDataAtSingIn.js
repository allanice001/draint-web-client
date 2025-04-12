import AuthConstants from 'constants/components/auth/auth';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import setErrorStatus from 'redux/general/actions/setErrorStatus';
import setFetchingStatus from 'redux/general/actions/setFetchingStatus';
import setLocationData from './setLocationData';
import setSuccessStatus from 'redux/general/actions/setSuccessStatus';
import { setUserData } from './setUserData';
import setUserSignUpToken from './setUserSignUpToken';
import { userSignIn } from 'dataLayer/user/userData';
import getGeolocation from 'services/geolocation-service';

export default function getUserDataAtSingIn(data) {
  return async dispatch => {
    dispatch(setFetchingStatus());

    data.geolocation = await getGeolocation();

    return userSignIn(data)
      .then(({ data }) => {
        dispatch(setUserData(data.account));
        const { cartCleared } = data.account;

        if (data.location) dispatch(setLocationData(data.location));

        if (cartCleared) {
          dispatch(
            displayMessage('Cart item was removed due to the active order')
          );
        }

        localStorage.setItem(
          AuthConstants.USER_LOCAL_STORAGE_AUTH_ACTION,
          AuthConstants.USER_SIGN_IN_ACTION
        );

        dispatch(setSuccessStatus());

        return data;
      })
      .catch(error => {
        if (error.response?.data.sign_up_token) {
          const signUp = {
            sign_up_token: error.response.data.sign_up_token,
            is_artist: error.response.data.is_artist,
            email: error.response.data.email,
            step: 1,
          };
          dispatch(setUserSignUpToken(signUp));

          return signUp;
        }

        if (error) {
          dispatch(setErrorStatus(error.response.data));
          dispatch(errorMessageHandler(error));
        }
      });
  };
}
