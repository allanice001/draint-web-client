import {
  CLOSE_SNACKBAR,
  GET_AUTO_LETTERS_ERROR,
  GET_AUTO_LETTERS_SUCCESS,
  GET_NEW_ARTISTS_ERROR,
  GET_NEW_ARTISTS_SUCCESS,
  GET_NEW_ARTWORKS_ERROR,
  GET_NEW_ARTWORKS_SUCCESS,
  GET_RECIPIENTS_ERROR,
  GET_RECIPIENTS_SUCCESS,
  GET_STATS_ERROR,
  GET_STATS_SUCCESS,
  GET_SUBSCRIPTIONS_ERROR,
  GET_SUBSCRIPTIONS_SUCCESS,
  GET_TEMPLATE_SUCCESS,
  RESET_RECIPIENTS_LIST,
  RESET_SELECTED_ARTIST_DATE,
  RESET_SELECTED_ARTWORK_DATE,
  RESET_TEMPLATE,
  SAVE_LETTER_DIALOG,
  SAVE_LETTER_ERROR,
  SAVE_LETTER_SUCCESS,
  SELECT_ALL_RECIPIENTS,
  SET_ARTISTS_END_DATE,
  SET_ARTISTS_SELECTED_DATE,
  SET_ARTISTS_START_DATE,
  SET_ARTWORKS_END_DATE,
  SET_ARTWORKS_SELECTED_DATE,
  SET_ARTWORKS_START_DATE,
  SET_AUTO_LETTER_TYPE,
  SET_CHECKED_ARTISTS_DATA,
  SET_CHECKED_ARTWORKS_DATA,
  SET_MAIL_FORM,
  SET_NEWSLETTERS_LOADING,
  SET_PREV_TEMPLATE,
  SET_RECIPIENTS_FILTER,
  SET_RECIPIENTS_LIST,
  SET_RECIPIENTS_PAGE,
  SET_SUBSCRIPTIONS_FILTER,
  SET_SUBSCRIPTIONS_ORDER,
} from 'constants/redux/masterNewsletters';

import { DEFAULT_TYPE } from 'constants/master-dashboard/automated-newslaters';
import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  openDialog: false,
  open: false,
  message: '',
  style: '',
  // weekly
  newArtists: [],
  newArtworks: [],

  artistsDateStart: null,
  artistsDateEnd: null,
  dateArtistsSelected: false,

  artworksDateStart: null,
  artworksDateEnd: null,
  dateArtworksSelected: false,

  checkedArtworksData: [],
  checkedArtistsData: [],
  // auto
  selectedType: DEFAULT_TYPE,
  letterTypes: [],
  // custom
  currentAccounts: [],
  totalAccounts: 0,
  totalPages: 1,
  checkedAccounts: [],
  selectedAll: false,
  page: 1,
  filter: '',
  subscriptionFilter: '',
  roleFilter: '',
  artworkFilter: '',
  search: '',
  // subs
  newsletterSubscriptions: [],
  statusFilter: '',
  order: 'asc',
  stats: [],
  prevWeeklyTemplate: '',
  template: '',
  form: {
    title: '',
    text: '',
    img_link: '',
    button_name: '',
    button_link: '',
    selectedFile: {},
  },
};

function newslettersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWSLETTERS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_AUTO_LETTERS_SUCCESS: {
      return {
        ...state,
        letterTypes: action.payload,
        loading: false,
      };
    }
    case GET_AUTO_LETTERS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_AUTO_LETTER_TYPE: {
      return {
        ...state,
        selectedType: action.payload,
        loading: false,
      };
    }
    case SET_MAIL_FORM: {
      return {
        ...state,
        form: { ...action.payload },
        loading: false,
      };
    }
    case GET_NEW_ARTWORKS_SUCCESS: {
      return {
        ...state,
        newArtworks: action.payload,
        loading: false,
      };
    }
    case GET_NEW_ARTWORKS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case GET_NEW_ARTISTS_SUCCESS: {
      return {
        ...state,
        newArtists: action.payload,
        loading: false,
      };
    }
    case GET_NEW_ARTISTS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_ARTISTS_START_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_ARTISTS_END_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_ARTISTS_SELECTED_DATE: {
      return {
        ...state,
        dateArtistsSelected: action.payload,
      };
    }
    case SET_ARTWORKS_START_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_ARTWORKS_END_DATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_ARTWORKS_SELECTED_DATE: {
      return {
        ...state,
        dateArtworksSelected: action.payload,
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
    case SAVE_LETTER_DIALOG: {
      return {
        ...state,
        openDialog: !state.openDialog,
      };
    }
    case SAVE_LETTER_SUCCESS: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'success',
        loading: false,
      };
    }
    case SAVE_LETTER_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case GET_RECIPIENTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case GET_RECIPIENTS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_RECIPIENTS_LIST: {
      return {
        ...state,
        checkedAccounts: action.payload,
        loading: false,
      };
    }
    case SELECT_ALL_RECIPIENTS: {
      return {
        ...state,
        selectedAll: !state.selectedAll,
      };
    }
    case SET_RECIPIENTS_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_RECIPIENTS_LIST: {
      return {
        ...state,
        checkedAccounts: [],
        selectedAll: false,
      };
    }
    case SET_RECIPIENTS_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case GET_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        newsletterSubscriptions: action.payload,
        loading: false,
      };
    }
    case GET_SUBSCRIPTIONS_ERROR: {
      return {
        ...state,
        open: true,
        message: action.payload,
        style: 'error',
        loading: false,
      };
    }
    case SET_SUBSCRIPTIONS_FILTER: {
      return {
        ...state,
        statusFilter: action.payload,
      };
    }
    case SET_SUBSCRIPTIONS_ORDER: {
      return {
        ...state,
        order: action.payload,
        loading: false,
      };
    }
    case GET_STATS_SUCCESS: {
      return {
        ...state,
        stats: action.payload,
        loading: false,
      };
    }
    case GET_TEMPLATE_SUCCESS: {
      return {
        ...state,
        template: action.payload,
      };
    }
    case RESET_TEMPLATE: {
      return {
        ...state,
        template: '',
      };
    }
    case RESET_SELECTED_ARTIST_DATE: {
      return {
        ...state,
        artistsDateStart: null,
        artistsDateEnd: null,
      };
    }
    case RESET_SELECTED_ARTWORK_DATE: {
      return {
        ...state,
        artworksDateStart: null,
        artworksDateEnd: null,
      };
    }
    case SET_PREV_TEMPLATE: {
      return {
        ...state,
        prevWeeklyTemplate: action.payload,
      };
    }
    case SET_CHECKED_ARTWORKS_DATA: {
      return {
        ...state,
        checkedArtworksData: action.payload,
      };
    }
    case SET_CHECKED_ARTISTS_DATA: {
      return {
        ...state,
        checkedArtistsData: action.payload,
      };
    }
    case GET_STATS_ERROR: {
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

export default newslettersReducer;
