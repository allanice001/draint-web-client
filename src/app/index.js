import AppRouter from 'routers';
import { AuthProvider } from './auth-provider';
import GATag from 'services/analytics/ga-gtag';
import NotificationProvider from './notification-provider';
import PinterestTag from 'external-lib/pinterestTag';
import ReactGA from 'react-ga';
import ReactPixel from 'react-facebook-pixel';
import { SIGN_IN_ROOT } from 'constants/routes/publicModule/auth';
import { __prod__ } from 'constants/global';
import { getUserDataFromStorage } from 'redux/user/account/actions/getUserDataFromStorage';
import { isTokenExpired } from 'services/tokenService';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const Settings = require('settings.json');

ReactPixel.init(Settings[process.env.NODE_ENV].fbPixel, {
  autoConfig: true,
  debug: !__prod__,
});

PinterestTag.init(Settings[process.env.NODE_ENV].pinterestTagID, {
  debug: !__prod__,
});

GATag.init(Settings[process.env.NODE_ENV].ga);

ReactGA.initialize([
  {
    trackingId: Settings[process.env.NODE_ENV].ga,
    debug: !__prod__,
    gaOptions: {
      cookieDomain: 'none',
    },
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getUserDataFromStorage());
  });

  useEffect(() => {
    if (localStorage.user && !JSON.parse(localStorage.user).newToken) {
      localStorage.removeItem('user');
    }
    if (isTokenExpired()) {
      localStorage.clear();
      history.push(SIGN_IN_ROOT);
    }
  }, [history]);

  return (
    <AuthProvider>
      <NotificationProvider>
        <AppRouter />
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
