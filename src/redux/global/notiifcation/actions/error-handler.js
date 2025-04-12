import { ERROR } from 'constants/components/message-statuses';
import displayMessage from './displayMessage';

const errorMessageHandler = (error, type = ERROR) => dispatch => {
  if (error.response?.data?.message) {
    return dispatch(displayMessage(error.response.data.message, type));
  }

  if (error.response?.data) {
    return dispatch(displayMessage(error.response.data, type));
  }

  return dispatch(displayMessage(error.message, type));
};

export default errorMessageHandler;
