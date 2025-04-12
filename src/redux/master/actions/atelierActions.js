import {
  DELETE_POST_BY_MASTER,
  MASTER_UPDATE_ATELIER,
  SET_ATELIER_POSTS,
  SET_FILTERS,
  UPDATE_TITLES_BY_MASTER,
} from 'constants/redux/masterAtelier';
import {
  deleteAtelierPost,
  getAteliers,
  updateAtelier,
  updateAtelierTitles,
} from 'dataLayer/atelier/master-atelier';
import { errorHandler, successHandler } from 'helpers/redux-helpers/helper';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { reset } from 'redux-form';

export const setFilters = payload => ({
  type: SET_FILTERS,
  payload,
});

export const setFilteredAteliers = params => dispatch => {
  dispatch({ type: SET_ATELIER_POSTS });
  getAteliers(params)
    .then(response => {
      dispatch(successHandler(SET_ATELIER_POSTS, response.data));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(errorHandler(SET_ATELIER_POSTS));
    });
};

export const updateAtelierByMaster = (values, data) => dispatch => {
  dispatch({ type: MASTER_UPDATE_ATELIER });
  updateAtelier(values.id, data)
    .then(result => {
      dispatch(
        successHandler(MASTER_UPDATE_ATELIER, {
          postId: values.id,
          status: result.data.post.status,
          public: result.data.post.public,
        })
      );
      dispatch(displayMessage(result.data.message));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(errorHandler(MASTER_UPDATE_ATELIER));
    });
};

export const deleteContentByMaster = postId => dispatch => {
  dispatch({ type: DELETE_POST_BY_MASTER });
  deleteAtelierPost(postId)
    .then(() => {
      dispatch(successHandler(DELETE_POST_BY_MASTER, postId));
      dispatch(displayMessage('Post was deleted'));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(errorHandler(DELETE_POST_BY_MASTER));
    });
};

export const changeTitlesForAtelier = (id, values) => dispatch => {
  updateAtelierTitles(id, values)
    .then(result => {
      dispatch(successHandler(UPDATE_TITLES_BY_MASTER, result.data.titles));
      dispatch(reset('atelierTitles'));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
      dispatch(errorHandler(UPDATE_TITLES_BY_MASTER));
    });
};
