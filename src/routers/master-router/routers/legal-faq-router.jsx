import {
  FAQ,
  LEGAL,
  MASTER_ROOT,
} from 'constants/routes/masterModule/dashboard';

import { FaqMaster } from 'views/master/faqMaster';
import { Helmet } from 'react-helmet';
import MasterLegal from 'views/master/legal/legal';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function LegalFaqRouter() {
  return (
    <>
      <Route
        exact
        path={MASTER_ROOT + LEGAL}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Legal</title>
            </Helmet>
            <MasterLegal />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + FAQ}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>FAQ</title>
            </Helmet>
            <FaqMaster />
          </>
        )}
      />
    </>
  );
}
