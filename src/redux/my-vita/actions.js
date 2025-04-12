import {
  GET_INTERVIEW,
  GET_INTERVIEW_PHOTO,
  SET_INITIAL_VALUE_OF_ANSWERS,
  SET_LOADING_AVATAR,
} from './constants';
import {
  getInterview,
  getInterviewPhoto,
  saveInterview,
  updatePhoto,
} from '../../dataLayer/my-vita/interview';

import { createImageFile } from 'services/images/imageService';
import displayMessage from '../global/notiifcation/actions/displayMessage';
import { prepareData } from 'helpers/form.helper';
import { uploadMediaFileViaSignedUrl } from 'services/media/media.service';

export const setInitialData = payload => ({
  type: SET_INITIAL_VALUE_OF_ANSWERS,
  payload,
});

export const setLoadingAvatar = payload => ({
  type: SET_LOADING_AVATAR,
  payload,
});

export const getInterviewActions = profileId => dispatch => {
  getInterview(profileId)
    .then(res => {
      dispatch({ type: GET_INTERVIEW, payload: res.data });
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const saveInterviewActions = (profileId, form) => dispatch => {
  const body = prepareData(form);

  saveInterview(profileId, body)
    .then(() => {
      dispatch(getInterviewActions(profileId));
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const uploadPhotoActions = (profileId, src) => dispatch => {
  const imageFile = src && createImageFile(src);
  const imageType = imageFile.type;

  updatePhoto(profileId, imageType)
    .then(async ({ data }) => {
      if (data.presignedUrl)
        await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
    })
    .then(() => {
      dispatch({ type: GET_INTERVIEW_PHOTO, payload: src });
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const getPhotoActions = profileId => dispatch => {
  dispatch(setLoadingAvatar(false));
  getInterviewPhoto(profileId)
    .then(res => {
      dispatch({ type: GET_INTERVIEW_PHOTO, payload: res.data.small_image });
      dispatch(setLoadingAvatar(true));
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
      dispatch(setLoadingAvatar(false));
    });
};
