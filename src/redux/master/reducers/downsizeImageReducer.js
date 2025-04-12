import {
  CLOSE_SNACKBAR,
  DOWNSIZE_IMAGE_ERROR,
  DOWNSIZE_IMAGE_SUCCESS,
  GET_DOWNSIZE_ACCOUNTS_ERROR,
  GET_DOWNSIZE_ACCOUNTS_SUCCESS,
  GET_DOWNSIZE_ARTWORKS_ERROR,
  GET_DOWNSIZE_ARTWORKS_SUCCESS,
  SET_DOWNSIZE_ACCOUNTS_PAGE,
  SET_DOWNSIZE_ARTWORKS_PAGE,
  SET_DOWNSIZE_LOADING,
} from 'constants/redux/masterDownsizeImage';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  open: false,
  message: '',
  style: '',
  currentAccounts: [],
  totalAccounts: 0,
  totalAccountsPages: 0,
  currentAccountsPage: 1,
  currentArtworks: [],
  totalArtworks: 0,
  totalArtworksPages: 0,
  currentArtworksPage: 1,
};

function downsizeImageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DOWNSIZE_LOADING: {
      return {
        ...state,
        loading: true,
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
    case GET_DOWNSIZE_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case GET_DOWNSIZE_ACCOUNTS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case GET_DOWNSIZE_ARTWORKS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case GET_DOWNSIZE_ARTWORKS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_DOWNSIZE_ACCOUNTS_PAGE: {
      return {
        ...state,
        currentAccountsPage: action.payload,
      };
    }
    case SET_DOWNSIZE_ARTWORKS_PAGE: {
      return {
        ...state,
        currentArtworksPage: action.payload,
      };
    }
    case DOWNSIZE_IMAGE_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        loading: false,
      };
    }
    case DOWNSIZE_IMAGE_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default downsizeImageReducer;
