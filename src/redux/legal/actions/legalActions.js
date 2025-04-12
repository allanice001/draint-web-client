import {
  ADD_LEGAL_ITEM,
  REMOVE_LEGAL_ITEM,
  SET_LEGAL_DATA,
  SET_LEGAL_IMPRINT,
  SET_LEGAL_LOADING,
  SET_SELECTED_LEGAL_ITEM,
  UPDATE_LEGAL_ITEM,
} from 'constants/redux/legal';
import {
  createLegal,
  deleteLegal,
  editLegal,
  getImprintData,
  getLegal,
  getSelectLegal,
} from 'dataLayer/legal';

import { ERROR } from 'constants/components/message-statuses';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorHandler from 'redux/global/notiifcation/actions/error-handler';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const setLegalData = payload => ({
  type: SET_LEGAL_DATA,
  payload,
});

export const setLegalImprint = payload => ({
  type: SET_LEGAL_IMPRINT,
  payload,
});

export const setLegalItemToDelete = payload => ({
  type: REMOVE_LEGAL_ITEM,
  payload,
});

export const setLegalItemToAdd = payload => ({
  type: ADD_LEGAL_ITEM,
  payload,
});

export const setLegalItemToUpdate = payload => ({
  type: UPDATE_LEGAL_ITEM,
  payload,
});

export const setSelectedLegalItem = payload => ({
  type: SET_SELECTED_LEGAL_ITEM,
  payload,
});

export const setLoading = payload => ({
  type: SET_LEGAL_LOADING,
  payload,
});

export const getLegalData = params => dispatch => {
  getLegal(params)
    .then(res => dispatch(setLegalData(res.data.legalData)))
    .catch(err => {
      dispatch(errorHandler(err, ERROR));
    });
};

export const removeLegalItem = id => dispatch => {
  deleteLegal(id)
    .then(() => {
      dispatch(setLegalItemToDelete(id));
      dispatch(displayMessage('Deleted successfully!'));
    })
    .catch(err => {
      dispatch(errorHandler(err, ERROR));
    });
};

export const addLegalItem = (title, content, featureImage) => dispatch => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('html_content', content);
  featureImage && formData.append('file', featureImage);

  createLegal(formData)
    .then(res => {
      const { data } = res.data;
      dispatch(setLegalItemToAdd(data));
      dispatch(displayMessage('Added successfully!'));
    })
    .catch(error => {
      dispatch(errorMessageHandler(error));
    });
};

export const updateLegalItem = (
  id,
  title,
  content,
  featureImage
) => dispatch => {
  const formData = new FormData();
  formData.append('id', id);
  formData.append('title', title);
  formData.append('html_content', content);
  featureImage && formData.append('file', featureImage);

  editLegal(formData)
    .then(res => {
      const { data } = res;
      dispatch(
        setLegalItemToUpdate({
          id: data.id,
          title: data.title,
          html_content: data.html_content,
          image_url: data.image_url,
        })
      );
      dispatch(displayMessage('Updated successfully!'));
    })
    .catch(err => {
      dispatch(errorHandler(err, ERROR));
    });
};

export const getSelectedLegalItem = title => (dispatch, getState) => {
  const list = getState().legal.legalList;
  const query = title || list[0].title;

  dispatch(setSelectedLegalItem(null));

  getSelectLegal(query)
    .then(res => dispatch(setSelectedLegalItem(res.data.legalInfo)))
    .catch(err => dispatch(displayMessage(err.message, ERROR)));
};

export const getLegalImprint = () => dispatch => {
  dispatch(setLoading(true));
  getImprintData()
    .then(({ data }) => {
      dispatch(setLegalImprint(data.imprint));
    })
    .catch(err => {
      dispatch(setLoading(false));
      dispatch(errorHandler(err, ERROR));
    });
};
