import staticUrls from 'constants/images/static-urls';
import { uploadMediaFileViaSignedUrl } from 'services/media/media.service';

export const PostPreviewContent = post => {
  const newDiv = document.createElement('div');
  newDiv.innerHTML = post.content;
  const list = newDiv.textContent;
  return {
    content: list,
  };
};

export const getImage = post => {
  if (post.small_image && post.small_image !== '') return post.small_image;

  if (post.primary_image && post.primary_image !== '')
    return post.primary_image;

  if (post.featured_image && post.featured_image !== '')
    return post.featured_image;

  return staticUrls.image.defaultPost;
};

export const selectCategory = (category, splitter) => {
  const activeCategoryArray = category.split(splitter);

  if (activeCategoryArray.length > 1) {
    return activeCategoryArray[1];
  }

  if (activeCategoryArray.length === 1) {
    return activeCategoryArray[0];
  }

  return 'community';
};

export const saveBlogContentImages = async (images, urls) => {
  if (!urls) {
    return;
  }

  for (let i = 0; i < urls.length; i++) {
    if (!images[i] || !urls[i]) {
      continue;
    }

    await uploadMediaFileViaSignedUrl(images[i], urls[i]);
  }
};
