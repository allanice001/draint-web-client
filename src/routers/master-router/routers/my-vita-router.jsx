import {
  MY_VITA_PROFILES,
  MY_VITA_QUESTIONS,
  MY_VITA_ROOT,
} from 'constants/routes/masterModule/myVita';

import { Helmet } from 'react-helmet';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import { MasterVita } from 'views/master/vita/masterVita';
import { MyVitaQuestions } from 'views/master/vita/masterVitaQuestions';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function MyVitaRouter() {
  return (
    <>
      <Route
        exact
        path={MASTER_ROOT + MY_VITA_ROOT + MY_VITA_PROFILES}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>My Vita</title>
            </Helmet>
            <MasterVita />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + MY_VITA_ROOT + MY_VITA_QUESTIONS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>My Vita Questions</title>
            </Helmet>
            <MyVitaQuestions />
          </>
        )}
      />
    </>
  );
}
