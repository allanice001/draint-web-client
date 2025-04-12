import {
  GET_MASTER_FEEDBACK_OPTIONS_SUCCESS,
  GET_MASTER_FEEDBACK_SUCCESS,
  SET_MASTER_FEEDBACK_DATE_FILTER,
  SET_MASTER_FEEDBACK_FILTER,
  SET_MASTER_FEEDBACK_LOADING,
  SET_MASTER_FEEDBACK_OPTIONS_LOADING,
  SET_MASTER_FEEDBACK_PAGE,
} from 'constants/redux/masterFeedback';

const initialState = {
  loading: false,
  feedback: [],
  options: [],
  optionsLoading: false,
  totalPages: 1,
  totalFeedback: 0,
  page: 1,
  filter: '',
  onlyNew: false,

  date: {
    dateSelected: false,
    from: null,
    to: null,
  },
};

function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MASTER_FEEDBACK_OPTIONS_LOADING: {
      return {
        ...state,
        optionsLoading: true,
      };
    }
    case GET_MASTER_FEEDBACK_OPTIONS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        optionsLoading: false,
      };
    }
    case SET_MASTER_FEEDBACK_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MASTER_FEEDBACK_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case SET_MASTER_FEEDBACK_PAGE:
    case SET_MASTER_FEEDBACK_FILTER:
    case SET_MASTER_FEEDBACK_DATE_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}

export default feedbackReducer;
