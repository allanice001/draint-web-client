import { LOGOUT_ROOT } from 'constants/routes/publicModule/auth';
import { PROFILE_PAGE } from 'constants/routes/artist-profile';
import React from 'react';
import { artistProfileDropdown } from 'constants/components/navbar/links';
import { updateLogout } from './navigation.helpers';

function withArtistDropdownNavigation(WrappedComponent, isActivated, isTablet) {
  let list = artistProfileDropdown;

  if (!isActivated) {
    list = list.filter(el => el.to === LOGOUT_ROOT);
  }

  if (!isTablet) {
    list = list.filter(el => el.to !== PROFILE_PAGE);
  }

  return <WrappedComponent nav={updateLogout(list)} />;
}

export default withArtistDropdownNavigation;
