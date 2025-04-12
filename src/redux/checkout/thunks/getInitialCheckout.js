import { destroy } from 'redux-form';
import setInitialState from '../actions/setInitialState';

export default function getInitialCheckout() {
  return (dispatch) => {
    dispatch(setInitialState);
    dispatch(destroy('addressForm'));
    dispatch(destroy('ProfileInfoForm'));
  };
}
