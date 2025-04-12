import { WARNING } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import saveNewsLetterEmail from 'dataLayer/footer/save-news-letter-email';

export const saveNewsLetter = (email, profileId) => dispatch => {
  saveNewsLetterEmail({ email, profileId })
    .then(response => {
      dispatch(displayMessage(response.data.message));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error, WARNING));
    });
};
