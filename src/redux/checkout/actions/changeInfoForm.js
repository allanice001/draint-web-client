import { IS_CHANGED_INFO_FORM } from '../../../constants/redux/checkout';

export default function isChangedInfoForm(payload) {
  return { type: IS_CHANGED_INFO_FORM, payload: { info: payload } };
}
