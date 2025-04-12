import React from 'react';
import { collectorDashboardLinksDesktop } from 'constants/components/navbar/links';
import { updateLogout } from './navigation.helpers';

function withCollectorNavigation(WrappedComponent) {
  return (
    <WrappedComponent nav={updateLogout(collectorDashboardLinksDesktop)} />
  );
}

export default withCollectorNavigation;
