import {
  ADD_ARTWORK_TO_CART_IN_WATCHLIST,
  DELETE_FROM_WATCHLIST_SUCCESS,
  GET_WATCHLIST,
  GET_WATCHLIST_SUCCESS,
  SET_RESALE_WATCHLIST_SUCCESS,
  SET_SALE_WATCHLIST_SUCCESS,
  SET_SELECTED_ARTWORK,
  SET_WATCHLIST_LOADING_FALSE,
} from 'constants/redux/dashboardWatchlist';
import { updateInCart } from 'helpers/redux-helpers/helper';

const initialState = {
  loading: false,
  watchlistFull: [],
  selectedArtworkId: '',

  watchlist: {
    sale: {
      data: [],
      pagination: {},
    },

    resale: {
      data: [],
      pagination: {},
    },
  },
};

function watchlistReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WATCHLIST: {
      return {
        ...state,
        loading: true,
        page: action.payload,
      };
    }

    case GET_WATCHLIST_SUCCESS: {
      return {
        ...state,
        watchlistFull: action.payload,
      };
    }

    case SET_SALE_WATCHLIST_SUCCESS: {
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          sale: action.payload,
        },
      };
    }

    case SET_RESALE_WATCHLIST_SUCCESS: {
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          resale: action.payload,
        },
      };
    }

    case SET_WATCHLIST_LOADING_FALSE: {
      return {
        ...state,
        loading: false,
      };
    }

    case DELETE_FROM_WATCHLIST_SUCCESS: {
      const { artworkId } = action.payload;
      return {
        ...state,
        watchlistFull: [
          ...state.watchlistFull.filter(el => el.artwork_id !== artworkId),
        ],
      };
    }

    case ADD_ARTWORK_TO_CART_IN_WATCHLIST: {
      return {
        ...state,
        watchlist: {
          ...state.watchlist,
          sale: {
            ...state.watchlist.sale,
            data: updateInCart({
              artworkId: action.payload,
              list: [...state.watchlist.sale.data],
            }),
          },
        },
      };
    }

    case SET_SELECTED_ARTWORK: {
      return {
        ...state,
        selectedArtworkId: action.payload,
      };
    }

    default:
      return state;
  }
}

export default watchlistReducer;
