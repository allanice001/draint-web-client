import { Redirect, Route, Switch } from 'react-router-dom';
import {
  TAB,
  USERNAME_PARAMETER,
} from 'constants/routes/parameters/parameters';

import ArtistPage from 'components/layout/artist/artist';
import ArtworkPage from 'components/artwork/artwork-page/artwork-page';
import Collector from 'components/layout/collector-dashboard/collector-dashboard'; // DO NOT import 'Collector' via React.lazy() : [mini-css-extract-plugin] order conflict
import Footer from 'components/footer/footer';
import { GALLERY_PAINTING } from 'constants/routes/artwork';
import { MASTER_ROOT } from 'constants/routes/masterModule/dashboard';
import MainNavbar from 'components/nav/home/main-navbar';
import NotFoundPage from '../pages/not-found';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';
import PrivateRoute from 'routers/private-router/private-router';
import PublicRouter from './public-router';
import React from 'react';
import { Role } from 'constants/role';
import Suspense from 'components/suspense';
import { __prod__ } from 'constants/global';
import { lazy } from 'react';
import { permissions } from 'constants/permissions';

const DashboardRouter = lazy(() =>
  import('components/layout/dashboard/dashboard')
);
const MasterRouter = lazy(() => import('./master-router'));
const IconsPreview = lazy(() => import('../components/icons/icons-preview'));

export default function AppRouter() {
  return (
    <Switch>
      <Route exact path="/collector-dashboard">
        <Redirect to="/collector-dashboard/artworks" />
      </Route>

      <Route exact path={GALLERY_PAINTING + '/:title?'}>
        <MainNavbar />
        <ArtworkPage />
        <Footer />
      </Route>

      <Route exact path={USERNAME_PARAMETER + PROFILE_GALLERY + TAB}>
        <MainNavbar />
        <ArtistPage />
        <Footer />
      </Route>

      <PrivateRoute
        path={PROFILE_GALLERY}
        permission={permissions.EDITOR_OLD}
        role={Role.Artist}
      >
        <Suspense>
          <DashboardRouter />
        </Suspense>
      </PrivateRoute>

      <PrivateRoute
        path="/collector-dashboard/:tab(artworks|watchlist|sales|settings|offers|feedback|orders)/"
        permission={permissions.EDITOR_OLD}
        role={Role.Collector}
      >
        <Collector />
      </PrivateRoute>

      <PrivateRoute path={MASTER_ROOT} permission={permissions.MASTER}>
        <Suspense>
          <MasterRouter />
        </Suspense>
      </PrivateRoute>

      <PrivateRoute
        exact
        path={PROFILE_GALLERY}
        permission={permissions.USER}
        render={() => <Redirect to={`${PROFILE_GALLERY}/profile-image`} />}
      />

      {!__prod__ && (
        <Route path="/development/icons">
          <Suspense>
            <IconsPreview />
          </Suspense>
        </Route>
      )}

      <PublicRouter />

      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  );
}
