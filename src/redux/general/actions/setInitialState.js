import { QUERY_INITIAL_STATE } from '../../../constants/redux/user';
import setLoadingState from '../../user/loader/actions/setLoading';

export default function setSuccessStatus(payload) {
  return dispatch => {
    dispatch(setLoadingState(false));
    dispatch({ type: QUERY_INITIAL_STATE, payload });
  };
}
