import * as ACTIONS from 'constants/redux/masterHashtags';
import * as CONSTANTS from 'constants/components/master/hashtags';
import * as helpers from 'helpers/redux-helpers/helper';
import * as requests from 'dataLayer/hashtags/masterHashtags';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const getHashtags = params => dispatch => {
  dispatch({ type: ACTIONS.SET_MASTER_HASHTAGS });
  requests
    .getHashtagsRequest(params)
    .then(({ data }) => {
      dispatch(helpers.successHandler(ACTIONS.SET_MASTER_HASHTAGS, data));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const deleteHashtag = (hashtagId, name, page) => dispatch => {
  requests
    .deleteHashtagRequest(hashtagId)
    .then(() => {
      dispatch(getHashtags({ name, page }));
      dispatch(displayMessage(CONSTANTS.DELETE_MESSAGE));
    })
    .catch(error => {
      dispatch(helpers.errorHandler(ACTIONS.DELETE_HASHTAG, error));
      dispatch(errorMessageHandler(error));
    });
};

export const updateHashtag = (id, name) => dispatch => {
  requests
    .updateHashtagRequest(id, name)
    .then(({ data }) => {
      dispatch(helpers.successHandler(ACTIONS.UPDATE_HASHTAG, data.hashtag));
      dispatch(displayMessage(CONSTANTS.UPDATE_MESSAGE));
    })
    .catch(error => {
      dispatch(helpers.errorHandler(ACTIONS.UPDATE_HASHTAG, error));
      dispatch(errorMessageHandler(error));
    });
};
