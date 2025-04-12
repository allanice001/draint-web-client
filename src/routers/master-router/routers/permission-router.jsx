import {
  INVITES,
  MASTER_ROOT,
  PERMISSION,
} from 'constants/routes/masterModule/dashboard';
import { MasterInvites, MasterPermission } from 'views/master/permission';

import { Helmet } from 'react-helmet';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function PermissionRouter() {
  return (
    <>
      <Route
        exact
        path={MASTER_ROOT + PERMISSION}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Permission</title>
            </Helmet>
            <MasterPermission />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + INVITES}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Invites</title>
            </Helmet>
            <MasterInvites />
          </>
        )}
      />
    </>
  );
}
