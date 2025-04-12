import {
  JPEG,
  JPG,
  PNG,
} from 'constants/components/image-upload';

export const checkFileSize = (file, fileSize) => {
  return file.size >= fileSize;
};

export const checkFileExtensions = file =>
  ![JPEG, JPG, PNG].includes(file?.type);

export const checkAvatarExtensions = file =>
  ![JPEG, JPG, PNG].includes(file?.type);
