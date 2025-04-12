import { IS_CHANGED_ADDRESS_FORM } from '../../../constants/redux/checkout';

export default function isChangedAddressForm(payload) {
  return { type: IS_CHANGED_ADDRESS_FORM, payload: { address: payload } };
}
