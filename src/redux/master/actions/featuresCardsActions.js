import {
  GET_MASTER_FEATURES_CARDS_SUCCESS,
  SET_MASTER_FEATURES_CARDS_LOADING,
} from 'constants/redux/masterFeaturesCards';

import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

export const setLoading = () => ({
  type: SET_MASTER_FEATURES_CARDS_LOADING,
});

export const getFeaturesCardsSuccess = payload => ({
  type: GET_MASTER_FEATURES_CARDS_SUCCESS,
  payload,
});

export const getFeaturesCards = ({ page, pageSize }) => dispatch => {
  dispatch(setLoading());
  axios
    .get('/api/master/features-cards', {
      params: { page: page, pageSize: pageSize },
    })
    .then(res => {
      dispatch(getFeaturesCardsSuccess(res.data));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const createFeaturesCard = (
  username,
  title,
  description,
  cards
) => dispatch => {
  axios
    .post('/api/master/features-card', { username, title, description })
    .then(res => {
      const arr = [...cards, { ...res.data.newCard, username }];
      dispatch(getFeaturesCards(arr));
    })
    .catch(err => dispatch(displayMessage('User does not exist!', 'warning')));
};

export const updateFeaturesCard = (
  id,
  username,
  title,
  description,
  cards,
  pagination
) => dispatch => {
  dispatch(setLoading());
  axios
    .put('/api/master/features-card', {
      id,
      username,
      title,
      description,
    })
    .then(res => {
      const arr = cards.map(el => (el.id === id ? res.data.newCard : el));
      dispatch(getFeaturesCardsSuccess({ cards: arr, pagination: pagination }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const deleteFeaturesCard = (id, cards, pagination) => dispatch => {
  dispatch(setLoading());
  axios
    .delete('/api/master/features-card', { data: { id } })
    .then(() => {
      const arr = cards.filter(el => el.id !== id);
      dispatch(getFeaturesCardsSuccess({ cards: arr, pagination: pagination }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};
