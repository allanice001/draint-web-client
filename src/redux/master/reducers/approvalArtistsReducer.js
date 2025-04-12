import {
  CLOSE_SNACKBAR,
  GENERATE_CSV_ERROR,
  GENERATE_CSV_SUCCESS,
  GET_ACCOUNTS_ERROR,
  GET_ACCOUNTS_SUCCESS,
  GET_COUNTRIES_SUCCESS,
  SAVE_ACCOUNTS_PAGE_STATE,
  SET_ACCOUNTS_COUNTRY_FILTER,
  SET_ACCOUNTS_DATE_FILTER,
  SET_ACCOUNTS_FILTER,
  SET_ACCOUNTS_LOADING,
  SET_ACCOUNTS_PAGE,
  SET_ACCOUNTS_STATE_FROM_COOKIES,
  SET_CSV_LOADING,
  SET_EMAIL_TAKEN,
  SET_USERNAME_TAKEN,
  UNSET_ACCOUNTS_LOADING,
  UPDATE_ACCOUNT_STATUS_ERROR,
  UPDATE_ACCOUNT_STATUS_SUCCESS,
} from 'constants/redux/masterArtists';

import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  csvLoading: false,
  open: false,
  message: '',
  style: '',
  currentAccounts: [],
  totalAccounts: 0,
  totalPages: 0,
  page: 1,
  isUserTaken: false,
  isEmailTaken: false,
  currentPages: {
    all: 1,
    verified: 1,
    unverified: 1,
    pending: 1,
    none: 1,
    free: 1,
    basic: 1,
    Arts_Verified: 1,
    Arts_Unverified: 1,
    Arts_Pending: 1,
  },

  query: '',
  filter: '',
  subscriptionFilter: '',
  artworkFilter: '',
  roleFilter: '',
  deletedUserFilter: '',
  imageFilter: '',
  instagramFilter: '',
  country: [],
  activatedFilter: '',

  date: {
    dateSelected: false,
    from: null,
    to: null,
  },
};

function approvalArtistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCOUNTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case UNSET_ACCOUNTS_LOADING: {
      return {
        ...state,
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
    case SET_ACCOUNTS_STATE_FROM_COOKIES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ACCOUNTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case GET_COUNTRIES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ACCOUNTS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_ACCOUNTS_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case SAVE_ACCOUNTS_PAGE_STATE: {
      return {
        ...state,

        currentPages: {
          ...state.currentPages,
          [action.payload.type]: action.payload.number,
        },
      };
    }
    case SET_ACCOUNTS_FILTER:
    case SET_ACCOUNTS_DATE_FILTER:
    case SET_ACCOUNTS_COUNTRY_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_ACCOUNT_STATUS_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        loading: false,
      };
    }
    case UPDATE_ACCOUNT_STATUS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_CSV_LOADING: {
      return {
        ...state,
        csvLoading: true,
      };
    }
    case SET_USERNAME_TAKEN: {
      return {
        ...state,
        isUserTaken: action.payload,
      };
    }
    case SET_EMAIL_TAKEN: {
      return {
        ...state,
        isEmailTaken: action.payload,
      };
    }
    case GENERATE_CSV_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        csvLoading: false,
      };
    }
    case GENERATE_CSV_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        csvLoading: false,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default approvalArtistsReducer;
