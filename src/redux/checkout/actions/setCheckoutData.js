import { SET_CHECKOUT_DATA } from '../../../constants/redux/checkout';

export default function setCheckoutData(payload) {
  return { type: SET_CHECKOUT_DATA, payload };
}
