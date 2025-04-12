import { QUERY_SUCCESS } from '../../../constants/redux/user';
import setLoadingState from '../../user/loader/actions/setLoading';

export default function setSuccessStatus(payload) {
  return dispatch => {
    dispatch(setLoadingState(false));
    dispatch({ type: QUERY_SUCCESS, payload });
  };
}
