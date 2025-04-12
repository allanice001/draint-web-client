import {
  CLOSE_SNACKBAR,
  DOWNLOAD_SOCIAL_MEDIA_ERROR,
  DOWNLOAD_SOCIAL_MEDIA_SUCCESS,
  GET_SOCIAL_MEDIA_ERROR,
  GET_SOCIAL_MEDIA_SUCCESS,
  SET_SOCIAL_MEDIA_FILTER,
  SET_SOCIAL_MEDIA_LOADING,
  SET_SOCIAL_MEDIA_PAGE,
  SET_SOCIAL_MEDIA_STATE_FROM_COOKIES,
  VERIFY_SOCIAL_MEDIA_ERROR,
  VERIFY_SOCIAL_MEDIA_SUCCESS,
} from 'constants/redux/masterSocialMedia';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  mediaList: [],
  page: 1,
  totalPages: null,
  totalAccounts: null,
  filter: '',
  open: false,
  message: '',
  style: '',
};

function socialMediaReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SOCIAL_MEDIA_STATE_FROM_COOKIES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_SOCIAL_MEDIA_SUCCESS: {
      return {
        ...state,
        mediaList: action.payload.media,
        totalPages: action.payload.totalPages,
        totalAccounts: action.payload.totalAccounts,
        loading: false,
      };
    }
    case GET_SOCIAL_MEDIA_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_SOCIAL_MEDIA_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_SOCIAL_MEDIA_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_SOCIAL_MEDIA_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case VERIFY_SOCIAL_MEDIA_SUCCESS: {
      return {
        ...state,
        mediaList: action.payload,
        loading: false,
      };
    }
    case DOWNLOAD_SOCIAL_MEDIA_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        open: true,
        style: 'success',
      };
    }
    case DOWNLOAD_SOCIAL_MEDIA_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
      };
    }
    case VERIFY_SOCIAL_MEDIA_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case CLOSE_SNACKBAR: {
      return {
        ...state,
        open: false,
        message: '',
        style: '',
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
