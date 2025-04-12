import { SET_USER_FLAG_SUCCESS } from 'constants/redux/user';

export default function updateLocationData(isArtist) {
  return (dispatch) => {
    dispatch({ type: SET_USER_FLAG_SUCCESS, payload: { isArtist } });
  };
}
