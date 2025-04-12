import { ARTISTS, FEATURES_ROOT } from 'constants/routes/publicModule/features';

import ArtistsFeaturesPage from 'views/website/features/artists-features-page/artists-features-page';
import Helmet from 'components/helmet';
import React from 'react';
import { Route } from 'react-router-dom';

export default function FeaturesRouter() {
  return (
    <Route
      exact
      path={FEATURES_ROOT + ARTISTS}
      render={() => (
        <>
          <Helmet title="Features for Artists | DRAINT™" />
          <ArtistsFeaturesPage />
        </>
      )}
    />
  );
}
