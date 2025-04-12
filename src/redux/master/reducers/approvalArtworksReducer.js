import {
  CLOSE_SNACKBAR,
  GET_ARTWORKS_ERROR,
  GET_ARTWORKS_SUCCESS,
  SAVE_ARTWORKS_PAGE_STATE,
  SET_ARTWORKS_DATE_FILTER,
  SET_ARTWORKS_FILTER,
  SET_ARTWORKS_LOADING,
  SET_ARTWORKS_PAGE,
  SET_ARTWORKS_STATE_FROM_COOKIES,
  UPDATE_ARTWORK_STATUS_ERROR,
  UPDATE_ARTWORK_STATUS_SUCCESS,
} from 'constants/redux/masterArtworks';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  open: false,
  message: '',
  style: '',
  currentArtworks: [],
  totalArtworks: 0,
  totalPages: 0,
  page: 1,

  currentPages: {
    all: 1,
    verified: 1,
    unverified: 1,
    pending: 1,
    alternate_verified: 1,
    alternate_unverified: 1,
    alternate_pending: 1,
    none: 1,
    free: 1,
    basic: 1,
  },

  query: '',
  filter: '',
  subscriptionFilter: '',
  verifiedFilter: '',
  alternateFilter: '',
  deletedArtworkFilter: '',

  date: {
    dateSelected: false,
    from: null,
    to: null,
  },
};

function approvalArtworksReduser(state = initialState, action) {
  switch (action.type) {
    case SET_ARTWORKS_LOADING: {
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
    case SET_ARTWORKS_STATE_FROM_COOKIES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ARTWORKS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case GET_ARTWORKS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_ARTWORKS_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case SAVE_ARTWORKS_PAGE_STATE: {
      return {
        ...state,

        currentPages: {
          ...state.currentPages,
          [action.payload.type]: action.payload.number,
        },
      };
    }
    case SET_ARTWORKS_DATE_FILTER:
    case SET_ARTWORKS_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_ARTWORK_STATUS_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        loading: false,
      };
    }
    case UPDATE_ARTWORK_STATUS_ERROR: {
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

export default approvalArtworksReduser;
