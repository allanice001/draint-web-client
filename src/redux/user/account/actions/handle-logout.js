import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const setInitialState = () => {
  return {
    type: DELETE_USER_DATA_SUCCESS,
  };
};

const handleLogout = callback => dispatch => {
  localStorage.clear();
  dispatch(setInitialState());
  callback();
};

export default handleLogout;
