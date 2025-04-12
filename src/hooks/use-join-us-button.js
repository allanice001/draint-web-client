import handleLogout from 'redux/user/account/actions/handle-logout';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

export const useJoinUsButton = url => {
  const dispatch = useDispatch();
  const history = useHistory();

  function redirectTo() {
    history.push(url);
  }

  function handleLogoutRedirect() {
    if (Boolean(url)) {
      dispatch(handleLogout(redirectTo));
    }
  }

  function handleRedirect() {
    if (Boolean(url)) {
      redirectTo();
    }
  }

  return {
    handleLogoutRedirect,
    handleRedirect,
  };
};
