import {
  GET_PROFILES_DATA,
  GET_QUESTIONS,
  SET_LOADING,
  SET_VITA_FILTER,
} from 'constants/redux/masterVita';
import {
  createQuestion,
  deleteQuestion,
  editQuestion,
  getProfilesData,
  getQuestions,
} from 'dataLayer/my-vita/interview';

import displayMessage from 'redux/global/notiifcation/actions/displayMessage';

export const setMyVitaFilter = (filter, pagination) => ({
  type: SET_VITA_FILTER,
  payload: filter,
});

export const setLoadingState = () => ({
  type: SET_LOADING,
});

export const getProfilesDataActions = params => dispatch => {
  getProfilesData(params)
    .then(res => {
      dispatch({ type: GET_PROFILES_DATA, payload: res.data });
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const getQuestionsActions = () => dispatch => {
  getQuestions()
    .then(res => {
      dispatch({ type: GET_QUESTIONS, payload: res.data });
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const createQuestionActions = title => dispatch => {
  createQuestion(title)
    .then(res => {
      dispatch(getQuestionsActions());
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const editQuestionActions = (questionId, title) => dispatch => {
  editQuestion(questionId, title)
    .then(res => {
      dispatch(getQuestionsActions());
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};

export const deleteQuestionActions = questionId => dispatch => {
  deleteQuestion(questionId)
    .then(res => {
      dispatch(getQuestionsActions());
    })
    .catch(err => {
      dispatch(
        displayMessage('Something went wrong, please try later', 'error')
      );
    });
};
