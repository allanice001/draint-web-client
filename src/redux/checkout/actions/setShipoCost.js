import { SET_SHIPPING_COST } from '../../../constants/redux/checkout';

export default function setShippingCost(shippingCost) {
  return { type: SET_SHIPPING_COST, payload: { shippingCost } };
}
