import {
  ARTIST,
  COLLECTOR,
  FORGOT_PASSWORD_ROOT,
  RECOVER_ROOT,
  RESET_PASSWORD_ROOT,
  SIGN_IN_ROOT,
  SIGN_UP_ROOT,
  SUBSCRIBER,
  TOKEN,
} from 'constants/routes/publicModule/auth';
import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Helmet from 'components/helmet';
import NotFoundPage from 'pages/not-found';
import SignIn from 'components/materialForm/auth/signIn';
import SignUp from 'components/signup/signup-page';
import SignupSelectComponent from 'views/auth/signup-select-component';
import Suspense from 'components/suspense';
import { UnauthorizedRoute } from 'routers/private-router/unauthorized-router';

const RecoverPage = lazy(() => import('views/auth/recover-page'));
const ForgotPasswordEmailForm = lazy(() =>
  import('components/materialForm/auth/forgot-password-email-form')
);
const ResetPasswordFrom = lazy(() =>
  import('components/materialForm/auth/reset-password-form')
);

export default function AuthRouter() {
  return (
    <Switch>
      <Route
        exact
        path={SIGN_UP_ROOT}
        render={() => (
          <>
            <Helmet title="SignUp as Arist or SignUp as Collector and Artwork Buyer. | DRAINT™" />
            <SignupSelectComponent />
          </>
        )}
      />
      <UnauthorizedRoute
        exact
        path={SIGN_UP_ROOT + COLLECTOR}
        render={() => (
          <>
            <Helmet title="Collector SignUp. Buy original Paintings and Artworks. | DRAINT ™" />
            <SignUp />
          </>
        )}
      />
      <Route
        exact
        path={SIGN_UP_ROOT + SUBSCRIBER}
        render={() => (
          <>
            <Helmet title="Collector SignUp. Buy original Paintings and Artworks. | DRAINT ™" />
            <SignUp />
          </>
        )}
      />
      <Route
        exact
        path={SIGN_UP_ROOT + ARTIST + TOKEN}
        render={() => (
          <>
            <Helmet title="Artist Signup. Build your gallery with our Profiles. Sell your Paintings | DRAINT™" />
            <SignUp />
          </>
        )}
      />
      <UnauthorizedRoute
        exact
        path={SIGN_IN_ROOT}
        render={() => (
          <>
            <Helmet title="Sign in to your Profile. Edit and update Your Profile. Sell Art to your Collectors | DRAINT ™" />
            <SignIn />
          </>
        )}
      />
      <Route
        exact
        path={FORGOT_PASSWORD_ROOT}
        render={() => (
          <Suspense>
            <Helmet title="Forgot Your Password? | DRAINT™" />
            <ForgotPasswordEmailForm />
          </Suspense>
        )}
      />
      <Route
        path={RESET_PASSWORD_ROOT}
        render={() => (
          <Suspense>
            <Helmet title="Reset Your Password | DRAINT™" />
            <ResetPasswordFrom />
          </Suspense>
        )}
      />
      <Route
        exact
        path={RECOVER_ROOT}
        render={() => (
          <Suspense>
            <Helmet title="Welcome back to Draint | DRAINT™" />
            <RecoverPage />
          </Suspense>
        )}
      />
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}
