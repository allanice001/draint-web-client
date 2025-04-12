import {
  AUTOMATED,
  CREATE,
  STATS,
  SUBSCRIPTION,
  WEEKLY,
} from 'constants/routes/masterModule/newsletter';

import { Helmet } from 'react-helmet';
import MasterNewsLetterAutomated from 'views/master/newsletter-auto';
import MasterNewsLetterCreate from 'views/master/newsletter-create';
import MasterNewsLetterStats from 'views/master/newsletter-stats';
import MasterNewsLetterSubscription from 'views/master/newsletter-subscription';
import MasterNewsLetterWeekly from 'views/master/newsletter-weekly';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function NewsletterRouter({ ROOT_PATH }) {
  return (
    <>
      <Route
        exact
        path={ROOT_PATH + SUBSCRIPTION}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Newsletter Subscription</title>
            </Helmet>
            <MasterNewsLetterSubscription />
          </>
        )}
      />

      <Route
        exact
        path={ROOT_PATH + STATS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Newsletter Stats</title>
            </Helmet>
            <MasterNewsLetterStats />
          </>
        )}
      />

      <Route
        exact
        path={ROOT_PATH + CREATE}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Custom newsletter</title>
            </Helmet>
            <MasterNewsLetterCreate />
          </>
        )}
      />

      <Route
        exact
        path={ROOT_PATH + AUTOMATED}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Automated Newsletter</title>
            </Helmet>
            <MasterNewsLetterAutomated />
          </>
        )}
      />

      <Route
        exact
        path={ROOT_PATH + WEEKLY}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Weekly Newsletter</title>
            </Helmet>
            <MasterNewsLetterWeekly />
          </>
        )}
      />
    </>
  );
}
