import { SET_NEWSLETTER_SECTION } from 'constants/redux/publicHomepage';
import axios from 'dataLayer/axiosInstance';
import errorMessageHandler from 'redux/global/notiifcation/actions/error-handler';

export const setSection = payload => ({
  type: SET_NEWSLETTER_SECTION,
  payload,
});

export const getNewsletterSection = () => dispatch => {
  axios
    .get('/api/homepage/newsletter-section')
    .then(res => dispatch(setSection(res.data.section)))
    .catch(error => dispatch(errorMessageHandler(error)));
};
