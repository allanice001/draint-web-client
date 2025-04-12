import React from 'react';
import { artistDashboardLinksMobile } from 'constants/components/navbar/links';
import { updateLogout } from './navigation.helpers';

function withArtistMobileNavigation(WrappedComponent) {
  return <WrappedComponent nav={updateLogout(artistDashboardLinksMobile)} />;
}

export default withArtistMobileNavigation;
