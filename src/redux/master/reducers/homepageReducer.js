import * as ACTIONS from 'constants/redux/master-homepage';

import { error, success } from 'helpers/redux-helpers/helper';

const initialState = {
  loading: false,
  slides: [],
  allSlides: [],
  error: false,
};

const homepageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_SLIDE: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case success(ACTIONS.CREATE_SLIDE): {
      return {
        ...state,
        loading: false,
        allSlides: [...state.allSlides, action.payload],
      };
    }

    case success(ACTIONS.SET_ALL_SLIDES): {
      return {
        ...state,
        loading: false,
        allSlides: action.payload,
      };
    }

    case success(ACTIONS.UPDATE_SLIDE): {
      return {
        ...state,
        loading: false,
        allSlides: state.allSlides.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    }

    case success(ACTIONS.DELETE_SLIDE): {
      return {
        ...state,
        loading: false,
        allSlides: state.allSlides.filter(item => item.id !== action.payload),
      };
    }

    case error(ACTIONS.DELETE_SLIDE):
    case error(ACTIONS.UPDATE_SLIDE):
    case error(ACTIONS.CREATE_SLIDE): {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default homepageReducer;
