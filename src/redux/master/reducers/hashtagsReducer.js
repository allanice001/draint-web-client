import * as ACTIONS from 'constants/redux/masterHashtags';
import { error, success } from 'helpers/redux-helpers/helper';

const initialState = {
  loading: false,
  hashtags: [],
};

const hashtagsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_MASTER_HASHTAGS: {
      return {
        ...state,
        loading: true,
      };
    }
    case success(ACTIONS.SET_MASTER_HASHTAGS): {
      return {
        ...state,
        hashtags: action.payload.hashtags,
        pagination: action.payload.pagination,
        loading: false,
      };
    }
    case success(ACTIONS.DELETE_HASHTAG): {
      return {
        ...state,
      };
    }
    case success(ACTIONS.UPDATE_HASHTAG): {
      return {
        ...state,
        hashtags: state.hashtags.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }
    case error(ACTIONS.SET_MASTER_HASHTAGS):
    case error(ACTIONS.DELETE_HASHTAG):
    case error(ACTIONS.UPDATE_HASHTAG):
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default hashtagsReducer;
