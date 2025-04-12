import { PROFILE_GALLERY, profileTabs } from 'constants/routes/artist-profile';

import { DRAINT_NAME } from 'constants/global';
import { ID } from 'constants/routes/publicModule/artwork';

const formatTitle = title => {
  return title
    .trim()
    .split(' ')
    .join('-')
    .replaceAll('/', '-')
    .replaceAll('%', '-')
    .replaceAll('\\', '-');
};

/**
 * @param {string} id
 * @param {string} [title]
 * @param {string} [authorName]
 */
export const getArtworkUrl = (id, title, authorName = DRAINT_NAME) => {
  const baseUrl = `/${authorName +
    PROFILE_GALLERY +
    '/' +
    profileTabs.PAINTINGS +
    ID}/${id}`;

  if (!title) {
    return baseUrl;
  }

  const uri = baseUrl + `/${formatTitle(title)}`;

  return encodeURI(uri);
};
