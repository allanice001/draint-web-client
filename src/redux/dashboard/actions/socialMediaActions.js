import {
  GET_SOCIAL_MEDIA_DATA_SUCCESS,
  SET_SOCIAL_MEDIA_COUNTRY,
  SET_SOCIAL_MEDIA_LINK,
  SET_SOCIAL_MEDIA_LOADING,
} from 'constants/redux/dashboardSocialMedia';
import { countryName, isoCountry } from 'components/lib';

import axios from 'dataLayer/axiosInstance';
import displayMessage from '../../global/notiifcation/actions/displayMessage';
import { handleInstagramUsername } from 'helpers/social-media/handle-instagram-username';

export const setLoading = () => ({
  type: SET_SOCIAL_MEDIA_LOADING,
});

export const getSocMediaDataSuccess = payload => ({
  type: GET_SOCIAL_MEDIA_DATA_SUCCESS,
  payload,
});

export const setSocMediaCountry = payload => ({
  type: SET_SOCIAL_MEDIA_COUNTRY,
  payload,
});

export const setSocMediaLink = payload => ({
  type: SET_SOCIAL_MEDIA_LINK,
  payload,
});

export const getSocMediaData = listOnly => async dispatch => {
  dispatch(setLoading());
  await axios
    .get('/api/dashboard/socialMedia')
    .then(res => {
      if (res.data?.profData?.country && !listOnly) {
        const { country } = res.data.profData;
        const currentCountry = isoCountry(countryName(country)) ? country : '';
        dispatch(setSocMediaCountry(currentCountry));
      }
      if (res.data?.profData?.instagram && !listOnly) {
        const { instagram } = res.data.profData;
        dispatch(setSocMediaLink(instagram));
      }
      const instagramImageList = res.data.socialMedias;
      dispatch(getSocMediaDataSuccess({ instagramImageList }));
    })
    .catch(err => {
      dispatch(displayMessage(err.message, 'error'));
      dispatch(setLoading());
    });
};

export const uploadSocMediaData = ({ selectedFiles }) => async (
  dispatch,
  getState
) => {
  const data = new FormData();

  selectedFiles.forEach(file => {
    data.append('file', file);
  });

  const state = getState();
  const {
    instagramLink,
    description,
    country,
  } = state.form.socialMediaForm.values;

  data.append('country', country);
  data.append('description', description);
  data.append('instagram', handleInstagramUsername(instagramLink));

  try {
    dispatch(setLoading());
    await axios.post('/api/dashboard/socialMedia', data);

    dispatch(
      displayMessage(
        'Thanks for sending us your Posting request. We will review your request within 3 business days.'
      )
    );
    dispatch(getSocMediaData(true));
  } catch (err) {
    dispatch(displayMessage(err.message, 'error'));
  } finally {
    dispatch(setLoading());
  }
};

export const deleteSocMediaData = (
  id,
  instagramImageList
) => async dispatch => {
  await axios
    .delete('/api/dashboard/socialMedia', { data: { id } })
    .then(() => dispatch(displayMessage('Deleted successfully')))
    .then(() => {
      const updated = instagramImageList.filter(img => img.id !== id);
      dispatch(getSocMediaDataSuccess({ instagramImageList: updated }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};
