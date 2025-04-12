import { CHECK } from 'constants/routes/publicModule/sofort';
import Helmet from 'components/helmet';
import React from 'react';
import { Route } from 'react-router-dom';
import SofortRedirect from 'views/account/sofort-redirect';

export default function SofortRouter({ ROOT_PATH }) {
  return (
    <Route
      exact
      path={ROOT_PATH + CHECK}
      render={() => (
        <>
          <Helmet />
          <SofortRedirect />
        </>
      )}
    />
  );
}
