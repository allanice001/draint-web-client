import { COLLECTOR_DASHBOARD } from 'constants/routes/collector-profile';
import React from 'react';
import { collectorProfileDropdown } from 'constants/components/navbar/links';
import { updateLogout } from './navigation.helpers';

function withCollectorDropdownNavigation(WrappedComponent, isTablet) {
  let list = collectorProfileDropdown;

  if (!isTablet) {
    list = list.filter(el => el.to !== COLLECTOR_DASHBOARD);
  }
  return <WrappedComponent nav={updateLogout(list)} />;
}

export default withCollectorDropdownNavigation;
