import ACTIONS from './action-types';
import { TabType } from 'constants/search.constants';
import { transformURLStr } from 'services/query-string.service';
import { updateInCartSearchArtworks } from 'helpers/redux-helpers/helper';

const initialState = {
  showResultFor: '',

  loading: false,
  searchResult: {
    pages: null,
    total: null,
    results: null,
    inTrade: false,
  },

  savedArtworkFilter: {
    URL: '',
  },
  savedArtistFilter: {
    URL: '',
  },
  savedOtherFilters: {},
};

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.SET_SAVED_URL: {
      const { type, URL } = action.payload;
      let url = transformURLStr(URL);

      if (type === TabType.Artist) {
        return {
          ...state,
          savedArtistFilter: {
            URL: url,
          },
        };
      }

      if (type === TabType.Artwork) {
        return {
          ...state,
          savedArtworkFilter: {
            URL: url,
          },
        };
      }

      return {
        ...state,
        savedOtherFilters: {
          ...state.savedOtherFilters,
          [`${type}URL`]: url,
        },
      };
    }

    case ACTIONS.SET_SHOW_RESULT: {
      return {
        ...state,
        showResultFor: action.payload.for,
      };
    }

    case ACTIONS.SET_SEARCH_LOADING: {
      return {
        ...state,
        loading: action.payload.loading,
      };
    }

    case ACTIONS.CLEAR_SEARCH_RESULT: {
      return {
        ...state,
        searchReducer: state.searchResult,
      };
    }

    case ACTIONS.CLEAR_SEARCH_URLS: {
      return {
        ...state,
        savedOtherFilters: {},
        savedArtworkFilter: {
          URL: '',
        },
        savedArtistFilter: {
          URL: '',
        },
      };
    }

    case ACTIONS.SET_SEARCH_RESULT: {
      const { pages, total, result, inTrade } = action.payload;

      return {
        ...state,
        searchResult: {
          pages,
          total,
          result,
          inTrade,
        },
      };
    }

    case ACTIONS.ADD_TO_CART_SEARCH_RESULT: {
      return {
        ...state,
        searchResult: {
          ...state.searchResult,
          result: updateInCartSearchArtworks({
            artworkId: action.payload,
            list: [...state.searchResult.result],
          }),
        },
      };
    }

    default: {
      return state;
    }
  }
}

export default searchReducer;
