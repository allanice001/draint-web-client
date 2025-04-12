import { SET_US_SECTION } from 'constants/redux/publicHomepage';
import axios from 'dataLayer/axiosInstance';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const setSection = payload => ({
  type: SET_US_SECTION,
  payload,
});

export const getJoinUsSection = () => dispatch => {
  axios
    .get('/api/homepage/join-us-section')
    .then(res => dispatch(setSection(res.data.section)))
    .catch(error => dispatch(errorMessageHandler(error)));
};
