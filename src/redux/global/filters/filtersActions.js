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

import { SearchService } from '../../../services/search-service';
import axios from 'dataLayer/axiosInstance';

const searchService = new SearchService();

export const setFilter = (input_type, input) => ({
  type: SET_SEARCH_FILTER,
  payload: { [input_type]: input },
});

export const setCounterData = (counter_type, count) => ({
  type: SET_SEARCH_RESULTS_COUNT_DATA,
  payload: { [counter_type]: count },
});

export const setCountData = payload => ({
  type: SEARCH_SET_TOTAL_COUNT_DATA,
  payload,
});

export const setProvedData = () => (dispatch, getState) => {
  const { countData, search } = getState().filters;

  dispatch({
    type: SET_SEARCH_RESULTS_PROVED_DATA,
    payload: {
      provedCountData: countData,
      provedSearchQuery: search,
    },
  });
};

export const resetFilters = () => ({
  type: RESET_ALL_FILTERS,
});

export const setSearchLoading = () => ({
  type: SET_SEARCH_RESULTS_LOADING,
});

export const getSelectedDataSuccess = payload => ({
  type: GET_ALL_SELECTED_DATA_SUCCESS,
  payload,
});

export const getSearchResultsSuccess = payload => ({
  type: GET_SEARCH_RESULTS_SUCCESS,
  payload,
});

export const resetSearch = () => ({
  type: RESET_SEARCH,
});

export const getSelectedData = () => async dispatch => {
  await axios
    .get('/api/artworks/allFilters')
    .then(res =>
      dispatch(
        getSelectedDataSuccess({
          styles: res.data.styles,
          mediums: res.data.mediums,
          surfaces: res.data.surfaces,
        })
      )
    )
    .catch(err => console.log(err));
};

export const getSearchResults = query => async dispatch => {
  dispatch(setSearchLoading());
  return Promise.all([
    searchService.searchByQuery({ query, limit: 3 }),
    searchService.getTotalCount({ query }),
  ])
    .then(result => {
      const [
        {
          data: { searchData },
        },
        { data: counts },
      ] = result;

      const countData = {};

      Object.keys(counts).forEach(key => {
        countData[key] = counts[key].length
          ? parseInt(counts[key][0].count, 10)
          : 0;
      });

      countData['total'] = Object.values(countData).reduce((p, c) => p + c);

      dispatch(
        getSearchResultsSuccess({ searchData, countData, search: query })
      );
      // dispatch(setSearchLoading());
    })
    .catch(() => dispatch(setSearchLoading()));
};

export const getTotalByQuery = query => dispatch => {
  searchService
    .getTotalCount(query)
    .then(({ data }) => {
      const payload = {};

      Object.keys(data).forEach(key => {
        payload[key] = data[key].length ? parseInt(data[key][0].count, 10) : 0;
      });

      payload['total'] = Object.values(payload).reduce((p, c) => p + c);

      dispatch(setCountData(payload));
    })
    .catch(err => setCountData({}));
};

export const setSearchArtworksFilter = (type, field) => ({
  type: SET_ARTWORKS_SEARCH_QUERY,
  payload: { [type]: field },
});

export const setSearchFilter = data => ({
  type: SET_ARTWORKS_SEARCH_QUERY,
  payload: data,
});

export const setMapOpen = payload => ({
  type: SET_MAP_IS_OPEN,
  payload,
});
