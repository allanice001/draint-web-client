import {
  PRICING_ROOT,
  SHOPPING_CART_ROOT,
} from 'constants/routes/publicModule/financials';

import { Cart } from 'components/cart/cart-main/cart';
import Helmet from 'components/helmet';
import { KLARNA } from 'constants/routes/userModule/dashboard';
import KlarnaAfterPayment from 'views/website/pricing/klarna-confirmation/klarna-confirmation';
import Pricing from 'views/website/pricing/pricing';
import PrivateRoute from 'routers/private-router/private-router';
import React from 'react';
import { Route } from 'react-router-dom';

export default function FinancialRouter() {
  return (
    <>
      <Route
        exact
        path={SHOPPING_CART_ROOT}
        render={() => (
          <>
            <Helmet title="Your shopping cart | DRAINT™" />
            <Cart />
          </>
        )}
      />

      <Route
        exact
        path={PRICING_ROOT}
        render={() => (
          <>
            <Helmet title="Pricing | DRAINT™" />
            <Pricing />
          </>
        )}
      />

      <PrivateRoute
        exact
        path={SHOPPING_CART_ROOT + KLARNA}
        permission="user"
        render={() => (
          <>
            <Helmet title="Klarna | DRAINT™" />
            <KlarnaAfterPayment />
          </>
        )}
      />
    </>
  );
}
