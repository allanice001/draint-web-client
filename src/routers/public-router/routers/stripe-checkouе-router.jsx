import { CHECK } from 'constants/routes/publicModule/stripeSubscriptionCheckoutSession';
import Helmet from 'components/helmet';
import React from 'react';
import { Route } from 'react-router-dom';
import StripeSubscriptionCheckoutSuccess from 'views/account/stripe-success';

export default function StripeCheckoutRouter({ ROOT_PATH }) {
  return (
    <Route
      exact
      path={ROOT_PATH + CHECK}
      render={() => (
        <>
          <Helmet />
          <StripeSubscriptionCheckoutSuccess />
        </>
      )}
    />
  );
}
