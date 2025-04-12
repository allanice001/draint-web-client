import { CHANGE_PROCEED_VALUE } from '../../../constants/redux/checkout';

export default function proceedToCheckoutChange(value) {
  return { type: CHANGE_PROCEED_VALUE, payload: value };
}
