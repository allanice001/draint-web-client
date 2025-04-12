import {
  SIGN_UP_META_HELMET_ARTIST,
  SIGN_UP_META_HELMET_COLLECTOR,
} from 'constants/components/signup-page';

import Icons from 'components/icons';
import staticUrls from 'constants/images/static-urls';

export const getMetaHelmetProps = isArtist => {
  return isArtist ? SIGN_UP_META_HELMET_ARTIST : SIGN_UP_META_HELMET_COLLECTOR;
};

export const getBackgroundProps = isArtist => {
  return isArtist ? staticUrls.image.artist : staticUrls.image.collector;
};

export const getStepsProps = isArtist => {
  const steps = [{ icon: Icons.ProfileInfo, label: 'Profile info' }];
  // if (isArtist) steps.push({ icon: Icons.Palette, label: 'Account info' });
  return [...steps, { icon: Icons.Next, label: 'SignUp' }];
};
