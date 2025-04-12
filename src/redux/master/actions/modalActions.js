import {
  ADD_IMAGE_TO_MODAL,
  CHANGE_MODAL_DESCRIPTION,
  CLOSE_SNACKBAR,
  DELETE_MODAL_IMG_DIALOG,
  DELETE_MODAL_IMG_ERROR,
  DELETE_MODAL_IMG_SUCCESS,
  GET_MODALS_ERROR,
  GET_MODALS_SUCCESS,
  GET_MODAL_CONTENT_ERROR,
  GET_MODAL_CONTENT_SUCCESS,
  GET_MODAL_IMGS_ERROR,
  GET_MODAL_IMGS_SUCCESS,
  REMOVE_IMAGE_FROM_MODAL,
  SELECT_MODAL,
  SET_MODALS_LOADING,
  SET_MODALS_PAGE,
  UPDATE_MODAL_DESCRIPTION_ERROR,
  UPDATE_MODAL_DESCRIPTION_SUCCESS,
  UPLOAD_MODAL_IMG_ERROR,
  UPLOAD_MODAL_IMG_SUCCESS,
} from 'constants/redux/masterModals';

import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from '../../global/notiifcation/actions/displayMessage';

export const getModalsMediaSuccess = media => ({
  type: GET_MODAL_IMGS_SUCCESS,
  payload: { media },
});

export const getModalsMediaError = error => ({
  type: GET_MODAL_IMGS_ERROR,
  payload: error,
});

export const setLoading = () => ({
  type: SET_MODALS_LOADING,
});

export const setPage = page => ({
  type: SET_MODALS_PAGE,
  payload: page,
});

export const deleteModalDialog = id => ({
  type: DELETE_MODAL_IMG_DIALOG,
  payload: id,
});

export const deleteModalSuccess = () => ({
  type: DELETE_MODAL_IMG_SUCCESS,
});

export const deleteModalError = error => ({
  type: DELETE_MODAL_IMG_ERROR,
  payload: error,
});

export const uploadModalSuccess = () => ({
  type: UPLOAD_MODAL_IMG_SUCCESS,
});

export const uploadModalError = error => ({
  type: UPLOAD_MODAL_IMG_ERROR,
  payload: error,
});

export const closeModalsSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getModalsSuccess = modals => ({
  type: GET_MODALS_SUCCESS,
  payload: modals,
});

export const getModalsError = error => ({
  type: GET_MODALS_ERROR,
  payload: error,
});

export const getModalContentSuccess = content => ({
  type: GET_MODAL_CONTENT_SUCCESS,
  payload: content,
});

export const getModalContentError = error => ({
  type: GET_MODAL_CONTENT_ERROR,
  payload: error,
});

export const selectModal = modal => ({
  type: SELECT_MODAL,
  payload: modal,
});

export const changeModalDescription = desc => ({
  type: CHANGE_MODAL_DESCRIPTION,
  payload: desc,
});

export const updateModalDescriptionSuccess = updatedModals => ({
  type: UPDATE_MODAL_DESCRIPTION_SUCCESS,

  payload: {
    allModals: updatedModals,
  },
});

export const updateModalDescriptionError = error => ({
  type: UPDATE_MODAL_DESCRIPTION_ERROR,
  payload: error,
});

export const removeImageFromModal = id => ({
  type: REMOVE_IMAGE_FROM_MODAL,
  payload: id,
});

export const addImageToModal = id => ({
  type: ADD_IMAGE_TO_MODAL,
  payload: id,
});

export const getModalsMedia = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/content-media')
    .then(res => dispatch(getModalsMediaSuccess(res.data)))
    .catch(err => dispatch(getModalsMediaError(err.message)));
};

export const getModalContentData = id => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/master/content-media-modal?modalId=${id}`)
    .then(res => dispatch(getModalContentSuccess(res.data)))
    .catch(err => dispatch(getModalContentError(err.message)));
};

export const updateModalContentData = (ContentMediaId, checked, ModalId) => (
  dispatch,
  state
) => {
  const currentImage = state().master.modals.mediaToModal;

  const update = id =>
    axios.post('/api/master/content-media-modal', {
      ModalId,
      ContentMediaId: id,
    });
  if (checked) {
    update(null)
      .then(() => dispatch(removeImageFromModal(ContentMediaId)))
      .catch(err => dispatch(getModalContentError(err.message)));
  } else {
    dispatch(removeImageFromModal(currentImage));
    return update(ContentMediaId)
      .then(() => dispatch(addImageToModal(ContentMediaId)))
      .catch(err => dispatch(getModalContentError(err.message)));
  }
};

export const getModalsList = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/modals')
    .then(res => {
      dispatch(getModalsSuccess(res.data.modals));
    })
    .catch(err => dispatch(getModalsError(err.message)));
};

export const deleteModal = id => dispatch => {
  axios
    .delete('/api/master/content-media', { data: { id } })
    .then(() => dispatch(deleteModalSuccess()))
    .then(() =>
      dispatch(displayMessage('Media content has been successfully deleted'))
    )
    .then(() => dispatch(getModalsMedia()))
    .catch(err => dispatch(deleteModalError(err.message)));
};

export const uploadModal = file => dispatch => {
  dispatch(setLoading());
  const data = new FormData();
  data.append('file', file);
  data.append('type', 'artwork-image');
  axios
    .post('/api/master/content-media', data)
    .then(() => dispatch(uploadModalSuccess()))
    .then(() =>
      dispatch(displayMessage('Media content has been successfully uploaded'))
    )
    .then(() => dispatch(getModalsMedia()))
    .catch(err => dispatch(uploadModalError(err.message)));
};

export const updateModalDescription = (
  id,
  description,
  allModals
) => dispatch => {
  dispatch(setLoading());
  axios
    .put('/api/master/modals', { currentModal: id, description })
    .then(() => {
      const updatedModals = allModals.map(m => {
        if (m.id === id) {
          m.description = description;
          return m;
        }
        return m;
      });
      dispatch(updateModalDescriptionSuccess(updatedModals));
      dispatch(
        displayMessage('Modal description has been successfully updated')
      );
    })
    .catch(err => dispatch(updateModalDescriptionError(err.message)));
};
