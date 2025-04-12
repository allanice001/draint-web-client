import {
  GET_ARTIST_ACCOUNT_ERROR,
  GET_ARTIST_ACCOUNT_SUCCESS,
  GET_ARTIST_ARTWORKS_PAGINATION,
  GET_ARTIST_ARTWORKS_SUCCESS,
  GET_ARTIST_SERIES_SUCCESS,
  SET_ARTIST_ARTWORK_LOADING,
  SET_ARTIST_AVATAR,
  SET_ARTIST_LOADING_OFF,
  SET_ARTIST_LOADING_ON,
} from 'constants/redux/publicArtistProfile';
import { DELETE_USER_DATA_SUCCESS } from 'constants/redux/user';

const initialState = {
  loading: false,
  artworkLoading: false,
  account: {},
  artworks: [],
  series: [],
  pagination: {},
};

function artistProfileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARTIST_ARTWORK_LOADING: {
      return {
        ...state,
        artworkLoading: !state.artworkLoading,
      };
    }
    case SET_ARTIST_LOADING_ON: {
      return {
        ...state,
        loading: true,
      };
    }
    case SET_ARTIST_LOADING_OFF: {
      return {
        ...state,
        loading: false,
      };
    }
    case GET_ARTIST_ACCOUNT_SUCCESS: {
      return {
        ...state,
        account: { ...action.payload },
        loading: false,
      };
    }
    case GET_ARTIST_ACCOUNT_ERROR: {
      return {
        ...state,
        account: null,
        loading: false,
      };
    }
    case GET_ARTIST_ARTWORKS_SUCCESS: {
      return {
        ...state,
        artworks: action.payload,
      };
    }
    case GET_ARTIST_ARTWORKS_PAGINATION: {
      return {
        ...state,
        pagination: action.payload,
      };
    }
    case GET_ARTIST_SERIES_SUCCESS: {
      return {
        ...state,
        series: action.payload,
      };
    }
    case SET_ARTIST_AVATAR: {
      return {
        ...state,
        account: {
          ...state.account,
          avatar: action.payload,
        },
      };
    }
    case DELETE_USER_DATA_SUCCESS: {
      return initialState;
    }
    default:
      return state;
  }
}

export default artistProfileReducer;
