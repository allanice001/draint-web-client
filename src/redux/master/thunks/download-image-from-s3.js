import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { getBase64ImageURL } from 'services/images/imageService';
import getImageFromS3Request from 'dataLayer/master/get-image-from-s3-request';

const downloadImageFromS3 = (params, callback) => dispatch => {
  getImageFromS3Request(params)
    .then(res => {
      const { Image } = res.data;
      const Base64ImageURL = getBase64ImageURL(Image);

      if (!!callback) {
        return callback(Base64ImageURL);
      }

      return Base64ImageURL;
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      if (!!callback) {
        callback(null);
      }
    });
};

export default downloadImageFromS3;
