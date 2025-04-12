import {
  ATELIER,
  BLOG,
  MASTER_ROOT,
} from 'constants/routes/masterModule/dashboard';

import { MasterAtelier } from 'views/master/blog/master-atelier';
import { MasterBlog } from 'views/master/blog/master-blog';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function BlogAtelierRouter() {
  return (
    <>
      <Route
        exact
        path={MASTER_ROOT + BLOG}
        permission={permissions.MASTER}
        render={() => <MasterBlog />}
      />
      <Route
        exact
        path={MASTER_ROOT + ATELIER}
        permission={permissions.MASTER}
        render={() => <MasterAtelier />}
      />
    </>
  );
}
