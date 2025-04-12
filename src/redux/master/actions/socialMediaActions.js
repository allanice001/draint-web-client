import {
  CLOSE_SNACKBAR,
  DOWNLOAD_SOCIAL_MEDIA_ERROR,
  DOWNLOAD_SOCIAL_MEDIA_SUCCESS,
  GET_SOCIAL_MEDIA_ERROR,
  GET_SOCIAL_MEDIA_SUCCESS,
  SET_SOCIAL_MEDIA_FILTER,
  SET_SOCIAL_MEDIA_LOADING,
  SET_SOCIAL_MEDIA_PAGE,
  SET_SOCIAL_MEDIA_STATE_FROM_COOKIES,
  VERIFY_SOCIAL_MEDIA_ERROR,
  VERIFY_SOCIAL_MEDIA_SUCCESS,
} from 'constants/redux/masterSocialMedia';

import { Uint8ToBase64 } from 'services/images/imageService';
import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import { socialMediaAPI } from 'dataLayer/social-media/social-media';

export const setStateFromCookies = state => ({
  type: SET_SOCIAL_MEDIA_STATE_FROM_COOKIES,
  payload: state,
});

export const getSocialMediaSuccess = (media, totalPages, totalAccounts) => ({
  type: GET_SOCIAL_MEDIA_SUCCESS,
  payload: { media, totalPages, totalAccounts },
});

export const getSocialMediaError = error => ({
  type: GET_SOCIAL_MEDIA_ERROR,
  payload: error,
});

export const setLoading = () => ({
  type: SET_SOCIAL_MEDIA_LOADING,
});

export const setFilter = (field, value) => ({
  type: SET_SOCIAL_MEDIA_FILTER,
  payload: { [field]: value },
});

export const setPage = page => ({
  type: SET_SOCIAL_MEDIA_PAGE,
  payload: page,
});

export const verifySocialMediaSuccess = updatedSocialMedia => ({
  type: VERIFY_SOCIAL_MEDIA_SUCCESS,
  payload: updatedSocialMedia,
});

export const verifySocialMediaError = error => ({
  type: VERIFY_SOCIAL_MEDIA_ERROR,
  payload: error,
});

export const downloadImageSuccess = (filename, base64) => ({
  type: DOWNLOAD_SOCIAL_MEDIA_SUCCESS,

  payload: {
    message: `Downloading ${filename}`,
    filename,
    base64,
  },
});

export const downloadImageError = error => ({
  type: DOWNLOAD_SOCIAL_MEDIA_ERROR,
  payload: error,
});

export const closeSocialMediaSnackbar = () => ({
  type: CLOSE_SNACKBAR,
});

export const getSocialMedia = params => dispatch => {
  dispatch(setLoading());
  axios
    .get(
      `/api/master/socialMedia`,
      params && {
        params: {
          page: params.page,
          status: params.filter,
        },
      }
    )
    .then(res =>
      dispatch(
        getSocialMediaSuccess(
          res.data.socialMedias,
          res.data.totalPages,
          res.data.totalAccounts
        )
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const pageChange = ({ page, filter }) => async dispatch => {
  dispatch(setPage(page));
  dispatch(getSocialMedia({ page, filter }));
};

export const verifySocialMedia = (id, status) => (dispatch, getState) => {
  const { mediaList } = getState().master.socialMedia;
  axios
    .put('/api/master/socialMedia', { id, status })
    .then(() => {
      const updatedSocialMedia = mediaList.map(media => {
        if (media.id === id) return { ...media, status };
        return media;
      });
      dispatch(verifySocialMediaSuccess(updatedSocialMedia));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const downloadImage = (url, id) => async dispatch => {
  dispatch(displayMessage('Downloading...'));
  const response = await socialMediaAPI.downloadImage(url);

  try {
    const filename = `${id}.jpg`;
    const buffer = response.data.Body.data;
    const uint8 = new Uint8Array(buffer);
    const base64 = Uint8ToBase64(uint8);

    dispatch(displayMessage('Downloading is completed'));

    return { filename, base64 };
  } catch (err) {
    dispatch(displayMessage(err.message, 'error'));
  }
};

export const setInitialFilter = initState => (dispatch, getState) => {
  const { mediaList } = getState().master.socialMedia;
  if (mediaList.length === 0) {
    if (initState) {
      dispatch(setStateFromCookies(initState));
      dispatch(getSocialMedia(initState));
    } else {
      dispatch(getSocialMedia());
    }
  }
};
