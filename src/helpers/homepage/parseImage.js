import { createImageFile } from '../../services/images/imageService';

export const parseImage = image => {
  if (image) {
    return createImageFile(image).type;
  }
};
