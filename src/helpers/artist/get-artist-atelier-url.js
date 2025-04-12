import { ATELIER } from 'constants/routes/masterModule/dashboard';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';

/**
 * @param username {string}
 * @returns {string} url
 */
export const getArtistAtelierURL = username => {
  return `/${username}${PROFILE_GALLERY}${ATELIER}`;
};
