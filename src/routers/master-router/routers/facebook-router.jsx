import { ARTWORKS, FILE } from 'constants/routes/masterModule/fbCatalog';

import FBCatalog from 'views/master/fbCatalog';
import FbCatalogList from 'views/master/fb-catalog-list';
import { Helmet } from 'react-helmet';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function FaceBookRouter(props) {
  const { ROOT_PATH } = props;
  return (
    <>
      <Route
        exact
        path={ROOT_PATH + ARTWORKS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Facebook Catalog</title>
            </Helmet>
            <FBCatalog />
          </>
        )}
      />
      <Route
        exact
        path={ROOT_PATH + FILE}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Facebook Catalog List</title>
            </Helmet>
            <FbCatalogList />
          </>
        )}
      />
    </>
  );
}
