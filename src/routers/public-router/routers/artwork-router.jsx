import { ARTWORK_ROOT, UPLOAD } from 'constants/routes/publicModule/artwork';

import ArtworkUpload from 'components/artwork/artwork-upload/artwork-upload';
import Helmet from 'components/helmet';
import { ID_PARAMETER } from 'constants/routes/parameters/parameters';
import PrivateRoute from 'routers/private-router/private-router';
import React from 'react';
import { permissions } from 'constants/permissions';

export default function ArtworkRouter() {
  return (
    <PrivateRoute
      permission={permissions.USER}
      path={ARTWORK_ROOT + UPLOAD + ID_PARAMETER}
    >
      <>
        <Helmet title="All Artworks and Artists Around the World" />
        <ArtworkUpload />
      </>
    </PrivateRoute>
  );
}
