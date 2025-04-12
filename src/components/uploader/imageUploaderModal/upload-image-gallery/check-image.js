import {
  checkFileExtensions,
  checkFileSize,
} from 'helpers/image-helpers/image-helper';
// import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

function checkImage(file) {
  // const size = file.some(singleFile => checkFileSize(singleFile));
  // const extensions = file.some(singleFile => checkFileExtensions(singleFile));
  // if (size) {
  //   dispatch(
  //     displayMessage('The image is too large, should be no more than 8MB')
  //   );
  // }
  // if (extensions) {
  //   dispatch(displayMessage('File not supported, try: jpeg/jpg, png, gif'));
  // }
  return file.filter(
    singleFile => !checkFileSize(singleFile) && !checkFileExtensions(singleFile)
  );
}

export default checkImage;
