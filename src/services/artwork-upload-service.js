import { createImageFile } from 'services/images/imageService';
import { isURL } from 'services/global';
import { saveMultipleArtworks } from '../redux/artwork/actions/artworkActions';

export function submitArtworkUpload(
  values,
  dispatch,
  history,
  imagesData,
  profileId
) {
  const images = [...imagesData.values()];
  const files = images.map((image, index) =>
    createImageFile(image.imgPath, index)
  );

  const artworkData = {
    ...values,
    profile_id: profileId,
    imageCount: files.length,
  };

  dispatch(saveMultipleArtworks(artworkData, files));
}

export function onNextDisabled(
  activeStep,
  valid,
  images,
  permission,
  isArtworkUploading
) {
  if (activeStep === 0 && images.length === 0) return true;
  if (activeStep === 1) {
    if (isArtworkUploading) return true;
    if (valid) return false;
    return !(!valid && permission === 'master');
  }
  return false;
}

export function getMediaForArtworkUpdate(
  images,
  currentImages,
  initialPrimaryImage
) {
  const imagesIds = new Set(images.map(({ id }) => id));
  const media = { changedIndex: [], deleted: [], added: [] };

  images.forEach(({ id, imgPath: path }, index) => {
    if (!id || !isURL(path)) {
      if (id) media.deleted.push({ id });

      return media.added.push({ index, path });
    }

    if (id === initialPrimaryImage.id && index !== 0) {
      return media.changedIndex.push({ id, index });
    }

    if (index !== currentImages.findIndex(image => image.id === id))
      media.changedIndex.push({
        id,
        index,
      });
  });

  return {
    ...media,
    deleted: [
      ...media.deleted,
      ...currentImages.filter(({ id }) => !imagesIds.has(id)),
    ],
  };
}
