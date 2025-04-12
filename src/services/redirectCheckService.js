import { RECOVER_ROOT } from 'constants/routes/publicModule/auth';

export const onDeleteCheck = (user, history) => {
  if (user.account.deleted_at) {
    return history.push(RECOVER_ROOT);
  }

  return null;
};

export const onEmployerCheck = (user, history, callback) => {
  const settingsRedirect = account =>
    account.email !== null &&
    (account.planName === 'Basic' ||
      account.planName === 'All-In-One' ||
      account.planName === 'Basic Yearly' ||
      account.planName === 'All-In-One Yearly') &&
    account.is_employee === null;
  const url = '/dashboard/settings';
  const isThere = history.location.pathname === url;
  if (settingsRedirect(user.account) && !isThere) {
    if (callback) callback();
    return history.push(url);
  }
  return null;
};

export const onLocationCheck = (user, history, callback) => {
  const url = '/dashboard/settings';
  const isThere = history.location.pathname === url;
  if (!isThere && user.is_artist && !(user.location?.address?.addressLine1)) {
    if (callback) callback();
    return history.push(url);
  }
  return null;
};
