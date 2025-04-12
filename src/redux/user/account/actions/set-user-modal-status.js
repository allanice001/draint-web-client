import AuthConstants from 'constants/components/auth/auth';
import displayMessage from '../../../global/notiifcation/actions/displayMessage';
import { setWelcomeModal } from 'redux/global/notiifcation/actions/actions';
import { updateWelcomeModalStatus } from 'dataLayer/user/userData';

async function DisplayMessageOrWindow(account, type, dispatch) {
  localStorage.removeItem(AuthConstants.USER_LOCAL_STORAGE_AUTH_ACTION);

  if (account.is_artist && !account[type]) {
    await updateWelcomeModalStatus(account.id, type);

    dispatch(setWelcomeModal());
  }

  dispatch(displayMessage('Welcome to Draint', 'success'));
}

const setUserModalStatus = account => dispatch => {
  const userAction = localStorage.getItem(
    AuthConstants.USER_LOCAL_STORAGE_AUTH_ACTION
  );

  if (userAction) {
    const modalAuthAction =
      userAction === AuthConstants.USER_SIGN_IN_ACTION
        ? AuthConstants.SAW_AFTER_SIGN_IN
        : AuthConstants.SAW_AFTER_SIGN_UP;

    DisplayMessageOrWindow(account, modalAuthAction, dispatch);
  }
};

export default setUserModalStatus;
