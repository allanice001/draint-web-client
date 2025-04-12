import {
  DELETE_SING_UP_TOKEN_FAILURE,
  DELETE_SING_UP_TOKEN_FETCHING,
  DELETE_SING_UP_TOKEN_SUCCESS,
} from 'constants/redux/user';

import displayMessage from '../../../global/notiifcation/actions/displayMessage';

export default function deleteSignUpToken() {
  return dispatch => {
    dispatch({
      type: DELETE_SING_UP_TOKEN_FETCHING,
    });
    try {
      localStorage.removeItem('signUp');
      dispatch({
        type: DELETE_SING_UP_TOKEN_SUCCESS,
        payload: { sign_up_token: null, step: null },
      });
      // dispatch(displayMessage('Welcome to Draint', 'success'));
    } catch (err) {
      dispatch({
        type: DELETE_SING_UP_TOKEN_FAILURE,
        payload: { message: err.message },
      });
      dispatch(displayMessage(err.message, 'error'));
    }
  };
}
