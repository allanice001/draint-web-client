import { PROFILE_GALLERY, profileTabs } from 'constants/routes/artist-profile';

/**
 * @param username {string}
 */
export const getArtistGalleryURL = username => {
  return `/${username}${PROFILE_GALLERY}/${profileTabs.PAINTINGS}`;
};
