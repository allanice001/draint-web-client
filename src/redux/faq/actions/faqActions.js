import {
  CREATE_QUESTION,
  CREATE_TOPIC,
  DELETE_QUESTION,
  DELETE_TOPIC,
  EDIT_CATEGORY,
  EDIT_QUESTION,
  SET_CATEGORIES,
  SET_FAQ_DATA,
  UPDATE_TOPIC,
} from 'constants/redux/faq';
import { errorHandler, successHandler } from 'helpers/redux-helpers/helper';

import axios from 'dataLayer/axiosInstance';

export const setFaqData = category => dispatch => {
  dispatch({ type: SET_FAQ_DATA });
  axios
    .get(`/api/faq/get-data/${category}`)
    .then(result => {
      dispatch(successHandler(SET_FAQ_DATA, result.data));
    })
    .catch(e => {
      dispatch(errorHandler(SET_FAQ_DATA, e.response));
    });
};

export const setAllCategories = () => dispatch => {
  dispatch({ type: SET_CATEGORIES });
  axios
    .get('/api/faq/get-categories')
    .then(result => {
      dispatch(successHandler(SET_CATEGORIES, result.data));
    })
    .catch(e => {
      dispatch(errorHandler(SET_CATEGORIES, e.response));
    });
};

export const createTopic = ({ category, topic }) => dispatch => {
  dispatch({ type: CREATE_TOPIC });
  axios
    .post(`api/faq/create/topic`, { category, topic })
    .then(result => {
      dispatch(successHandler(CREATE_TOPIC, result.data));
    })
    .catch(e => {
      dispatch(errorHandler(CREATE_TOPIC, e.response));
    });
};

export const createQuestion = values => dispatch => {
  dispatch({ type: CREATE_QUESTION });
  axios
    .post(`api/faq/create/question`, values)
    .then(result => {
      dispatch(successHandler(CREATE_QUESTION, result.data));
    })
    .catch(e => {
      dispatch(errorHandler(CREATE_QUESTION, e.response));
    });
};

export const editTopicTitle = item => dispatch => {
  dispatch({ type: UPDATE_TOPIC });
  axios
    .put(`api/faq/update/topic/${item.id}`, { topic: item.title })
    .then(result => {
      dispatch(successHandler(UPDATE_TOPIC, result.data));
    })
    .catch(e => {
      dispatch(errorHandler(UPDATE_TOPIC), e.response);
    });
};

export const deleteTopic = id => dispatch => {
  dispatch({ type: DELETE_TOPIC });
  axios
    .delete(`api/faq/delete/topic/${id}`)
    .then(() => {
      dispatch(successHandler(DELETE_TOPIC, id));
    })
    .catch(e => {
      dispatch(errorHandler(DELETE_TOPIC), e.response);
    });
};

export const editCategory = item => dispatch => {
  dispatch({ type: EDIT_CATEGORY });
  axios
    .put(`api/faq/update/category/${item.id}`, {
      title: item.title,
      description: item.description,
    })
    .then(result => {
      dispatch(successHandler(EDIT_CATEGORY, result.data));
    })
    .catch(e => {
      dispatch(errorHandler(EDIT_CATEGORY), e.response);
    });
};

export const editQuestion = item => dispatch => {
  dispatch({ type: EDIT_QUESTION });
  axios
    .put(`api/faq/update/question/${item.id}`, {
      title: item.title,
      content: item.content,
    })
    .then(result => {
      dispatch(successHandler(EDIT_QUESTION, result.data));
    })
    .catch(e => {
      dispatch(errorHandler(EDIT_QUESTION), e.response);
    });
};

export const deleteQuestion = (questionId, topicId) => dispatch => {
  dispatch({ type: DELETE_QUESTION });
  axios
    .delete(`api/faq/delete/question/${questionId}`)
    .then(() => {
      dispatch(successHandler(DELETE_QUESTION, { questionId, topicId }));
    })
    .catch(e => {
      dispatch(errorHandler(DELETE_QUESTION), e.response);
    });
};
