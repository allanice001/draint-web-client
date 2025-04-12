import {
  GET_PUBLIC_ARTWORKS_STATE_FROM_COOKIES,
  GET_PUBLIC_ARTWORKS_SUCCESS,
  RESET,
  SET_PUBLIC_ARTWORKS_CHECKED,
  SET_PUBLIC_ARTWORKS_LOADING,
  SET_PUBLIC_ARTWORKS_PAGE,
  SET_PUBLIC_ARTWORKS_SEARCH,
} from '../../../constants/redux/publicArtworks';

import { DELETE_USER_DATA_SUCCESS } from '../../../constants/redux/user';

const initialState = {
  loading: false,
  currentArtworks: [],
  totalPages: 0,
  allCurrentPage: 1,
  saleCurrentPage: 1,
  allSearchQuery: '',
  saleSearchQuery: '',
  checked: false,
  // //////////////
  totalCountries: 0,
  totalArtists: 0,
  totalArtworks: 0,
  countries: [],
};

function artworksReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PUBLIC_ARTWORKS_LOADING: {
      return {
        ...state,
        loading: !state.loading,
      };
    }
    case SET_PUBLIC_ARTWORKS_CHECKED: {
      return {
        ...state,
        checked: !state.checked,
      };
    }
    case SET_PUBLIC_ARTWORKS_PAGE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_PUBLIC_ARTWORKS_SEARCH: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_PUBLIC_ARTWORKS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case GET_PUBLIC_ARTWORKS_STATE_FROM_COOKIES: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    case RESET: {
      return initialState;
    }
    default:
      return state;
  }
}

export default artworksReducer;
