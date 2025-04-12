import {
  GET_MASTER_FEEDBACK_OPTIONS_SUCCESS,
  GET_MASTER_FEEDBACK_SUCCESS,
  SET_MASTER_FEEDBACK_DATE_FILTER,
  SET_MASTER_FEEDBACK_FILTER,
  SET_MASTER_FEEDBACK_LOADING,
  SET_MASTER_FEEDBACK_OPTIONS_LOADING,
  SET_MASTER_FEEDBACK_PAGE,
} from 'constants/redux/masterFeedback';

import axios from 'dataLayer/axiosInstanceMaster';
import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

export const setLoading = () => ({
  type: SET_MASTER_FEEDBACK_LOADING,
});

export const setLoadingOptions = () => ({
  type: SET_MASTER_FEEDBACK_OPTIONS_LOADING,
});

export const getFeedbackSuccess = payload => ({
  type: GET_MASTER_FEEDBACK_SUCCESS,
  payload,
});

export const getFeedbackOptionsSuccess = payload => ({
  type: GET_MASTER_FEEDBACK_OPTIONS_SUCCESS,
  payload,
});

export const setFilter = (type, filter) => ({
  type: SET_MASTER_FEEDBACK_FILTER,
  payload: { [type]: filter },
});

export const setPage = page => ({
  type: SET_MASTER_FEEDBACK_PAGE,
  payload: { page },
});

export const setDateFilter = date => ({
  type: SET_MASTER_FEEDBACK_DATE_FILTER,
  payload: { date },
});

export const getFeedback = param => dispatch => {
  dispatch(setLoading());
  const withDate = param?.date && param.date.dateSelected;
  const params = {
    filter: param?.filter || '',
    page: param?.page || 1,
    onlyNew: param?.onlyNew || '',
  };
  if (withDate) {
    if (param.date.from) params.from = param.date.from;
    if (param.date.to) params.to = param.date.to;
  }
  axios
    .get('/api/feedback/getAll', param && { params })
    .then(res => dispatch(getFeedbackSuccess(res.data)))
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const markAsRead = (id, read, feedback) => dispatch => {
  axios
    .put('/api/feedback/mark-as-read', { id, read })
    .then(() => {
      const arr = feedback.map(el => (el.id === id ? { ...el, read } : el));
      dispatch(getFeedbackSuccess({ feedback: arr }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const deleteFeedback = (id, feedback) => dispatch => {
  axios
    .delete('/api/feedback/delete', { data: { id } })
    .then(() => {
      const arr = feedback.filter(el => el.id !== id);
      dispatch(getFeedbackSuccess({ feedback: arr }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const createFeedback = data => dispatch => {
  axios
    .post('/api/feedback/create', data)
    .then(res => dispatch(displayMessage(res.data.message)))
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const getFeedbackOptions = () => dispatch => {
  dispatch(setLoadingOptions());
  axios
    .get('/api/feedback/getOptions')
    .then(res =>
      dispatch(
        getFeedbackOptionsSuccess({
          options: res.data.options,
        })
      )
    )
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const createOption = (text, options) => dispatch => {
  axios
    .post('/api/feedback/create-option', { text })
    .then(res => {
      const arr = [...options, res.data.option];
      dispatch(getFeedbackOptionsSuccess({ options: arr }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const updateOption = (id, text, options) => dispatch => {
  axios
    .put('/api/feedback/update-option', { id, text })
    .then(() => {
      const arr = options.map(el => (el.id === id ? { ...el, text } : el));
      dispatch(getFeedbackOptionsSuccess({ options: arr }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};

export const deleteOption = (id, options) => dispatch => {
  axios
    .delete('/api/feedback/delete-option', { data: { id } })
    .then(() => {
      const arr = options.filter(el => el.id !== id);
      dispatch(getFeedbackOptionsSuccess({ options: arr }));
    })
    .catch(err => dispatch(displayMessage(err.message, 'error')));
};
