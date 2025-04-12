import { GET_PROFILES_DATA, GET_QUESTIONS, SET_LOADING, SET_VITA_FILTER } from '../../../constants/redux/masterVita';

const initialState = {
  profiles: [],
  questions: [],
  filter: '',
  loading: false,
};

const vitaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILES_DATA: {
      return {
        ...state,
        profiles: action.payload.profiles,
        pagination: action.payload.pagination,
        loading: false,
      }
    }
    case GET_QUESTIONS: {
      return {
        ...state,
        questions: action.payload,
      }
    }
    case SET_VITA_FILTER: {
      return {
        ...state,
        filter: action.payload,
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    default:
      return state;
  }
}

export default vitaReducer;
