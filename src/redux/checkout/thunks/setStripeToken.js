import { SET_STRIPE_TOKEN } from 'constants/redux/checkout';

export default function setStripeToken(token) {
  return dispatch => {
    dispatch({ type: SET_STRIPE_TOKEN, payload: { token: token.token.id } });
  };
}
