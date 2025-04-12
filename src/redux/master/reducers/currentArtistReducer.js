import {
  GET_MASTER_ARTIST_ACCOUNT_SUCCESS,
  RESET_MASTER_ARTIST_ACCOUNT,
  SET_MASTER_ARTIST_ACCOUNT_LOADING,
} from 'constants/redux/masterCurrentArtist';

const initialState = {
  loading: false,
  account: {},
  location: {},
};

function currentArtistReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MASTER_ARTIST_ACCOUNT_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_MASTER_ARTIST_ACCOUNT_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        loading: false,
      };
    }
    case RESET_MASTER_ARTIST_ACCOUNT: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}

export default currentArtistReducer;
