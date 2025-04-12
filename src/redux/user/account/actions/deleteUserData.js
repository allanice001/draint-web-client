import { ACCOUNT_DELETED } from 'constants/global';
import { SIGN_IN } from 'constants/components/pricing';

export default function deleteUserData(res) {
  localStorage.clear();
  !!res && localStorage.setItem(ACCOUNT_DELETED, res);
  return window.location.replace(SIGN_IN);
}
