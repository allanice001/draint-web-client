import {
  BREADCRUMBS_LABEL_ARTIST,
  BREADCRUMBS_LABEL_BLOG,
  NO_POST_MESSAGE,
} from 'constants/blog';

import { SEARCH_ARTISTS } from 'constants/routes/publicModule/artist';
import { getArtistBlogUrl } from 'helpers/artist/get-artist-blog-url';
import { getArtistGalleryURL } from 'helpers/artist/get-artist-gallery-url';

export const getBreadcrumbs = ({ username, title }) => {
  return [
    { url: SEARCH_ARTISTS, label: BREADCRUMBS_LABEL_ARTIST },
    {
      url: getArtistGalleryURL(username),
      label: username,
    },
    {
      url: getArtistBlogUrl(username),
      label: BREADCRUMBS_LABEL_BLOG,
    },
    {
      url: SEARCH_ARTISTS,
      label: `${title ? title : NO_POST_MESSAGE}`,
    },
  ];
};
