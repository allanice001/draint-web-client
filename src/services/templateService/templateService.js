import { getAllArtistPostsById } from '../../dataLayer/blog/posts';
import { getArtworksByIdForTemplate } from '../../dataLayer/artwork/artwork';

export const getAttachments = (attachments, id) => {
  const promises = attachments.map((atta) => {
    let res;
    if (atta.type === 'artwork') {
      res = getArtworksByIdForTemplate(id, atta.params)
        .then(res => (({ type: atta.type, value: res.data.artistdata })));
    } else if (atta.type === 'post') {
      res = getAllArtistPostsById(id, atta.params)
        .then(res => ({ type: atta.type, value: res.data }));
    }
    return res;
  });
  return Promise.all(promises);
};
