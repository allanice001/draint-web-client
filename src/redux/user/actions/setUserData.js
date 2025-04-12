import { SET_USER_DATA_SUCCESS } from 'constants/redux/user';

export default function getUserData(account) {
  return dispatch => {
    dispatch({ type: SET_USER_DATA_SUCCESS, payload: account });
  };
}
