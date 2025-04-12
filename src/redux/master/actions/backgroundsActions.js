import {
  CLOSE_SNACKBAR,
  DELETE_BACKGROUND_DIALOG,
  DELETE_BACKGROUND_ERROR,
  DELETE_BACKGROUND_SUCCESS,
  GET_BACKGROUNDS_ERROR,
  GET_BACKGROUNDS_SUCCESS,
  SET_BACKGROUNDS_LOADING,
  UPLOAD_BACKGROUND_ERROR,
  UPLOAD_BACKGROUND_SUCCESS,
} from 'constants/redux/masterBackgrounds';

import axios from 'dataLayer/axiosInstanceMaster';

export const getBackgroundsSuccess = backgrounds => ({
  type: GET_BACKGROUNDS_SUCCESS,
  payload: backgrounds,
});

export const getBackgroundsError = error => ({
  type: GET_BACKGROUNDS_ERROR,
  payload: error,
});

export const setLoading = () => ({
  type: SET_BACKGROUNDS_LOADING,
});

export const deleteBackgroundDialog = id => ({
  type: DELETE_BACKGROUND_DIALOG,
  payload: id,
});

export const deleteBackgroundSuccess = payload => ({
  type: DELETE_BACKGROUND_SUCCESS,
  payload,
});

export const deleteBackgroundError = error => ({
  type: DELETE_BACKGROUND_ERROR,
  payload: error,
});

export const uploadBackgroundSuccess = payload => ({
  type: UPLOAD_BACKGROUND_SUCCESS,
  payload,
});

export const uploadBackgroundError = error => ({
  type: UPLOAD_BACKGROUND_ERROR,
  payload: error,
});

export const closeBackgroundsSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getBackgrounds = () => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/backgrounds')
    .then(res => dispatch(getBackgroundsSuccess(res.data.backgroundsList)))
    .catch(err => getBackgroundsError(err.message));
};

export const deleteBackground = id => dispatch => {
  axios
    .delete('/api/master/backgrounds', { data: { id } })
    .then(() =>
      dispatch(
        deleteBackgroundSuccess('Background has been successfully deleted')
      )
    )
    .then(() => dispatch(getBackgrounds()))
    .catch(err => deleteBackgroundError(err.message));
};

export const uploadBackground = (file, ig_name) => dispatch => {
  dispatch(setLoading());
  const data = new FormData();
  data.append('file', file);
  data.append('type', 'artwork-image');
  data.append('ig_name', ig_name);
  axios
    .post('/api/master/backgrounds', data)
    .then(() =>
      dispatch(
        uploadBackgroundSuccess('Background has been successfully uploaded')
      )
    )
    .then(() => dispatch(getBackgrounds()))
    .catch(err => uploadBackgroundError(err.message));
};
