import {
  SIGN_UP_FORM_EMAIL,
  SIGN_UP_FORM_INSTAGRAM,
  SIGN_UP_FORM_PASSWORD,
  SIGN_UP_FORM_USERNAME,
} from 'constants/components/signup-page';
import {
  activateUserAccount,
  setUserData,
} from 'redux/user/account/actions/setUserData';

import AnalyticHelper from 'helpers/analytic/AnalyticHelper';
import AuthConstants from 'constants/components/auth/auth';
import { createAccount } from 'dataLayer/user/userData';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import getGeolocation from 'services/geolocation-service';
import { handleInstagramUsername } from 'helpers/social-media/handle-instagram-username';
import setLocationData from 'redux/user/account/actions/setLocationData';

const Analytic = AnalyticHelper.create();

export default async function setUserDataOnSignUp(
  dispatch,
  data,
  isArtist,
  callback
) {
  const geolocation = await getGeolocation();

  const parseInvitedData = data?.new_permission && {
    new_permission: data.new_permission,
    first_name: data.first_name,
    second_name: data.second_name,
  };

  createAccount({
    draint_profile_name: data[SIGN_UP_FORM_USERNAME],
    email: data[SIGN_UP_FORM_EMAIL],
    password: data[SIGN_UP_FORM_PASSWORD],
    instagramLink: handleInstagramUsername(data[SIGN_UP_FORM_INSTAGRAM]),
    is_artist: isArtist,
    cartId: localStorage[AuthConstants.CART_ID] || null,
    geolocation,
    ...parseInvitedData,
  })
    .then(result => {
      const localUser = {
        token: result.data.token,
        cartHash: result.data.cartHash || null,
        newToken: true,
      };
      localStorage.setItem(AuthConstants.USER, JSON.stringify(localUser));
      localStorage.setItem(AuthConstants.CART_ID, result.data.cartHash || null);
      localStorage.setItem(
        AuthConstants.USER_LOCAL_STORAGE_AUTH_ACTION,
        AuthConstants.USER_SIGN_UP_ACTION
      );

      if (result.data.account) dispatch(setUserData(result.data.account));
      if (result.data.location) dispatch(setLocationData(result.data.location));

      const successEvent = isArtist ? 'SignUpArtist' : 'SignUpCollector';
      Analytic.createEvent(successEvent);

      if (callback) callback(result.data.cartCounter);

      if (!!parseInvitedData) {
        dispatch(activateUserAccount());
      }
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
}
