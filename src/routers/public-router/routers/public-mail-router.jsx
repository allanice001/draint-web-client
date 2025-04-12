import Helmet from 'components/helmet';
import MailRedirect from 'views/auth/mail-redirect';
import React from 'react';
import { Route } from 'react-router-dom';

export default function MailRouter({ ROOT_PATH }) {
  return (
    <Route
      exact
      path={ROOT_PATH}
      render={() => (
        <>
          <Helmet />
          <MailRedirect />
        </>
      )}
    />
  );
}
