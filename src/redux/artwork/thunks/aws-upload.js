import { ERROR } from '../../../constants/components/message-statuses';
import axios from 'axios';
import errorMessageHandler from '../../global/notiifcation/actions/error-handler';
import { setArtworkUploadingCount } from 'redux/user/loader/actions/setLoading';

const awsUpload = (percent, url, file) => dispatch => {
  return axios
    .put(url, file, {
      headers: {
        'Content-Type': 'image/jpeg',
        reportProgress: true,
      },
    })
    .then(response => {
      dispatch(setArtworkUploadingCount(percent));
      return response;
    })
    .catch(error => {
      dispatch(errorMessageHandler(error, ERROR));
    });
};

export default awsUpload;
