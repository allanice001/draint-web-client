import {
  CREATE_SLIDE,
  DELETE_SLIDE,
  SET_ALL_SLIDES,
  UPDATE_SLIDE,
} from 'constants/redux/master-homepage';
import {
  changeSlideStatus,
  createSlide,
  deleteCurrentSlide,
  getSlides,
  updateSlide,
} from 'dataLayer/homepage/masterHomepage';
import { errorHandler, successHandler } from 'helpers/redux-helpers/helper';

import { createImageFile } from 'services/images/imageService';
import displayMessage from '../../global/notiifcation/actions/displayMessage';
import { parseImage } from 'helpers/homepage/parseImage';
import { reset } from 'redux-form';
import { uploadMediaFileViaSignedUrl } from 'services/media/media.service';

const setLoading = (type, payload) => ({
  type,
  payload,
});

export const updateSlideByAdmin = values => async dispatch => {
  try {
    const imageFile = values.image && createImageFile(values.image);
    values.image = parseImage(values.image);
    const { data } = await updateSlide(values);
    if (data.presignedUrl) {
      await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
    }

    dispatch(successHandler(UPDATE_SLIDE, data.slide));
    dispatch(displayMessage('Slide successfully updated'));
  } catch (err) {
    dispatch(displayMessage(err.message, 'error'));
    dispatch(errorHandler(UPDATE_SLIDE, err));
  }
};

export const createNewSlideByAdmin = values => dispatch => {
  const imageFile = values.image && createImageFile(values.image);

  dispatch(setLoading(CREATE_SLIDE, true));
  values.image = parseImage(values.image);
  createSlide(values)
    .then(async ({ data }) => {
      if (data.presignedUrl) {
        await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
      }
      dispatch(successHandler(CREATE_SLIDE, data.slide));
      dispatch(reset('homepageSlider'));
      dispatch(displayMessage('Slide status successfully created'));
    })
    .catch(error => {
      dispatch(displayMessage('Something went wrong', 'error'));
      dispatch(errorHandler(CREATE_SLIDE, error));
    });
};

export const getAllSlides = () => dispatch => {
  dispatch(setLoading(SET_ALL_SLIDES, true));
  getSlides()
    .then(result => {
      dispatch(successHandler(SET_ALL_SLIDES, result.data.slides));
    })
    .catch(error => {
      dispatch(displayMessage('Can not get any slide yet', 'error'));
      dispatch(errorHandler(SET_ALL_SLIDES, error));
    });
};

export const updateSlideStatus = (id, status) => dispatch => {
  changeSlideStatus(id, status)
    .then(result => {
      const message = !!status.status
        ? 'Slide has been approved'
        : 'Slide has been disapproved';
      dispatch(successHandler(UPDATE_SLIDE, result.data.slide));
      dispatch(displayMessage(message));
    })
    .catch(error => {
      dispatch(displayMessage('Something went wrong', 'error'));
      dispatch(errorHandler(UPDATE_SLIDE, error));
    });
};

export const deleteSlide = id => dispatch => {
  deleteCurrentSlide(id)
    .then(() => {
      dispatch(successHandler(DELETE_SLIDE, id));
      dispatch(displayMessage('Slide successfully deleted'));
    })
    .catch(error => {
      dispatch(displayMessage('Something went wrong', 'error'));
      dispatch(errorHandler(DELETE_SLIDE, error));
    });
};
