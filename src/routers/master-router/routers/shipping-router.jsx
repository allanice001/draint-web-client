import {
  MASTER_ROOT,
  SHIPPING_MANUAL,
  SHIPPING_REQUESTS,
  SHIPPING_WRAPPED,
} from 'constants/routes/masterModule/dashboard';
import { Helmet } from 'react-helmet';
import React from 'react';
import { Route } from 'react-router';
import ShippingManualOrders from 'views/master/shipping/layouts/shipping-manual-orders';
import ShippingRequestNav from 'components/nav/shipping/shipping-request';
import ShippingUpsOrders from 'views/master/shipping/layouts/shipping-ups-orders';
import WrappedStepsMain from 'views/master/shipping/wrapped-steps-main';
import { permissions } from 'constants/permissions';

function ShippingRouter() {
  return (
    <>
      <Route
        path={MASTER_ROOT + SHIPPING_REQUESTS}
        permission={permissions.MASTER}
        render={() => <ShippingRequestNav />}
      />

      <Route
        exact
        path={MASTER_ROOT + SHIPPING_REQUESTS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Shipping Requests</title>
            </Helmet>
            <ShippingUpsOrders />
          </>
        )}
      />

      <Route
        exact
        path={MASTER_ROOT + SHIPPING_REQUESTS + SHIPPING_MANUAL}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Shipping Requests</title>
            </Helmet>
            <ShippingManualOrders />
          </>
        )}
      />

      <Route
        exact
        path={MASTER_ROOT + SHIPPING_REQUESTS + SHIPPING_WRAPPED}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Shipping Requests</title>
            </Helmet>
            <WrappedStepsMain />
          </>
        )}
      />
    </>
  );
}

export default ShippingRouter;
