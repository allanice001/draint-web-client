// import nextStep from '../actions/nextStep';
import { SET_USER_SIGN_UP_TOKEN_SUCCESS } from 'constants/redux/user';
import { createAccount } from 'dataLayer/user/userData';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { submit } from 'redux-form';

export default function createCollector(values) {
  return dispatch =>
    createAccount(values)
      .then(({ data }) => {
        dispatch(displayMessage(data.message));
        dispatch({
          type: SET_USER_SIGN_UP_TOKEN_SUCCESS,

          payload: {
            sign_up_token: data.sign_up_token,
            email: values.email,
          },
        });
      })
      .then(() => {
        dispatch(submit('addressUpdateForm'));
        // dispatch(nextStep());
      })
      .catch(error => {
        dispatch(errorMessageHandler(error));
      });
}
