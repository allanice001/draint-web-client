import {
  DELETE_SOCIAL_MEDIA_DATA_SUCCESS,
  GET_SOCIAL_MEDIA_DATA_SUCCESS,
  SET_SOCIAL_MEDIA_COUNTRY,
  SET_SOCIAL_MEDIA_LINK,
  SET_SOCIAL_MEDIA_LOADING,
} from 'constants/redux/dashboardSocialMedia';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  open: false,
  message: '',
  style: '',
  instagramLink: '',
  country: '',
  instagramImageList: [],
};

function socialMediaReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOCIAL_MEDIA_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case GET_SOCIAL_MEDIA_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case SET_SOCIAL_MEDIA_COUNTRY: {
      return {
        ...state,
        country: action.payload,
      };
    }
    case SET_SOCIAL_MEDIA_LINK: {
      return {
        ...state,
        instagramLink: action.payload,
      };
    }
    case DELETE_SOCIAL_MEDIA_DATA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default socialMediaReducer;
