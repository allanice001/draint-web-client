import {
  GET_FEATURES_CARDS,
  GET_NEW_PUBLIC_ARTISTS_SUCCESS,
  GET_PUBLIC_ARTISTS_STATE_FROM_COOKIES,
  GET_PUBLIC_ARTISTS_SUCCESS,
  SET_NEW_PUBLIC_ARTISTS_LOADING,
  SET_PUBLIC_ARTISTS_CHECKED,
  SET_PUBLIC_ARTISTS_LOADING,
  SET_PUBLIC_ARTISTS_PAGE,
  SET_PUBLIC_ARTISTS_SEARCH,
} from 'constants/redux/publicArtists';

import { DELETE_USER_DATA_SUCCESS } from '../../../constants/redux/user';

const initialState = {
  loadingAll: false,
  loadingNew: false,
  currentArtists: [],
  cards: [],
  newArtists: [],
  countries: [],
  newArtistPages: 0,
  newArtistPage: 1,
  totalPages: 0,
  allCurrentPage: 1,
  // sellerCurrentPage: 1,
  allSearchQuery: '',
  // sellerSearchQuery: '',
  totalCountries: 0,
  totalArtists: 0,
  totalArtworks: 0,
};

function artistsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PUBLIC_ARTISTS_LOADING: {
      return {
        ...state,
        loadingAll: !state.loadingAll,
      };
    }
    case SET_NEW_PUBLIC_ARTISTS_LOADING: {
      return {
        ...state,
        loadingNew: !state.loadingNew,
      };
    }
    case SET_PUBLIC_ARTISTS_CHECKED: {
      return {
        ...state,
        checked: !state.checked,
      };
    }
    case SET_PUBLIC_ARTISTS_PAGE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_PUBLIC_ARTISTS_SEARCH: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_NEW_PUBLIC_ARTISTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        // newArtists: action.payload.newArtists,
        // newArtistPages: action.payload.totalPages,
        loading: false,
      };
    }
    case GET_PUBLIC_ARTISTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        // totalCountries: action.payload.totalCountries,
        // totalArtists: action.payload.totalArtists,
        // totalArtworks: action.payload.totalArtworks,
        // currentArtists: action.payload.currentArtists,
        // totalPages: action.payload.totalPages,
        loading: false,
      };
    }
    case GET_PUBLIC_ARTISTS_STATE_FROM_COOKIES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    case GET_FEATURES_CARDS: {
      return {
        ...state,
        cards: action.payload,
      };
    }
    default:
      return state;
  }
}

export default artistsReducer;
