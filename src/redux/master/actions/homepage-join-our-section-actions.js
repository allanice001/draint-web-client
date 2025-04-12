import { SET_OUR_SECTION } from 'constants/redux/publicHomepage';
import axios from 'dataLayer/axiosInstance';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const setSection = payload => ({
  type: SET_OUR_SECTION,
  payload,
});

export const getJoinOurSection = () => dispatch => {
  axios
    .get('/api/homepage/join-our-section')
    .then(res => dispatch(setSection(res.data.section)))
    .catch(error => dispatch(errorMessageHandler(error)));
};
