import {
  checkFileExtensions,
  checkFileSize,
} from '../../../helpers/image-helpers/image-helper';

import { IMAGE_SIZE_8 } from '../../../constants/components/image-upload';
import displayMessage from '../../global/notiifcation/actions/displayMessage';

const checkImage = (file, fileSize = IMAGE_SIZE_8) => dispatch => {
  const size = file.some(singleFile =>
    checkFileSize(singleFile, fileSize.size)
  );
  const extensions = file.some(singleFile => checkFileExtensions(singleFile));
  if (size) {
    dispatch(displayMessage(fileSize.message, fileSize.type));
  }
  if (extensions) {
    dispatch(
      displayMessage('File not supported, try: jpeg/jpg, png', 'warning')
    );
  }
  return file.filter(
    singleFile =>
      !checkFileSize(singleFile, fileSize.size) &&
      !checkFileExtensions(singleFile)
  );
};

export default checkImage;
