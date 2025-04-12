import {
  setUserCartCounter,
  setUserData,
} from '../account/actions/setUserData';

import { SIGN_IN } from '../../../constants/singin-up';
import setFetchingStatus from 'redux/general/actions/setFetchingStatus';
import setInitialState from 'redux/general/actions/setInitialState';
import setLocationData from 'redux/user/account/actions/setLocationData';
import setSuccessStatus from 'redux/general/actions/setSuccessStatus';
import { signInByMailToken } from 'dataLayer/user/userData';

const signInByMail = (token, history) => dispatch => {
  dispatch(setFetchingStatus());
  signInByMailToken(token)
    .then(res => {
      dispatch(setUserData(res.data.account));
      dispatch(setUserCartCounter(res.data.account.cartHash));
      dispatch(setLocationData(res.data.location));
      dispatch(setSuccessStatus({}));
    })
    .catch(() => {
      dispatch(setInitialState());
      history.push(SIGN_IN);
    });
};

export default signInByMail;
