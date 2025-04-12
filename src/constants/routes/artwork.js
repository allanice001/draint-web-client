import { ID_PARAMETER, USERNAME_PARAMETER } from './parameters/parameters';
import { PROFILE_GALLERY, profileTabs } from './artist-profile';

import { ID } from './publicModule/artwork';

export const GALLERY_PAINTING =
  USERNAME_PARAMETER +
  PROFILE_GALLERY +
  '/' +
  profileTabs.PAINTINGS +
  ID +
  ID_PARAMETER;
