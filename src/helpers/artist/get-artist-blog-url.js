import { BLOG } from 'constants/routes/masterModule/dashboard';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';

/**
 * @param {string} username
 */
export const getArtistBlogUrl = username => {
  return `/${username + PROFILE_GALLERY + BLOG}`;
};
