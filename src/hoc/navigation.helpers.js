import { LOGOUT_ROOT } from 'constants/routes/publicModule/auth';
import deleteUserData from 'redux/user/account/actions/deleteUserData';

export function updateLogout(list) {
  list.forEach((link) => {
    if (link.to === LOGOUT_ROOT) {
      link.onClick = (e) => {
        e.preventDefault();

        deleteUserData();
      };
    }
  });

  return list;
}
