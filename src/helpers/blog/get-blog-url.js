import { BLOG } from 'constants/routes/userModule/gallery';
import { DRAINT_NAME } from 'constants/global';
import { PROFILE_GALLERY } from 'constants/routes/artist-profile';

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
export const getBlogUrl = (id, title, authorName = DRAINT_NAME) => {
  const baseUrl = `/${authorName + PROFILE_GALLERY + BLOG}/${id}`;

  if (!title) {
    return baseUrl;
  }

  const uri = baseUrl + `/${formatTitle(title)}`;

  return encodeURI(uri);
};
