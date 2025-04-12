import { QUERY_FETCHING } from '../../../constants/redux/user';
import setLoadingState from '../../user/loader/actions/setLoading';

export default function setFetchingStatus(payload) {
  return dispatch => {
    dispatch(setLoadingState(true));
    dispatch({ type: QUERY_FETCHING, payload });
  };
}
