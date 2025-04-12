import React from 'react';
import { collectorDashboardLinksMobile } from '../constants/components/navbar/links';
import { theme } from 'config';
import { updateLogout } from './navigation.helpers';

function withCollectorMobileNavigation(WrappedComponent) {
  return (
    <WrappedComponent
      nav={updateLogout(collectorDashboardLinksMobile)}
      color={theme.collector.primary}
    />
  );
}

export default withCollectorMobileNavigation;
