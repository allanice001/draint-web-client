import { QUERY_ERROR } from '../../../constants/redux/user';
import setLoadingState from '../../user/loader/actions/setLoading';

export default function setErrorStatus(err) {
  return dispatch => {
    dispatch(setLoadingState(false));
    dispatch({ type: QUERY_ERROR, payload: err });
  };
}
