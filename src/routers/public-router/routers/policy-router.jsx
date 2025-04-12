import {
  IMPRINT_ROOT,
  PRIVACY_ROOT,
  TERMS_ROOT,
} from 'constants/routes/publicModule/policy';

import Helmet from 'components/helmet';
import { Imprint } from 'views/website/legal/imprint';
import { Privacy } from 'views/website/legal/privacy';
import React from 'react';
import { Route } from 'react-router-dom';
import { Terms } from 'views/website/legal/terms';

export default function PolicyRouter() {
  return (
    <>
      <Route
        exact
        path={TERMS_ROOT}
        render={() => (
          <>
            <Helmet title="Terms and Conditions | DRAINT™" />
            <Terms />
          </>
        )}
      />

      <Route
        exact
        path={PRIVACY_ROOT}
        render={() => (
          <>
            <Helmet title="Privacy Policy | DRAINT™" />
            <Privacy />
          </>
        )}
      />

      <Route
        exact
        path={IMPRINT_ROOT}
        render={() => (
          <>
            <Helmet title="Imprint | DRAINT™" />
            <Imprint />
          </>
        )}
      />
    </>
  );
}
