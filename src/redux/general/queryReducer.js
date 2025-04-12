import {
  DELETE_USER_DATA_SUCCESS,
  QUERY_ERROR,
  QUERY_FETCHING,
  QUERY_INITIAL_STATE,
  QUERY_SUCCESS,
} from 'constants/redux/user';

const initialState = {
  success: false,
  error: false,
  fetching: false,
};

const queryReducer = (state = initialState, action) => {
  switch (action.type) {
    case QUERY_SUCCESS: {
      return {
        success: true,
        loading: false,
        error: false,
        fetching: false,
        ...action.payload,
      };
    }
    case QUERY_FETCHING: {
      return {
        success: false,
        error: false,
        fetching: true,
        ...action.payload,
      };
    }
    case QUERY_ERROR: {
      return {
        ...action.payload,
        success: false,
        error: true,
        fetching: false,
      };
    }
    case QUERY_INITIAL_STATE:
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
};

export default queryReducer;
