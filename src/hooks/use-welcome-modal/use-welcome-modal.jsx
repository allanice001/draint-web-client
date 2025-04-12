import { useDispatch, useSelector } from 'react-redux';

import AuthConstants from 'constants/components/auth/auth';
import { isEqual } from 'lodash';
import setUserModalStatus from 'redux/user/account/actions/set-user-modal-status';
import { useEffect } from 'react';

const getState = state => ({
  isShownAfterSignUp: state.user.account.saw_after_sign_up,
  accountData: state.user.account,
});

function useWelcomeModal() {
  const dispatch = useDispatch();
  const { isShownAfterSignUp, accountData } = useSelector(getState, isEqual);
  const userAction = localStorage.getItem(
    AuthConstants.USER_LOCAL_STORAGE_AUTH_ACTION
  );

  useEffect(() => {
    if (!isShownAfterSignUp || !!userAction)
      dispatch(setUserModalStatus(accountData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShownAfterSignUp]);
}

export default useWelcomeModal;
