import { SET_USER_SIGN_UP_TOKEN_SUCCESS } from '../../../../constants/redux/user';

export default function setUserSignUpToken(signUp) {
  return (dispatch) => {
    localStorage.setItem('signUp', JSON.stringify(signUp));
    dispatch({ type: SET_USER_SIGN_UP_TOKEN_SUCCESS, payload: signUp });
  };
}
