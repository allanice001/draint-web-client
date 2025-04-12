import { SET_REVIEWS } from 'constants/redux/masterReviews';
import axios from 'dataLayer/axiosInstance';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';
import errorMessageHandler from '../../global/notiifcation/actions/error-handler';

export const setReviews = payload => ({
  type: SET_REVIEWS,
  payload,
});

export const getReviews = () => dispatch => {
  axios
    .get('/api/master/reviews')
    .then(res => dispatch(setReviews(res.data.reviews)))
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const createReview = form => dispatch => {
  axios
    .post('/api/master/reviews', form)
    .then(res => dispatch(displayMessage(res.data.message)))
    .then(() => dispatch(getReviews()))
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const updateReview = form => dispatch => {
  axios
    .put('/api/master/reviews', form)
    .then(res => dispatch(displayMessage(res.data.message)))
    .then(() => dispatch(getReviews()))
    .catch(error => dispatch(errorMessageHandler(error)));
};

export const removeReview = id => dispatch => {
  axios
    .delete('/api/master/reviews', { data: { id } })
    .then(res => dispatch(getReviews()))
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};
