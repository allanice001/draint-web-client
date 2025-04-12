import { Redirect, Route } from 'react-router-dom';

import React from 'react';
import { SIGN_IN_ROOT } from 'constants/routes/publicModule/auth';
import { checkRouteAccessForUser } from 'services/authServise';

export default function PrivateRoute({ children, permission, role, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (checkRouteAccessForUser(permission, role)) {
          return children;
        }

        return (
          <Redirect
            to={{ pathname: SIGN_IN_ROOT, state: { from: location.pathname } }}
          />
        );
      }}
    />
  );
}
