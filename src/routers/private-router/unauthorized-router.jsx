import { Redirect, Route } from 'react-router-dom';

import React from 'react';
import { isUserLoggedIn } from 'services/authServise';

export const UnauthorizedRoute = ({ permission: Permission, ...rest }) => {
  if (isUserLoggedIn()) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};
