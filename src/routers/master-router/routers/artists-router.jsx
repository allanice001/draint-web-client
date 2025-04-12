import { ARTISTS, ARTWORKS } from 'constants/routes/masterModule/artists';
import { Helmet } from 'react-helmet';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import MasterArtists from 'views/master/artists';
import MasterArtworks from 'views/master/artworks';
import React from 'react';
import { Route } from 'react-router';
import { permissions } from 'constants/permissions';

export default function ArtistsRouter() {
  return (
    <>
      <Route
        exact
        path={MASTER_ROOT + ARTISTS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Artists</title>
            </Helmet>
            <MasterArtists />
          </>
        )}
      />
      <Route
        exact
        path={MASTER_ROOT + ARTWORKS}
        permission={permissions.MASTER}
        render={() => (
          <>
            <Helmet>
              <title>Artworks</title>
            </Helmet>
            <MasterArtworks />
          </>
        )}
      />
    </>
  );
}
