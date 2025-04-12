import {
  GET_INTERVIEW,
  GET_INTERVIEW_PHOTO,
  SET_INITIAL_VALUE_OF_ANSWERS,
  SET_LOADING_AVATAR,
} from './constants';

const initialState = {
  loading: false,
  loadAvatar: false,
  error: null,
  interview: [],
  photo: '',
  questionsAndAnswers: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_AVATAR: {
      return {
        ...state,
        loadAvatar: action.payload,
      };
    }
    case GET_INTERVIEW: {
      return {
        ...state,
        interview: action.payload,
      };
    }
    case GET_INTERVIEW_PHOTO: {
      return {
        ...state,
        photo: action.payload,
      };
    }
    case SET_INITIAL_VALUE_OF_ANSWERS: {
      return {
        ...state,
        initialData: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
