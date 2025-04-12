import React from 'react';
import { artistDashboardLinksDesktop } from 'constants/components/navbar/links';
import { updateLogout } from './navigation.helpers';

function withArtistNavigation(WrappedComponent) {
  return <WrappedComponent nav={updateLogout(artistDashboardLinksDesktop)} />;
}

export default withArtistNavigation;
