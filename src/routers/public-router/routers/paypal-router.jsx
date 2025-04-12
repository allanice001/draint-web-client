import { CANCEL, SUCCESS } from 'constants/routes/publicModule/paypal';

import Helmet from 'components/helmet';
import PayPalCancel from 'views/account/pay-pal-cancel';
import PayPalSuccess from 'views/account/pay-pal-success';
import React from 'react';
import { Route } from 'react-router-dom';

export default function PayPalRouter({ ROOT_PATH }) {
  return (
    <>
      <Route
        exact
        path={ROOT_PATH + SUCCESS}
        render={() => (
          <>
            <Helmet />
            <PayPalSuccess />
          </>
        )}
      />

      <Route
        exact
        path={ROOT_PATH + CANCEL}
        render={() => (
          <>
            <Helmet />
            <PayPalCancel />
          </>
        )}
      />
    </>
  );
}
