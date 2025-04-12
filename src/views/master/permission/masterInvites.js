import { useDispatch, useSelector } from 'react-redux';

import { InviteUserForm } from './inviteUserForm';
import { MasterPermissionNav } from 'components/nav/sub/masterPermissionNav';
import React from 'react';
import { inviteUserAction } from 'redux/master/actions/permissionActions';
import styles from './masterPermission.module.scss';

export const MasterInvites = () => {
  const inviteValues = useSelector(state => state.form?.invite);
  const dispatch = useDispatch();

  const handleInvite = () => {
    const values = inviteValues?.values;
    dispatch(inviteUserAction({ ...values }));
  };

  return (
    <div className={styles.wrapper}>
      <MasterPermissionNav />
      <InviteUserForm handleSubmit={handleInvite} />
    </div>
  );
};
