import { SET_REVIEWS } from 'constants/redux/publicHomepage';
import axios from 'dataLayer/axiosInstance';
import errorMessageHandler from '../../global/notiifcation/actions/error-handler';

export const setReviews = payload => ({
  type: SET_REVIEWS,
  payload,
});

export const getReviews = () => dispatch => {
  axios
    .get('/api/homepage/reviews')
    .then(res => dispatch(setReviews(res.data.reviews)))
    .catch(error => dispatch(errorMessageHandler(error)));
};
