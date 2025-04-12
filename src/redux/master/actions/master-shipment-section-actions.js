import {
  CREATE_MESSAGE,
  UPDATE_MESSAGE,
} from 'constants/components/master/join-us';
import { RESET, SET_SECTION } from 'constants/redux/master-shipment-section';
import {
  changeStatus,
  createNewSection,
  deleteSection,
  getSections,
  updateSection,
} from 'dataLayer/homepage/masterShipmentSection';
import { createImageFile } from 'services/images/imageService';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';
import { parseImage } from 'helpers/homepage/parseImage';
import { uploadMediaFileViaSignedUrl } from 'services/media/media.service';

export const setSection = payload => ({
  type: SET_SECTION,
  payload,
});

export const resetStore = () => ({
  type: RESET,
});

export const getAllSections = () => dispatch => {
  getSections()
    .then(res => dispatch(setSection(res.data.parsedSections)))
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const createSection = form => async dispatch => {
  try {
    const imageFile = form.image && createImageFile(form.image);
    form.image = parseImage(form.image);

    const { data } = await createNewSection(form);
    if (data.presignedUrl) {
      await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
    }

    dispatch(displayMessage(CREATE_MESSAGE));
    dispatch(getAllSections());
  } catch (error) {
    dispatch(errorMessageHandler(error));
  }
};

export const editSection = form => async dispatch => {
  try {
    const imageFile = form.image && createImageFile(form.image);
    form.image = parseImage(form.image);

    const { data } = await updateSection(form);
    if (data) {
      await uploadMediaFileViaSignedUrl(imageFile, data.presignedUrl);
    }

    dispatch(displayMessage(UPDATE_MESSAGE));
    dispatch(getAllSections());
  } catch (error) {
    dispatch(errorMessageHandler(error));
  }
};

export const changeSectionStatus = (id, status) => dispatch => {
  changeStatus(id, status)
    .then(() => dispatch(getAllSections()))
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const removeSection = id => dispatch => {
  deleteSection(id)
    .then(res => {
      dispatch(displayMessage(res.data.message));
      dispatch(getAllSections());
    })
    .catch(error => dispatch(errorMessageHandler(error)));
};
