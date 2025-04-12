import {
  GET_ALL_SELECTED_DATA_SUCCESS,
  GET_SEARCH_RESULTS_SUCCESS,
  RESET_ALL_FILTERS,
  RESET_SEARCH,
  SEARCH_SET_TOTAL_COUNT_DATA,
  SET_ARTWORKS_SEARCH_QUERY,
  SET_MAP_IS_OPEN,
  SET_SEARCH_FILTER,
  SET_SEARCH_RESULTS_COUNT_DATA,
  SET_SEARCH_RESULTS_LOADING,
  SET_SEARCH_RESULTS_PROVED_DATA,
} from 'constants/redux/global/filters';

const initialState = {
  country: '',
  name: '',
  hashtag: '',
  style: '',
  medium: '',
  surface: '',
  styles: [],
  mediums: [],
  surfaces: [],
  searchLoading: false,
  searchResults: {},
  countData: {},
  search: '',
  provedSearchQuery: '',
  provedCountData: {},
  mapIsOpen: false,

  artworksSearch: {
    hashtag: '',
    style: '',
    medium: '',
    surface: '',
    country: '',
    completed: '',
  },
};

function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ARTWORKS_SEARCH_QUERY: {
      return {
        ...state,

        artworksSearch: {
          ...state.artworksSearch,
          ...action.payload,
        },
      };
    }
    case SET_SEARCH_RESULTS_LOADING: {
      return {
        ...state,
        searchLoading: !state.searchLoading,
      };
    }
    case GET_ALL_SELECTED_DATA_SUCCESS:
    case SET_SEARCH_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_SEARCH_RESULTS_COUNT_DATA: {
      return {
        ...state,

        countData: {
          ...state.countData,
          ...action.payload,
        },
      };
    }
    case SEARCH_SET_TOTAL_COUNT_DATA: {
      return {
        ...state,

        countData: action.payload,
      };
    }
    case SET_SEARCH_RESULTS_PROVED_DATA: {
      const { provedCountData, provedSearchQuery } = action.payload;

      return {
        ...state,
        provedCountData,
        provedSearchQuery,
      };
    }
    case RESET_ALL_FILTERS: {
      return {
        ...initialState,
        styles: state.styles,
        mediums: state.mediums,
        surfaces: state.surfaces,
        searchResults: state.searchResults,
      };
    }
    case GET_SEARCH_RESULTS_SUCCESS: {
      const { searchData, countData, search } = action.payload;

      return {
        ...state,
        searchResults: searchData,
        search,
        countData,
        searchLoading: false,
      };
    }
    case RESET_SEARCH: {
      return {
        ...state,
        searchResults: {},
        countData: {},
        search: '',
        provedSearchQuery: '',
        provedCountData: {},
      };
    }
    case SET_MAP_IS_OPEN: {
      return {
        ...state,
        mapIsOpen: action.payload,
      };
    }
    default:
      return state;
  }
}

export default filtersReducer;
