import { checkAvatarExtensions } from '../../../helpers/image-helpers/image-helper';
import displayMessage from '../../global/notiifcation/actions/displayMessage';

const checkAvatar = file => dispatch => {
  const extensions = file.some(singleFile => checkAvatarExtensions(singleFile));
  if (extensions) {
    dispatch(
      displayMessage('File not supported, try: jpeg/jpg, png', 'warning')
    );
  }
  return file.filter(singleFile => !checkAvatarExtensions(singleFile));
};

export default checkAvatar;
