import { ADMIN_ROLE, EDITOR_ROLE, MASTER_ROLE } from '../constants/permissions';

import { useSelector } from 'react-redux';

function useAdminRole() {
  const { new_permission: subAdmin, permission } = useSelector(
    store => store.user.account
  );

  const isMEARole =
    permission === MASTER_ROLE ||
    subAdmin === EDITOR_ROLE ||
    subAdmin === ADMIN_ROLE;

  return {
    isMEARole,
  };
}

export default useAdminRole;
